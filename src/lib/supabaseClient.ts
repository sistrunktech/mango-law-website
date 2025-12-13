import { createClient } from '@supabase/supabase-js';

// Use the production Supabase project everywhere. This prevents drift to stale projects (which breaks
// Google OAuth redirect URIs and can surface demo/seed checkpoint data on public pages).
const PROD_SUPABASE_URL = 'https://rgucewewminsevbjgcad.supabase.co';
// NOTE: Supabase anon keys are public (shipped to the browser by design). This fallback prevents prod breakage if Bolt env vars drift.
const PROD_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJndWNld2V3bWluc2V2YmpnY2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4Nzg0NjksImV4cCI6MjA4MDQ1NDQ2OX0.M3-pUdV9RpDTlaimO0AGHpPED0xf8Nxgl4L0VoUHpXw';

export const supabaseUrl = PROD_SUPABASE_URL;
export const supabaseAnonKey = PROD_SUPABASE_ANON_KEY;

export const supabaseProjectRef = (() => {
  if (!supabaseUrl) return null;
  try {
    return new URL(supabaseUrl).hostname.split('.')[0] ?? null;
  } catch {
    return null;
  }
})();

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in dev if env is missing.
  console.warn('Supabase environment variables are not set. Contact form submissions will be disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
