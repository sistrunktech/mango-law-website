# Mango Law Website

Modern criminal defense website for **Mango Law LLC** (Delaware, Ohio), built on the Sistech Website 2025 reproducible framework.

> Official Mango Law LLC website — React/Vite, Supabase forms, full law-firm architecture, and Windsurf/Codex-ready automation.

## Features

- **Modern React + Vite frontend** with TypeScript
- **Sistech Law v1 component library** (PageHero, PracticeAreaCards, CTA sections, Testimonials, etc.)
- **Supabase Edge Function integrations** (`submit-contact`, environment-guarded secrets)
- **Tailwind design tokens** for the Mango Law brand
- **Bolt.new / Windsurf agent compatibility** (scaffolding, build, deploy)
- **SEO-optimized** practice-area and location pages for Delaware, OH
- **Staging → production deploy pipeline** with clean parity checks

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

1. Windsurf / Codex scaffolds new components or pages
2. Code merged into `staging` triggers Vite build + Supabase validation
3. Bolt.new deploys staging for parity review
4. PR from `staging` → `main` triggers full build + production deploy
5. DNS routes mango.law → Bolt production environment

### Required Secrets

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_NOTIFY_TO` | Email for contact form notifications |
| `FROM_EMAIL` | Sender email address |

## Documentation

- **Operations guide:** [`docs/OPERATIONS.md`](docs/OPERATIONS.md)
- **Changelog:** [`CHANGELOG.md`](CHANGELOG.md)
- **Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)

## License

[MIT](LICENSE)
