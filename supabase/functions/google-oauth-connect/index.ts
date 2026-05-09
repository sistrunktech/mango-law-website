import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import {
  createSupabaseAdminClient,
  requireAdmin,
} from "../_shared/admin-auth.ts";

function getCorsHeaders(allowedOrigin?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Client-Info, Apikey",
    "Access-Control-Max-Age": "86400",
  };

  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
  }

  return headers;
}

type IntegrationType =
  | "business_profile"
  | "analytics"
  | "search_console"
  | "tag_manager";

const INTEGRATION_TYPES: IntegrationType[] = [
  "business_profile",
  "analytics",
  "search_console",
  "tag_manager",
];

const SCOPES: Record<IntegrationType, string[]> = {
  business_profile: [
    "https://www.googleapis.com/auth/business.manage",
  ],
  analytics: [
    "https://www.googleapis.com/auth/analytics.readonly",
  ],
  search_console: [
    // Write-capable scope is needed for sitemap submission/remediation actions.
    "https://www.googleapis.com/auth/webmasters",
  ],
  tag_manager: [
    "https://www.googleapis.com/auth/tagmanager.readonly",
  ],
};

function getOriginAllowlist(): string {
  return Deno.env.get("ORIGIN_ALLOWLIST") ||
    "https://mango.law,https://www.mango.law";
}

function isOriginAllowed(origin: string | null, allowlist: string): boolean {
  if (!origin) return false;
  if (Deno.env.get("ALLOW_ANY_ORIGIN") === "true") return true;

  const allowed = allowlist.split(",").map((o) => o.trim()).filter(Boolean);
  return allowed.includes(origin) || allowed.includes("*");
}

function getRedirectOrigin(req: Request): string {
  const configured = Deno.env.get("OAUTH_FUNCTION_ORIGIN");
  if (configured) return configured.replace(/\/$/, "");

  const requestOrigin = new URL(req.url).origin;
  return requestOrigin.startsWith("http://")
    ? requestOrigin.replace("http://", "https://")
    : requestOrigin;
}

function isIntegrationType(value: unknown): value is IntegrationType {
  return typeof value === "string" &&
    INTEGRATION_TYPES.includes(value as IntegrationType);
}

function base64UrlEncode(value: string): string {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(
    /=+$/g,
    "",
  );
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function createNonce(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const allowedOrigin = isOriginAllowed(origin, getOriginAllowlist())
    ? origin ?? undefined
    : undefined;
  const corsHeaders = getCorsHeaders(allowedOrigin);

  if (!allowedOrigin) {
    return new Response(JSON.stringify({ error: "origin_not_allowed" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseAdmin = createSupabaseAdminClient();
    const auth = await requireAdmin(req, supabaseAdmin, corsHeaders);
    if (!auth.ok) {
      return auth.response;
    }

    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    if (!googleClientId) {
      throw new Error("Google Client ID not configured");
    }

    const body = await req.json().catch(() => ({}));
    const integrationType = body?.integrationType;
    if (!isIntegrationType(integrationType)) {
      return new Response(
        JSON.stringify({ error: "invalid_integration_type" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const nonce = createNonce();
    const nonceHash = await sha256Hex(nonce);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: stateError } = await supabaseAdmin.from(
      "google_oauth_states",
    ).insert({
      nonce_hash: nonceHash,
      integration_type: integrationType,
      requested_by_user_id: auth.admin.userId,
      requested_by_email: auth.admin.userEmail,
      expires_at: expiresAt,
    });

    if (stateError) {
      console.error("Failed to store OAuth state:", stateError);
      return new Response(JSON.stringify({ error: "state_store_failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const redirectUri = `${
      getRedirectOrigin(req)
    }/functions/v1/google-oauth-callback`;
    const scopes = SCOPES[integrationType];
    const state = base64UrlEncode(
      JSON.stringify({ integrationType, nonce, timestamp: Date.now() }),
    );

    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", googleClientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", scopes.join(" "));
    authUrl.searchParams.set("access_type", "offline");
    authUrl.searchParams.set("prompt", "consent select_account");
    authUrl.searchParams.set("include_granted_scopes", "true");
    authUrl.searchParams.set("state", state);

    return new Response(
      JSON.stringify({
        authUrl: authUrl.toString(),
        redirectUri,
        integrationType,
        scopes,
        expiresAt,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error generating OAuth URL:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error
          ? error.message
          : "Failed to generate OAuth URL",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      },
    );
  }
});
