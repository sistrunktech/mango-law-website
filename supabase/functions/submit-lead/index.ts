import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";
import { buildAdminEmailHtml, buildClientConfirmationHtml } from "../_shared/email/templates.ts";
import { formatFrom, formatPhoneForDisplay, isTruthyEnv, normalizePhoneForStorage, parseEmailList } from "../_shared/email/utils.ts";
import type { EmailSeason, EmailTheme } from "../_shared/email/tokens.ts";

interface LeadCaptureData {
  name: string;
  email: string;
  phone: string;
  lead_source: string;
  checkpoint_id?: string | null;
  county?: string | null;
  urgency?: string | null;
  message?: string | null;
  honeypot?: string;
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
  console.log(JSON.stringify({ timestamp, level: level.toUpperCase(), message, ...context }));
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

function getCorsHeaders(allowedOrigin?: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": allowedOrigin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
    "Access-Control-Max-Age": "86400",
  };
}

function getSecurityHeaders(origin?: string): Record<string, string> {
  const baseHeaders = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy":
      "default-src 'none'; script-src 'none'; connect-src 'self'; img-src 'self'; style-src 'self'",
  };

  if (origin) {
    baseHeaders["Access-Control-Allow-Origin"] = origin;
  }

  return baseHeaders;
}

function isOriginAllowed(origin: string | null, allowlist: string): boolean {
  if (!origin) return false;
  const allowed = allowlist.split(",").map((o) => o.trim());
  return allowed.includes(origin) || allowed.includes("*");
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
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
    endpoint: "/submit-lead",
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

    if (!allowedOrigin) {
      log("warn", "Origin not allowed", { ...logContext, origin: origin || "null", status: 403 });
      return new Response(
        JSON.stringify({ error: "Origin not allowed" }),
        { status: 403, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const rateLimit = await checkRateLimit(supabase, ip, "/submit-lead", 1, 10);
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

    const payload: LeadCaptureData = await req.json();

    if (payload.honeypot) {
      log("warn", "Honeypot triggered (likely spam)", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

	    if (!payload.name?.trim() || !payload.email?.trim() || !payload.phone?.trim() || !payload.lead_source?.trim()) {
	      log("warn", "Missing required fields", { ...logContext, status: 400 });
	      return new Response(
	        JSON.stringify({ error: "Missing required fields: name, email, phone, lead_source are required" }),
	        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
	      );
	    }

	    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
	    if (turnstileSecret) {
	      const token = String(payload.turnstile_token || "").trim();
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

	    const email = payload.email.trim().toLowerCase();
	    if (!validateEmail(email)) {
	      log("warn", "Invalid email format", { ...logContext, email, status: 400 });
	      return new Response(
	        JSON.stringify({ error: "Invalid email format" }),
	        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
	      );
	    }

	    const normalizedPhone = normalizePhoneForStorage(payload.phone);
	    if (!validatePhone(normalizedPhone)) {
	      log("warn", "Invalid phone format", { ...logContext, status: 400 });
	      return new Response(
	        JSON.stringify({ error: "Invalid phone number format" }),
	        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
	      );
	    }

    const checkpointId = payload.checkpoint_id && isUuid(payload.checkpoint_id) ? payload.checkpoint_id : null;
    const referrer = req.headers.get("referer") || null;

	    const { error: dbError } = await supabase.from("leads").insert({
	      name: payload.name.trim(),
	      email,
	      phone: normalizedPhone,
	      lead_source: payload.lead_source.trim(),
	      checkpoint_id: checkpointId,
	      county: payload.county?.trim() || null,
	      urgency: payload.urgency?.trim() || null,
	      message: payload.message?.trim() || null,
      user_agent: userAgent,
      ip_address: ip,
      referrer,
    });

    if (dbError) {
      log("error", "Database insertion failed", { ...logContext, error: dbError.message, status: 500 });
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
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

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: notifyTo.length ? notifyTo : ["admin@example.com"],
            bcc: notifyBcc.length ? notifyBcc : undefined,
            reply_to: email,
	            subject: `New consultation request from ${payload.name.trim()}`,
	            html: buildAdminEmailHtml(
                "lead",
                {
                  title: "New consultation request",
                  summaryLine:
                    `${payload.name.trim()} · ${formatPhoneForDisplay(normalizedPhone)} · ${payload.lead_source.trim()}`,
                  fields: [
                    { label: "Name", value: payload.name.trim() },
                    { label: "Email", value: email },
                    { label: "Phone", value: formatPhoneForDisplay(normalizedPhone) },
                    { label: "Lead source", value: payload.lead_source.trim() },
                    { label: "Urgency", value: payload.urgency?.trim() || "Not provided" },
                    { label: "County", value: payload.county?.trim() || "Not provided" },
                    { label: "Checkpoint", value: checkpointId || "Not provided" },
                  ],
                  messageLabel: "Message",
                  message: payload.message?.trim() || null,
                  meta: [
                    { label: "Referrer", value: referrer || "Not provided" },
                    { label: "IP", value: ip },
                    { label: "UA", value: userAgent },
                  ],
                  replyToEmail: email,
                  callToPhone: normalizedPhone,
                },
                {
                  siteUrl,
                  appEnv,
                  season,
                  theme,
                  holiday,
                },
              ),
          }),
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
            to: [email],
            subject: "We received your request — Mango Law LLC",
            html: buildClientConfirmationHtml(
              "lead",
              {
                title: "We received your consultation request",
                greetingName: payload.name.trim(),
                intro:
                  "Thanks for reaching out. We received your request and will follow up as soon as possible during business hours.",
                details: [
                  { label: "Name", value: payload.name.trim() },
                  { label: "Email", value: email },
                  { label: "Phone", value: formatPhoneForDisplay(normalizedPhone) },
                  ...(payload.county?.trim()
                    ? [{ label: "County", value: payload.county.trim() }]
                    : []),
                  ...(payload.urgency?.trim()
                    ? [{ label: "Urgency", value: payload.urgency.trim() }]
                    : []),
                ],
                message: payload.message?.trim() || null,
                leadSource: payload.lead_source.trim(),
                checkpointId,
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

    const duration = Date.now() - startTime;
    log("info", "Lead submitted successfully", {
      ...logContext,
      status: 200,
      duration,
      rateLimitRemaining: rateLimit.remaining,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you. We received your request and will contact you soon.",
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
    log("error", "Unhandled exception in submit-lead", {
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
