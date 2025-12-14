# Mobile Performance Playbook

## Goal
Keep the site fast on mobile while maintaining a high-trust, professional UI.

Recommended targets (PSI mobile, production):
- Performance: 90+
- LCP: <= 3.0s (stretch goal <= 2.5s)
- CLS: 0.0x
- TBT: ~0ms

## Where to store audits
When you run PageSpeed Insights or Lighthouse, store exports here:

docs/performance/pagespeed/YYYY-MM-DD/
- pagespeed-mobile.txt (PSI “Download as JSON/TXT” or copied export)
- pagespeed-desktop.txt
- summary.md (what changed + next actions + before/after metrics)

Keep diffs small and factual.

## How to measure (repeatable workflow)
1) Build and preview locally
   - npm ci
   - npm run build
   - npm run preview
2) Run Lighthouse in Chrome:
   - Use Mobile
   - Network: Slow 4G
   - CPU: 4x slowdown
3) Run PSI on production for the canonical URL(s):
   - Homepage
   - Blog post template page
   - Practice areas page
   - DUI checkpoints page (Mapbox)

Record metrics, and store exports under the date folder.

## Biggest wins in this repo

### 1) Images (most common root cause)
Common problems:
- PNG/JPG shipped where AVIF/WebP would cut bytes dramatically
- Oversized intrinsic dimensions vs displayed size
- Decorative images downloaded on mobile even when hidden with CSS

Best practices:
- Use <picture> with:
  - AVIF source
  - WebP source
  - Original fallback (PNG/JPG) for compatibility
- Always set:
  - srcSet + sizes (responsive)
  - width/height for layout stability when the image affects layout
  - loading="lazy" for non-critical imagery
  - fetchpriority="high" only for true LCP imagery

IMPORTANT: CSS display:none is not a reliable “do not download” strategy.
If an image must not download on mobile, do not render the element at all until
a min-width media query matches (matchMedia gate).

Repo hotspots:
- src/pages/HomePage.tsx
- src/components/PracticeAreaCardGrid.tsx
- src/components/SiteHeader.tsx
- public/images/generated/*
- public/images/headshots/*
- public/images/brand/*

### 2) Defer below-the-fold JS/data
React.lazy + Suspense does not prevent downloading if the component renders on first paint.
To truly defer:
- Gate rendering behind IntersectionObserver (render only when near viewport)
- Or load after requestIdleCallback (secondary option)

Homepage examples:
- BlogSection + blogPosts data
- TestimonialsList
- Other large below-fold sections

### 3) Third-party scripts
Every third-party request risks:
- extra DNS/TLS handshakes
- render delays
- security surface area

Rule:
- No third-party scripts on the critical path unless they have a hard ROI.

Bolt badge:
- If Bolt injects a badge script, disable it via hosting settings.
- Document the setting in docs/OPERATIONS.md.

### 4) CSS and fonts
Avoid FOUC hacks unless necessary.
Preferred:
- self-host fonts with stable names in public/fonts
- preload only the fonts used above-the-fold
- ensure font-display: swap

### 5) Diagnostics: forced reflow
If PSI flags forced reflow:
- record a Performance trace
- find “Layout” and “Recalculate Style” hotspots
- look for read-after-write patterns or scroll handlers

Common suspects:
- scroll listeners that trigger state updates too frequently
- measuring DOM in effects on every render

## Implementation patterns

### A) MatchMedia gating (prevent mobile downloads)
Use a hook or inline logic:

- default false
- on mount, check window.matchMedia('(min-width: 768px)').matches
- render decorative images only if true

### B) DeferredSection (IntersectionObserver)
Create a wrapper that:
- renders a placeholder until visible
- then mounts the real component (and triggers lazy import)

## Definition of Done (DoD) for performance PRs
- Run Lighthouse mobile locally and compare to baseline
- Run PSI on production after deploy and store results in docs/performance/pagespeed/YYYY-MM-DD/
- Validate no new third-party scripts appear on critical path
- Validate no decorative images download on mobile unless intended
- No CLS regression
