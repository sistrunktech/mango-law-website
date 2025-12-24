import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";
import { buildAdminEmailHtml, buildClientConfirmationHtml } from "../_shared/email/templates.ts";
import { formatFrom, formatPhoneForDisplay, isTruthyEnv, normalizePhoneForStorage, parseEmailList } from "../_shared/email/utils.ts";
import type { EmailSeason, EmailTheme } from "../_shared/email/tokens.ts";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  case_type?: string | null;
  county?: string | null;
  urgency?: string | null;
  how_found?: string | null;
  how_found_detail?: string | null;
  how_heard?: string | null;
  how_heard_detail?: string | null;
  honeypot?: string;
  honey?: string;
  turnstile_token?: string | null;
}

interface LogContext {
  endpoint: string;
  method: string;
  ip?: string;
  userAgent?: string;
  status?: number;
  error?: string;
  duration?: number;
  [key: string]: unknown;
}

function log(level: string, message: string, context?: LogContext) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...context,
  };
  console.log(JSON.stringify(logEntry));
}

function getSecurityHeaders(origin?: string): Record<string, string> {
  const baseHeaders = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy": "default-src 'none'; script-src 'none'; connect-src 'self'; img-src 'self'; style-src 'self'",
  };

  if (origin) {
    baseHeaders["Access-Control-Allow-Origin"] = origin;
  }

  return baseHeaders;
}

function getCorsHeaders(allowedOrigin?: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": allowedOrigin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
    "Access-Control-Max-Age": "86400",
  };
}

function isOriginAllowed(origin: string | null, allowlist: string): boolean {
  if (!origin) return false;
  const allowed = allowlist.split(",").map((o) => o.trim());
  return allowed.includes(origin) || allowed.includes("*");
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
}

async function verifyTurnstile(args: { token: string; ip: string }): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) return true;

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", args.token);
  if (args.ip && args.ip !== "unknown") body.set("remoteip", args.ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return false;
  const json = await res.json().catch(() => null);
  return Boolean(json?.success);
}

function getClientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
}

async function checkRateLimit(
  supabase: any,
  ip: string,
  endpoint: string,
  windowMinutes: number = 1,
  maxRequests: number = 10,
): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);

  const { data, error } = await supabase
    .from("rate_limit_requests")
    .select("id")
    .eq("ip_address", ip)
    .eq("endpoint", endpoint)
    .gte("created_at", windowStart.toISOString());

  if (error) {
    log("error", "Rate limit check failed", { error: error.message, ip, endpoint });
    return { allowed: true, remaining: maxRequests };
  }

  const requestCount = data?.length || 0;
  const remaining = Math.max(0, maxRequests - requestCount - 1);

  if (requestCount >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  const { error: insertError } = await supabase
    .from("rate_limit_requests")
    .insert({ ip_address: ip, endpoint });

  if (insertError) {
    log("error", "Failed to log rate limit request", { error: insertError.message, ip, endpoint });
  }

  return { allowed: true, remaining };
}

async function cleanupOldRateLimits(supabase: any) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  await supabase
    .from("rate_limit_requests")
    .delete()
    .lt("created_at", oneHourAgo.toISOString());
}

Deno.serve(async (req: Request) => {
  const startTime = Date.now();
  const origin = req.headers.get("origin");
  const originAllowlist = Deno.env.get("ORIGIN_ALLOWLIST") || "*";
  const allowedOrigin = isOriginAllowed(origin, originAllowlist) ? origin : undefined;
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  const corsHeaders = getCorsHeaders(allowedOrigin);
  const securityHeaders = getSecurityHeaders(allowedOrigin);
  const allHeaders = { ...corsHeaders, ...securityHeaders };

  const logContext: LogContext = {
    endpoint: "/submit-contact",
    method: req.method,
    ip,
    userAgent,
  };

  if (req.method === "OPTIONS") {
    log("info", "CORS preflight request", logContext);
    return new Response(null, { status: 204, headers: allHeaders });
  }

  if (req.method !== "POST") {
    log("warn", "Method not allowed", { ...logContext, status: 405 });
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...allHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const rateLimit = await checkRateLimit(supabase, ip, "/submit-contact", 1, 10);
    if (!rateLimit.allowed) {
      log("warn", "Rate limit exceeded", { ...logContext, status: 429 });
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
          retryAfter: 60,
        }),
        {
          status: 429,
          headers: {
            ...allHeaders,
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.floor(Date.now() / 1000) + 60),
          },
        },
      );
    }

    if (!allowedOrigin) {
      log("warn", "Origin not allowed", { ...logContext, origin: origin || "null", status: 403 });
      return new Response(
        JSON.stringify({ error: "Origin not allowed" }),
        { status: 403, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const formData: ContactFormData = await req.json();

    if (formData.honeypot || formData.honey) {
      log("warn", "Honeypot triggered (likely spam)", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
      log("warn", "Missing required fields", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      const token = String(formData.turnstile_token || "").trim();
      if (!token) {
        log("warn", "Missing Turnstile token", { ...logContext, status: 400 });
        return new Response(
          JSON.stringify({ error: "Verification required" }),
          { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
        );
      }
      const ok = await verifyTurnstile({ token, ip });
      if (!ok) {
        log("warn", "Turnstile verification failed", { ...logContext, status: 400 });
        return new Response(
          JSON.stringify({ error: "Verification failed" }),
          { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    if (!validateEmail(formData.email)) {
      log("warn", "Invalid email format", { ...logContext, email: formData.email, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const normalizedPhone = formData.phone ? normalizePhoneForStorage(formData.phone) : null;
    if (normalizedPhone && !validatePhone(normalizedPhone)) {
      log("warn", "Invalid phone format", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid phone number format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const { error: dbError } = await supabase.from("contact_leads").insert({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: normalizedPhone,
      message: formData.message.trim(),
      case_type: formData.case_type?.trim() || null,
      county: formData.county?.trim() || null,
      urgency: formData.urgency?.trim() || null,
      how_found: (formData.how_found || formData.how_heard || "").trim() || null,
      how_found_detail: (formData.how_found_detail || formData.how_heard_detail || "").trim() || null,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (dbError) {
      log("error", "Database insertion failed", { ...logContext, error: dbError.message, status: 500 });
      return new Response(
        JSON.stringify({ error: "Failed to save contact information" }),
        { status: 500, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = formatFrom(Deno.env.get("FROM_EMAIL") || "noreply@example.com");
    const notifyTo = parseEmailList(Deno.env.get("CONTACT_NOTIFY_TO")) || ["admin@example.com"];
    const notifyBcc = parseEmailList(
      Deno.env.get("CONTACT_NOTIFY_BCC") || Deno.env.get("CHAT_LEAD_NOTIFY_CC"),
    );

    if (resendApiKey) {
      try {
        const siteUrl = Deno.env.get("FRONTEND_URL") || Deno.env.get("VITE_SITE_URL") || "https://mango.law";
        const appEnv = Deno.env.get("APP_ENV") || "production";
        const season = (Deno.env.get("APP_SEASON") || "winter") as EmailSeason;
        const theme = (Deno.env.get("APP_THEME") || "dark") as EmailTheme;
        const holiday = isTruthyEnv(Deno.env.get("APP_HOLIDAY"));

        const adminEmailBody = {
          from: fromEmail,
          to: notifyTo.length ? notifyTo : ["admin@example.com"],
          bcc: notifyBcc.length ? notifyBcc : undefined,
          reply_to: formData.email.trim().toLowerCase(),
          subject: `New contact request from ${formData.name.trim()}`,
          html: buildAdminEmailHtml(
            "contact",
            {
              title: "New contact request",
              summaryLine: `${formData.name.trim()} · ${normalizedPhone ? formatPhoneForDisplay(normalizedPhone) : "No phone"}`,
              fields: [
                { label: "Name", value: formData.name.trim() },
                { label: "Email", value: formData.email.trim().toLowerCase() },
                { label: "Phone", value: normalizedPhone ? formatPhoneForDisplay(normalizedPhone) : "Not provided" },
                { label: "Help needed", value: formData.case_type?.trim() || "Not provided" },
                { label: "Urgency", value: formData.urgency?.trim() || "Not provided" },
                { label: "County", value: formData.county?.trim() || "Not provided" },
                { label: "How found", value: (formData.how_found || formData.how_heard || "").trim() || "Not provided" },
                { label: "How found detail", value: (formData.how_found_detail || formData.how_heard_detail || "").trim() || "Not provided" },
              ],
              messageLabel: "Message",
              message: formData.message.trim(),
              meta: [
                { label: "IP", value: ip },
                { label: "UA", value: userAgent },
              ],
              replyToEmail: formData.email.trim().toLowerCase(),
              callToPhone: normalizedPhone || null,
            },
            { siteUrl, appEnv, season, theme, holiday },
          ),
        };

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminEmailBody),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          log("error", "Email notification failed", { ...logContext, error: errorText });
        } else {
          log("info", "Email notification sent successfully", logContext);
        }

        const confirmationResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [formData.email.trim().toLowerCase()],
            subject: "We received your message — Mango Law LLC",
            html: buildClientConfirmationHtml(
              "contact",
              {
                title: "We received your message",
                greetingName: formData.name.trim(),
                intro: "Thanks for reaching out. We received your message and will respond as soon as possible during business hours.",
                details: [
                  { label: "Name", value: formData.name.trim() },
                  { label: "Email", value: formData.email.trim().toLowerCase() },
                  ...(normalizedPhone ? [{ label: "Phone", value: formatPhoneForDisplay(normalizedPhone) }] : []),
                  ...(formData.case_type?.trim() ? [{ label: "Help needed", value: formData.case_type.trim() }] : []),
                  ...(formData.county?.trim() ? [{ label: "County", value: formData.county.trim() }] : []),
                  ...(formData.urgency?.trim() ? [{ label: "Urgency", value: formData.urgency.trim() }] : []),
                ],
                message: formData.message.trim(),
                caseType: formData.case_type?.trim() || null,
                urgency: formData.urgency?.trim() || null,
                county: formData.county?.trim() || null,
                includeHelpfulLinks: true,
              },
              { siteUrl, appEnv, season, theme, holiday },
            ),
          }),
        });

        if (!confirmationResponse.ok) {
          const errorText = await confirmationResponse.text();
          log("error", "Lead confirmation email failed", { ...logContext, error: errorText });
        } else {
          log("info", "Lead confirmation email sent successfully", logContext);
        }
      } catch (emailError) {
        log("error", "Email sending exception", {
          ...logContext,
          error: emailError instanceof Error ? emailError.message : String(emailError),
        });
      }
    }

    cleanupOldRateLimits(supabase);

    const duration = Date.now() - startTime;
    log("info", "Contact form submitted successfully", {
      ...logContext,
      status: 200,
      duration,
      rateLimitRemaining: rateLimit.remaining,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your message. We will contact you soon.",
      }),
      {
        status: 200,
        headers: {
          ...allHeaders,
          "Content-Type": "application/json",
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);
    log("error", "Unhandled exception in submit-contact", {
      ...logContext,
      error: errorMessage,
      status: 500,
      duration,
    });

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...allHeaders, "Content-Type": "application/json" } },
    );
  }
});
