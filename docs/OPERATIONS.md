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

## Secrets Placement
- GitHub Actions: secrets and variables have been added via `gh secret set` / `gh variable set`. Replace placeholder Supabase values (`VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`, `VITE_SUPABASE_URL`) with real env-specific keys.
- Supabase: mirror the same secrets per environment; do not expose `SERVICE_ROLE_KEY` or `SUPABASE_JWT_SECRET` to the client.
- Keep service-role keys server-side only; client should only see `VITE_*` and non-sensitive config.

## Edge Functions (to implement)
- `submit-contact`: validate payload + honeypot, insert into Supabase, send notification via Resend, honor `ORIGIN_ALLOWLIST`, add rate limiting/logging.
- `chat-intake` (optional): similar pattern for chat leads.

## Database (planned)
- Supabase Postgres with tables `contact_leads` (id, name, email, phone, message, how_heard, source, meta JSONB, created_at) and `chat_leads` (similar).
- Enable RLS; allow inserts via Edge Functions using service key; audit/log access.
- Backups/PITR via Supabase defaults; add monitoring alerts when available.

## CI/CD
- Build-only workflow in `.github/workflows/ci.yml` (Node 20, npm ci, npm run build).
- TODO: add staging/prod deploy jobs with env-specific secrets, run migrations, and smoke tests before cutover.

## Agent/PR Expectations
- When adding/updating env vars or infra, update `.env.example`, this `docs/OPERATIONS.md`, and `CHANGELOG.md`.
- Keep PR descriptions clear and include any new secrets/variables that must be set in GitHub and Supabase.
- Preserve brand tokens and Inter typography; avoid introducing new deps without discussion.
