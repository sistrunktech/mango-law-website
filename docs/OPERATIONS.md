# Operations Guide

This document tracks current environment expectations, secrets handling, CI/CD, and what to update when changes are made.

## Stack
- React 18 + Vite + TypeScript, Tailwind with Mango brand tokens.
- React Router v6 routes for all pages in the sitemap.
- Supabase client initialized in `src/lib/supabaseClient.ts` for admin auth + CMS + checkpoints + forms.
- CI: GitHub Actions build workflow (`.github/workflows/ci.yml`).
- Optional OG/hero pipeline: fal.ai generation + Supabase Storage upload via `plugins/vite-og-plugin.ts` (runs only when env is present).

## Hosting (Bolt)
### Bolt badge (perf)
Bolt hosting may inject a third-party script tag like `https://bolt.new/badge.js?...` into the served HTML.

- Verify in DevTools → Network that there is no request to `bolt.new/badge.js` on first load.
- Disable the badge in Bolt’s project settings (brand/badge/attribution). If the UI changes, search settings for “badge” or “bolt”.
- If adding CSP later, prefer server-side headers and verify Mapbox still works (it may require `worker-src blob:` and other allowances).

### What Bolt Deploys (and what it doesn’t)
- Bolt deploys the **frontend** (the Vite build output for `index.html` + `src/**`).
- Bolt does **not** deploy Supabase Edge Functions or Supabase DB migrations. Those must be deployed separately via Supabase CLI or the Supabase Dashboard.

### Deploy verification (important)
- The live site may be served via a CDN edge layer; if you don’t see recent changes, assume the **frontend deploy is stale** until proven otherwise.
- Quick check: View Source on `https://mango.law` and confirm the `/assets/index-*.js` filename changes after a publish.
- If the asset filename doesn’t change, you’re still on an older build (and any “fix” in GitHub won’t show up yet).

## Environment Variables
- Client-exposed (`VITE_`): `VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MAPBOX_PUBLIC_TOKEN`, `VITE_MAPBOX_STYLE_URL` (optional).
- Server/CI-only: `SERVICE_ROLE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`), `SUPABASE_JWT_SECRET`, `RESEND_API_KEY`, `AI_CHAT_API_KEY`, `FAL_KEY` (or `FAL_API_KEY`), `MAPBOX_PUBLIC_TOKEN` (fallback), `TURNSTILE_SECRET_KEY` (optional).
- Config (non-secret): `FROM_EMAIL`, `CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_BCC`, `APP_ENV`, `APP_THEME`, `APP_SEASON`, `APP_HOLIDAY`, `FRONTEND_URL`, `ORIGIN_ALLOWLIST`, `CHAT_LEAD_NOTIFY_TO`, `CHAT_LEAD_NOTIFY_BCC`, `CHAT_LEAD_SOURCE_LABEL`, `AI_CHAT_PROVIDER`, `AI_CHAT_MODEL`, `VITE_TURNSTILE_SITE_KEY` (optional).
- SMS Notifications (email-to-SMS gateways): `SMS_GATEWAY_OFFICE`, `SMS_GATEWAY_NICK`, `SMS_GATEWAY_TEST` (format: 10-digit-phone@carrier-gateway.com). Enable with `ENABLE_SMS_LEAD_ALERTS=true`.
- Image/OG generation: `FAL_KEY`, `SUPABASE_URL` (matches `VITE_SUPABASE_URL`), `SB_BUCKET=og-images` (or `SUPABASE_BUCKET`), `OG_SIGNED_URL_TTL=31536000`.
- See `.env.example` for the full list; update it whenever variables change.
- **Supabase project pinning:** the frontend is currently pinned to the production Supabase project in `src/lib/supabaseClient.ts` to prevent “split brain” data and OAuth redirect drift. If you truly need multiple environments later, reintroduce host/env-based switching carefully and update Google OAuth redirect URIs accordingly.

## Contact Numbers (Do Not Swap)
- **Primary (Call/Text):** `(740) 417-6191` (`tel:7404176191`) — default for all “Call/Text” CTAs (fastest response).
- **Secondary (Office line):** `(740) 602-2155` (`tel:7406022155`) — show only where a second number is helpful (footer/contact/about).

## Secrets Placement
- GitHub Actions: secrets and variables have been added via `gh secret set` / `gh variable set`. Replace placeholder Supabase values (`VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `VITE_SUPABASE_URL`) with real env-specific keys.
- Supabase: mirror the same secrets per environment; do not expose `SERVICE_ROLE_KEY` or `SUPABASE_JWT_SECRET` to the client.
- Keep service-role keys server-side only; client should only see `VITE_*` and non-sensitive config.

## Edge Functions (deployed)
- **Public lead functions** (`verify_jwt=false` in `supabase/functions/*/config.toml`):
  - `submit-contact`: Validates payload with honeypot protection, inserts into `contact_leads`, sends admin notification + lead confirmation email via Resend. Includes CORS validation against `ORIGIN_ALLOWLIST`, rate limiting (10 req/min per IP), comprehensive security headers, and structured JSON logging.
  - `submit-lead`: Handles lead-capture modal submissions, inserts into `leads`, sends admin notification + lead confirmation email via Resend. Rate limited to 10 req/min per IP.
  - `chat-intake`: Similar pattern for chat leads with conversation context support. Rate limited to 20 req/min per IP. Includes optional SMS notifications via email-to-SMS gateways.
- **Bot protection** (optional): If `TURNSTILE_SECRET_KEY` is set, `submit-contact`, `submit-lead`, and `chat-intake` require a valid Turnstile token (`turnstile_token`).
  - Client-side site key: the app uses `VITE_TURNSTILE_SITE_KEY` when present, otherwise falls back to the default site key in `src/lib/turnstile.ts`.
  - If you rotate Turnstile keys, update both the Bolt env var (preferred) and the fallback constant (or remove/adjust the fallback).
- **Email templates** (shared): `submit-contact`, `submit-lead`, and `chat-intake` generate email HTML via `supabase/functions/_shared/email/*`.
  - Theme/season toggles: `APP_THEME` (`dark|light`), `APP_SEASON` (`spring|summer|fall|winter`), `APP_HOLIDAY` (`true|false`).
  - Host links: `FRONTEND_URL` (fallback: `VITE_SITE_URL`, then `https://mango.law`).
- **checkpoint-scraper**: Automated DUI checkpoint scraper that fetches data from OVICheckpoint.com, geocodes addresses using Mapbox API with caching, and upserts checkpoints to database. Logs all execution details to `scraper_logs` table. Rate limited to 5 req/hour per IP.
- **generate-review-response**: Generates draft responses for reviews using the configured AI provider/model.
- **sync-google-reviews**: Syncs Google reviews into the DB (used by admin dashboard).
- **google-oauth-connect / google-oauth-callback**: OAuth connect + callback endpoints for GBP/GA/GSC/GTM token storage. Callback must allow unauthenticated Google redirects (no Supabase `Authorization` header).
- **google-access-check**: Admin-only “Check status” endpoint for `/admin/connections` that lists accessible resources per integration (accounts/properties/containers/sites) and writes an `admin_activity_log` entry.

## Supabase Deploy Checklist (Prod)
Project ref (prod): `rgucewewminsevbjgcad`

- Link the repo:
  - `supabase link --project-ref rgucewewminsevbjgcad`
- Deploy Edge Functions (frontend deploy does not cover this):
  - `supabase functions deploy submit-contact`
  - `supabase functions deploy submit-lead`
  - `supabase functions deploy chat-intake`
- Apply DB migrations:
  - `supabase db push`

## Turnstile Setup (Recommended)
- Create a Cloudflare Turnstile widget for the hostnames you will test on (at minimum `mango.law`; add `staging.mango.law` / Bolt preview hostnames as needed).
- Bolt env (client): set `VITE_TURNSTILE_SITE_KEY` (preferred for rotation and multi-environment setups). If it’s missing, the app uses a default fallback site key from `src/lib/turnstile.ts`.
- Supabase Edge Function secrets (server): set `TURNSTILE_SECRET_KEY`.
- Common failure modes:
  - The live site is serving an older frontend bundle (missing recent Turnstile updates) → requests submit with no token → Edge Functions return `400` with `Verification required`.
  - The Turnstile widget isn’t configured for the hostname being tested → verification fails.

### Security Features
- **Security Headers**: All responses include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.
- **Rate Limiting**: Database-backed rate limiting tracks requests per IP/endpoint. Returns HTTP 429 with Retry-After header when limits exceeded. Limits: submit-contact (10/min), chat-intake (20/min).
- **Structured Logging**: JSON-formatted logs include timestamp, level, message, endpoint, method, IP, user agent, status, duration, and error details.
- **Input Validation**: Email format, phone format, required fields validated before processing.
- **Spam Protection**: Honeypot field detection for bot submissions; optional Turnstile server-side verification.

## Image generation workflow
- Script: `npm run generate:image -- --prompt "your prompt here"`
- Dependencies: `@fal-ai/client`, Supabase storage bucket `generated-images` (public if you want CDN links), env vars `FAL_API_KEY`, `SUPABASE_URL`, `SERVICE_ROLE_KEY`.
- Output: Saves images to `public/generated/` with matching metadata JSON; uploads to Supabase bucket (if configured) and prints CDN + local paths.
- Options:
  - `--count N` (up to 10 per prompt)
  - `--model fal-ai/star-vector` (override model; defaults favor star-vector/recraft/SD/flux)
  - `--image pathOrUrl` to run image-to-image (e.g., recraft v3 i2i) using a local file or URL
  - `--strength`, `--style`, `--colors '[{"r":212,"g":175,"b":55}]'` to pass i2i parameters
  - `--batch path/to/tasks.json` for multiple prompts; JSON array supports `{ prompt, count?, model?, image?, strength?, style?, colors? }`

## OG/hero generation (build-time)
- Vite plugin: `plugins/vite-og-plugin.ts` reads `og/og-specs.ts` prompts, generates OG images via fal.ai, uploads to Supabase Storage, emits `og-manifest.json`, and injects home OG tags.
- Requirements (build/CI only): `FAL_KEY`, `SUPABASE_URL`, `SERVICE_ROLE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`), bucket `og-images` (or override via `SB_BUCKET`), `OG_SIGNED_URL_TTL` (default 1 year).
- Behavior: If envs are missing, plugin logs a warning and skips generation (build still succeeds). Safe to run in CI as long as service-role is kept server-side only.

## Database (deployed)
- **contact_leads**: Captures form submissions (id, name, email, phone, message, ip_address, user_agent, created_at).
- **chat_leads**: Captures chat intake submissions (id, name, email, phone, initial_message, conversation_context, ip_address, user_agent, created_at).
- **leads**: Captures lead-capture modal submissions (id, name, email, phone, lead_source, checkpoint_id, county, urgency, message, ip_address, user_agent, referrer, created_at, status).
- **rate_limit_requests**: Tracks API requests for rate limiting (id, ip_address, endpoint, created_at). Auto-cleanup removes records older than 1 hour.
- **dui_checkpoints**: Stores DUI checkpoint locations and schedules (id, title, location_address, location_city, location_county, latitude, longitude, start_date, end_date, status, source_url, source_name, description, is_verified, views_count, created_at, updated_at). Indexed on county, status, and date fields for efficient filtering.
- **geocoding_cache**: Caches Mapbox geocoding results to minimize API calls (id, address, latitude, longitude, formatted_address, confidence, provider, metadata, hit_count, created_at, updated_at). Unique index on address for fast lookups.
- **scraper_logs**: Tracks checkpoint scraper execution for monitoring (id, scraper_name, status, started_at, completed_at, duration_ms, checkpoints_found, checkpoints_new, checkpoints_updated, errors, metadata, created_at). Indexed on scraper_name and created_at.
- **brand_assets**: Brand asset management table (id, file_path, variant_type, color_variant, file_format, dimensions, usage_notes, is_active, created_at, updated_at).
- **reviews**, **review_invitations**, **review_analytics**: Review management tables for tracking client reviews and competitive analysis.
- **RLS Enabled**: All tables use Row Level Security. Public read access to checkpoints and geocoding cache; service role has full access; rate limiting enforces IP-based restrictions.
- **Indexes**: Comprehensive indexes on frequently queried columns including composite indexes for date range queries, location searches, and rate limiting.
- **Functions**: Helper functions for `increment_column()` (generic counter for views/metrics), `increment()` (backward-compatible wrapper), `increment_geocoding_cache_hit()`, `cleanup_old_scraper_logs()`, `update_checkpoint_status()` (auto-transitions statuses), `invoke_checkpoint_scraper()`, `trigger_checkpoint_scraper_now()`.
- **pg_cron Extension**: Enabled for scheduled jobs. Daily scraper runs at 2:00 AM EST (7:00 AM UTC).
- **pg_net Extension**: Enabled for async HTTP requests from database functions to Edge Functions.
- **Backups/PITR**: Via Supabase defaults; add monitoring alerts when available.

## CI/CD
- Build-only workflow in `.github/workflows/ci.yml` (Node 20, npm ci, npm run build).
- `npm run build` runs a preflight filename check (`scripts/check-filenames.mjs`) to prevent publish failures caused by unsupported filename characters.
- Bundle analysis (`npm run analyze`) uses a dynamic import of `rollup-plugin-visualizer` so Bolt publish/build environments without dev dependencies don’t fail.
- TODO: add staging/prod deploy jobs with env-specific secrets, run migrations, and smoke tests before cutover. Target hosts today: Bolt staging `https://sistrunktech-mango-l-lqhi.bolt.host`, production `https://mango.law` (and `https://staging.mango.law` when live).

## Domains/DNS
- Registrar: Porkbun. Current records (as of 2025-12-06):
  - `ALIAS @ -> site-dns.bolt.host` (TTL 600)
  - `CNAME www -> site-dns.bolt.host` (TTL 600)
  - `CNAME staging -> site-dns.bolt.host` (TTL 300)
  - ACME TXT records managed by Bolt for SSL issuance.
- Ensure `ORIGIN_ALLOWLIST` includes `https://mango.law` and `https://staging.mango.law` when staging is live.

## DUI Checkpoint Map System
- **Interactive Map**: Mapbox GL map (`CheckpointMap.tsx`) displays checkpoint locations with status-based colored markers (active=red, upcoming=orange, completed=green, cancelled=gray).
- **Features**: Auto-fit bounds, user location with "Find Me" button, interactive popups, smooth animations, status legend, loading/error states.
- **Filters**: County, date range, and status filtering on `/dui-checkpoints` page.
- **Data Sources**:
  - **Confirmed checkpoints**: Scraper pulls from OVICheckpoint.com, geocodes addresses, and stores in `dui_checkpoints`.
  - **Pending announcements**: RSS ingestion stores “details pending” items in `dui_checkpoint_announcements` (list-only; no map pins).
- **Geocoding**: Mapbox Geocoding API with aggressive caching strategy to minimize API calls. Cache tracks hit counts and confidence levels.
- **Required secrets**: The scraper needs a valid Mapbox token in Supabase Edge Function secrets (`MAPBOX_PUBLIC_TOKEN` or `VITE_MAPBOX_PUBLIC_TOKEN`). If missing/invalid, checkpoints will be inserted without `latitude/longitude` and the map will show few/no markers.
- **Scraper Schedule**: Runs daily at 2:00 AM EST via pg_cron. Manual trigger available in admin dashboard.
- **One-time data repair (OVICheckpoint history)**: If historical checkpoint dates were corrupted by an earlier scraper regression, use `scripts/backfill-ovicheckpoint-dates.ts`:
  - Dry-run: `npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts`
  - Apply (safe insert only): `npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts --mode upsert --apply`
  - Apply (clean rebuild of OVICheckpoint rows): `npx ts-node --esm scripts/backfill-ovicheckpoint-dates.ts --mode replace-ovicheckpoint --apply --confirm-replace`
  - The script writes a JSON audit report to `reports/` (gitignored).
  - In replace mode, if `MAPBOX_PUBLIC_TOKEN` is not set, the script will still try to reuse existing in-Ohio coordinates by matching county/city/address to preserve map pins.

### RSS Source Config (CSV)
- Master RSS source list: `supabase/functions/checkpoint-scraper/rss_sources_master.csv`
- Seed/discovery mapping: `supabase/functions/checkpoint-scraper/checkpoint_rss_sources.csv`
- To regenerate the TS-embedded CSV modules used by the Edge Function, run: `node scripts/compile-rss-config.mjs` (or `node compile-rss-config.mjs`).

## Admin Dashboard
- **Primary UI**: `/admin/dashboard` (tabbed CMS). Uses Supabase Auth (email/password) via `src/contexts/AuthContext.tsx`.
- **Connections hub**: `/admin/connections` provides a BrightLocal-like view of Google integrations (Connect/Reconnect + Check status + Setup guide).
- **Legacy checkpoint UI**: `/admin/checkpoints` is an older page gated by a local password (`src/components/AdminAuth.tsx`). Prefer using the dashboard tab.
- **Features**:
  - **Status Update Button**: Manually trigger checkpoint status updates based on current time (upcoming → active → completed).
  - **Scraper Logs Viewer**: Real-time view of scraper execution history with success/failure stats, error details, and manual trigger button. Logs are publicly viewable for transparency.
  - **Checkpoint CRUD**: Create, edit, and delete checkpoints with geocoding preview.
  - **Geocoding Preview**: Real-time address validation and coordinate lookup as you type. Shows confidence level (high/medium/low) and formatted address.
  - **Manual Entry**: Full form with all checkpoint fields including source tracking and verification status.
- **Automated Updates**: pg_cron job runs hourly to automatically update checkpoint statuses. Manual refresh available via "Update Statuses" button.
  - **Cron health check (Supabase SQL editor):**
    - `SELECT * FROM cron.job WHERE jobname = 'update_checkpoint_statuses_hourly';`
    - `SELECT * FROM cron.job_run_details WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'update_checkpoint_statuses_hourly') ORDER BY start_time DESC LIMIT 20;`

## Blog System
- **Visual Components**: 31+ blog-specific components for rich content display including:
  - `PenaltyGrid`: Flexible penalty display with dynamic column support
  - `TimelineBar`, `ProgressBar`: Visual progress indicators
  - `ComparisonCard`, `StatCard`, `IconStat`: Data visualization
  - `HighlightBox`, `CostBreakdown`: Content emphasis
- **Content**: 11 comprehensive blog posts covering OVI/DUI defense, drug crimes, sex crimes, white collar defense, personal injury, and protection orders.
- **SEO**: Each post includes metadata, structured content, author bios, related posts, and call-to-action sections.

## Chat System
- **UI**: Conversational chat interface (`ChatIntakeLauncher.tsx`, `ConversationWindow.tsx`) with bot/user message styling and typing indicators.
- **Flow**: Multi-step conversation (name → phone → email → message → confirmation) with localStorage persistence and 30-minute session timeout.
- **Phone Validation**: Real-time formatting and validation with (XXX) XXX-XXXX format.
- **SMS Notifications**: Instant mobile alerts via email-to-SMS gateways (Verizon/AT&T). Sends to office, attorney, and test numbers. Zero additional cost (no Twilio subscription).
- **Delayed Follow-up**: Automated follow-up message 20-30 seconds after confirmation to re-engage users.

## CTA Tracking (GA4 / GTM)
- This site is GTM-first: app code pushes explicit events to `window.dataLayer` (avoid GTM click selectors whenever possible).
- Events emitted by the app:
  - `mango_page_view` (from `src/lib/seo.tsx`)
  - `cta_click` (from `src/lib/analytics.ts`)
  - `lead_submitted` (from `src/lib/analytics.ts`)
- `lead_submitted` payload includes `lead_source` (`form` | `phone` | `email` | `chat`) and `checkpoint_id` (location identifier like `contact_form_submit`), with optional `target_number` / `target_email`.
  - Recommended GTM setup:
  - GA4 Config tag (Measurement ID) with `send_page_view=false`
  - GA4 Event tags triggered by the Custom Events above:
    - `mango_page_view` → send GA4 `page_view` with `page_location`, `page_path`, `page_title`
    - `cta_click` → send GA4 event `cta_click` with param `cta`
    - `lead_submitted` → send GA4 event `lead_submitted` with params `lead_source`, `checkpoint_id`, `target_number`, `target_email`

## Email Template System (Edge Functions)
- Shared builders live in `supabase/functions/_shared/email/templates.ts`.
- To add a new notification type:
  - Build the email HTML with `buildAdminEmailHtml(...)` and/or `buildClientConfirmationHtml(...)`.
  - Keep the Edge Function responsible for data validation, DB insert, and passing sanitized fields + metadata into the builder.
  - Add any new “helpful resources” rules to `supabase/functions/_shared/email/recommendations.ts`.

## Agent/PR Expectations
- When adding/updating env vars or infra, update `.env.example`, this `docs/OPERATIONS.md`, and `CHANGELOG.md`.
- Keep PR descriptions clear and include any new secrets/variables that must be set in GitHub and Supabase.
- Preserve brand tokens and Inter typography; avoid introducing new deps without discussion.
- For checkpoint system: Mapbox token required, Supabase configured with all migrations, pg_cron and pg_net extensions enabled.
