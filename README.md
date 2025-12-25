# Mango Law Website

Modern criminal defense website for **Mango Law LLC** (Delaware, Ohio), built on a React/Vite + Supabase stack with a GTM-first analytics contract and an admin panel for operational tooling.

## Features

- **Modern React + Vite frontend** with TypeScript
- **Sistech Law v1 component library** (PageHero, PracticeAreaCards, CTA sections, Testimonials, etc.)
- **Supabase Edge Function integrations** (`submit-contact`, `submit-lead`, `chat-intake`)
- **GTM-first analytics** via explicit `window.dataLayer` events (`mango_page_view`, `cta_click`, `lead_submitted`) — no GTM click selectors required
- **Tailwind design tokens** for the Mango Law brand
- **Bolt.new / Windsurf agent compatibility** (scaffolding, build, deploy)
- **SEO-optimized** practice-area and location pages for Delaware, OH
- **Optional bot protection** via Cloudflare Turnstile (client + server verification)

## Brand Tokens

These are defined in `tailwind.config.js`.

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.black` | `#0A0A0A` | Primary text |
| `brand.offWhite` | `#FAF9F7` | Backgrounds |
| `brand.mango` | `#E8A33C` | Primary CTA/accent |
| `brand.mangoText` | `#B45309` | WCAG-safe mango for text on light backgrounds |
| `brand.leaf` | `#2F5F4F` | Primary green accent |
| `brand.goldText` | `#8A6A18` | WCAG-safe gold for text on light backgrounds |

## Quick Start

```bash
git clone https://github.com/sistrunktech/mango-law-website.git
cd mango-law-website
npm install
cp .env.example .env  # Configure your environment
npm run dev
```

## Hosting + Deploy Model (Important)

- Bolt publishes the **frontend** (Vite build output).
- Supabase **Edge Functions** + **DB migrations** are deployed separately (see `docs/OPERATIONS.md`).
- If the live site looks “stuck”, verify the deploy by checking View Source for a new `/assets/index-*.js` filename.

## Analytics (GTM-first)

This site includes a single GTM container in `index.html` (`GTM-WLJQZKB5`). The app pushes explicit events to `window.dataLayer`:

- `mango_page_view`
- `cta_click`
- `lead_submitted` (single conversion event for outreach, includes `lead_source` and `checkpoint_id`)

Do not hard-code the GA4 `gtag.js` snippet anywhere in the site — GA4 should be configured inside GTM.

## Admin Panel (Google Connectors)

Use `/admin/connections` to connect Google tools and select the correct resources:
- **Analytics (GA4)**: select **Account** + **Property**
- **Search Console**: prefer `sc-domain:mango.law` if available
- **Tag Manager**: select **Account** + **Container**

If you see missing lists or “wrong account” behavior, it’s almost always one of:
- The connected Google user doesn’t have access to that account/property/container
- The OAuth app scopes/consent weren’t granted for the right Google account
- Google APIs are rate-limited or returning partial results (reconnect + re-check)

## Environment Variables / Secrets

Use `mango-law-website/.env.example` as the authoritative list. Keep it updated whenever env vars change.

Commonly required values:
- Frontend: `VITE_SITE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Forms + email delivery (Edge Functions): `RESEND_API_KEY`, `FROM_EMAIL`, `CONTACT_NOTIFY_TO`, `CONTACT_NOTIFY_BCC`, `CHAT_LEAD_NOTIFY_TO`, `CHAT_LEAD_NOTIFY_BCC`, `ORIGIN_ALLOWLIST`
- Turnstile (optional): `VITE_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- Email theme config: `APP_ENV`, `APP_THEME`, `APP_SEASON`, `APP_HOLIDAY`, `FRONTEND_URL`

## Documentation

- **Operations guide:** [`docs/OPERATIONS.md`](docs/OPERATIONS.md)
- **Keyboard accessibility guide:** [`docs/KEYBOARD-ACCESSIBILITY-GUIDE.md`](docs/KEYBOARD-ACCESSIBILITY-GUIDE.md)
- **Changelog:** [`CHANGELOG.md`](CHANGELOG.md)
- **Contributing:** [`CONTRIBUTING.md`](CONTRIBUTING.md)

## License

[MIT](LICENSE)
