# Operations Guide

This document tracks current environment expectations, secrets handling, CI/CD, and what to update when changes are made.

## Stack
- React 18 + Vite + TypeScript, Tailwind with Mango brand tokens.
- React Router v6 routes for all pages in the sitemap.
- Supabase client initialized in `src/lib/supabaseClient.ts` for the contact form.
- CI: GitHub Actions build workflow (`.github/workflows/ci.yml`).

## Environment Variables
- Client-exposed (`VITE_`): `VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- Server/CI-only: `SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `RESEND_API_KEY`, `AI_CHAT_API_KEY`.
- Config (non-secret): `FROM_EMAIL`, `CONTACT_NOTIFY_TO`, `APP_ENV`, `ORIGIN_ALLOWLIST`, `CHAT_LEAD_NOTIFY_TO`, `CHAT_LEAD_SOURCE_LABEL`, `AI_CHAT_PROVIDER`, `AI_CHAT_MODEL`.
- See `.env.example` for the full list; update it whenever variables change.
- Current allowlist should include staging/Bolt hosts: `https://mango.law`, `https://staging.mango.law`, and `https://sistrunktech-mango-l-lqhi.bolt.host` (add/remove as environments change).

## Secrets Placement
- GitHub Actions: secrets and variables have been added via `gh secret set` / `gh variable set`. Replace placeholder Supabase values (`VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `VITE_SUPABASE_URL`) with real env-specific keys.
- Supabase: mirror the same secrets per environment; do not expose `SERVICE_ROLE_KEY` or `SUPABASE_JWT_SECRET` to the client.
- Keep service-role keys server-side only; client should only see `VITE_*` and non-sensitive config.

## Edge Functions (deployed)
- **submit-contact**: Validates payload with honeypot protection, inserts into `contact_leads`, sends notification via Resend. Includes CORS validation against `ORIGIN_ALLOWLIST`, rate limiting (10 req/min per IP), comprehensive security headers, and structured JSON logging.
- **chat-intake**: Similar pattern for chat leads with conversation context support. Rate limited to 20 req/min per IP.

### Security Features
- **Security Headers**: All responses include CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.
- **Rate Limiting**: Database-backed rate limiting tracks requests per IP/endpoint. Returns HTTP 429 with Retry-After header when limits exceeded. Limits: submit-contact (10/min), chat-intake (20/min).
- **Structured Logging**: JSON-formatted logs include timestamp, level, message, endpoint, method, IP, user agent, status, duration, and error details.
- **Input Validation**: Email format, phone format, required fields validated before processing.
- **Spam Protection**: Honeypot field detection for bot submissions.

## Database (deployed)
- **contact_leads**: Captures form submissions (id, name, email, phone, message, ip_address, user_agent, created_at).
- **chat_leads**: Captures chat intake submissions (id, name, email, phone, initial_message, conversation_context, ip_address, user_agent, created_at).
- **rate_limit_requests**: Tracks API requests for rate limiting (id, ip_address, endpoint, created_at). Auto-cleanup removes records older than 1 hour.
- **RLS Enabled**: All tables use Row Level Security. Service role can INSERT/SELECT, all other operations denied by default.
- **Indexes**: Added on email and created_at for performance; composite index on (ip_address, endpoint, created_at) for rate limiting.
- **Backups/PITR**: Via Supabase defaults; add monitoring alerts when available.

## CI/CD
- Build-only workflow in `.github/workflows/ci.yml` (Node 20, npm ci, npm run build).
- TODO: add staging/prod deploy jobs with env-specific secrets, run migrations, and smoke tests before cutover. Target hosts today: Bolt staging `https://sistrunktech-mango-l-lqhi.bolt.host`, production `https://mango.law` (and `https://staging.mango.law` when live).

## Agent/PR Expectations
- When adding/updating env vars or infra, update `.env.example`, this `docs/OPERATIONS.md`, and `CHANGELOG.md`.
- Keep PR descriptions clear and include any new secrets/variables that must be set in GitHub and Supabase.
- Preserve brand tokens and Inter typography; avoid introducing new deps without discussion.
