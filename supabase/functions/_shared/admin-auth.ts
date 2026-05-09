import { createClient } from "npm:@supabase/supabase-js@2";

export type SupabaseAdminClient = any;

export type AdminContext = {
  userId: string | null;
  userEmail: string;
  role: string;
};

type AdminAuthResult =
  | { ok: true; admin: AdminContext }
  | { ok: false; response: Response };

type AdminAuthOptions = {
  allowVerifiedServiceRoleJwt?: boolean;
};

export function getServiceRoleKey(): string {
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    Deno.env.get("SERVICE_ROLE_KEY") || "";
}

export function createSupabaseAdminClient(): SupabaseAdminClient {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = getServiceRoleKey();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("missing_supabase_env");
  }

  return createClient(supabaseUrl, serviceRoleKey) as SupabaseAdminClient;
}

export function getBearerToken(req: Request): string | null {
  const authHeader = req.headers.get("Authorization") ||
    req.headers.get("authorization");
  if (!authHeader) return null;

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const payload = token.split(".")[1];
  if (!payload) return null;

  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function jsonResponse(
  error: string,
  status: number,
  headers: HeadersInit,
): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

export async function requireAdmin(
  req: Request,
  supabaseAdmin: SupabaseAdminClient,
  headers: HeadersInit = {},
  options: AdminAuthOptions = {},
): Promise<AdminAuthResult> {
  const token = getBearerToken(req);
  if (!token) {
    return {
      ok: false,
      response: jsonResponse("missing_authorization", 401, headers),
    };
  }

  if (token === getServiceRoleKey()) {
    return {
      ok: true,
      admin: {
        userId: null,
        userEmail: "service_role",
        role: "service_role",
      },
    };
  }

  const payload = decodeJwtPayload(token);
  if (options.allowVerifiedServiceRoleJwt && payload?.role === "service_role") {
    return {
      ok: true,
      admin: {
        userId: null,
        userEmail: "service_role",
        role: "service_role",
      },
    };
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(
    token,
  );
  const user = authData?.user;
  if (authError || !user?.email) {
    return {
      ok: false,
      response: jsonResponse("invalid_session", 401, headers),
    };
  }

  const { data: adminUser, error: adminError } = await supabaseAdmin
    .from("admin_users")
    .select("email, role, is_active")
    .eq("email", user.email)
    .eq("is_active", true)
    .maybeSingle();

  if (adminError) {
    console.error("Failed to verify admin user:", adminError);
    return {
      ok: false,
      response: jsonResponse("admin_check_failed", 500, headers),
    };
  }

  if (!adminUser) {
    return { ok: false, response: jsonResponse("forbidden", 403, headers) };
  }

  return {
    ok: true,
    admin: {
      userId: user.id,
      userEmail: user.email,
      role: adminUser.role,
    },
  };
}
