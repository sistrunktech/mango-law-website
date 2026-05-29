# SEO Crawl Strategy

This document describes how Mango Law pages are surfaced to search engines without requiring client-side JavaScript.

## Current Approach (Next.js)

### 1) Sitemap Generation
- Source of truth: `src/app/sitemap.ts` (static route list) + publish-gated blog slugs via `src/lib/blogPostsRepo.ts`.
- Output: served at `https://mango.law/sitemap.xml` via the Next.js MetadataRoute.
- Blog slugs: includes only publishable posts (CMS + legacy), excluding future-dated/scheduled content.
- Robots: `src/app/robots.ts` references the sitemap and is served at `https://mango.law/robots.txt`.
- LLM discovery: `https://mango.law/llms.txt` is served from `src/app/llms.txt/route.ts` and included in the sitemap as an AI-readable discovery and citation guide.
- The sitemap route is read-only; crawl notification and resubmission actions should run from scripts or reporting/admin workflows, not during sitemap rendering.

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
- If you add/rename a static marketing route, update `staticPages` in `src/app/sitemap.ts`.
- `llms.txt` is informational and does not replace `robots.txt`.
