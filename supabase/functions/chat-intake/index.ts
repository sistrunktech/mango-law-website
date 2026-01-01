import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";
import { buildAdminEmailHtml, buildClientConfirmationHtml } from "../_shared/email/templates.ts";
import { formatFrom, formatPhoneForDisplay, formatTimestampForEmail, isTruthyEnv, normalizePhoneForStorage, parseEmailList } from "../_shared/email/utils.ts";
import type { EmailSeason, EmailTheme } from "../_shared/email/tokens.ts";

interface ChatIntakeData {
  name: string;
  email: string;
  phone?: string;
  initial_message: string;
  case_type?: string | null;
  county?: string | null;
  urgency?: string | null;
  how_found?: string | null;
  how_found_detail?: string | null;
  conversation_context?: string;
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
    endpoint: "/chat-intake",
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

    const rateLimit = await checkRateLimit(supabase, ip, "/chat-intake", 1, 20);
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
            "X-RateLimit-Limit": "20",
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

    const intakeData: ChatIntakeData = await req.json();

    if (intakeData.honeypot) {
      log("warn", "Honeypot triggered (likely spam)", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!intakeData.name?.trim() || !intakeData.email?.trim() || !intakeData.initial_message?.trim()) {
      log("warn", "Missing required fields", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and initial_message are required" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      const token = String(intakeData.turnstile_token || "").trim();
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

    if (!validateEmail(intakeData.email)) {
      log("warn", "Invalid email format", { ...logContext, email: intakeData.email, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const normalizedPhone = intakeData.phone ? normalizePhoneForStorage(intakeData.phone) : null;
    if (normalizedPhone && !validatePhone(normalizedPhone)) {
      log("warn", "Invalid phone format", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid phone number format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const { error: dbError } = await supabase.from("chat_leads").insert({
      name: intakeData.name.trim(),
      email: intakeData.email.trim().toLowerCase(),
      phone: normalizedPhone,
      initial_message: intakeData.initial_message.trim(),
      case_type: intakeData.case_type?.trim() || null,
      county: intakeData.county?.trim() || null,
      urgency: intakeData.urgency?.trim() || null,
      how_found: intakeData.how_found?.trim() || null,
      how_found_detail: intakeData.how_found_detail?.trim() || null,
      conversation_context: intakeData.conversation_context || null,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (dbError) {
      log("error", "Database insertion failed", { ...logContext, error: dbError.message, status: 500 });
      return new Response(
        JSON.stringify({ error: "Failed to save chat information" }),
        { status: 500, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = formatFrom(Deno.env.get("FROM_EMAIL") || "noreply@example.com");
    const chatNotifyTo = parseEmailList(Deno.env.get("CHAT_LEAD_NOTIFY_TO") || Deno.env.get("CONTACT_NOTIFY_TO")) ||
      ["admin@example.com"];
    const chatNotifyBcc = parseEmailList(Deno.env.get("CHAT_LEAD_NOTIFY_BCC") || Deno.env.get("CHAT_LEAD_NOTIFY_CC"));
    const sourceLabel = Deno.env.get("CHAT_LEAD_SOURCE_LABEL") || "Chat Widget";
    const enableSmsAlerts = Deno.env.get("ENABLE_SMS_LEAD_ALERTS") === "true";
    const smsGatewayOffice = Deno.env.get("SMS_GATEWAY_OFFICE");
    const smsGatewayNick = Deno.env.get("SMS_GATEWAY_NICK");
    const smsGatewayTest = Deno.env.get("SMS_GATEWAY_TEST");

    if (resendApiKey) {
      try {
        const siteUrl =
          Deno.env.get("FRONTEND_URL") ||
          Deno.env.get("NEXT_PUBLIC_SITE_URL") ||
          Deno.env.get("VITE_SITE_URL") ||
          "https://mango.law";
        const appEnv = Deno.env.get("APP_ENV") || "production";
        const season = (Deno.env.get("APP_SEASON") || "winter") as EmailSeason;
        const theme = (Deno.env.get("APP_THEME") || "light") as EmailTheme;
        const holiday = isTruthyEnv(Deno.env.get("APP_HOLIDAY"));

        const receivedAt = formatTimestampForEmail(new Date());
        // Send standard email notification
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: chatNotifyTo.length ? chatNotifyTo : ["admin@example.com"],
            bcc: chatNotifyBcc.length ? chatNotifyBcc : undefined,
            reply_to: intakeData.email.trim().toLowerCase(),
            subject: `New ${sourceLabel} Lead — ${intakeData.name}`,
            html: buildAdminEmailHtml(
              "chat",
              {
                title: `New ${sourceLabel} lead`,
                summaryLine:
                  `${intakeData.name.trim()} · ${normalizedPhone ? formatPhoneForDisplay(normalizedPhone) : "No phone"}`,
                fields: [
                  { label: "Name", value: intakeData.name.trim() },
                  { label: "Email", value: intakeData.email.trim().toLowerCase() },
                  { label: "Phone", value: normalizedPhone ? formatPhoneForDisplay(normalizedPhone) : "Not provided" },
                  { label: "Help needed", value: intakeData.case_type?.trim() || "Not provided" },
                  { label: "Urgency", value: intakeData.urgency?.trim() || "Not provided" },
                  { label: "County", value: intakeData.county?.trim() || "Not provided" },
                  { label: "How found", value: intakeData.how_found?.trim() || "Not provided" },
                  { label: "How found detail", value: intakeData.how_found_detail?.trim() || "Not provided" },
                ],
                messageLabel: "Initial message",
                message: intakeData.initial_message.trim(),
                transcriptLabel: "Conversation context",
                transcript: intakeData.conversation_context || null,
                meta: [
                  { label: "Received", value: receivedAt },
                  { label: "IP", value: ip },
                  { label: "UA", value: userAgent },
                ],
                replyToEmail: intakeData.email.trim().toLowerCase(),
                callToPhone: normalizedPhone,
              },
              { siteUrl, appEnv, season, theme, holiday },
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
            to: [intakeData.email.trim().toLowerCase()],
            subject: "We received your message — Mango Law LLC",
            html: buildClientConfirmationHtml(
              "chat",
              {
                title: "We received your message",
                greetingName: intakeData.name.trim(),
                intro:
                  "Thanks for reaching out. We received your message and will respond as soon as possible during business hours.",
                details: [
                  { label: "Received", value: receivedAt },
                  { label: "Name", value: intakeData.name.trim() },
                  { label: "Email", value: intakeData.email.trim().toLowerCase() },
                  ...(normalizedPhone ? [{ label: "Phone", value: formatPhoneForDisplay(normalizedPhone) }] : []),
                  ...(intakeData.case_type?.trim() ? [{ label: "Help needed", value: intakeData.case_type.trim() }] : []),
                  ...(intakeData.county?.trim() ? [{ label: "County", value: intakeData.county.trim() }] : []),
                  ...(intakeData.urgency?.trim() ? [{ label: "Urgency", value: intakeData.urgency.trim() }] : []),
                ],
                message: intakeData.initial_message.trim(),
                leadSource: "chat",
                caseType: intakeData.case_type?.trim() || null,
                urgency: intakeData.urgency?.trim() || null,
                county: intakeData.county?.trim() || null,
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

        // Send SMS-style notifications via email-to-SMS gateways
        if (enableSmsAlerts) {
          const smsGateways = [smsGatewayOffice, smsGatewayNick, smsGatewayTest].filter(Boolean);

          if (smsGateways.length > 0) {
            // Truncate message to 100 chars for SMS compatibility (total ~160 char limit)
            const truncatedMsg = intakeData.initial_message.length > 100
              ? intakeData.initial_message.substring(0, 100) + "..."
              : intakeData.initial_message;

            const smsBody = `New Mango Law Lead:\nName: ${intakeData.name}\nPhone: ${intakeData.phone || "N/A"}\nMsg: ${truncatedMsg}`;

            try {
              const smsResponse = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${resendApiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: fromEmail,
                  to: smsGateways,
                  subject: "",
                  text: smsBody,
                }),
              });

              if (!smsResponse.ok) {
                const smsErrorText = await smsResponse.text();
                log("error", "SMS gateway notification failed", { ...logContext, error: smsErrorText });
              } else {
                log("info", "SMS gateway notifications sent successfully", { ...logContext, gateways: smsGateways.length });
              }
            } catch (smsError) {
              log("error", "SMS gateway sending exception", {
                ...logContext,
                error: smsError instanceof Error ? smsError.message : String(smsError),
              });
            }
          }
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
    log("info", "Chat intake submitted successfully", {
      ...logContext,
      status: 200,
      duration,
      rateLimitRemaining: rateLimit.remaining,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you! We have received your information and will reach out soon.",
      }),
      {
        status: 200,
        headers: {
          ...allHeaders,
          "Content-Type": "application/json",
          "X-RateLimit-Limit": "20",
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      },
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);
    log("error", "Unhandled exception in chat-intake", {
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
