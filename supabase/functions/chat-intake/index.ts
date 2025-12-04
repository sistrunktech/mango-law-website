import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.48.0";

interface ChatIntakeData {
  name: string;
  email: string;
  phone?: string;
  initial_message: string;
  conversation_context?: string;
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
    const supabaseServiceKey = Deno.env.get("SERVICE_ROLE_KEY")!;
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

    if (!validateEmail(intakeData.email)) {
      log("warn", "Invalid email format", { ...logContext, email: intakeData.email, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    if (intakeData.phone && !validatePhone(intakeData.phone)) {
      log("warn", "Invalid phone format", { ...logContext, status: 400 });
      return new Response(
        JSON.stringify({ error: "Invalid phone number format" }),
        { status: 400, headers: { ...allHeaders, "Content-Type": "application/json" } },
      );
    }

    const { error: dbError } = await supabase.from("chat_leads").insert({
      name: intakeData.name.trim(),
      email: intakeData.email.trim().toLowerCase(),
      phone: intakeData.phone?.trim() || null,
      initial_message: intakeData.initial_message.trim(),
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
    const fromEmail = Deno.env.get("FROM_EMAIL") || "noreply@example.com";
    const chatNotifyTo = Deno.env.get("CHAT_LEAD_NOTIFY_TO") || Deno.env.get("CONTACT_NOTIFY_TO") || "admin@example.com";
    const sourceLabel = Deno.env.get("CHAT_LEAD_SOURCE_LABEL") || "Chat Widget";

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
            to: [chatNotifyTo],
            subject: `New ${sourceLabel} Lead from ${intakeData.name}`,
            html: `
              <h2>New ${sourceLabel} Lead</h2>
              <p><strong>Name:</strong> ${intakeData.name}</p>
              <p><strong>Email:</strong> ${intakeData.email}</p>
              <p><strong>Phone:</strong> ${intakeData.phone || "Not provided"}</p>
              <p><strong>Initial Message:</strong></p>
              <p>${intakeData.initial_message.replace(/\n/g, "<br>")}</p>
              ${intakeData.conversation_context ? `
              <p><strong>Conversation Context:</strong></p>
              <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${intakeData.conversation_context}</pre>
              ` : ""}
              <hr>
              <p><small>IP: ${ip} | User Agent: ${userAgent}</small></p>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          log("error", "Email notification failed", { ...logContext, error: errorText });
        } else {
          log("info", "Email notification sent successfully", logContext);
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
