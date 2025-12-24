# Changelog

## 2025-12-24

### Admin / Google Connectors
- Fix `/admin/connections` resource selection for Google Analytics and Google Tag Manager by listing all accessible accounts/resources and adding an Account selector (prevents “random account” behavior).
- Collapse the raw access-check debug payload behind a disclosure to keep the UI readable.

## 2025-12-23

### Lead Capture + Forms
- Fix lead-capture modal validation and standardize phone normalization/formatting across forms (stores digits, displays `(XXX) XXX-XXXX`).
- Surface Edge Function JSON error messages in the UI so “non-2xx” includes the actual server reason (e.g. `Verification required`, `Origin not allowed`).
- Deploy/enable Cloudflare Turnstile (optional): client widget + server verification via `TURNSTILE_SECRET_KEY`.
- Add a production-safe Turnstile site key fallback so the widget still renders if Bolt env injection fails (`src/lib/turnstile.ts`).

### Email Templates (Supabase Edge Functions)
- Replace per-function ad-hoc HTML with a shared email template generator (`supabase/functions/_shared/email/*`) used by `submit-contact`, `submit-lead`, and `chat-intake`.
- Add environment-driven theme/season controls for email styling (`APP_THEME`, `APP_SEASON`, `APP_HOLIDAY`) and a `FRONTEND_URL` base for helpful resource links.

### Supabase (Required Operational Updates)
- Add missing `contact_leads` + `chat_leads` tables via migration (`supabase/migrations/20251223000000_create_contact_and_chat_leads_tables.sql`).
- Ensure public lead Edge Functions are callable from the site by setting `verify_jwt = false` in:
  - `supabase/functions/submit-contact/config.toml`
  - `supabase/functions/submit-lead/config.toml`
  - `supabase/functions/chat-intake/config.toml`

## 2025-12-19

### Header
- Restore the desktop “top green bar” (phone + DUI checkpoint map link) above the main header (`src/components/SiteHeader.tsx`).
- Document header-only rollback steps (`docs/HEADER-ROLLBACK.md`).

## 2025-12-17

### Blog Trust + Content
- Rewrite blog posts to be source-first and reduce numeric drift risk (remove numeric-heavy `[VISUAL:*]` markers; refresh `lastVerified`) (`src/data/blogPosts.ts`).

### Favicons
- Add PNG favicons, Apple touch icon, and web manifest; wire in `index.html` (`public/*`, `index.html`).

### ORC Glossary
- Add missing glossary entry for ORC § 2907.07 (Importuning) (`src/data/statutes.ts`).

## 2025-12-15

### Deploy / Publish Reliability (Bolt)
- Prevent Bolt publish failures when dev-only tooling isn’t installed by dynamically importing `rollup-plugin-visualizer` only in `--mode analyze` (`vite.config.ts`).
- Keep Bolt publish payload safe by ensuring `.boltignore` does not exclude required source folders (notably `og/`), while still excluding local output like `reports/` (`.boltignore`).

### ORC Glossary Trust Metadata + Drift Controls
- Add `lastVerified` + `sources` to ORC glossary entries and render them consistently (`src/data/statutes.ts`, `src/components/GlossaryEntry.tsx`).
- Add a prebuild check that fails the build if the codebase references an ORC section that isn’t defined in the glossary (`scripts/check-orc-references.mjs`, `package.json`).

## 2025-12-14

### Lighthouse: Accessibility + Performance (No Layout Changes)
- Improve text contrast and focus-ring behavior sitewide (adds accessible brand text tokens and uses `:focus-visible`) (`tailwind.config.js`, `src/**`).
- Reduce CLS and improve LCP on blog pages by reserving image dimensions, adding decode/loading hints, and stabilizing blog post hero aspect ratio (`src/pages/BlogPostPage.tsx`, `src/pages/BlogPage.tsx`, `src/components/BlogSection.tsx`, `src/components/RelatedPosts.tsx`).

### Mobile UI: Floating Buttons + Header CTA
- Align floating chat + accessibility buttons to a shared bottom-right offset and shrink footprint after scroll/timeout (`src/components/Layout.tsx`, `src/components/AccessibilityLauncher.tsx`, `src/components/ChatIntakeLauncher.tsx`).
- Adjust mobile header CTA to show the office number as click-to-call text with Consult CTA aligned cleanly (`src/components/SiteHeader.tsx`).

### DUI Checkpoints: Source Attribution
- Hide aggregator attribution (OVICheckpoint/DUIBlock) in public checkpoint cards and map popups while preserving internal traceability (`src/components/CheckpointCard.tsx`, `src/components/CheckpointMap.tsx`, `src/data/checkpoints.ts`).
- Prevent scraper runs from overwriting manually curated non-aggregator sources on existing rows (`supabase/functions/checkpoint-scraper/index.ts`).
- Track follow-up work for “credible source” backfill and multi-source model (`docs/TROUBLE-TICKETS.md`).

## 2025-12-13

### Checkpoints + Admin Reliability
- Add `mango-law-website/.boltignore` to prevent local publish tools from uploading `node_modules/` (scoped `@...` paths can trigger “unsupported filename character” errors).
- Make `/admin/connections` call Edge Functions via `supabase.functions.invoke(...)` to reduce Supabase project drift and fix OAuth URL generation inconsistencies (`src/pages/ConnectionsPage.tsx`).
- Pin the frontend Supabase client to the production project to eliminate cross-project drift (fixes “demo/seed checkpoints showing up” and OAuth redirect URIs pointing at stale projects) (`src/lib/supabaseClient.ts`).
- Add “Select resource” persistence (GSC property / GA4 property / GTM container / GBP location) so integrations can become `Connected (healthy)` and future sync has an explicit target (`src/pages/ConnectionsPage.tsx`).
- Harden manual announcement saves against schema drift by adding an upsert fallback when `source_url` uniqueness constraints are missing (`src/lib/checkpointAnnouncementsService.ts`).
- Update OVICheckpoint scraper to ingest the authoritative WordPress JSON page and parse the TablePress checkpoint table (`supabase/functions/checkpoint-scraper/ovicheckpoint-scraper.ts`).
- Make the public checkpoints page hide seed/demo rows by requiring a non-null `source_url` (mitigation while production DB is cleaned) (`src/lib/checkpointService.ts`, `src/pages/DUICheckpointsPage.tsx`).
- Document current operational blockers and mitigations (`docs/OPERATIONS.md`, `docs/TROUBLE-TICKETS.md`, `docs/HANDOFF_GLOSSARY.md`).
- Ops: ensure Supabase Edge Function secrets include a valid `MAPBOX_PUBLIC_TOKEN` so the scraper can geocode and map markers appear (no code change).

### Performance + SEO
- Split heavy routes into separate chunks (notably `/resources/dui-checkpoints` + admin pages) to reduce initial JS on the homepage (`src/App.tsx`, `src/pages/HomePage.tsx`).
- Reduce font downloads by switching @fontsource imports to latin subsets only (`src/styles/tailwind.css`).
- Fix Schema.org validator errors by using a single JSON-LD graph for LegalService + founder Person, and by switching the About page schema to `Person` + `hasOccupation` (`src/lib/seo.tsx`).

## 2025-12-12

### UI Polish + Contact Number Hardening
- Unify header sitewide (same homepage header on all routes) and fix broken logo references (`src/components/SiteHeader.tsx`).
- Remove duplicate mobile bottom CTA bar and clean up mobile spacing (`src/components/Layout.tsx`).
- Calm/compact the checkpoint “help now” sticky banner for mobile (prevents phone wrapping and avoids loud alert styling) (`src/components/EmergencyBanner.tsx`).
- Fix mobile chat window overflow/cut-off and improve long-text wrapping (`src/components/chat/ConversationWindow.tsx`, `src/components/chat/ChatBubble.tsx`).
- Add floating chat progressive disclosure + chooser (Chat / Call / Consult) and wire lead modal open tracking (`src/components/ChatIntakeLauncher.tsx`, `src/lib/analytics.ts`).
- Add explicit GA4/GTM `dataLayer` events for header call/consult and checkpoint banner CTAs (`src/components/SiteHeader.tsx`, `src/components/EmergencyBanner.tsx`).
- Tighten floating chat placement on small screens to avoid edge clipping (`src/components/ChatIntakeLauncher.tsx`).
- Upgrade `/admin/connections` to separate Connect vs Configure: status pills (not connected / needs setup / healthy / reconnect), setup guide, and admin “Check status” action (`src/pages/ConnectionsPage.tsx`).
- Add admin-only Edge Function to power “Check status” and audit log events (`supabase/functions/google-access-check/index.ts`).
- Canonicalize the office phone number sitewide as `(740) 602-2155` and avoid using personal/direct numbers in public UI (`src/lib/contactInfo.ts`).
- Fix Bolt publish failures by renaming/removing files with unsupported filename characters (spaces/Unicode) (`public/images/brand/`, `mango-logo-options-1-new.zip`).
- Add a `prebuild` filename safety check to prevent publish failures from slipping in (`scripts/check-filenames.mjs`, `package.json`).
- Treat staging/preview hosts as production to prevent Supabase project drift (`src/lib/supabaseClient.ts`).
- Add ClickMinded-style “Copy naming” recommendations to Google integration setup guides (`src/pages/ConnectionsPage.tsx`).
- Fix production `mango.law` pointing at the wrong Supabase project by forcing runtime to use the correct prod project (`rgucewewminsevbjgcad`) for Supabase client + function calls (`src/lib/supabaseClient.ts`, `src/pages/ConnectionsPage.tsx`, `src/components/ScraperLogsViewer.tsx`, `src/components/chat/ConversationWindow.tsx`).
- Documentation updates:
  - Add “Do Not Swap” phone mapping and CTA tracking notes (`docs/OPERATIONS.md`)
  - Close logo-generation and floating-chat tickets; keep favicon PNGs ticket open (`docs/TROUBLE-TICKETS.md`)
  - Remove stale Netlify/Vercel mention in generated handoff docs (`src/lib/handoff/documentGenerator.ts`)

## 2025-12-08 (Evening Update)

### CMS Transformation & AI Integration

#### Visual Redesign - WordPress-Inspired Dark Theme
- **Complete CMS Rebrand**: Replaced forest green theme with professional dark charcoal aesthetic
  - Main background: `#0F0F0F` (charcoal black)
  - Card backgrounds: `#1A1A1A` and `#232323` (layered grays)
  - Borders: `#2A2A2A` (subtle separation)
  - Primary accent: `#E8A33C` (mango gold) for CTAs and active states
  - Text: White, slate-400, and slate-300 for hierarchy
- **Design Philosophy**: Modern SaaS aesthetic similar to WordPress, Notion, and Linear
- **Brand Alignment**: Uses existing brand colors from tailwind.config.js
- **Components Updated**: AdminDashboardPage, ReviewManager, and all admin components

#### OpenAI Integration (GPT-4o & GPT-4o Mini)
- **Real AI API Integration**: All mock responses replaced with OpenAI API calls
- **Model Selection System**:
  - gpt-4o-mini: Fast, cost-effective ($0.15/1K tokens) - default for review responses, social media
  - gpt-4o: Premium quality ($2.50/1K tokens) - for blog content, complex queries
  - text-embedding-3-small: Semantic search and embeddings ($0.02/1K tokens)
  - Legacy support: gpt-3.5-turbo and gpt-4-turbo
- **Model Optimization UI**: New ModelSelector component with:
  - Speed/cost/quality ratings with visual indicators
  - Usage tracking and cost monitoring
  - Intelligent recommendations per use case
  - Real-time configuration from database
- **Edge Functions**:
  - `generate-review-response`: Real OpenAI integration with confidence scoring
  - Automatic fallback to mock responses if API key not configured
  - Temperature and token controls per use case

#### Google Business Profile Integration
- **OAuth 2.0 Connection**: Full authentication flow for Google Business Profile API
- **Review Sync System**:
  - `sync-google-reviews` Edge Function: Auto-fetches reviews from Google
  - Refresh token management with automatic token renewal
  - Intelligent upsert logic (new reviews inserted, existing updated)
  - Sync logging with detailed metrics (fetched, new, updated counts)
  - Integration tracking in `google_integrations` table
- **Multi-Platform Review System**:
  - Google, Facebook, LinkedIn review platform support
  - Platform-specific URLs and priorities in `review_platforms` table
  - Short URL support for SMS campaigns
  - Review metrics tracking (total reviews, average rating per platform)

#### Database Enhancements
- **Admin Access Control**:
  - `admin_users` table with role hierarchy (owner, super_admin, admin)
  - Owner: Nick Mango (nick@mango.law) - full system control
  - Super Admin: Tim Sistrunk (tim@sistrunktech.com) - developer access
  - `allowed_domains` for team access (mango.law, sistrunktech.com)
  - `admin_activity_log` for audit trails
- **Google Integrations**:
  - `google_integrations`: OAuth tokens, account IDs, sync frequency
  - `review_platforms`: Multi-platform review URLs and metrics
  - Enhanced `google_reviews` with AI metadata (response_model, response_confidence, auto_pilot_eligible, sentiment_analyzed_at, key_themes)
- **AI Configuration**:
  - `ai_model_config`: Per-use-case model settings with cost tracking
  - 9 pre-configured models with speed/cost/quality ratings
  - Usage counters and total cost tracking

#### Environment Variables & Configuration
- **OpenAI Setup**:
  - `OPENAI_API_KEY`: Main API key (Sistrunk Tech account)
  - `OPENAI_ORG_ID`: Optional organization ID
  - Model selection per use case (6 different use cases configured)
- **Google APIs**:
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: OAuth credentials
  - `GOOGLE_REFRESH_TOKEN`: Long-lived refresh token
  - `GOOGLE_BUSINESS_ACCOUNT_ID`, `GOOGLE_LOCATION_ID`: Business profile identifiers
  - `GOOGLE_SHEETS_SPREADSHEET_ID`: For client imports
- **Review Platform URLs**:
  - Google, Facebook, LinkedIn review URLs pre-configured
  - Ready for campaign email templates

#### Security & Compliance
- **Row Level Security**: All new tables protected with RLS policies
- **Role-Based Access**: Proper permission checks for owner/super_admin/admin roles
- **Token Management**: Secure storage of Google OAuth tokens
- **Activity Logging**: All admin actions tracked for audit compliance

## 2025-12-08 (Morning Update)

### Major Feature Releases

#### DUI Checkpoint Map System (Phase 3 & 4)
- **Interactive Mapbox GL Map**: Full-featured checkpoint visualization with status-based markers
  - Active checkpoints: Red markers
  - Upcoming checkpoints: Orange markers
  - Completed checkpoints: Green markers
  - Cancelled checkpoints: Gray markers
- **Map Features**:
  - Auto-fit bounds to show all checkpoints
  - User location with animated "Find Me" button and pulsing marker
  - Interactive popups with full checkpoint details
  - Smooth fly-to animations on checkpoint selection
  - Navigation and scale controls
  - Status legend overlay
  - Loading states and error handling
  - Empty state messaging
- **Database Tables**:
  - `dui_checkpoints`: Stores checkpoint locations, schedules, and metadata with indexed fields for efficient querying
  - `geocoding_cache`: Caches Mapbox geocoding results with hit tracking to minimize API calls
  - `scraper_logs`: Tracks all scraper execution for monitoring and debugging
- **Checkpoint Scraper Edge Function**:
  - Automated OVICheckpoint.com scraper with HTML parsing
  - Mapbox geocoding integration with aggressive caching strategy
  - Intelligent deduplication and update logic
  - Comprehensive error handling and logging
  - Rate limited to 5 requests per hour
- **Scheduled Automation**:
  - pg_cron extension enabled for scheduled jobs
  - pg_net extension for async HTTP requests
  - Daily scraper runs at 2:00 AM EST (7:00 AM UTC)
  - Helper functions for manual triggers and log cleanup
- **Geocoding Service**:
  - Mapbox Geocoding API integration
  - Address normalization and validation
  - Confidence scoring (high/medium/low)
  - Cache hit tracking and metadata storage
  - Fallback handling for failed geocoding

#### Admin Dashboard (Phase 5)
- **Checkpoint Management Page** (`/admin/checkpoints`):
  - Full CRUD operations for checkpoint data
  - Real-time geocoding preview as you type addresses
  - Confidence level indicators and formatted address display
  - Manual checkpoint entry form with all fields
  - Edit and delete functionality with confirmation dialogs
- **Scraper Logs Viewer**:
  - Real-time view of scraper execution history
  - Success/failure stats with color-coded status badges
  - Detailed error reporting with checkpoint-level granularity
  - Manual scraper trigger button
  - Duration tracking and performance metrics
  - Pagination and refresh controls
- **Geocoding Preview Component**:
  - Debounced real-time address validation
  - Automatic coordinate population
  - Confidence level visualization
  - Formatted address display from geocoding service

#### Conversational Chat System (Phase 2)
- **Chat Interface**:
  - Conversational UI with bot and user message styling
  - Typing indicators with animated dots
- Step-by-step flow: name → phone → email → message → confirmation
  - localStorage persistence with 30-minute session timeout
  - Delayed follow-up messages (20-30 seconds after confirmation)
- **Phone Number Handling**:
  - Real-time formatting: (XXX) XXX-XXXX
  - Input validation and error messaging
  - Automatic formatting as user types
- **SMS Notifications** (Zero Additional Cost):
  - Email-to-SMS gateway integration (Verizon/AT&T)
  - Instant mobile alerts to office, attorney, and test numbers
  - No Twilio subscription required
  - Configured via environment variables:
    - `SMS_GATEWAY_OFFICE`: 7406022155@vtext.com
    - `SMS_GATEWAY_NICK`: <attorney_cell>@vtext.com (internal notifications only)
    - `SMS_GATEWAY_TEST`: 6149000604@vtext.com
    - `ENABLE_SMS_LEAD_ALERTS`: true/false to toggle SMS notifications
- **Enhanced chat-intake Edge Function**:
  - Full SMS notification support
  - Conversation context tracking
  - Rate limited to 20 requests per minute

### Frontend Enhancements

#### Visual Statistics Components for Blog Posts (Phase 1)
- Created comprehensive library of visual statistics components in `src/components/blog/`:
  - `StatCard`: Large number displays with icons for key statistics
  - `ComparisonCard`: Side-by-side comparison cards for contrasting data
  - `TimelineBar`: Visual timeline displays for durations and periods
  - `CostBreakdown`: Itemized cost displays with visual hierarchy
  - `PenaltyGrid`: Responsive penalty tables for legal consequences
  - `ProgressBar`: Percentage displays with animated bars
  - `IconStat`: Compact inline statistics with icons
  - `HighlightBox`: Color-coded callout boxes for important information
- Updated `BlogPostPage` to support visual component markers in blog content using `[VISUAL:COMPONENT_NAME]` syntax
- Enhanced OVI/DUI blog post with penalty grid and cost breakdown visualizations
- Improved blog post readability with better spacing, typography, and visual breaks

#### Practice Areas Page Enhancements
- Added featured images to all practice area cards using existing generated hero images
- Updated `PracticeArea` type to include `imageUrl` and `imageAlt` fields
- Enhanced card styling with subtle background images and overlay effects:
  - Featured OVI/DUI card: Full-width background image with gradient overlay (right side on desktop)
  - Standard cards: Subtle background images with gradient overlays for depth
  - Increased opacity on hover for enhanced interactivity
- Improved visual hierarchy and engagement with layered design approach
- All practice area images properly referenced from `/images/generated/` directory:
  - Criminal Defense: `criminal-defense-hero.png`
  - OVI/DUI Defense: `ovi-dui-defense-hero.png`
  - Drug Crimes: `drug-crimes-defense-hero.png`
  - Sex Crimes: `sex-crimes-defense-hero.png`
  - White Collar: `white-collar-defense-hero.png`
  - Protection Orders: `protection-order-defense-hero.png`
  - Personal Injury: `personal-injury-hero.png`

### Developer Experience
- Created modular component exports in `src/components/blog/index.ts` for easy importing
- Maintained brand consistency with mango/gold/leaf color palette across all new components
- Ensured full responsiveness for mobile and desktop layouts
- Added accessibility features including proper alt text for images

### Dependencies Added
- `mapbox-gl` and `@types/mapbox-gl`: Interactive map functionality
- All dependencies properly configured with TypeScript support

### Environment Variables Added
- `VITE_MAPBOX_PUBLIC_TOKEN`: Mapbox API access token (client-side)
- `MAPBOX_PUBLIC_TOKEN`: Fallback token for server-side usage
- `VITE_MAPBOX_STYLE_URL`: Optional custom Mapbox style URL
- `SMS_GATEWAY_OFFICE`: Email-to-SMS gateway for office notifications (format: phone@carrier-gateway.com)
- `SMS_GATEWAY_NICK`: Email-to-SMS gateway for attorney notifications (internal; not a public “call” number)
- `SMS_GATEWAY_TEST`: Email-to-SMS gateway for test notifications
- `ENABLE_SMS_LEAD_ALERTS`: Enable/disable SMS notifications via email-to-SMS gateways

### Database Migrations
- `20251208022003_add_dui_checkpoints_table.sql`: Core checkpoint storage
- `20251208023600_fix_security_issues.sql`: RLS policy fixes
- `20251208174018_add_checkpoint_support_tables.sql`: Geocoding cache and scraper logs
- `add_checkpoint_support_tables.sql`: Helper functions and indexes
- `setup_checkpoint_scheduler.sql`: pg_cron configuration
- `improve_checkpoint_scheduler.sql`: pg_net integration

### Edge Functions Deployed
- `checkpoint-scraper`: Automated checkpoint data collection with geocoding
  - `index.ts`: Main scraper orchestration
  - `ovicheckpoint-scraper.ts`: OVICheckpoint.com HTML parser
  - `geocoding.ts`: Mapbox geocoding service with caching

### Documentation Updates (Phase 6)
- Comprehensive `docs/OPERATIONS.md` updates:
  - DUI Checkpoint Map System section
  - Admin Dashboard section
  - Blog System section
  - Chat System section
  - Updated environment variables list
  - Updated database schema documentation
  - Updated Edge Functions list
- `CHANGELOG.md` updated with all Phase 1-6 features

## 2025-12-06

### Frontend & Content
- Replaced placeholder attorney photos with production headshots (`nick-mango-hero.jpg`, `nick-mango-01.jpg`, `geoff-spall-01.jpg`) and wired Nick’s hero/About images to avoid cropping issues.
- Standardized logo usage (later superseded by 2025-12-12): header/footer wired to the current official brand assets under `public/images/brand/`.
- Updated contact details to the canonical office/main line (`740-602-2155`) across header, CTA, and About.

### Image/OG Pipeline
- Added fal.ai + Supabase OG pipeline (`plugins/vite-og-plugin.ts`) that generates route-specific OG images at build time when `FAL_KEY` and Supabase service-role envs are present.
- Introduced reusable helpers (`scripts/fal-client.ts`, `scripts/supa-upload.ts`) and prompts in `og/og-specs.ts`; emits `og-manifest.json` and injects home OG tags automatically.
- Image generator script now supports text and image-to-image (Recraft v3) with batch, strength, style, and color controls; uploads to Supabase bucket when configured.

### Operations
- Documented DNS pointing to Bolt via Porkbun (ALIAS `mango.law` → `site-dns.bolt.host`, CNAME `www`/`staging` → `site-dns.bolt.host`) and matching origin allowlist entries.
- Clarified env expectations: `SB_BUCKET=og-images`, `OG_SIGNED_URL_TTL=31536000`, real Supabase URL, and fal.ai/FAL_KEY required for OG generation in CI.

## 2025-12-04

### Infrastructure & Backend
- Initialize Mango Law website scaffold (React/Vite/TS, Tailwind brand tokens, routing, components, contact form stub).
- Add CI workflow (build) and PR template.
- Expand `.env.example` with deployment-related variables and chat/email keys.

### Database Schema
- Define lead intake tables (`contact_leads`, `chat_leads`) and RLS policies (implemented via migrations; see 2025-12-23).
- Deploy `rate_limit_requests` table for API rate limiting with automatic cleanup.
- Add performance indexes on email, created_at, and rate limiting lookup.

### Edge Functions
- Deploy `submit-contact` function with comprehensive validation, honeypot protection, and email notifications.
- Deploy `chat-intake` function with similar features for chat widget integration.

### Security Enhancements
- **Rate Limiting**: Database-backed rate limiting (10 req/min for contact, 20 req/min for chat) with HTTP 429 responses.
- **Security Headers**: All Edge Function responses include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Structured Logging**: JSON-formatted logs with timestamp, level, endpoint, IP, user agent, status, duration, and error details.
- **Input Validation**: Email/phone format validation, required field checks, spam protection via honeypot.
- **CORS Protection**: Origin validation against ORIGIN_ALLOWLIST with proper preflight handling.

### Documentation
- Update `docs/OPERATIONS.md` with detailed security features and deployment status.
- Document rate limiting configuration and security header implementation.
