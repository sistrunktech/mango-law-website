import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseEmailList(value: string | undefined | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function formatFrom(fromEmail: string): string {
  if (fromEmail.includes("<") && fromEmail.includes(">")) return fromEmail;
  return `Mango Law LLC <${fromEmail}>`;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
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

function buildAdminEmailHtml(args: {
  name: string;
  email: string;
  phone: string;
  leadSource: string;
  urgency?: string | null;
  county?: string | null;
  message?: string | null;
  checkpointId?: string | null;
  ip: string;
  userAgent: string;
  referrer?: string | null;
}): string {
  const safeName = escapeHtml(args.name);
  const safeEmail = escapeHtml(args.email);
  const safePhone = escapeHtml(args.phone);
  const safeLeadSource = escapeHtml(args.leadSource);
  const safeUrgency = escapeHtml(args.urgency || "Not provided");
  const safeCounty = escapeHtml(args.county || "Not provided");
  const safeCheckpointId = escapeHtml(args.checkpointId || "Not provided");
  const safeReferrer = escapeHtml(args.referrer || "Not provided");
  const safeIp = escapeHtml(args.ip);
  const safeUa = escapeHtml(args.userAgent);
  const safeMessage = escapeHtml(args.message || "").replace(/\n/g, "<br>");

  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#F9F7F4; padding:24px;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #eee; border-radius:16px; overflow:hidden;">
        <div style="padding:18px 22px; background:linear-gradient(135deg,#0F6E63 0%,#F4A300 100%); color:#0A0A0A;">
          <div style="font-weight:800; letter-spacing:0.02em;">Mango Law LLC</div>
          <div style="font-size:14px; opacity:0.9;">New consultation request</div>
        </div>
        <div style="padding:22px;">
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">Name</td><td style="padding:8px 0; color:#111;">${safeName}</td></tr>
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">Email</td><td style="padding:8px 0; color:#111;"><a href="mailto:${safeEmail}" style="color:#0F6E63; font-weight:700; text-decoration:none;">${safeEmail}</a></td></tr>
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">Phone</td><td style="padding:8px 0; color:#111;">${safePhone}</td></tr>
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">Lead source</td><td style="padding:8px 0; color:#111;">${safeLeadSource}</td></tr>
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">Urgency</td><td style="padding:8px 0; color:#111;">${safeUrgency}</td></tr>
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">County</td><td style="padding:8px 0; color:#111;">${safeCounty}</td></tr>
            <tr><td style="padding:8px 0; width:140px; color:#555; font-weight:700;">Checkpoint</td><td style="padding:8px 0; color:#111;">${safeCheckpointId}</td></tr>
          </table>
          ${safeMessage ? `
            <div style="margin-top:16px; padding-top:16px; border-top:1px solid #eee;">
              <div style="font-weight:800; margin-bottom:8px;">Message</div>
              <div style="font-size:14px; line-height:1.5; color:#111;">${safeMessage}</div>
            </div>
          ` : ""}
          <div style="margin-top:18px; padding-top:12px; border-top:1px solid #f0f0f0; font-size:12px; color:#666;">
            Referrer: ${safeReferrer}<br>
            IP: ${safeIp}<br>
            UA: ${safeUa}
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildLeadConfirmationHtml(args: { name: string }): string {
  const safeName = escapeHtml(args.name);
  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background:#F9F7F4; padding:24px;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #eee; border-radius:16px; overflow:hidden;">
        <div style="padding:18px 22px; background:linear-gradient(135deg,#0F6E63 0%,#F4A300 100%); color:#0A0A0A;">
          <div style="font-weight:800; letter-spacing:0.02em;">Mango Law LLC</div>
          <div style="font-size:14px; opacity:0.9;">We received your request</div>
        </div>
        <div style="padding:22px; color:#111;">
          <p style="margin:0 0 12px;">Hi ${safeName},</p>
          <p style="margin:0 0 12px; line-height:1.5;">
            Thanks for reaching out. We received your consultation request and will respond as soon as possible.
          </p>
          <div style="margin:16px 0; padding:14px 16px; border:1px solid #eee; border-radius:12px; background:#fff;">
            <div style="font-weight:800; margin-bottom:6px;">Need a quicker response?</div>
            <div style="font-size:14px; line-height:1.6;">
              Call/Text: <a href="tel:7404176191" style="color:#0F6E63; font-weight:800; text-decoration:none;">(740) 417-6191</a><br>
              Email: <a href="mailto:office@mango.law" style="color:#0F6E63; font-weight:800; text-decoration:none;">office@mango.law</a>
            </div>
          </div>
          <p style="margin:0; font-size:12px; color:#666; line-height:1.5;">
            This email confirms receipt only. No attorney-client relationship is formed until a written engagement agreement is signed.
          </p>
        </div>
      </div>
    </div>
  `;
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

    const email = payload.email.trim().toLowerCase();
    if (!validateEmail(email)) {
      log("warn", "Invalid email format", { ...logContext, email, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    if (!validatePhone(payload.phone)) {
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
      phone: payload.phone.trim(),
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
            html: buildAdminEmailHtml({
              name: payload.name.trim(),
              email,
              phone: payload.phone.trim(),
              leadSource: payload.lead_source.trim(),
              urgency: payload.urgency?.trim() || null,
              county: payload.county?.trim() || null,
              message: payload.message?.trim() || null,
              checkpointId,
              ip,
              userAgent,
              referrer,
            }),
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
            html: buildLeadConfirmationHtml({ name: payload.name.trim() }),
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

