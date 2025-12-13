import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type IntegrationType = "business_profile" | "analytics" | "search_console" | "tag_manager";

interface GoogleIntegrationRow {
  id: string;
  integration_type: IntegrationType;
  is_active: boolean;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  account_id: string | null;
  location_id: string | null;
  metadata: Record<string, unknown> | null;
}

function getBearerToken(req: Request): string | null {
  const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

async function logAdminActivity(params: {
  supabaseAdmin: ReturnType<typeof createClient>;
  userEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  changes?: Record<string, unknown>;
  req: Request;
}) {
  const ipAddress =
    params.req.headers.get("cf-connecting-ip") ||
    params.req.headers.get("x-forwarded-for") ||
    params.req.headers.get("x-real-ip") ||
    null;

  const userAgent = params.req.headers.get("user-agent") || null;

  await params.supabaseAdmin.from("admin_activity_log").insert({
    user_email: params.userEmail,
    action: params.action,
    resource_type: params.resourceType,
    resource_id: params.resourceId || null,
    changes: params.changes || null,
    ip_address: ipAddress,
    user_agent: userAgent,
  });
}

async function safeLogAdminActivity(args: Parameters<typeof logAdminActivity>[0]) {
  try {
    await logAdminActivity(args);
  } catch (e) {
    console.warn("Failed to write admin_activity_log:", e);
  }
}

async function refreshAccessToken(
  supabaseAdmin: ReturnType<typeof createClient>,
  integration: GoogleIntegrationRow,
  clientId: string,
  clientSecret: string
): Promise<string> {
  if (!integration.access_token) throw new Error("missing_access_token");
  if (!integration.refresh_token) throw new Error("missing_refresh_token");

  const tokenExpiresAt = integration.token_expires_at ? new Date(integration.token_expires_at) : null;
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

  if (tokenExpiresAt && tokenExpiresAt > fiveMinutesFromNow) {
    return integration.access_token;
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: integration.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error(`token_refresh_failed:${await tokenResponse.text()}`);
  }

  const { access_token, expires_in } = await tokenResponse.json();
  const newExpiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

  await supabaseAdmin
    .from("google_integrations")
    .update({
      access_token,
      token_expires_at: newExpiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", integration.id);

  return access_token;
}

async function fetchJson(url: string, accessToken: string) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: res.ok, status: res.status, json, text };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const checkedAt = new Date().toISOString();

  try {
    const token = getBearerToken(req);
    if (!token) {
      return new Response(JSON.stringify({ error: "missing_authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const googleClientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");

    if (!supabaseUrl || !serviceRoleKey) throw new Error("missing_supabase_env");
    if (!googleClientId || !googleClientSecret) throw new Error("missing_google_oauth_env");

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !authData?.user?.email) {
      return new Response(JSON.stringify({ error: "invalid_session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userEmail = authData.user.email;

    const { data: adminUser } = await supabaseAdmin
      .from("admin_users")
      .select("email, role, is_active")
      .eq("email", userEmail)
      .eq("is_active", true)
      .maybeSingle();

    if (!adminUser) {
      return new Response(JSON.stringify({ error: "forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const integrationType =
      (body?.integrationType as IntegrationType | undefined) ||
      (new URL(req.url).searchParams.get("integrationType") as IntegrationType | null) ||
      null;

    if (!integrationType || !["business_profile", "analytics", "search_console", "tag_manager"].includes(integrationType)) {
      return new Response(JSON.stringify({ error: "invalid_integration_type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: integration, error: integrationError } = await supabaseAdmin
      .from("google_integrations")
      .select("id, integration_type, is_active, access_token, refresh_token, token_expires_at, account_id, location_id, metadata")
      .eq("integration_type", integrationType)
      .eq("is_active", true)
      .maybeSingle();

    if (integrationError || !integration) {
      await safeLogAdminActivity({
        supabaseAdmin,
        userEmail,
        action: "connections.check_access",
        resourceType: "google_integration",
        resourceId: integrationType,
        changes: { checkedAt, ok: false, error: "not_connected" },
        req,
      });
      return new Response(JSON.stringify({ error: "not_connected" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let accessToken: string;
    try {
      accessToken = await refreshAccessToken(supabaseAdmin, integration as GoogleIntegrationRow, googleClientId, googleClientSecret);
    } catch (e) {
      const message = e instanceof Error ? e.message : "token_error";
      await safeLogAdminActivity({
        supabaseAdmin,
        userEmail,
        action: "connections.check_access",
        resourceType: "google_integration",
        resourceId: integrationType,
        changes: { checkedAt, ok: false, error: message },
        req,
      });
      return new Response(JSON.stringify({ error: message }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result: Record<string, unknown> = { integrationType, checkedAt };

    if (integrationType === "business_profile") {
      const accounts = await fetchJson("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", accessToken);
      let firstAccountName: string | null = null;
      const accountList = Array.isArray(accounts.json?.accounts) ? accounts.json.accounts.slice(0, 10) : [];
      if (accountList.length > 0) firstAccountName = accountList[0]?.name || null;

      const locations = firstAccountName
        ? await fetchJson(`https://mybusinessbusinessinformation.googleapis.com/v1/${firstAccountName}/locations`, accessToken)
        : { ok: false, status: 0, json: null, text: "no_accounts" };

      const locationList = Array.isArray(locations.json?.locations) ? locations.json.locations.slice(0, 10) : [];

      result = {
        ...result,
        accounts: {
          ok: accounts.ok,
          status: accounts.status,
          count: Array.isArray(accounts.json?.accounts) ? accounts.json.accounts.length : 0,
          sample: accountList,
        },
        locations: {
          ok: locations.ok,
          status: locations.status,
          count: Array.isArray(locations.json?.locations) ? locations.json.locations.length : 0,
          sample: locationList,
        },
      };
    } else if (integrationType === "analytics") {
      const accounts = await fetchJson("https://analyticsadmin.googleapis.com/v1beta/accounts", accessToken);
      const accountList = Array.isArray(accounts.json?.accounts) ? accounts.json.accounts.slice(0, 10) : [];
      const firstAccount = accountList[0]?.name || null;

      const properties = firstAccount
        ? await fetchJson(`https://analyticsadmin.googleapis.com/v1beta/properties?filter=parent:${encodeURIComponent(firstAccount)}`, accessToken)
        : { ok: false, status: 0, json: null, text: "no_accounts" };

      const propertyList = Array.isArray(properties.json?.properties) ? properties.json.properties.slice(0, 10) : [];

      result = {
        ...result,
        accounts: {
          ok: accounts.ok,
          status: accounts.status,
          count: Array.isArray(accounts.json?.accounts) ? accounts.json.accounts.length : 0,
          sample: accountList,
        },
        properties: {
          ok: properties.ok,
          status: properties.status,
          count: Array.isArray(properties.json?.properties) ? properties.json.properties.length : 0,
          sample: propertyList,
        },
      };
    } else if (integrationType === "search_console") {
      const sites = await fetchJson("https://www.googleapis.com/webmasters/v3/sites", accessToken);
      const siteList = Array.isArray(sites.json?.siteEntry) ? sites.json.siteEntry.slice(0, 20) : [];
      const hasDomainProperty = siteList.some((s: any) => s.siteUrl === "sc-domain:mango.law");

      result = {
        ...result,
        sites: {
          ok: sites.ok,
          status: sites.status,
          count: Array.isArray(sites.json?.siteEntry) ? sites.json.siteEntry.length : 0,
          hasDomainProperty,
          sample: siteList,
        },
      };
    } else if (integrationType === "tag_manager") {
      const accounts = await fetchJson("https://www.googleapis.com/tagmanager/v2/accounts", accessToken);
      const accountList = Array.isArray(accounts.json?.account) ? accounts.json.account.slice(0, 10) : [];
      const firstAccountId = accountList[0]?.accountId || null;

      const containers = firstAccountId
        ? await fetchJson(`https://www.googleapis.com/tagmanager/v2/accounts/${firstAccountId}/containers`, accessToken)
        : { ok: false, status: 0, json: null, text: "no_accounts" };

      const containerList = Array.isArray(containers.json?.container) ? containers.json.container.slice(0, 20) : [];

      result = {
        ...result,
        accounts: {
          ok: accounts.ok,
          status: accounts.status,
          count: Array.isArray(accounts.json?.account) ? accounts.json.account.length : 0,
          sample: accountList,
        },
        containers: {
          ok: containers.ok,
          status: containers.status,
          count: Array.isArray(containers.json?.container) ? containers.json.container.length : 0,
          sample: containerList,
        },
      };
    }

    await safeLogAdminActivity({
      supabaseAdmin,
      userEmail,
      action: "connections.check_access",
      resourceType: "google_integration",
      resourceId: integrationType,
      changes: { checkedAt, ok: true },
      req,
    });

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("google-access-check error:", error);
    return new Response(JSON.stringify({ error: error?.message || "server_error", checkedAt }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
