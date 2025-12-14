# PageSpeed Insights Report Summary (2025-12-14)

**Scope:** https://mango.law/ homepage

This folder contains the raw PSI exports and extracted text:
- `pagespeed-desktop.pdf`
- `pagespeed-mobile.pdf`
- `pagespeed-desktop.txt` (text extracted from PDF)
- `pagespeed-mobile.txt` (text extracted from PDF)

## Headline metrics

### Desktop
- **Performance:** 99
- **FCP:** 0.4s
- **LCP:** 0.7s
- **TBT:** 0ms
- **CLS:** 0.048
- **Speed Index:** 0.7s

### Mobile
- **Performance:** 85
- **FCP:** 2.3s
- **LCP:** 3.7s
- **TBT:** 0ms
- **CLS:** 0
- **Speed Index:** 4.3s

## Audit findings and fix outline

### 1) Render-blocking requests
- **Desktop:** “Render blocking requests — Est savings of 130ms”
- **Mobile:** “Render blocking requests — Est savings of 1,220ms”
- **Observed:** `/assets/index-*.css` is on the critical path.

**Fix plan**
- Keep CSS small and ensure critical styles are minimal.
- Verify Vite config doesn’t inline large CSS or block rendering unnecessarily.
- Consider preloading critical CSS or splitting non-critical CSS if feasible.

**Related TODOs**
- TODO `29`, `60`

### 2) Improve image delivery (largest opportunity on mobile)
- **Desktop:** “Improve image delivery — Est savings of 1,001KiB”
- **Mobile:** “Improve image delivery — Est savings of 746KiB”

**PSI called out specific images (mobile)**
- `/images/generated/personal-injury-hero.png`
  - Larger than needed for displayed dimensions; recommends responsive images + modern format.
- `/images/headshots/nick-mango-hero.jpg`
  - Larger than needed for displayed dimensions; recommends responsive images + modern format.
- Multiple `/images/generated/*-hero.png` images (white collar, protection order, drug crimes, criminal defense, etc.)
  - Larger than needed for displayed dimensions.
- `/images/brand/mango-logo-tagline-cropped.png`
  - File is much larger than needed for displayed dimensions.

**Fix plan**
- Convert large PNG/JPG images to **AVIF/WebP** variants.
- Serve **responsive images** (`srcset`/`sizes`) for hero + tile imagery so mobile downloads smaller variants.
- Ensure any above-the-fold LCP candidate is **not lazy-loaded**; keep `fetchpriority="high"` only for the true LCP element.
- Standardize image dimensioning to avoid shipping large originals for small rendered sizes.

**Related TODOs**
- TODO `29`, `60`, `55`

### 3) Reduce unused JavaScript
- **Desktop & Mobile:** “Reduce unused JavaScript — Est savings of 60KiB”
- **Observed:** bundle called out was `/assets/index-*.js`.

**Fix plan**
- Confirm route-level / component-level code splitting is effective for homepage.
- Audit libraries that ship to homepage unnecessarily.
- Verify third-party scripts are deferred/loaded conditionally.

**Related TODOs**
- TODO `29`, `60`

### 4) Efficient cache lifetimes
- **Desktop & Mobile:** “Use efficient cache lifetimes — Est savings of 1KiB”

**Fix plan**
- Ensure static assets (`/assets/*`, `/images/*`) are served with long-lived immutable caching via hosting/CDN.

**Related TODOs**
- TODO `60`

### 5) Third-party impact (bolt badge)
- **Desktop & Mobile:** PSI flags 3rd-party code and specifically references:
  - `bolt.new /badge.js?...`

**Fix plan**
- Remove the badge on production builds if it’s not needed.
- If kept, lazy-load it after interaction or after critical content is loaded.

**Related TODOs**
- TODO `29`, `60`

### 6) Forced reflow (mobile diagnostic)
- **Mobile:** “Forced reflow” diagnostic present.

**Fix plan**
- Use Chrome Performance panel to identify layout thrash (read-after-write patterns).
- Check animated/transitioned elements (hero, cards) for expensive layout triggers.

**Related TODOs**
- TODO `60`

## Accessibility findings (PSI)

### 1) Color contrast
- “Background and foreground colors do not have a sufficient contrast ratio.”
- PSI highlights the “FEATURED” pill markup using `text-white` and `bg-brand-mango`.

**Fix plan (no visual redesign)**
- Adjust token/variant for the pill background, or change pill text color to meet contrast.
- Confirm contrast with a11y tooling.

**Related TODOs**
- TODO `59`, `31`

### 2) Touch targets
- “Touch targets do not have sufficient size or spacing.”
- PSI highlights small tag-like links (glossary chips, practice cards).

**Fix plan (no visual redesign)**
- Increase hit area via padding while keeping visual size consistent.
- Ensure minimum target size guidelines are met.

**Related TODOs**
- TODO `59`, `31`

### 3) Heading order
- “Heading elements are not in a sequentially-descending order.”

**Fix plan**
- Ensure the homepage heading structure doesn’t skip levels.
- Keep styling the same; adjust semantic heading tags where appropriate.

**Related TODOs**
- TODO `59`, `31`

## Best Practices (security headers)
PSI lists the following Trust & Safety items:
- Ensure CSP is effective against XSS attacks
- Use a strong HSTS policy
- Ensure proper origin isolation with COOP
- Mitigate clickjacking with XFO or CSP
- Mitigate DOM-based XSS with Trusted Types

**Related TODOs**
- TODO `30`

## Recommended execution order (fastest wins first)
1) Remove/defer the `bolt.new` badge on production.
2) Ship responsive images + modern formats for homepage hero/tile imagery.
3) Address render blocking / CSS critical path.
4) Reduce unused JS on the homepage bundle.
5) A11y: contrast + touch targets + heading order.
6) Security headers via hosting/CDN.
