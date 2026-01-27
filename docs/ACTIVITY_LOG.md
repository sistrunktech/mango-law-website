# Activity Log

Use this log to capture site improvements for month-over-month reporting.

## Entry Template
```
Date/time:
Category:
Summary:
Files:
Notes:
```

## Entries

Date/time: 2025-12-14
Category: Performance / Crawlability
Summary: Captured PageSpeed Insights baseline (homepage) and documented a prioritized fix plan (image delivery, third-party badge, render-blocking requests, a11y targets).
Files: docs/performance/pagespeed/2025-12-14/*; docs/performance/MOBILE-PERFORMANCE-PLAYBOOK.md
Notes: Used as baseline for mobile CWV improvement work; highlights large PNG/JPG delivery and third-party injection risks.

Date/time: 2025-12-28
Category: Technical SEO / Tracking
Summary: Implemented Search Intelligence tracking (keyword inventory + daily rank history) and expanded service-area metadata for regional SEO coverage.
Files: supabase/migrations/*seo*; supabase/functions/check-rankings/*; src/components/admin/SEORankManager.tsx; src/data/serviceAreas.ts
Notes: Ranking checks require Serper.dev (`SERPER_API_KEY`).

Date/time: 2026-01-01
Category: Technical SEO / Indexing
Summary: Migrated the site to Next.js App Router (SSR/SSG) and expanded server-rendered metadata + schema (FAQ/Breadcrumb/Article) to improve crawlability and rich result eligibility.
Files: src/app/*; src/lib/seo*; src/components/StructuredData.tsx
Notes: Verify via View Source + GSC Rich Results after deployments.

Date/time: 2026-01-16
Category: Technical SEO / Indexing
Summary: Shipped SEO-critical fixes including improved machine-readable discovery surfaces (llms.txt route) and cleanup of legacy indexing artifacts to align with Next.js route-based sitemap/robots.
Files: src/app/llms.txt/route.ts; src/app/sitemap.ts; src/app/robots.ts
Notes: llms.txt is informational and does not replace robots.txt; sitemap/robots remain the canonical crawler controls.

Date/time: 2026-01-17
Category: Technical SEO / Indexing
Summary: Added IndexNow ping automation to accelerate discovery of sitemap updates (non-blocking).
Files: src/app/sitemap.ts
Notes: Best-effort ping only; Google indexing remains driven by sitemap + crawl.

Date/time: 2026-01-17 09:30 EST
Category: SEO / Internal linking
Summary: Added sitewide footer links to key blog posts and pages flagged by Ahrefs (low inlinks + orphan) to increase internal link coverage.
Files: src/components/Footer.tsx
Notes: Covers personal injury, white collar, drug possession, protection order, assault/DV, sex crimes posts, plus Delaware OVI, holiday OVI, and of-counsel pages.

Date/time: 2026-01-26
Category: Technical SEO / Content Ops
Summary: Implemented publish-date gating for blog posts (hide future/scheduled posts from public routes + sitemap) and added an authenticated admin preview route for drafts/scheduled posts.
Files: src/lib/blogPostsRepo.ts; src/app/(site)/blog/*; src/app/sitemap.ts; src/app/(internal)/admin/blog/preview/[slug]/page.tsx; src/views/AdminBlogPreviewPage.tsx
Notes: Public sitemap uses publishable posts only; admin preview requires Supabase Auth.

Date/time: 2026-01-26
Category: Technical SEO / Schema
Summary: Stabilized homepage structured data rendering to avoid JSON-LD graph changes after hydration.
Files: src/views/HomePage.tsx; src/app/(site)/page.tsx; src/components/StructuredData.tsx; src/lib/structured-data.ts
Notes: Verified via View Source and Rich Results Test; ensure the JSON-LD graph remains stable in server HTML.

Date/time: 2026-01-26
Category: Lead Intake / Conversion Ops
Summary: Standardized lead notification email recipients and added support for CC/BCC via environment variables across all lead entrypoints (contact form, lead modal, chat intake).
Files: supabase/functions/submit-contact/index.ts; supabase/functions/submit-lead/index.ts; supabase/functions/chat-intake/index.ts; .env.example
Notes: Recipient lists are comma-separated env vars; prospect confirmations continue to send to the lead's email address.

Date/time: 2026-01-27
Category: Technical SEO / Indexing (GSC)
Summary: Reviewed Search Console indexing status, ran URL Inspection (including Test Live URL) on key pages, and submitted fix validation + manual indexing requests where available.
Files: (GSC console actions)
Notes: Search Console still reporting ~6 indexed URLs; continue monitoring Pages report + sitemap processing and test representative URLs until discovery/crawl/indexing bottleneck is identified.
