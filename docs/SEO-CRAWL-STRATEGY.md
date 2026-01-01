# SEO Crawl Strategy

This document describes how Mango Law pages are surfaced to search engines without requiring client-side JavaScript.

## Current Approach

### 1) Sitemap Generation
- Source of truth: `src/data/blogPosts.ts` plus known static routes.
- Output: `dist/sitemap.xml` (Vite plugin) and `public/sitemap.xml` (script).
- Robots: `public/robots.txt` references the sitemap.

### 2) Static Prerender (Postbuild)
- Script: `scripts/prerender.mjs` (runs in `postbuild`).
- Method: launches headless Chrome via Puppeteer, visits each URL in `dist/sitemap.xml`, and writes a prerendered `index.html` per route.
- Output: static HTML snapshots for all sitemap routes (excluding admin/docs/handoff paths).

## Why This Helps
- Search engines see full HTML + meta tags on first request.
- Improves time-to-index for new pages and blog posts.
- Reduces dependency on JS execution for metadata.

## Notes
- If you add a route, ensure it is in the sitemap so it gets prerendered.
- Admin/internal routes are intentionally excluded from prerendering.
