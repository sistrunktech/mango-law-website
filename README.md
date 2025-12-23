# Mango Law Website

Modern criminal defense website for **Mango Law LLC** (Delaware, Ohio), built on the Sistech Website 2025 reproducible framework.

> Official Mango Law LLC website — React/Vite, Supabase forms, full law-firm architecture, and Windsurf/Codex-ready automation.

## Features

- **Modern React + Vite frontend** with TypeScript
- **Sistech Law v1 component library** (PageHero, PracticeAreaCards, CTA sections, Testimonials, etc.)
- **Supabase Edge Function integrations** (`submit-contact`, `submit-lead`, `chat-intake`)
- **GTM-first analytics** via explicit `window.dataLayer` events (`mango_page_view`, `cta_click`, `lead_submitted`)
- **Tailwind design tokens** for the Mango Law brand
- **Bolt.new / Windsurf agent compatibility** (scaffolding, build, deploy)
- **SEO-optimized** practice-area and location pages for Delaware, OH
- **Optional bot protection** via Cloudflare Turnstile (client + server verification)

## Brand Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.black` | `#000000` | Primary text |
| `brand.mango` | `#F4A300` | Primary accent |
| `brand.gold` | `#C78A00` | Secondary accent, hover states |
| `brand.offWhite` | `#F9F7F4` | Backgrounds |
| `brand.teal` | `#0F6E63` | Tertiary accent |

## Quick Start

```bash
git clone https://github.com/sistrunktech/mango-law-website.git
cd mango-law-website
npm install
cp .env.example .env  # Configure your environment
npm run dev
```

## Folder Structure

```
mango-law-website/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route pages
│   ├── data/          # Static data files
│   ├── assets/        # Images, fonts
│   ├── styles/        # Global styles, tokens
│   └── lib/           # Utilities, Supabase client
├── public/
│   └── images/        # Brand logos, headshots
├── supabase/
│   ├── functions/     # Edge functions
│   └── migrations/    # Database migrations
├── design/            # Reference assets (Wayback screenshots)
├── .github/workflows/ # CI/CD pipelines
└── docs/              # Operations documentation
```

## Deployment Workflow

1. Code merged into `main`
2. Bolt.new deploys the frontend from `main`
3. Supabase Edge Functions + DB migrations are deployed separately (see `docs/OPERATIONS.md`)

### Deploy Verification (important)
- Confirm the live site is serving the latest build by checking View Source for the current `/assets/index-*.js` filename (it should change after a new deploy).
- If the UI appears “stuck” on old behavior, it’s usually a stale/old frontend deploy rather than Supabase.

### Required Secrets

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_NOTIFY_TO` | Email for contact form notifications |
| `CONTACT_NOTIFY_BCC` | Optional BCC for admin notifications |
| `FROM_EMAIL` | Sender email address |
| `ORIGIN_ALLOWLIST` | Comma-separated allowed origins for Edge Functions |
| `VITE_TURNSTILE_SITE_KEY` | Optional Turnstile site key (client). If omitted, the app falls back to the repo’s default site key in `src/lib/turnstile.ts`. |
| `TURNSTILE_SECRET_KEY` | Optional Turnstile secret key (server) |

## Documentation

- **Operations guide:** [`docs/OPERATIONS.md`](docs/OPERATIONS.md)
- **Changelog:** [`CHANGELOG.md`](CHANGELOG.md)
- **Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)

## License

[MIT](LICENSE)
