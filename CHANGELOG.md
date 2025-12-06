# Changelog

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
