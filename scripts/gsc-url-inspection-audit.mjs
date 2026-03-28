import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
dotenv.config({ path: ".env.local", override: false });

const DEFAULT_URLS = [
  "https://mango.law/ovi-dui-defense-delaware-oh",
  "https://mango.law/resources/dui-checkpoints",
  "https://mango.law/first-offense-ovi-ohio",
  "https://mango.law/ovi-test-refusal-lawyer-ohio",
  "https://mango.law/als-license-suspension-ohio",
  "https://mango.law/motion-to-suppress-ovi-ohio",
  "https://mango.law/blog/ohio-ovi-driving-privileges-als",
  "https://mango.law/blog/drug-possession-charge-ohio-what-to-do-next",
];

const DEFAULT_PROPERTIES = ["sc-domain:mango.law", "https://mango.law/"];
const DEFAULT_SITEMAP_URL = "https://mango.law/sitemap.xml";

function parseArgs(argv) {
  const options = {
    urls: [],
    properties: [],
    output: null,
    sitemapUrl: DEFAULT_SITEMAP_URL,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--url") {
      options.urls.push(argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg === "--property") {
      options.properties.push(argv[i + 1]);
      i += 1;
      continue;
    }
    if (arg === "--output") {
      options.output = argv[i + 1];
      i += 1;
      continue;
    }
    if (arg === "--sitemap") {
      options.sitemapUrl = argv[i + 1];
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (options.urls.length === 0) options.urls = DEFAULT_URLS;
  if (options.properties.length === 0) options.properties = DEFAULT_PROPERTIES;
  return options;
}

async function fetchJson(url, init) {
  const response = await fetch(url, {
    ...init,
    signal: AbortSignal.timeout(30_000),
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return {
    ok: response.ok,
    status: response.status,
    text,
    json,
  };
}

function requireEnv(name, ...fallbacks) {
  const candidates = [name, ...fallbacks];
  for (const key of candidates) {
    if (process.env[key]) return process.env[key];
  }
  throw new Error(`Missing required environment variable: ${candidates.join(" or ")}`);
}

async function getRefreshToken({ supabaseUrl, serviceRoleKey }) {
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabase
    .from("google_integrations")
    .select("refresh_token")
    .eq("integration_type", "search_console")
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data?.refresh_token) throw new Error("Active Search Console refresh token not found.");
  return data.refresh_token;
}

async function refreshAccessToken({ refreshToken, googleClientId, googleClientSecret }) {
  const response = await fetchJson("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: googleClientId,
      client_secret: googleClientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok || !response.json?.access_token) {
    throw new Error(`Failed to refresh Google access token (${response.status}): ${response.text}`);
  }

  return response.json.access_token;
}

async function getSitemap(accessToken, property, sitemapUrl) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const response = await fetchJson(endpoint, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return {
    property,
    ok: response.ok,
    status: response.status,
    timestamp: new Date().toISOString(),
    raw: response.json ?? response.text,
  };
}

async function inspectUrl(accessToken, property, inspectionUrl) {
  const response = await fetchJson("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inspectionUrl,
      siteUrl: property,
      languageCode: "en-US",
    }),
  });

  const result = response.json?.inspectionResult?.indexStatusResult ?? {};
  return {
    property,
    inspectedUrl: inspectionUrl,
    ok: response.ok,
    status: response.status,
    timestamp: new Date().toISOString(),
    coverageState: result.coverageState ?? null,
    indexingState: result.indexingState ?? null,
    pageFetchState: result.pageFetchState ?? null,
    robotsTxtState: result.robotsTxtState ?? null,
    lastCrawlTime: result.lastCrawlTime ?? null,
    referringUrls: result.referringUrls ?? [],
    sitemap: result.sitemap ?? [],
    googleCanonical: result.googleCanonical ?? null,
    userCanonical: result.userCanonical ?? null,
    inspectionResultLink: response.json?.inspectionResult?.inspectionResultLink ?? null,
    error: response.json?.error ?? null,
  };
}

function summarizeInspections(inspections) {
  return inspections.reduce((acc, row) => {
    const propertySummary = (acc[row.property] ??= {});
    const key = row.coverageState ?? `ERROR:${row.status}`;
    propertySummary[key] = (propertySummary[key] ?? 0) + 1;
    return acc;
  }, {});
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const supabaseUrl = requireEnv("VITE_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY", "SERVICE_ROLE_KEY");
  const googleClientId = requireEnv("GOOGLE_CLIENT_ID");
  const googleClientSecret = requireEnv("GOOGLE_CLIENT_SECRET");

  const refreshToken = await getRefreshToken({ supabaseUrl, serviceRoleKey });
  const accessToken = await refreshAccessToken({ refreshToken, googleClientId, googleClientSecret });

  const sitemap = [];
  for (const property of options.properties) {
    sitemap.push(await getSitemap(accessToken, property, options.sitemapUrl));
  }

  const inspections = [];
  for (const property of options.properties) {
    for (const url of options.urls) {
      inspections.push(await inspectUrl(accessToken, property, url));
    }
  }

  const payload = {
    capturedAt: new Date().toISOString(),
    sitemapUrl: options.sitemapUrl,
    properties: options.properties,
    urls: options.urls,
    summary: summarizeInspections(inspections),
    sitemap,
    inspections,
  };

  if (options.output) {
    const outputPath = path.resolve(options.output);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(payload, null, 2));
  }

  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
