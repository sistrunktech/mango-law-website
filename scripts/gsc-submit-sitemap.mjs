import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
dotenv.config({ path: '.env.local', override: false });

const DEFAULT_PROPERTIES = ['sc-domain:mango.law', 'https://mango.law/'];
const DEFAULT_SITEMAP_URL = 'https://mango.law/sitemap.xml';

function parseArgs(argv) {
  const options = {
    properties: [],
    output: null,
    sitemapUrl: DEFAULT_SITEMAP_URL,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--property') {
      options.properties.push(argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg === '--output') {
      options.output = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--sitemap') {
      options.sitemapUrl = argv[i + 1];
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (options.properties.length === 0) options.properties = DEFAULT_PROPERTIES;
  return options;
}

function requireEnv(name, ...fallbacks) {
  const candidates = [name, ...fallbacks];
  for (const key of candidates) {
    if (process.env[key]) return process.env[key];
  }
  throw new Error(`Missing required environment variable: ${candidates.join(' or ')}`);
}

async function fetchText(url, init) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(30_000),
  });
  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    text,
  };
}

async function getRefreshToken({ supabaseUrl, serviceRoleKey }) {
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabase
    .from('google_integrations')
    .select('refresh_token')
    .eq('integration_type', 'search_console')
    .eq('is_active', true)
    .maybeSingle();

  if (error) throw error;
  if (!data?.refresh_token) throw new Error('Active Search Console refresh token not found.');
  return data.refresh_token;
}

async function refreshAccessToken({ refreshToken, googleClientId, googleClientSecret }) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: googleClientId,
      client_secret: googleClientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    signal: AbortSignal.timeout(30_000),
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : null;
  if (!response.ok || !json?.access_token) {
    throw new Error(`Failed to refresh Google access token (${response.status}): ${text}`);
  }

  return json.access_token;
}

async function submitSitemap(accessToken, property, sitemapUrl) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const response = await fetchText(endpoint, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return {
    property,
    sitemapUrl,
    ok: response.ok,
    status: response.status,
    timestamp: new Date().toISOString(),
    body: response.text,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const supabaseUrl = requireEnv('VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL');
  const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY', 'SERVICE_ROLE_KEY');
  const googleClientId = requireEnv('GOOGLE_CLIENT_ID');
  const googleClientSecret = requireEnv('GOOGLE_CLIENT_SECRET');

  const refreshToken = await getRefreshToken({ supabaseUrl, serviceRoleKey });
  const accessToken = await refreshAccessToken({ refreshToken, googleClientId, googleClientSecret });

  const submissions = [];
  for (const property of options.properties) {
    submissions.push(await submitSitemap(accessToken, property, options.sitemapUrl));
  }

  const payload = {
    capturedAt: new Date().toISOString(),
    sitemapUrl: options.sitemapUrl,
    properties: options.properties,
    submissions,
  };

  if (options.output) {
    const outputPath = path.resolve(options.output);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  }

  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
