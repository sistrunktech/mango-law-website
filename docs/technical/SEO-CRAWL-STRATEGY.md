# SEO Crawl Strategy

This document describes how Mango Law pages are surfaced to search engines without requiring client-side JavaScript.

## Current Approach (Next.js)

### 1) Sitemap Generation
- Source of truth: `src/data/blogPosts.ts` plus known static routes.
- Output: `public/sitemap.xml` via `scripts/generate-sitemap.mjs`.
- Robots: `public/robots.txt` references the sitemap.

### 2) SSR/SSG Rendering
- Next.js App Router renders server HTML for core routes.
- Blog posts use `generateStaticParams` and `generateMetadata` for pre-rendered metadata.
- Structured data is emitted in server HTML via `src/components/StructuredData.tsx`.

## Why This Helps
- Search engines see full HTML + meta tags on first request.
- Improves time-to-index for new pages and blog posts.
- Reduces dependency on JS execution for metadata.

## Notes
- If you add a route, ensure it is in the sitemap so it gets crawled.
- Admin/internal routes are intentionally excluded from indexing.
- Run `node scripts/generate-sitemap.mjs` in the deploy pipeline so `public/sitemap.xml` stays current.
