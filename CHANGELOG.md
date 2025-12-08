# Changelog

## 2025-12-08

### Frontend Enhancements

#### Visual Statistics Components for Blog Posts
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

## 2025-12-06

### Frontend & Content
- Replaced placeholder attorney photos with production headshots (`nick-mango-hero.jpg`, `nick-mango-01.jpg`, `geoff-spall-01.jpg`) and wired Nick’s hero/About images to avoid cropping issues.
- Standardized logo usage: header uses `mango-logo-horizontal.svg`, footer uses `mango-logo-vertical.svg`; removed duplicate gold separator bar and kept gradient accent only.
- Updated contact details to real numbers (office `740-417-6191`, cell `740-602-2155`) across header, CTA, and About.

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
- Deploy `contact_leads` table with RLS policies (service_role INSERT/SELECT only).
- Deploy `chat_leads` table with conversation context support and RLS policies.
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
