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

Date/time: 2026-02-02
Category: SEO / Outgoing link policy
Summary: Implemented a conservative outbound linking policy (default nofollow) with a small dofollow “trust budget” for high-authority `.gov`/`.edu` citations in blog Sources panels; documented the February client plan.
Files: src/components/ExternalLink.tsx; src/views/BlogPostPage.tsx; src/components/Footer.tsx; src/components/GlossaryEntry.tsx; src/components/StatuteSidebar.tsx; docs/client-updates/2026-02.md
Notes: Goal is to reduce unintended outbound endorsement while preserving editorial citation value; validate live HTML after merge.

Date/time: 2026-02-08
Category: SEO / Measurement + Content
Summary: Implemented Ahrefs Web Analytics installation via GTM (consent-gated) and documented KPI ownership (Ahrefs vs BrightLocal vs GA4). Added a Super Bowl Sunday checkpoint awareness post and a small “news references” section on the DUI checkpoint map page for historical/context sources.
Files: docs/audits/seo-evidence-2026-02-08/metrics-reconciliation-2026-02-08.md; docs/audits/sitewide-seo-ux-audit-2026-02-07.md; src/data/blogPosts.ts; src/views/DUICheckpointsPage.tsx; public/images/generated/blog-super-bowl-dui-checkpoints-ohio.png
Notes: Ahrefs “script not found” may persist when injected dynamically via GTM even if visitors/events are counted; GA4 remains source-of-record for conversions.

Date/time: 2026-03-24
Category: SEO / Audit + Report Readiness
Summary: Ran a fresh live SEO audit across Search Console, live production, sitemap state, and internal ranking checks. Confirmed production drift from source, five February support blog URLs returning 404 on production, continued `URL is unknown to Google` status on several priority OVI/resource pages, and a stale sitemap read in GSC. Re-submitted the sitemap to both verified Search Console properties and documented the next-10-days repair/report plan.
Files: docs/audits/seo-audit-and-report-readiness-2026-03-24.md; docs/client-updates/2026-03-prep.md; output/gsc-2026-03-24-summary.json; output/live-sitemap-2026-03-24.xml
Notes: Fresh `check-rankings` run on 2026-03-24 wrote 17 rows, with 16 `matchType: none` and 1 `same_domain_other_url`; live sitemap had 47 URLs while GSC still showed 44 submitted before the 2026-03-24 resubmission.

Date/time: 2026-03-24 18:09 EDT
Category: SEO / Production Repair + Off-Page Execution
Summary: Redeployed production from the current SEO-approved source state, restored the five broken February support posts, re-checked GSC after Google processed the refreshed sitemap, and executed the first real citation and outreach batch for March.
Files: docs/audits/seo-audit-and-report-readiness-2026-03-24.md; docs/client-updates/2026-03-prep.md; docs/technical/outreach/EXECUTION_LOG_2026-03-24.md; output/gsc-2026-03-24-post-redeploy.json; output/playwright/superlawyers-contact-success-2026-03-24.png; output/playwright/10tv-news-outreach-submitted-2026-03-24.png; output/playwright/10tv-crimetracker-outreach-submitted-2026-03-24.png
Notes: Post-redeploy GSC snapshot now shows the OVI cluster mostly as `Discovered - currently not indexed` on the domain property and two sampled February support posts still as `URL is unknown to Google`; citation submissions were completed to Martindale and Super Lawyers; 10TV News outreach showed an explicit thank-you confirmation and CrimeTracker 10 redirected back to `10tv.com/contact-us` after submit, so it is logged as submitted with redirect behavior rather than as a confirmed placement.

Date/time: 2026-03-24 21:05 EDT
Category: Release Operations / Governance
Summary: Identified the March SEO regression source as production drift across parallel branches/worktrees and non-canonical deploy flow, then codified `origin/main`-only production rules, clean release worktree procedure, and explicit agent handoff/deploy guardrails.
Files: docs/OPERATIONS.md; docs/AGENT_GUARDRAILS.md; docs/TROUBLE-TICKETS.md; docs/technical/PRODUCTION_DRIFT_PREVENTION.md; docs/audits/seo-audit-and-report-readiness-2026-03-24.md; docs/client-updates/2026-03-prep.md
Notes: This closes the procedural gap that allowed preview/snapshot states to drift live; any future production deploy must be verified from a clean worktree created from `origin/main`.

Date/time: 2026-03-24 22:35 EDT
Category: SEO / Indexing Diagnosis + Source Fixes
Summary: Compared indexed vs stalled URLs with fresh Search Console and live HTML checks, isolated local OVI cannibalization (`/delaware-ohio-ovi-lawyer` indexed while `/ovi-dui-defense-delaware-oh` stayed unindexed), and shipped source-side fixes for the OVI pillar, sitemap signal, and checkpoint resource metadata/content surface.
Files: src/app/(site)/delaware-ohio-ovi-lawyer/page.tsx; src/app/sitemap.ts; src/views/OviDuiPage.tsx; src/components/Footer.tsx; src/app/(site)/resources/dui-checkpoints/page.tsx; src/views/DUICheckpointsPage.tsx; src/data/duiCheckpointMapFaqs.ts; output/live-html-differential-2026-03-24.json; output/gsc-differential-diagnosis-2026-03-24.json; docs/audits/seo-audit-and-report-readiness-2026-03-24.md; docs/client-updates/2026-03-prep.md
Notes: The new evidence bundle shows Google was assigning Delaware County OVI query impressions to the redundant sibling URL; the fix redirects that URL to the intended pillar, removes it from the sitemap, stabilizes sitemap `lastModified`, and makes the checkpoint resource read as an announced-checkpoint guide instead of a `real-time` utility.

Date/time: 2026-03-25 18:26 EDT
Category: SEO / Indexing Follow-Up + Internal Linking
Summary: Pulled a fresh GSC URL Inspection snapshot after the redirect/sitemap changes, confirmed `/first-offense-ovi-ohio` is now indexed while the remaining sampled OVI/resource/blog URLs are still `URL is unknown to Google`, refreshed the live smoke script to current URLs, and strengthened contextual internal links from support posts into the priority OVI/drug/protection-order pages.
Files: output/gsc-2026-03-25-refresh.json; scripts/check-indexing-surface.sh; src/data/blogPosts.ts; src/components/BlogSidebar.tsx; docs/client-updates/2026-03-prep.md; docs/audits/seo-audit-and-report-readiness-2026-03-24.md
Notes: Current source link counts now support the priority set with materially better coverage; manual GSC request-indexing is still pending because this runtime only supported API inspection, not a stable authenticated Search Console browser session.

Date/time: 2026-03-25 18:43 EDT
Category: SEO / Performance + Outreach Execution
Summary: Reduced the checkpoint resource route from roughly `456 kB / 643 kB` to `13 kB / 199 kB` by deferring the interactive map bundle, executed a new newsroom outreach send to `theohiostar.com`, and documented public-form blockers on additional outreach/citation targets such as `wcpo.com`, `lawinfo.com`, `chamberofcommerce.com`, and `manta.com`.
Files: src/views/DUICheckpointsPage.tsx; docs/technical/outreach/EXECUTION_LOG_2026-03-25.md; docs/technical/outreach/EXECUTION_TRACKER_2026-03-25.csv; output/playwright/theohiostar-outreach-filled-2026-03-25.png; output/playwright/theohiostar-outreach-submitted-2026-03-25.png; docs/client-updates/2026-03-prep.md; docs/audits/seo-audit-and-report-readiness-2026-03-24.md
Notes: `npm run build` and `npm run typecheck` passed after the checkpoint route split; `npm run release:check` correctly failed in this working branch because releases are now restricted to clean `origin/main` worktrees.

Date/time: 2026-03-26
Category: SEO Ops / Outreach Routing
Summary: Standardized the outreach sender hierarchy in repo documentation, added sender/reply-routing fields to the execution tracker, recorded that the 2026-03-25 Ohio Star outreach used `office@mango.law`, and documented the need to confirm forwarding/monitoring for `info@mango.law` before making it the default sender.
Files: docs/technical/CITATION_BACKLINK_OUTREACH_SYSTEM_2026-02-22.md; docs/technical/OUTREACH_LITE_PLAYBOOK.md; docs/technical/OUTREACH_EMAIL_ROUTING_2026-03-26.md; docs/technical/outreach/EXECUTION_TRACKER_2026-03-25.csv; docs/technical/outreach/EXECUTION_LOG_2026-03-25.md; docs/client-updates/2026-03-prep.md
Notes: Existing repo documentation only covers forwarding/send-as for `office@mango.law`; future outreach should prefer `info@mango.law` once forwarding is confirmed, with `nick@mango.law` reserved for direct attorney follow-up.

Date/time: 2026-03-26 13:25 EDT
Category: SEO / GSC Follow-Up + On-Site Signals + Outreach
Summary: Re-ran the full and priority GSC inspection snapshots, confirmed no new movement in the sampled recovery set beyond `/first-offense-ovi-ohio`, strengthened main-content internal links from the homepage, blog hub, and indexed first-offense OVI page into the stalled OVI/checkpoint cluster, and executed a new newsroom outreach submission to `wkyc.com`.
Files: output/gsc-2026-03-26-refresh.json; output/gsc-2026-03-26-priority-refresh.json; src/views/BlogPage.tsx; src/views/HomePage.tsx; src/views/HighIntentPages.tsx; docs/technical/outreach/EXECUTION_LOG_2026-03-26.md; docs/technical/outreach/EXECUTION_TRACKER_2026-03-25.csv; output/playwright/wkyc-news-outreach-submitted-2026-03-26.png; docs/client-updates/2026-03-prep.md
Notes: The 3/26 GSC snapshot still shows `/ovi-dui-defense-delaware-oh`, `/resources/dui-checkpoints`, `/ovi-test-refusal-lawyer-ohio`, `/als-license-suspension-ohio`, `/motion-to-suppress-ovi-ohio`, and the two sampled February blog posts as `URL is unknown to Google`; `wkyc.com` confirmed the submission with `Thank you for your inquiry, Tim! Someone from our news team will review your submission soon.`

Date/time: 2026-03-26 15:10 EDT
Category: DUI Checkpoints / Automation + UX
Summary: Audited the checkpoint system end to end, confirmed the latest live public notice in the database is still the February 8, 2026 Super Bowl enforcement item, verified there was no St. Patrick's Day-specific seed or content, and improved the checkpoint workflow with cleaner scraper logging, stronger address parsing, richer admin announcement fields, and a more transparent public checkpoint status/watch surface.
Files: supabase/functions/checkpoint-scraper/index.ts; supabase/functions/checkpoint-scraper/geocoding.ts; src/components/admin/CheckpointAnnouncementsManager.tsx; src/views/DUICheckpointsPage.tsx; src/views/HolidayOviEnforcementOhioPage.tsx; test/checkpointStatus.test.ts
Notes: The scraper log table was using `scraper_name='ovicheckpoint'` while docs and tooling generally refer to the job as `checkpoint-scraper`; future runs now align to the function/job name, and the parser now handles `OH 45011`-style location tokens more safely.

Date/time: 2026-03-26 18:20 EDT
Category: DUI Checkpoints / Source-of-Record + Feed Health
Summary: Manually refreshed the live checkpoint scraper, confirmed March 2026 checkpoint history existed upstream but had not been ingested since February, added St. Patrick's Day-period March entries to the curated announcement source-of-record path, and quarantined RSS endpoints that were returning 404/DNS failures so the scraper focuses on sources that still resolve.
Files: supabase/functions/checkpoint-scraper/curated-announcements.ts; supabase/functions/checkpoint-scraper/rss-sources.ts; src/views/DUICheckpointsPage.tsx
Notes: The live refresh inserted 9 new March checkpoints and updated 285 existing rows; no new March announcement rows were found via RSS, which confirms the announcement-feed side is still materially weaker than the OVICheckpoint ingestion side. Three March 17, 2026 St. Patrick's Day-period announcement records were also upserted directly into `dui_checkpoint_announcements` so the live database now reflects the missed holiday window in the source-of-record layer.

Date/time: 2026-03-28 00:58 EDT
Category: SEO / GSC Follow-Up + Clean-Main Signal Repair
Summary: Re-ran the priority Search Console inspection set from a clean `origin/main` worktree, confirmed the sampled recovery set is still at `7 unknown / 1 indexed`, restored the reusable GSC inspection script and current live smoke script to `main`, and added new main-content internal links from the homepage, blog hub, and OVI checkpoints guide into the stalled OVI/checkpoint pages that Google has not discovered yet.
Files: docs/ACTIVITY_LOG.md; scripts/gsc-url-inspection-audit.mjs; scripts/check-indexing-surface.sh; src/views/HomePage.tsx; src/views/BlogPage.tsx; src/views/OviCheckpointsOhioPage.tsx
Notes: The fresh inspection snapshot still shows `/ovi-dui-defense-delaware-oh`, `/resources/dui-checkpoints`, `/ovi-test-refusal-lawyer-ohio`, `/als-license-suspension-ohio`, `/motion-to-suppress-ovi-ohio`, and the two sampled February blog posts as `URL is unknown to Google`; `/first-offense-ovi-ohio` remains the only sampled recovery URL that is currently indexed, and Search Console still cites `https://mango.law/` plus `https://mango.law/ovi-checkpoints-ohio` as known referrers into that page.
