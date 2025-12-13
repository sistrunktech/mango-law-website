import { createClient } from '@supabase/supabase-js';

// Treat all live site domains as "prod" so we don't accidentally hit a stale Supabase project via env drift.
// NOTE: Some hosts (Bolt preview / staging) should use the same Supabase project as production for now.
const PROD_HOSTS = new Set([
  'mango.law',
  'www.mango.law',
  'staging.mango.law',
  'sistrunktech-mango-l-lqhi.bolt.host',
  'mangolaw.com',
  'www.mangolaw.com',
]);
const PROD_SUPABASE_URL = 'https://rgucewewminsevbjgcad.supabase.co';
// NOTE: Supabase anon keys are public (shipped to the browser by design). This fallback prevents prod breakage if Bolt env vars drift.
const PROD_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndWNld2V3bWluc2V2YmpnY2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4Nzg0NjksImV4cCI6MjA4MDQ1NDQ2OX0.M3-pUdV9RpDTlaimO0AGHpPED0xf8Nxgl4L0VoUHpXw';

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const isProdHost =
  typeof window !== 'undefined' && PROD_HOSTS.has(window.location.hostname);

export const supabaseUrl = isProdHost ? PROD_SUPABASE_URL : envSupabaseUrl;
export const supabaseAnonKey = isProdHost ? PROD_SUPABASE_ANON_KEY : envSupabaseAnonKey;

export const supabaseProjectRef = (() => {
  if (!supabaseUrl) return null;
  try {
    return new URL(supabaseUrl).hostname.split('.')[0] ?? null;
  } catch {
    return null;
  }
})();

if (isProdHost && envSupabaseUrl && envSupabaseUrl !== PROD_SUPABASE_URL) {
  console.warn(
    'Supabase env drift detected on prod host; overriding VITE_SUPABASE_URL.',
    { envSupabaseUrl, forced: PROD_SUPABASE_URL }
  );
}

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in dev if env is missing.
  console.warn('Supabase environment variables are not set. Contact form submissions will be disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
