# PSI Scope → Issue Drafts (2025-12-14)

## Answer

Below is a copy-pasteable set of **GitHub issue drafts** that turns the PSI mobile report into a concrete scope of work, mapped to the **exact files/components** in this repo where the fixes live (or where we should document the non-repo fixes).

Baseline from the PSI mobile export (homepage):

- Performance: **85**
- FCP: **2.3s**
- LCP: **3.7s**
- CLS: **0**
- Primary audits called out: **render-blocking requests (CSS + fonts)**, **image delivery (big savings)**, **unused JS**, **cache lifetimes**, **bolt badge third party**, **forced reflow diagnostic**

The biggest, most reliable wins in this repo are:

1. Stop the **bolt badge** request
2. Fix **image delivery** (modern formats + responsive sizes + prevent “hidden” decorative images from downloading on mobile)
3. Defer **below-the-fold** sections so they do not download during initial load
4. Then tackle CSS/fonts, cache headers, diagnostics

---

## GitHub issue drafts

### 1) P0 PERF: Disable Bolt badge injection (bolt.new/badge.js)

**Labels:** `perf`, `ops`, `p0`

**Why:** PSI flags `bolt.new/badge.js?...` as a third-party request. Repo does not reference it, so this is a hosting setting problem, not a code problem.

**Scope**

- Identify Bolt setting that controls badge injection for production.
- Disable badge for production (or defer it until after interaction if disabling is impossible).
- Verify in DevTools Network that no `bolt.new/badge.js` request happens on first load.
- Document steps in `docs/OPERATIONS.md` so it stays off.

**Files / locations**

- Bolt project settings (non-repo)
- `docs/OPERATIONS.md` (document the “how to disable badge” steps)

**Acceptance criteria**

- On production, no request to `bolt.new/badge.js` on initial page load.
- PSI no longer lists bolt badge under third-party impact.

---

### 2) P0 PERF: Convert practice-area tile images to AVIF/WebP + responsive srcset, and prevent mobile downloads for hidden decorative images

**Labels:** `perf`, `frontend`, `p0`

**Why:** PSI shows large savings across multiple `/images/generated/*.png`. Also, images currently hidden with Tailwind `md:block` are still being fetched on mobile, so “hidden” is not a safe performance strategy by itself.

**Scope**

- Generate modern + responsive variants for each hero image in `public/images/generated/`:

  - `criminal-defense-hero.png`
  - `ovi-dui-defense-hero.png`
  - `drug-crimes-defense-hero.png`
  - `sex-crimes-defense-hero.png`
  - `white-collar-defense-hero.png`
  - `protection-order-defense-hero.png`
  - `personal-injury-hero.png`

- Suggested sizes:

  - Mobile: ~400w (or 480w)
  - Desktop: ~800w and ~1200w (if these show up in larger contexts)
  - Formats: `.avif` and `.webp`, keep the original PNG as fallback for safety

- Update `PracticeAreaCardGrid` to use `<picture>` + `srcSet` + `sizes`.
- Prevent decorative background image downloads on mobile by not rendering the `<img>/<picture>` at all until `(min-width: 768px)` (matchMedia). Relying on CSS `display:none` is not sufficient.
- Optional but recommended: add a tiny reusable component (ex: `ResponsivePicture`) so other pages can reuse the pattern.

**Files / locations**

- `src/components/PracticeAreaCardGrid.tsx` (render logic for images and current “md:block” hiding)
- `src/data/practiceAreas.ts` (current image URLs that point to PNGs)
- `public/images/generated/*` (add the new optimized assets)
- Optional:

  - `src/components/ResponsivePicture.tsx`
  - `scripts/optimize-images.mjs` + `package.json` script (dev-only helper to generate variants)

**Acceptance criteria**

- On mobile PSI:

  - The transfer size for practice-area hero images drops materially (goal: each decorative tile image is either not fetched on mobile, or fetched as a small modern format).
  - “Improve image delivery” estimated savings drops significantly.

- On desktop:

  - Images still appear, no visual regression, no broken assets.

---

### 3) P0 PERF: Optimize Nick hero headshot (LCP-adjacent) with AVIF/WebP + srcset

**Labels:** `perf`, `frontend`, `p0`

**Why:** PSI calls out `/images/headshots/nick-mango-hero.jpg` as oversized for its displayed dimensions, with large estimated savings.

**Scope**

- Create AVIF/WebP variants for `public/images/headshots/nick-mango-hero.jpg`.
- Suggested widths: `332w`, `664w`, optionally `800w` (depending on layout).
- Update the HomePage hero image to:

  - Use `<picture>` with AVIF/WebP + fallback jpg
  - Include `srcSet` and `sizes`
  - Keep `fetchpriority="high"` (already present)
  - Keep explicit `width` and `height` to avoid CLS (already present)

**Files / locations**

- `src/pages/HomePage.tsx`
- `public/images/headshots/nick-mango-hero.*` (new variants alongside the original)

**Acceptance criteria**

- Mobile PSI shows reduced transfer size for the hero headshot.
- No layout shift, no cropping regressions.

---

### 4) P0 PERF: Optimize header logo asset (mango-logo-tagline-cropped) to avoid shipping a large PNG sitewide

**Labels:** `perf`, `frontend`, `p0`

**Why:** PSI flags `/images/brand/mango-logo-tagline-cropped.png` with essentially full savings, meaning it is far larger than necessary.

**Scope**

- Produce an optimized logo asset suitable for the rendered size:

  - Prefer: WebP (or AVIF if it stays crisp enough), plus PNG fallback
  - Provide 1x and 2x versions (ex: `logo@1x.webp`, `logo@2x.webp`)

- Update header logo rendering:

  - Use `<picture>` with modern formats
  - Set realistic `width`/`height` attributes that match the displayed aspect ratio to avoid decode overhead and keep CLS stable

- Confirm this is the only remaining usage (header and any other sitewide usage)

**Files / locations**

- `src/components/SiteHeader.tsx`
- `public/images/brand/*` (new optimized assets)
- Optional: `src/components/Footer.tsx` if it uses the same logo

**Acceptance criteria**

- Logo transfer size drops to single-digit KB range (or close).
- No broken logo, no blurry logo on retina.

---

### 5) P1 PERF: Defer below-the-fold homepage sections so they do not download on first paint (BlogSection + TestimonialsList)

**Labels:** `perf`, `frontend`, `p1`

**Why:** The homepage currently renders `BlogSection` and `TestimonialsList` immediately (wrapped in Suspense), which still triggers the chunk downloads during the initial load. PSI network chain shows blog-related chunks and blogPosts data being pulled on load.

**Scope**

- Introduce a `DeferredSection` wrapper using IntersectionObserver:

  - Do not render the lazy component until it is near the viewport.
  - Use a light placeholder to avoid CLS (fixed min-height or skeleton).

- Apply to:

  - BlogSection
  - TestimonialsList
  - Optionally, any other clearly below-the-fold sections if they trigger significant chunk/data loads.

**Files / locations**

- `src/pages/HomePage.tsx` (where those sections are rendered)
- New: `src/components/DeferredSection.tsx` (or `src/lib/useInView.ts`)

**Acceptance criteria**

- On initial homepage load:

  - Blog and testimonials chunks are not requested until scroll nears their section.

- PSI:

  - “Reduce unused JS” improves (or at least moves non-critical JS off the critical path).
  - Speed Index improves (likely).

---

### 6) P1 PERF: Add bundle analyzer and use it to target “unused JS” reduction

**Labels:** `perf`, `devex`, `p1`

**Why:** PSI flags unused JS. Without a bundle report, we are guessing.

**Scope**

- Add a bundle visualizer (dev-only).
- Add `npm run analyze` to generate a report after build.
- Identify biggest contributors in the initial/homepage critical path and cut:

  - Defer optional libraries
  - Ensure icon imports are per-icon (already appears to be the case, verify)
  - Split any large shared chunks if needed

**Files / locations**

- `vite.config.ts`
- `package.json`

**Acceptance criteria**

- A saved bundle report exists for dev workflow.
- A follow-up commit reduces initial JS bytes or eliminates known dead weight.

---

### 7) P2 PERF: Address render-blocking CSS/fonts (minimize critical path without causing FOUC)

**Labels:** `perf`, `frontend`, `p2`

**Why:** PSI flags render-blocking CSS and font files. CSS is small, but font loading and CSS ordering can still affect first paint in an SPA.

**Scope (recommended approach)**

- Keep visuals stable, avoid “preload then swap rel=stylesheet” hacks unless we accept FOUC risk.
- Prefer:

  - Self-hosted font files with stable names in `public/fonts/`
  - `@font-face` in CSS with `font-display: swap`
  - `index.html` preloads for the exact woff2 files used above-the-fold

**Files / locations**

- `src/styles/tailwind.css`
- `index.html`
- `public/fonts/*` (if moving to stable self-hosted)
- `tailwind.config.js` (if typography tokens need adjustment)

**Acceptance criteria**

- Render-blocking savings decreases, or FCP/LCP improves measurably without layout or style regressions.

---

### 8) P2 OPS: Confirm and enforce long-lived immutable caching for /assets and /images

**Labels:** `perf`, `ops`, `p2`

**Why:** PSI flags cache lifetimes (small savings). Still worth fixing for repeat visits and general correctness.

**Scope**

- Verify response headers for:

  - `/assets/*` hashed bundles
  - `/images/*` static images

- If Bolt supports it, ensure:

  - `/assets/*` has `Cache-Control: public, max-age=31536000, immutable`
  - Images have appropriate cache headers

- Document exact settings in `docs/OPERATIONS.md`

**Files / locations**

- Bolt hosting settings (non-repo)
- `docs/OPERATIONS.md`

**Acceptance criteria**

- Static assets are cacheable long-term.
- PSI no longer flags cache lifetimes (or is minimized).

---

### 9) P2 PERF: Investigate and remove “forced reflow” diagnostic (mobile)

**Labels:** `perf`, `debug`, `p2`

**Why:** PSI reports forced reflow, which can indicate layout thrash, scroll handler issues, or read-after-write patterns.

**Scope**

- Reproduce with Chrome Performance panel:

  - Mobile emulation and slow 4G
  - Capture trace on initial load and scroll

- Identify offender and fix:

  - Common suspects: scroll listeners, measuring layout in effects, expensive sticky/fixed UI, repeated DOM reads.

- Patch and re-run performance trace.

**Files / locations (likely)**

- `src/components/SiteHeader.tsx` (scroll listener)
- `src/components/Layout.tsx` (floating UI behavior)
- `src/components/ChatIntakeLauncher.tsx`, `src/components/AccessibilityLauncher.tsx` (if they do scroll/measure work)

**Acceptance criteria**

- Forced reflow warnings reduced or eliminated in profiling.
- PSI diagnostic no longer appears (or appears less frequently).

---

### 10) P1 A11y: Fix touch targets + heading order PSI findings (keep styling, adjust semantics/hit areas)

**Labels:** `a11y`, `frontend`, `p1`

**Why:** PSI mobile shows remaining a11y findings beyond contrast (contrast appears already addressed in a branch).

**Scope**

- Touch targets:

  - Increase padding/hit area on chip-like links and small controls without changing visual hierarchy.

- Heading order:

  - Ensure semantic headings do not skip levels across homepage sections.

**Files / locations (likely)**

- `src/pages/HomePage.tsx` (heading structure)
- `src/components/ORCLabel.tsx` (chip-style links)
- `src/components/PracticeAreaCardGrid.tsx` (click targets)
- Any components rendering tag/chip link clusters

**Acceptance criteria**

- PSI accessibility score improves and no longer flags touch targets and heading order.

---

### 11) P2 SECURITY: Add CSP/HSTS/COOP/XFO headers for static site responses (hosting-level)

**Labels:** `security`, `ops`, `p2`

**Why:** PSI best practices flags missing headers for the static site. Edge functions already do headers, but the site shell itself needs them if hosting supports it.

**Scope**

- Determine if Bolt supports custom headers for static pages.
- If supported, configure:

  - HSTS
  - CSP (careful with any inline scripts and third-party needs)
  - frame-ancestors / XFO
  - COOP/COEP as appropriate (verify it will not break embeds or external integrations)

- Document in `docs/OPERATIONS.md`

**Acceptance criteria**

- PSI best practices no longer flags missing security headers (or significantly reduced).
- No regressions with analytics, forms, or embeds.

---

## Task-to-file mapping summary

| Priority | Work item | Primary files/components |
| --- | --- | --- |
| P0 | Disable Bolt badge | Bolt settings, `docs/OPERATIONS.md` |
| P0 | Practice area images: modern formats + prevent hidden mobile downloads | `src/components/PracticeAreaCardGrid.tsx`, `src/data/practiceAreas.ts`, `public/images/generated/*` |
| P0 | Nick hero headshot responsive | `src/pages/HomePage.tsx`, `public/images/headshots/*` |
| P0 | Header logo optimization | `src/components/SiteHeader.tsx`, `public/images/brand/*` |
| P1 | Defer below-fold chunks | `src/pages/HomePage.tsx`, new `DeferredSection` component |
| P1 | Bundle analyzer + unused JS plan | `vite.config.ts`, `package.json` |
| P2 | CSS/fonts critical path | `src/styles/tailwind.css`, `index.html`, maybe `public/fonts/*` |
| P2 | Cache headers | Bolt settings, `docs/OPERATIONS.md` |
| P2 | Forced reflow investigation | likely `SiteHeader`, `Layout`, launchers |
| P1 | A11y remaining | HomePage headings, ORC chips, card targets |
| P2 | Security headers | Bolt settings, `docs/OPERATIONS.md` |

---

## Mobile Performance Optimization – Scope of Work

### Goal

Improve mobile PageSpeed / Core Web Vitals, reduce render-blocking behavior, and stabilize mobile UX while preserving existing design and content.

Target outcome:

- Mobile PSI score consistently 90+
- LCP under 2.5s
- CLS under 0.1
- INP within “Good” range

### 1. Largest Contentful Paint (LCP) Optimization

**Issues Observed**

- LCP element is a hero section image / content block
- LCP is delayed by:
  - Render-blocking CSS
  - Non-critical JS executing before first paint
  - Image loading not prioritized on mobile

**Tasks**

- Identify exact LCP element on mobile viewport
- Mark hero/LCP image with:
  - fetchpriority="high"
  - loading="eager"
- Ensure hero image:
  - Uses responsive srcset
  - Is properly sized for mobile breakpoints
- Inline critical CSS required for above-the-fold layout
- Defer non-critical CSS below the fold

**Acceptance Criteria**

- LCP ≤ 2.5s on mobile
- Hero image is first visually complete element
- No layout reflow during hero render

### 2. Render-Blocking Resources (CSS & JS)

**Issues Observed**

- Multiple CSS and JS files block first render on mobile
- Third-party scripts load early in the critical path

**Tasks**

- Audit all CSS:
  - Inline critical CSS for above-the-fold
  - Defer or async non-critical stylesheets
- Audit all JS:
  - Defer non-essential scripts
  - Split bundles where possible
  - Move non-critical scripts to load after DOMContentLoaded
  - Delay third-party scripts (analytics, widgets, embeds) until interaction or idle

**Acceptance Criteria**

- No render-blocking CSS or JS flagged by PSI
- First Contentful Paint improves measurably
- Mobile CPU main-thread blocking reduced

### 3. Reduce JavaScript Execution Time (Mobile CPU)

**Issues Observed**

- Mobile main thread blocked by JS execution
- React components and hydration cost visible on mobile

**Tasks**

- Identify heavy components rendered on initial load
- Lazy-load:
  - Modals
  - Review widgets
  - Non-visible UI components
- Ensure client-side JS only runs when required
- Verify tree-shaking is effective in production build

**Acceptance Criteria**

- Total Blocking Time minimized
- No long tasks over 50ms during initial load
- Mobile interaction latency improved

### 4. Image Optimization (Mobile-Specific)

**Issues Observed**

- Images larger than required for mobile viewport
- Some images not using modern formats or proper sizing

**Tasks**

- Ensure all images:
  - Use srcset and sizes
  - Are properly constrained per breakpoint
- Convert eligible images to modern formats (WebP / AVIF)
- Lazy-load all non-critical images below the fold
- Verify no images load at desktop resolution on mobile

**Acceptance Criteria**

- PSI reports “Properly size images” resolved
- Reduced image transfer size on mobile
- No CLS introduced by late-loading images

### 5. Cumulative Layout Shift (CLS) Fixes

**Issues Observed**

- Layout shifts caused by:
  - Images without fixed dimensions
  - Dynamic UI elements (badges, pills, injected components)
  - Late-loading fonts or UI states

**Tasks**

- Explicitly define width/height or aspect-ratio for:
  - Images
  - Cards
  - Badges
- Reserve layout space for:
  - Dynamic content
  - Conditional UI elements
- Confirm font loading strategy does not cause reflow

**Acceptance Criteria**

- CLS < 0.1 on mobile
- No visible layout jumps during page load

### 6. Font & Text Rendering Optimization

**Issues Observed**

- Font loading contributes to render delay
- Potential FOIT/FOUT on mobile

**Tasks**

- Use font-display: swap
- Preload primary fonts used above the fold
- Remove unused font weights/styles
- Ensure mobile typography does not trigger reflow

**Acceptance Criteria**

- Text visible immediately on load
- No layout shift caused by font loading

### 7. Third-Party Script Governance

**Issues Observed**

- Third-party scripts contributing to blocking and CPU cost

**Tasks**

- Inventory all third-party scripts
- Defer or delay non-critical third-party execution
- Load analytics and tracking after initial render or via consent triggers

**Acceptance Criteria**

- Third-party scripts do not block rendering
- PSI flags related to third-party impact reduced or cleared

### 8. Mobile-Specific QA & Validation

**Tasks**

- Re-run PageSpeed Insights (mobile) after changes
- Validate on:
  - iOS Safari
  - Android Chrome
- Test:
  - First load
  - Reload
  - Slow 4G simulation
- Confirm no visual regressions

**Acceptance Criteria**

- Mobile PSI score ≥ 90
- All Core Web Vitals in “Good” range
- No UX regressions

### Optional Enhancements (If Time Allows)

- Add performance budgets to CI
- Add Web Vitals reporting in production
- Create a mobile-only performance checklist for future features
