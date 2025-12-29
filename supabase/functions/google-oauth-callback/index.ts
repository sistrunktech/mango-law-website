import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type IntegrationType = 'business_profile' | 'analytics' | 'search_console' | 'tag_manager';

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface GBPAccount {
  name: string;
  accountName: string;
  type: string;
  state: { status: string };
}

interface GBPLocation {
  name: string;
  locationName: string;
  primaryCategory?: { displayName: string };
  address?: { formattedAddress: string };
}

async function discoverGBPLocations(accessToken: string): Promise<{ accountId: string; locationId: string } | null> {
  try {
    const accountsResponse = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!accountsResponse.ok) {
      console.error('Failed to fetch GBP accounts:', await accountsResponse.text());
      return null;
    }

    const accountsData = await accountsResponse.json();
    const accounts: GBPAccount[] = accountsData.accounts || [];

    if (accounts.length === 0) {
      console.log('No GBP accounts found');
      return null;
    }

    const account = accounts[0];
    const accountId = account.name;

    const locationsResponse = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${accountId}/locations`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!locationsResponse.ok) {
      console.error('Failed to fetch GBP locations:', await locationsResponse.text());
      return { accountId, locationId: '' };
    }

    const locationsData = await locationsResponse.json();
    const locations: GBPLocation[] = locationsData.locations || [];

    if (locations.length === 0) {
      console.log('No GBP locations found');
      return { accountId, locationId: '' };
    }

    return {
      accountId,
      locationId: locations[0].name,
    };
  } catch (error) {
    console.error('Error discovering GBP locations:', error);
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const stateParam = url.searchParams.get('state');
    const error = url.searchParams.get('error');

    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://mango.law';

    if (error) {
      console.error('OAuth error:', error);
      return Response.redirect(`${frontendUrl}/admin/connections?error=${encodeURIComponent(error)}`, 302);
    }

    if (!code || !stateParam) {
      return Response.redirect(`${frontendUrl}/admin/connections?error=missing_params`, 302);
    }

    let integrationType: IntegrationType = 'business_profile';
    try {
      const state = JSON.parse(atob(stateParam));
      integrationType = state.integrationType || 'business_profile';
    } catch (e) {
      console.error('Failed to parse state:', e);
    }

    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    // Derive from request origin to prevent cross-project/env drift.
    // Supabase edge runtime may report `http://` internally; always use `https://` for Google OAuth.
    const requestOrigin = new URL(req.url).origin;
    const origin = requestOrigin.startsWith('http://')
      ? requestOrigin.replace('http://', 'https://')
      : requestOrigin;
    const redirectUri = `${origin}/functions/v1/google-oauth-callback`;

    if (!googleClientId || !googleClientSecret) {
      throw new Error('Google OAuth credentials not configured');
    }

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return Response.redirect(`${frontendUrl}/admin/connections?error=token_exchange_failed`, 302);
    }

    const tokens: TokenResponse = await tokenResponse.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let accountId = '';
    let locationId = '';
    const metadata: Record<string, unknown> = {
      scopes: tokens.scope?.split(' ') || [],
      connectedAt: new Date().toISOString(),
    };

    if (integrationType === 'business_profile') {
      const discovery = await discoverGBPLocations(tokens.access_token);
      if (discovery) {
        accountId = discovery.accountId;
        locationId = discovery.locationId;
        metadata.discoveredAt = new Date().toISOString();
      }
    }

    const tokenExpiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

    const { data: existing, error: existingError } = await supabase
      .from('google_integrations')
      .select('id, refresh_token, account_id, location_id, metadata')
      .eq('integration_type', integrationType)
      .maybeSingle();

    if (existingError) {
      console.error('Failed to check existing integration:', existingError);
      return Response.redirect(`${frontendUrl}/admin/connections?error=db_read_failed`, 302);
    }

    if (existing) {
      const preservedMeta = (existing as any).metadata || {};
      const mergedMeta = { ...preservedMeta, ...metadata };
      const preservedRefreshToken = (existing as any).refresh_token || null;
      const preservedAccountId = (existing as any).account_id || null;
      const preservedLocationId = (existing as any).location_id || null;

      // IMPORTANT:
      // - Google does not always return a refresh_token on subsequent auth flows.
      // - For non-GBP integrations we don't want to wipe admin-selected account/resource state.
      const nextRefreshToken = tokens.refresh_token || preservedRefreshToken;
      const nextAccountId = integrationType === 'business_profile' ? (accountId || preservedAccountId) : preservedAccountId;
      const nextLocationId = integrationType === 'business_profile' ? (locationId || preservedLocationId) : preservedLocationId;

      const { error: updateError } = await supabase
        .from('google_integrations')
        .update({
          access_token: tokens.access_token,
          refresh_token: nextRefreshToken || null,
          token_expires_at: tokenExpiresAt,
          account_id: nextAccountId || null,
          location_id: nextLocationId || null,
          metadata: mergedMeta,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Failed to update integration row:', updateError);
        return Response.redirect(`${frontendUrl}/admin/connections?error=db_write_failed`, 302);
      }
    } else {
      const { error: insertError } = await supabase
        .from('google_integrations')
        .insert({
          integration_type: integrationType,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || null,
          token_expires_at: tokenExpiresAt,
          account_id: accountId || null,
          location_id: locationId || null,
          metadata,
          is_active: true,
        });

      if (insertError) {
        console.error('Failed to insert integration row:', insertError);
        return Response.redirect(`${frontendUrl}/admin/connections?error=db_write_failed`, 302);
      }
    }

    return Response.redirect(`${frontendUrl}/admin/connections?success=${integrationType}`, 302);
  } catch (error) {
    console.error('OAuth callback error:', error);
    const frontendUrl = Deno.env.get('FRONTEND_URL') || 'https://mango.law';
    return Response.redirect(`${frontendUrl}/admin/connections?error=server_error`, 302);
  }
});
