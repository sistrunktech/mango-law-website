# Operations Guide

This document tracks current environment expectations, secrets handling, CI/CD, and what to update when changes are made.

## Stack
- React 18 + Vite + TypeScript, Tailwind with Mango brand tokens.
- React Router v6 routes for all pages in the sitemap.
- Supabase client initialized in `src/lib/supabaseClient.ts` for the contact form.
- CI: GitHub Actions build workflow (`.github/workflows/ci.yml`).
- Optional OG/hero pipeline: fal.ai generation + Supabase Storage upload via `plugins/vite-og-plugin.ts` (runs only when env is present).

## Environment Variables
- Client-exposed (`VITE_`): `VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MAPBOX_PUBLIC_TOKEN`, `VITE_MAPBOX_STYLE_URL` (optional).
- Server/CI-only: `SERVICE_ROLE_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`), `SUPABASE_JWT_SECRET`, `RESEND_API_KEY`, `AI_CHAT_API_KEY`, `FAL_KEY` (or `FAL_API_KEY`), `MAPBOX_PUBLIC_TOKEN` (fallback).
- Config (non-secret): `FROM_EMAIL`, `CONTACT_NOTIFY_TO`, `APP_ENV`, `ORIGIN_ALLOWLIST`, `CHAT_LEAD_NOTIFY_TO`, `CHAT_LEAD_SOURCE_LABEL`, `AI_CHAT_PROVIDER`, `AI_CHAT_MODEL`.
- SMS Notifications (email-to-SMS gateways): `SMS_GATEWAY_OFFICE`, `SMS_GATEWAY_NICK`, `SMS_GATEWAY_TEST` (format: 10-digit-phone@carrier-gateway.com). Enable with `ENABLE_SMS_LEAD_ALERTS=true`.
- Image/OG generation: `FAL_KEY`, `SUPABASE_URL` (matches `VITE_SUPABASE_URL`), `SB_BUCKET=og-images` (or `SUPABASE_BUCKET`), `OG_SIGNED_URL_TTL=31536000`.
- See `.env.example` for the full list; update it whenever variables change.
- Current allowlist should include staging/Bolt hosts: `https://mango.law`, `https://staging.mango.law`, and `https://sistrunktech-mango-l-lqhi.bolt.host` (add/remove as environments change).
- For the current rollout, `mango.law` + staging/preview hosts use the same Supabase project (`rgucewewminsevbjgcad`) to prevent “split brain” data and OAuth redirect drift.

## Contact Numbers (Do Not Swap)
- **Office / Main line:** `(740) 602-2155` (`tel:7406022155`) — default for all “Call” CTAs.
- **Direct (Nick):** `(740) 417-6191` (`tel:7404176191`) — use only when explicitly labeled as direct/emergency.
- SMS gateway env vars must follow the same mapping: `SMS_GATEWAY_OFFICE` is the office/main line; `SMS_GATEWAY_NICK` is Nick’s direct.

## Secrets Placement
- GitHub Actions: secrets and variables have been added via `gh secret set` / `gh variable set`. Replace placeholder Supabase values (`VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `VITE_SUPABASE_URL`) with real env-specific keys.
- Supabase: mirror the same secrets per environment; do not expose `SERVICE_ROLE_KEY` or `SUPABASE_JWT_SECRET` to the client.
- Keep service-role keys server-side only; client should only see `VITE_*` and non-sensitive config.

## Edge Functions (deployed)
- **submit-contact**: Validates payload with honeypot protection, inserts into `contact_leads`, sends notification via Resend. Includes CORS validation against `ORIGIN_ALLOWLIST`, rate limiting (10 req/min per IP), comprehensive security headers, and structured JSON logging.
- **chat-intake**: Similar pattern for chat leads with conversation context support. Rate limited to 20 req/min per IP. **NEW**: Now includes SMS notifications via email-to-SMS gateways (Verizon/AT&T) for instant mobile alerts. Sends to office, attorney, and test numbers configured in environment variables.
- **checkpoint-scraper**: Automated DUI checkpoint scraper that fetches data from OVICheckpoint.com, geocodes addresses using Mapbox API with caching, and upserts checkpoints to database. Logs all execution details to `scraper_logs` table. Rate limited to 5 req/hour per IP.
- **send-review-invitation**: (Existing) Sends review invitations with JWT authentication required.
- **google-oauth-connect / google-oauth-callback**: OAuth connect + callback endpoints for GBP/GA/GSC/GTM token storage. Callback must allow unauthenticated Google redirects (no Supabase `Authorization` header).
- **google-access-check**: Admin-only “Check status” endpoint for `/admin/connections` that lists accessible resources per integration (accounts/properties/containers/sites) and writes an `admin_activity_log` entry.

### Security Features
- **Security Headers**: All responses include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.
- **Rate Limiting**: Database-backed rate limiting tracks requests per IP/endpoint. Returns HTTP 429 with Retry-After header when limits exceeded. Limits: submit-contact (10/min), chat-intake (20/min).
- **Structured Logging**: JSON-formatted logs include timestamp, level, message, endpoint, method, IP, user agent, status, duration, and error details.
- **Input Validation**: Email format, phone format, required fields validated before processing.
- **Spam Protection**: Honeypot field detection for bot submissions.

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
- **chat_leads**: Captures chat intake submissions (id, name, email, message, conversation_context, source, meta, created_at). **UPDATED**: Simplified schema with generic `meta` field for flexible metadata storage.
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
- **Scraper Schedule**: Runs daily at 2:00 AM EST via pg_cron. Manual trigger available in admin dashboard.

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
- **Flow**: Multi-step conversation (name → phone → message → confirmation) with localStorage persistence and 30-minute session timeout.
- **Phone Validation**: Real-time formatting and validation with (XXX) XXX-XXXX format.
- **SMS Notifications**: Instant mobile alerts via email-to-SMS gateways (Verizon/AT&T). Sends to office, attorney, and test numbers. Zero additional cost (no Twilio subscription).
- **Delayed Follow-up**: Automated follow-up message 20-30 seconds after confirmation to re-engage users.

## CTA Tracking (GA4 / GTM)
- Primary CTAs include stable `data-cta` attributes (e.g. `header_free_consult`, `header_call`, `checkpoint_banner_free_consult`).
- Lead capture submissions also store `lead_source` (`LeadCaptureModal` `trigger`) in Supabase `leads.lead_source`.
- Recommended GTM setup: add a click trigger for elements matching `[data-cta]` and send `data-cta` as the event label.
- Additionally, app code can push `cta_click` events to `window.dataLayer` via `src/lib/analytics.ts`.

## Agent/PR Expectations
- When adding/updating env vars or infra, update `.env.example`, this `docs/OPERATIONS.md`, and `CHANGELOG.md`.
- Keep PR descriptions clear and include any new secrets/variables that must be set in GitHub and Supabase.
- Preserve brand tokens and Inter typography; avoid introducing new deps without discussion.
- For checkpoint system: Mapbox token required, Supabase configured with all migrations, pg_cron and pg_net extensions enabled.
