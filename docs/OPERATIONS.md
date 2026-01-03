# Operations Guide

This document tracks current environment expectations, secrets handling, CI/CD, and what to update when changes are made.

## Stack
- Next.js App Router + React 18 + TypeScript, Tailwind with Mango brand tokens.
- File-based routes under `src/app` (public + internal groups).
- Supabase client initialized in `src/lib/supabaseClient.ts` for admin auth + CMS + checkpoints + forms.
- CI: GitHub Actions build workflow (`.github/workflows/ci.yml`).
- Legacy (Vite-only): OG/hero pipeline via `plugins/vite-og-plugin.ts` (deprecated during Next migration).

## Hosting (Cloudflare Pages + Bolt Legacy)
### Cloudflare Pages (target)
- Deploy the Next.js build to Cloudflare Pages for SSR/SSG support.
- Build command: `npm run build && npx @cloudflare/next-on-pages` (recommended for Pages).
- Build output directory: `.vercel/output`.
- Supabase Edge Functions + DB migrations are still deployed separately via Supabase CLI/Dashboard.

### Bolt (legacy during migration)
- Bolt remains live until cutover; treat it as a legacy deploy target.
- Bolt deploys the **frontend** only (previously Vite build output). It does **not** deploy Supabase Edge Functions or DB migrations.

### Deploy verification (important)
- The live site may be served via a CDN edge layer; if you don’t see recent changes, assume the **frontend deploy is stale** until proven otherwise.
- Quick check: View Source on `https://mango.law` and confirm that HTML reflects the latest build metadata/scripts.

### Cutover checklist (Next.js → Cloudflare Pages)
- Merge order: `codex/nextjs-migration` → `codex/docs-nextjs-alignment` → `codex/lint-cleanup` → `codex/next-image-migration`.
- Ensure Pages env vars match `.env.example` (all `NEXT_PUBLIC_*`, plus server-only keys for Edge Functions).
- Configure Pages build to use Node 20, then run the build command above and verify no build errors.
- Update DNS (Cloudflare): swap `@` + `www` from Bolt to the Pages target only after CI and a preview deploy are green.
- Validate `/admin/*` routes, `/blog/:slug`, and `/resources/dui-checkpoints` on the new deployment before disabling Bolt.

## Environment Variables
- Client-exposed (`NEXT_PUBLIC_`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN`, `NEXT_PUBLIC_MAPBOX_STYLE_URL` (optional).
- Optional client config: `NEXT_PUBLIC_SUPABASE_CUSTOM_DOMAIN` (recommended for OAuth branding; use an HTTPS Supabase custom domain like `https://api.mango.law`).
- Server/CI-only: `SERVICE_ROLE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`), `SUPABASE_JWT_SECRET`, `RESEND_API_KEY`, `AI_CHAT_API_KEY`, `FAL_KEY` (or `FAL_API_KEY`), `MAPBOX_PUBLIC_TOKEN` (fallback), `TURNSTILE_SECRET_KEY` (optional), `SERPER_API_KEY` (Search Intelligence).
- Config (non-secret): `FROM_EMAIL`, `CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_BCC`, `APP_ENV`, `APP_THEME`, `APP_SEASON`, `APP_HOLIDAY`, `FRONTEND_URL`, `ORIGIN_ALLOWLIST`, `CHAT_LEAD_NOTIFY_TO`, `CHAT_LEAD_NOTIFY_BCC`, `CHAT_LEAD_SOURCE_LABEL`, `AI_CHAT_PROVIDER`, `AI_CHAT_MODEL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (optional).
- SMS Notifications (email-to-SMS gateways): `SMS_GATEWAY_OFFICE`, `SMS_GATEWAY_NICK`, `SMS_GATEWAY_TEST` (format: 10-digit-phone@carrier-gateway.com). Enable with `ENABLE_SMS_LEAD_ALERTS=true`.
- Image/OG generation: `FAL_KEY`, `SUPABASE_URL` (matches `NEXT_PUBLIC_SUPABASE_URL`), `SB_BUCKET=og-images` (or `SUPABASE_BUCKET`), `OG_SIGNED_URL_TTL=31536000`.
- See `.env.example` for the full list; update it whenever variables change.
- **Supabase project pinning:** the frontend is currently pinned to the production Supabase project in `src/lib/supabaseClient.ts` to prevent “split brain” data and OAuth redirect drift. If you truly need multiple environments later, reintroduce host/env-based switching carefully and update Google OAuth redirect URIs accordingly.

## Contact Numbers (Do Not Swap)
- **Primary (Call/Text):** `(740) 417-6191` (`tel:7404176191`) — default for all “Call/Text” CTAs (fastest response).
- **Secondary (Office line):** `(740) 602-2155` (`tel:7406022155`) — show only where a second number is helpful (footer/contact/about).

## Secrets Placement
- GitHub Actions: secrets and variables have been added via `gh secret set` / `gh variable set`. Replace placeholder Supabase values (`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`) with real env-specific keys.
- Supabase: mirror the same secrets per environment; do not expose `SERVICE_ROLE_KEY` or `SUPABASE_JWT_SECRET` to the client.
- Keep service-role keys server-side only; client should only see `NEXT_PUBLIC_*` and non-sensitive config.

## Edge Functions (deployed)
- **Public lead functions** (`verify_jwt=false` in `supabase/functions/*/config.toml`):
  - `submit-contact`: Validates payload with honeypot protection, inserts into `contact_leads`, sends admin notification + lead confirmation email via Resend. Includes CORS validation against `ORIGIN_ALLOWLIST`, rate limiting (10 req/min per IP), comprehensive security headers, and structured JSON logging.
  - `submit-lead`: Handles lead-capture modal submissions, inserts into `leads`, sends admin notification + lead confirmation email via Resend. Rate limited to 10 req/min per IP.
  - `chat-intake`: Similar pattern for chat leads with conversation context support. Rate limited to 20 req/min per IP. Includes optional SMS notifications via email-to-SMS gateways.
- **Bot protection** (optional): If `TURNSTILE_SECRET_KEY` is set, `submit-contact`, `submit-lead`, and `chat-intake` require a valid Turnstile token (`turnstile_token`).
  - Client-side site key: the app uses `NEXT_PUBLIC_TURNSTILE_SITE_KEY` when present, otherwise falls back to the default site key in `src/lib/turnstile.ts`.
  - If you rotate Turnstile keys, update the Cloudflare/Bolt env var and the fallback constant (or remove/adjust the fallback).
- **Email templates** (shared): `submit-contact`, `submit-lead`, and `chat-intake` generate email HTML via `supabase/functions/_shared/email/*`.
  - Theme/season toggles: `APP_THEME` (`dark|light`), `APP_SEASON` (`spring|summer|fall|winter`), `APP_HOLIDAY` (`true|false`).
  - Host links: `FRONTEND_URL` (fallback: `NEXT_PUBLIC_SITE_URL`, then `https://mango.law`).
- **checkpoint-scraper**: Automated DUI checkpoint scraper that fetches data from OVICheckpoint.com, geocodes addresses using Mapbox API with caching, and upserts checkpoints to database. Logs all execution details to `scraper_logs` table. Rate limited to 5 req/hour per IP.
- **check-rankings**: Search Intelligence job that pulls Serper.dev results for active keywords and writes ranking history to `seo_rankings`. Requires `SERPER_API_KEY` and service-role access (no fallback key).
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
  - `supabase functions deploy check-rankings`
- Apply DB migrations:
  - `supabase db push`

## Turnstile Setup (Recommended)
- Create a Cloudflare Turnstile widget for the hostnames you will test on (at minimum `mango.law`; add `staging.mango.law` / Bolt preview hostnames as needed).
- Client env: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (preferred for rotation and multi-environment setups). If it’s missing, the app uses a default fallback site key from `src/lib/turnstile.ts`.
- Supabase Edge Function secrets (server): set `TURNSTILE_SECRET_KEY`.
- UI placement: the Turnstile widget is rendered *below the submit button* and aligned with the confidentiality/security disclaimer so it stays out of the main form flow.
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
- Legacy (Vite-only) plugin: `plugins/vite-og-plugin.ts` reads `og/og-specs.ts` prompts, generates OG images via fal.ai, uploads to Supabase Storage, emits `og-manifest.json`, and injects home OG tags.
- Requirements (build/CI only): `FAL_KEY`, `SUPABASE_URL`, `SERVICE_ROLE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`), bucket `og-images` (or override via `SB_BUCKET`), `OG_SIGNED_URL_TTL` (default 1 year).
- Behavior: If envs are missing, plugin logs a warning and skips generation (build still succeeds). Safe to run in CI as long as service-role is kept server-side only.
- Next.js migration note: move OG generation into a script or API route if needed; the Vite plugin will not run in Next builds.

## Database (deployed)
- **contact_leads**: Captures form submissions (id, name, email, phone, message, ip_address, user_agent, created_at).
- **chat_leads**: Captures chat intake submissions (id, name, email, phone, initial_message, conversation_context, ip_address, user_agent, created_at).
- **leads**: Captures lead-capture modal submissions (id, name, email, phone, lead_source, checkpoint_id, county, urgency, message, ip_address, user_agent, referrer, created_at, status).
- **rate_limit_requests**: Tracks API requests for rate limiting (id, ip_address, endpoint, created_at). Auto-cleanup removes records older than 1 hour.
- **dui_checkpoints**: Stores DUI checkpoint locations and schedules (id, title, location_address, location_city, location_county, latitude, longitude, start_date, end_date, status, source_url, source_name, description, is_verified, views_count, created_at, updated_at). Indexed on county, status, and date fields for efficient filtering.
  - New fields: `announcement_date`, `geocoding_confidence`, `last_geocoded_at` (for transparency + geocoding diagnostics).
- **seo_keywords**: Keyword inventory for Search Intelligence (keyword, location_context, target_url, is_active, timestamps).
- **seo_rankings**: Daily ranking history with optional local-pack flag and SERP data payloads.
  - Seeded via migration `20251228180500_seed_initial_keywords.sql` (Delaware + Marysville starter set; update as needed).
- **geocoding_cache**: Caches Mapbox geocoding results to minimize API calls (id, address, latitude, longitude, formatted_address, confidence, provider, metadata, hit_count, created_at, updated_at). Unique index on address for fast lookups.
- **scraper_logs**: Tracks checkpoint scraper execution for monitoring (id, scraper_name, status, started_at, completed_at, duration_ms, checkpoints_found, checkpoints_new, checkpoints_updated, errors, metadata, created_at). Indexed on scraper_name and created_at.
- **brand_assets**: Brand asset management table (id, file_path, variant_type, color_variant, file_format, dimensions, usage_notes, is_active, created_at, updated_at).
- **reviews**, **review_invitations**, **review_analytics**: Review management tables for tracking client reviews and competitive analysis.
- **RLS Enabled**: All tables use Row Level Security. Public read access to checkpoints and geocoding cache; service role has full access; rate limiting enforces IP-based restrictions.
- **Indexes**: Comprehensive indexes on frequently queried columns including composite indexes for date range queries, location searches, and rate limiting.
- **Functions**: Helper functions for `increment_column()` (generic counter for views/metrics), `increment()` (backward-compatible wrapper), `increment_geocoding_cache_hit()`, `cleanup_old_scraper_logs()`, `update_checkpoint_status()` (auto-transitions statuses), `invoke_checkpoint_scraper()`, `trigger_checkpoint_scraper_now()`.
- **Security hardening**: Database functions now set `search_path = public, pg_temp` via migration `20251228180000_secure_function_search_paths.sql` to address mutable search path warnings.
- **pg_cron Extension**: Enabled for scheduled jobs. Daily scraper runs at 2:00 AM EST (7:00 AM UTC).
- **pg_net Extension**: Enabled for async HTTP requests from database functions to Edge Functions.
- **Backups/PITR**: Via Supabase defaults; add monitoring alerts when available.

## CI/CD
- Build-only workflow in `.github/workflows/ci.yml` (Node 20, npm ci, npm run build).
- `npm run build` runs a preflight filename check (`scripts/check-filenames.mjs`) to prevent publish failures caused by unsupported filename characters.
- Next.js route group names under `src/app` use `()` and `[]`; the filename check allows those characters only within `src/app`.
- Bundle analysis (`npm run analyze`) uses a dynamic import of `rollup-plugin-visualizer` so Bolt publish/build environments without dev dependencies don’t fail.
- **Staging/Prod Deploy**: Staging deploys are automated via Bolt/Netlify on non-main branches. Production deploys to `https://mango.law` occur on merges to `main`. Database migrations must be pushed manually via `supabase db push` before cutover.

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
- **Transparency**: The UI surfaces “Announced on” dates when available and displays an explicit “No announced checkpoints at this time” empty state.
- **Geocoding**: Mapbox Geocoding API with aggressive caching strategy to minimize API calls. Cache tracks hit counts and confidence levels.
- **Required secrets**: The scraper needs a valid Mapbox token in Supabase Edge Function secrets (`MAPBOX_PUBLIC_TOKEN` or `NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN`). If missing/invalid, checkpoints will be inserted without `latitude/longitude` and the map will show few/no markers.
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

### Google Integrations (Admin)
Use `/admin/connections` to connect and *select the correct resources* for each tool (do not assume the first Google account returned is the right one).
- **Step 1 — Connect**: Click `Connect` (or `Reconnect`) and complete the Google consent flow.
- **Step 2 — Check status**: Click `Check status` to load the list of available accounts/resources.
- **Step 3 — Select + Save**:
  - **GA4 (Analytics)**: choose the correct **Account** and **GA4 Property**, then click `Save` (stored in `google_integrations.account_id` + `metadata.propertyId`).
  - **Search Console**: choose `sc-domain:mango.law` when available (else `https://mango.law/`), then click `Save` (stored in `metadata.siteUrl`).
  - **Tag Manager**: choose the correct **Account** and **Container**, then click `Save` (stored in `google_integrations.account_id` + `metadata.containerId`).
- **Step 4 — Re-check**: run `Check status` again after changing permissions or creating resources in Google.
- Troubleshooting:
  - If the selectors look “empty”, click `Reconnect` and ensure you grant consent to the correct Google user (the user that actually owns/has access to the Analytics/GTM accounts).
  - If you *only* see one account/resource but you expect more, it’s usually permissions (the connected user doesn’t have access), or Google is returning a partial list; reconnect and try again.
  - Use the “debug payload” disclosure in the UI to confirm what Google returned before changing code.

### Content Governance (Blog)
- Blog posts have lifecycle states: `draft`, `published`, `finalized`.
- Finalized posts are locked for non-privileged users; changes require an approval token.
- Approval token format: `APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>`.
- Admin edits capture change type/reason for version snapshots (`last_change_type`, `last_change_reason`).
- Version snapshots are stored in `blog_post_versions`; proposals live in `blog_post_change_requests`.
- All protected content changes must be logged in `docs/CONTENT_CHANGELOG.md`.
- Protected content registry lives in `docs/PROTECTED_CONTENT.md`.
- Consolidated blog rules live in `docs/BLOG_REQUIREMENTS.md` (word count, ORC links, visuals, trust metadata).
- Current content sources: file-based (`src/data/blogPosts.ts`) + DB (`blog_posts`). Long term, migrate fully to DB-driven content.

### OAuth Branding (Avoid “project-id.supabase.co” on the Google consent screen)
By default, Supabase-hosted OAuth redirects and Edge Functions use the Supabase project domain (e.g., `https://<project-id>.supabase.co/...`).
Google may display that domain on the consent screen (unprofessional / untrusted).

Recommended fix: configure a **Supabase Custom Domain** (now using `api.mango.law`) and update Google OAuth redirect URIs to use it.

High-level steps:
1. Supabase Dashboard → Custom Domains:
   - Add a custom domain (commonly `api.mango.law`).
   - Verify DNS + TLS is active.
2. Update Google Cloud Console OAuth Client:
   - Authorized redirect URI(s) should include the new callback URL:
     - `https://api.mango.law/functions/v1/google-oauth-callback`
   - Keep the old Supabase URL temporarily during migration if needed, then remove it later.
3. Ensure the site uses the custom domain consistently for Supabase endpoints (Auth + Functions) to avoid mixed-domain flows.

If you don’t do this, the connectors can still work — they’ll just show the Supabase domain during OAuth.

## Supabase Auth Security
- Enable **Leaked Password Protection** in Supabase Dashboard → Auth → Providers → Email.
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
- The only tag snippet that should be hard-coded in `src/app/layout.tsx` is GTM (`GTM-WLJQZKB5`). Do not add GA4 `gtag.js` directly to the site.
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

## Consent Mode v2 (GTM / GA4)

GA4 may show “consent signals inactive/missing for EEA users” unless Consent Mode v2 signals are sent.

### How it’s implemented
- `src/app/layout.tsx` should include any inline Consent Mode v2 snippet that runs **before GTM loads** (advanced mode).
- Defaults are set to **denied** for:
  - `analytics_storage`
  - `ad_storage`
  - `ad_user_data`
  - `ad_personalization`
- A small in-app banner (`src/components/ConsentBanner.tsx`) lets users:
  - Accept all
  - Reject all
  - Customize (Analytics vs Advertising)
- Consent is persisted in a cookie: `ml_consent_v2`.

### Notes
- Current behavior is conservative: default denied globally until a user chooses (simple + compliant, but reduces measurement outside EEA).
- If you want EEA-only defaults (recommended for measurement), add region detection in the hosting layer (or via a CMP) and adjust defaults accordingly.

### GTM configuration (required)
In GTM:
- Enable consent settings/overview.
- Ensure GA4 tags require `analytics_storage=granted`.
- Ensure ad-related tags require `ad_storage=granted` (and the v2 signals where applicable).
- Validate in Tag Assistant that the consent state exists on first load and updates immediately after user action.

## Email Template System (Edge Functions)
- Shared builders live in `supabase/functions/_shared/email/templates.ts`.
- Recommended for client compatibility: set `APP_THEME=light` unless you have a specific reason to force a dark email layout (many email clients apply their own dark-mode rendering and can produce unexpected inversions).
- To add a new notification type:
  - Build the email HTML with `buildAdminEmailHtml(...)` and/or `buildClientConfirmationHtml(...)`.
  - Keep the Edge Function responsible for data validation, DB insert, and passing sanitized fields + metadata into the builder.
  - Add any new “helpful resources” rules to `supabase/functions/_shared/email/recommendations.ts`.

## Agent/PR Expectations
- When adding/updating env vars or infra, update `.env.example`, this `docs/OPERATIONS.md`, and `CHANGELOG.md`.
- Keep PR descriptions clear and include any new secrets/variables that must be set in GitHub and Supabase.
- Preserve brand tokens and Inter typography; avoid introducing new deps without discussion.
- For checkpoint system: Mapbox token required, Supabase configured with all migrations, pg_cron and pg_net extensions enabled.
