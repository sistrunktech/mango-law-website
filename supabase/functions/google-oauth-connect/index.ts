import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type IntegrationType = 'business_profile' | 'analytics' | 'search_console' | 'tag_manager';

const SCOPES: Record<IntegrationType, string[]> = {
  business_profile: [
    'https://www.googleapis.com/auth/business.manage',
  ],
  analytics: [
    'https://www.googleapis.com/auth/analytics.readonly',
  ],
  search_console: [
    'https://www.googleapis.com/auth/webmasters.readonly',
  ],
  tag_manager: [
    'https://www.googleapis.com/auth/tagmanager.readonly',
  ],
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const redirectUri = Deno.env.get("GOOGLE_REDIRECT_URI") || 
      `${Deno.env.get("SUPABASE_URL")}/functions/v1/google-oauth-callback`;

    if (!googleClientId) {
      throw new Error("Google Client ID not configured");
    }

    const { integrationType = 'business_profile' } = await req.json() as { integrationType?: IntegrationType };

    if (!SCOPES[integrationType]) {
      throw new Error(`Invalid integration type: ${integrationType}`);
    }

    const scopes = SCOPES[integrationType];
    const state = JSON.stringify({ integrationType, timestamp: Date.now() });
    const encodedState = btoa(state);

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', googleClientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', scopes.join(' '));
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    authUrl.searchParams.set('state', encodedState);

    return new Response(
      JSON.stringify({
        authUrl: authUrl.toString(),
        integrationType,
        scopes,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error generating OAuth URL:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to generate OAuth URL" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
