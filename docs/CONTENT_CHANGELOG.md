# Content Change Log

Use this log for any changes to protected content (including file-based blog posts).

## Entry Template
```
Date/time:
Post slug and title:
Change type: minor|major
Summary of change:
Regression checklist:
- Hero changed? (yes/no)
- Images removed? (yes/no)
- Links changed? (yes/no)
- Headings changed? (yes/no)
- Meta/schema changed? (yes/no)
Approval token: (required for major or finalized edits)
Rollback notes: (version ID, snapshot reference, or commit)
```

## Entries

Date/time: 2026-05-03 16:38 EDT
Post slug and title: drug-ovi-ohio | Drug OVI in Ohio: Marijuana, Prescription Drugs, and Blood or Urine Testing
Change type: major
Summary of change: Added the next keyword-aligned OVI/drug-defense support post for the validated drug-OVI lane; grounded the article in current ORC 4511.19, ORC 4511.191, ORC 4511.192, ORC 4511.197, ORC 3701.143, OAC Chapter 3701-53, Ohio BMV ALS guidance, ORC 3796.221, and the H.B. 37 final analysis; linked OVI, drug-crime, suppression, refusal, ALS, first-offense, Liv's Law, drug-possession, and contact paths; added a unique watercolor legal-tabletop featured image; updated OVI owner/drug-crime support links and image-generation standards; and marked the task queue/indexing log for live inspection.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User asked to continue keyword/tracking/content queue work with checkpoint cleanup no longer blocking publication.
Rollback notes: Remove the `drug-ovi-ohio` object from `src/data/blogPosts.ts`, remove `/images/generated/blog-drug-ovi-ohio.png`, remove the related OVI owner and drug-crime support links, restore the Liv's Law internal-link sentence, and restore the queue/indexing rows to pending.

Date/time: 2026-05-03 15:47 EDT
Post slug and title: ovi-refusal-vs-failed-test-ohio | OVI Refusal vs. Failed Test in Ohio: What Changes After an Arrest
Change type: major
Summary of change: Added the next keyword-aligned OVI support post for the refusal owner page, distinguishing roadside field sobriety refusal from post-arrest chemical-test refusal; grounded the article in current ORC 4511.191, 4511.192, 4511.19, 4511.197, 4510.13, 4510.021, 4510.02, Ohio BMV ALS guidance, and OAC Chapter 3701-53; added the ORC 4510.02 glossary entry required by prebuild; linked to the refusal, ALS, OVI, field-sobriety refusal, first-offense OVI, suppression, and contact paths; added a unique watercolor still-life image; and marked the queue row complete pending live inspection/GSC indexing.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User asked to continue keyword/tracking/content queue work after the checkpoint cleanup and confirmed publication should no longer be blocked by pending Solon/Summit details.
Rollback notes: Remove the `ovi-refusal-vs-failed-test-ohio` object from `src/data/blogPosts.ts`, remove `/images/generated/blog-ovi-refusal-vs-failed-test-ohio.png`, remove the related owner-page link in `src/views/HighIntentPages.tsx`, remove the ORC 4510.02 glossary entry if unused, and restore the queue row to pending.

Date/time: 2026-05-03 15:25 EDT
Post slug and title: SEO tracking | GA4 lead-event duplicate-risk hardening
Change type: minor
Summary of change: Hardened source tracking before the next content push by aligning the conditional direct GA4 fallback event to `generate_lead` and changing the lead-modal success-screen phone CTA to support `cta_click` telemetry instead of a second `lead_submitted` event after the same form submission; updated the May 3 GA4/GTM validation docs and onsite queue to reflect remaining real-path QA and GA4 enhanced-measurement page-view cleanup.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User asked to continue keyword/tracking/content work after checkpoint cleanup and before further publication.
Rollback notes: Restore the prior `lead_submitted` fallback event name in `src/lib/analytics.ts`, restore `trackLeadSubmitted('phone', 'lead_success_call')` in `src/components/LeadCaptureModal.tsx`, and revert the related GA4/GTM docs updates.

Date/time: 2026-05-03 15:08 EDT
Post slug and title: DUI checkpoint data | Server-rendered pending-announcement payload cleanup
Change type: minor
Summary of change: Follow-up production QA found the hydrated checkpoint page was clean but the server-rendered Next payload still serialized stale/noisy pending-announcement rows. Filtered `initialAnnouncements` on the server before passing data to the client so crawlers and page source receive the same public-safe announcement set as hydrated users.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User asked to review live changes, correct issues, and iterate on improvements.
Rollback notes: Restore the prior unfiltered `initialAnnouncements = announcementsResult.data ?? []` assignment in `src/app/(site)/resources/dui-checkpoints/page.tsx`.

Date/time: 2026-05-03 14:41 EDT
Post slug and title: DUI checkpoint data | Summit County May pending announcement and blog image-generation standard
Change type: minor
Summary of change: Added a curated checkpoint-scraper seed for the Cleveland19/WOIO Summit County May sobriety-checkpoint notice as a pending announcement because exact city, time, and street-level details were not published; rechecked the existing Solon/Cinco de Mayo source and kept it pending because the source still only identifies the Aurora Road area; tightened the public pending-announcement filter and RSS noise filter so unrelated/security-checkpoint or stale unlocated rows do not inflate the hydrated pending count; updated the blog featured-image standard and generator prompts to preserve the successful neutral watercolor legal still-life direction and avoid Capitol Hill, Washington DC, landmark, skyline, and generic courthouse-location drift.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User clarified the checkpoint-page pending announcement question and asked to keep the new image style while updating image-generation standards.
Rollback notes: Remove the Summit County seed from `supabase/functions/checkpoint-scraper/curated-announcements.ts`, restore the prior checkpoint announcement freshness/RSS filtering behavior, and restore the previous featured-image prompt language in `docs/technical/BLOG_REQUIREMENTS.md` and `scripts/generate-blog-featured-images.ts`.

Date/time: 2026-05-03 13:35 EDT
Post slug and title: ohio-misdemeanor-vs-felony-charges-delaware-county | Ohio Misdemeanor vs. Felony Charges: Delaware County Defense Guide
Change type: major
Summary of change: Added the next criminal-defense support post from the keyword-aligned queue, using official Ohio crime-classification, misdemeanor jail-term, felony prison-term, municipal-court jurisdiction, Delaware County Prosecutor, Delaware County Clerk of Courts, and Delaware Municipal Court sources; added a neutral watercolor comparison image; linked the post from the criminal-defense owner page; refreshed the existing OVI driving-privileges/ALS article with Delaware County filing context, ALS appeal, limited-privileges, ignition-interlock, and current-source coverage; added required ORC glossary entries for the new statutory citations; and applied high-signal internal links from older criminal/OVI/DV/drug/protection articles into the tracked owner pages.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User asked to fix the high-tier image, then proceed with the next long-run onsite SEO/AEO tasks after keyword/tracking alignment.
Rollback notes: Remove the `ohio-misdemeanor-vs-felony-charges-delaware-county` object from `src/data/blogPosts.ts`, remove `/images/generated/blog-ohio-misdemeanor-vs-felony-charges-delaware-county.png`, remove the criminal-defense owner-page links to the new post, and restore the prior `ohio-ovi-driving-privileges-als` content plus internal-link additions in `src/data/blogPosts.ts`.

Date/time: 2026-05-03 13:00 EDT
Post slug and title: delaware-county-criminal-case-timeline | Delaware County Criminal Case Timeline: What Happens After Charges Are Filed?
Change type: major
Summary of change: Added the next high-ROI criminal-defense support post from the SEO/AEO queue, with official Delaware Municipal Court, Delaware County Clerk of Courts, Delaware County Sheriff, Delaware Municipal Court bail schedule, and Ohio Criminal Rules sources; added a matching watercolor legal-process image; linked the post from the criminal-defense owner page; fixed Article schema image URLs to emit absolute image URLs; updated sitemap lastmod handling for current posts and changed owner/resource pages; added the domestic-violence blog category filter; and refreshed checkpoint announcements client-side after hydration so current Solon/Aurora pending notices are not blocked by stale server preload.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User asked to proceed with the next long-run onsite SEO/AEO tasks after fixing the high-tier OVI image and completing keyword/tracking alignment.
Rollback notes: Remove the `delaware-county-criminal-case-timeline` object from `src/data/blogPosts.ts`, remove `/images/generated/blog-delaware-county-criminal-case-timeline.png`, remove the criminal-defense owner-page links to that post, and revert the sitemap/schema/checkpoint hydration/category-filter changes if they cause regressions.

Date/time: 2026-05-03 16:23 EDT
Post slug and title: domestic-violence-lawyer-delaware-oh | Domestic Violence Lawyer Delaware, OH
Change type: minor
Summary of change: Optimized the domestic-violence owner page for the validated local commercial DV terms, added exact "domestic violence lawyer in Delaware, Ohio" phrasing to visible copy, added an AEO-style defense-review section, routed glossary DV links to the owner page, and tightened ORC 2919.25/firearm language against official Ohio and federal sources.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User asked to continue the keyword/tracking/content queue and QA live content against the validated keyword research.
Rollback notes: Restore the prior title/hero/FAQ/intro copy in `src/views/DomesticViolencePage.tsx`, route `domestic-violence` glossary links back to `/criminal-defense-delaware-oh`, and restore the previous ORC 2919.25 definition if needed.

Date/time: 2026-05-03 12:36 EDT
Post slug and title: DUI checkpoint data | Solon Cinco de Mayo pending announcement
Change type: minor
Summary of change: Added a curated production checkpoint-scraper seed for the Cleveland19/WOIO Solon Police Cinco de Mayo public notice; deployed the `checkpoint-scraper` Edge Function and triggered it so production DB contains the Solon/Aurora Road item as a pending announcement rather than an over-specific checkpoint row.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User requested an OVI checkpoint pass and asked that the map/database be kept up to date for the Cinco de Mayo window.
Rollback notes: Remove the curated Solon seed from `supabase/functions/checkpoint-scraper/curated-announcements.ts`, redeploy `checkpoint-scraper`, and delete or cancel the matching `dui_checkpoint_announcements` row if the public source is retracted.

Date/time: 2026-05-03 12:26 EDT
Post slug and title: domestic-violence-arrest-delaware-county-ohio | What Happens After a Domestic Violence Arrest in Delaware County, Ohio?
Change type: major
Summary of change: Added the next Planner-aligned SEO/AEO support post for the domestic-violence lane, with official Ohio ORC, Delaware County Sheriff, Delaware Municipal Court bail schedule, and Supreme Court of Ohio protection-order sources; added a neutral watercolor case-file image; updated the domestic-violence owner page and support links toward the validated "domestic violence lawyer Delaware Ohio" phrase.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User asked to proceed with the next long-run onsite SEO/AEO content, optimizations, and implementations after keyword/tracking validation.
Rollback notes: Remove the `domestic-violence-arrest-delaware-county-ohio` object from `src/data/blogPosts.ts`, remove `/images/generated/blog-domestic-violence-arrest-delaware-county-ohio.png`, restore the prior domestic-violence owner-page title/hero/meta/support links, and revert the matching planning rows.

Date/time: 2026-05-03 11:36 EDT
Post slug and title: high-tier-ovi-ohio-17-test | High-Tier OVI in Ohio: What a .17+ Test Can Change in Your Case
Change type: minor
Summary of change: Replaced the location/courthouse-style watercolor with a neutral case-file tabletop watercolor image so the post no longer risks suggesting Washington DC, Capitol Hill, a courthouse, or a specific landmark location.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User clarified that location signaling is less important than avoiding confusing imagery or concepts.
Rollback notes: Restore the prior `public/images/generated/blog-high-tier-ovi-ohio-17-test.png` from the previous local version if needed.

Date/time: 2026-05-03 11:12 EDT
Post slug and title: SEO owner-page optimization | Criminal defense, first-offense OVI, and high-tier OVI support
Change type: minor
Summary of change: Applied Planner-backed onsite optimization after live keyword QA: updated `/criminal-defense-delaware-oh` metadata/hero/intro toward "Delaware County criminal defense attorney", updated `/first-offense-ovi-ohio` metadata/intro toward "first offense OVI in Ohio", and added a contextual `/motion-to-suppress-ovi-ohio` link inside the high-tier OVI testing/admissibility section.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User requested keyword research/tracking to be completed before publishing and asked for live content QA to align content with keyword/tracking updates.
Rollback notes: Restore the prior metadata/hero copy in `src/app/(site)/criminal-defense-delaware-oh/page.tsx`, `src/app/(site)/first-offense-ovi-ohio/page.tsx`, `src/views/CriminalDefensePage.tsx`, and `src/views/HighIntentPages.tsx`; remove the added suppression sentence from `src/data/blogPosts.ts`.

Date/time: 2026-05-03 10:56 EDT
Post slug and title: high-tier-ovi-ohio-17-test | High-Tier OVI in Ohio: What a .17+ Test Can Change in Your Case
Change type: minor
Summary of change: Replaced the prior watercolor image after QA found it read as Washington DC/Capitol imagery; new image uses a local Ohio roadway/courthouse-square watercolor treatment instead.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User flagged the Capitol Hill/Washington DC mismatch and asked why a Delaware, Ohio OVI article used that image.
Rollback notes: Restore the previous `public/images/generated/blog-high-tier-ovi-ohio-17-test.png` version from the prior commit if needed.

Date/time: 2026-05-03 10:10 EDT
Post slug and title: high-tier-ovi-ohio-17-test | High-Tier OVI in Ohio: What a .17+ Test Can Change in Your Case
Change type: minor
Summary of change: Replaced the initial flat/vector-style generated blog image with a watercolor-style roadway/courthouse image matching Mango's existing blog image aesthetic.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: User requested the new post image be updated to match the established watercolor blog image style.
Rollback notes: Restore the previous `public/images/generated/blog-high-tier-ovi-ohio-17-test.png` version from the prior commit.

Date/time: 2026-05-03 09:15 EDT
Post slug and title: high-tier-ovi-ohio-17-test | High-Tier OVI in Ohio: What a .17+ Test Can Change in Your Case
Change type: major
Summary of change: Added the second SEO/EEAT blog post from the 5-week publishing plan, with official Ohio ORC, BMV, Administrative Code, and LSC sources; added visible blog FAQ support and FAQ schema for posts that define FAQ entries.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User requested the next SEO/AEO round and instructed Codex to proceed with the outlined onsite content, optimizations, and implementations.
Rollback notes: Remove the `high-tier-ovi-ohio-17-test` object from `src/data/blogPosts.ts`, remove the matching generated image, remove blog FAQ schema/rendering changes if not used elsewhere, restore the second row of the publishing plan, and revert this changelog entry.

Date/time: 2026-04-24 22:15 EDT
Post slug and title: ohio-livs-law-ovi-changes | Ohio Liv's Law OVI Changes: Fines, Interlock, and Oral-Fluid Testing
Change type: minor
Summary of change: Changed the publish date from 2026-04-25 to 2026-04-24 so the post is visible immediately in the site timezone after production deployment.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? yes
Approval token: User instructed Codex to proceed until the remaining work is finished and live.
Rollback notes: Restore the post `date` and `lastVerified` fields to 2026-04-25 and revert the matching workbook date notes.

Date/time: 2026-04-25 00:10 EDT
Post slug and title: ohio-livs-law-ovi-changes | Ohio Liv's Law OVI Changes: Fines, Interlock, and Oral-Fluid Testing
Change type: major
Summary of change: Added the first SEO/EEAT blog post from the 5-week publishing plan, with official Ohio HB 37, LSC, ORC, and BMV sources plus internal links to the OVI owner, ALS, refusal, felony, suppression, first-offense, and contact pages.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: User requested first blog post after keyword/tracking setup and then instructed Codex to proceed until finished and live.
Rollback notes: Remove the `ohio-livs-law-ovi-changes` object from `src/data/blogPosts.ts`, restore the first row of the 2026-04 blog publishing plan if needed, and revert this changelog entry.

Date/time: 2026-04-25 00:05 EDT
Post slug and title: Strategy update | GSC URL Inspection pass and Google Ads payment-boundary execution
Change type: minor
Summary of change: Updated the SEO execution workbook to reflect the priority GSC URL Inspection pass, indexed/not-indexed owner-page results, the non-billing Google Ads setup progression to the payment-confirmation boundary, and the remaining Keyword Planner/Ads blocker.
Regression checklist:
- Hero changed? n/a
- Images removed? n/a
- Links changed? n/a
- Headings changed? n/a
- Meta/schema changed? n/a
Approval token: n/a
Rollback notes: Revert the workbook CSV/report changes and this changelog entry.

Date/time: 2026-04-24 20:48 EDT
Post slug and title: Strategy update | Tracking, keyword validation, BrightLocal/Ahrefs baseline, and reporting alignment
Change type: minor
Summary of change: Updated the SEO execution workbook after the authenticated account pass to reflect verified Mango GA4/GTM access, the remaining Google Ads customer blocker, GA4 generate_lead key-event creation, BrightLocal rank/citation baselines, Ahrefs zero-keyword baseline, and the source tracking patch for pageview dedupe plus hero CTA lead attribution.
Regression checklist:
- Hero changed? n/a
- Images removed? n/a
- Links changed? n/a
- Headings changed? n/a
- Meta/schema changed? n/a
Approval token: n/a
Rollback notes: Revert the workbook/reporting docs, account-status rows, tracking source patch, blog-plan link correction, and this changelog entry.

Date/time: 2026-04-24 13:35 EDT
Post slug and title: Strategy update | Google account verification, OVI checkpoint refresh, and SEO execution workbook
Change type: minor
Summary of change: Updated the SEO keyword/tracking workbook with authenticated GSC and GTM findings, explicit Google Ads and GA4 blockers, the 50-keyword Google Ads seed list, the 10-post/5-week publishing plan status, and the production OVI checkpoint refresh/scraper deployment notes for the Cinco de Mayo watch window.
Regression checklist:
- Hero changed? n/a
- Images removed? n/a
- Links changed? n/a
- Headings changed? n/a
- Meta/schema changed? n/a
Approval token: n/a
Rollback notes: Revert the account verification log, OVI checkpoint pass update, workbook CSV/doc updates, checkpoint scraper changes, public checkpoint seasonal-copy change, and this changelog entry.

Date/time: 2026-04-24 08:59 EDT
Post slug and title: Strategy update | docs/technical/seo-keyword-research-tracking-2026-04/
Change type: minor
Summary of change: Added the first no-admin SEO keyword research/tracking workbook package with CSV drafts for page ownership, seed evidence, tracked keyword candidates, watchlist, GSC indexing queue, GA4/GTM status, on-site support, off-site local SEO, account status, final tracked-keyword recommendations, validated alignment report, and a 10-post publishing plan for the next five weeks.
Regression checklist:
- Hero changed? n/a
- Images removed? n/a
- Links changed? n/a
- Headings changed? n/a
- Meta/schema changed? n/a
Approval token: n/a
Rollback notes: Revert the `docs/technical/seo-keyword-research-tracking-2026-04/` workbook package and this changelog entry.

Date/time: 2026-04-24 08:48 EDT
Post slug and title: Strategy update | docs/technical/SEO_KEYWORD_RESEARCH_TRACKING_REPORTING_SETUP_2026-04.md
Change type: minor
Summary of change: Added a Mango-specific execution brief and first task queue artifact for SEO keyword research, tracking, BrightLocal, Ahrefs, GSC, and GA4/GTM reporting setup, adapted from the Sistrunk Tech SOP and current Mango SEO/BrightLocal handoff docs.
Regression checklist:
- Hero changed? n/a
- Images removed? n/a
- Links changed? n/a
- Headings changed? n/a
- Meta/schema changed? n/a
Approval token: n/a
Rollback notes: Revert the docs-only strategy brief, task queue artifact, and this changelog entry.

Date/time: 2026-04-08 09:15 EDT
Post slug and title: contact surfaces | Correct public office number vs Nick direct cell
Change type: minor
Summary of change: Corrected the inverted phone-number source of truth after rechecking Nick's November 22, 2025 email instructions. The sitewide public office/default line is back to `(740) 417-6191`, while Nick's direct cell `(740) 602-2155` is only shown where it is explicitly labeled as direct. Supabase email/review-response defaults and public blog CTA references were brought back into alignment with that split.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? no
- Meta/schema changed? no
Approval token: n/a
Rollback notes: Revert the source-of-truth swap in `src/lib/contactInfo.ts`, `supabase/functions/_shared/email/templates.ts`, `supabase/functions/generate-review-response/index.ts`, and `src/data/blogPosts.ts` if newer written direction from Nick supersedes the November 22, 2025 instruction.

Date/time: 2026-04-08 08:05 EDT
Post slug and title: about | footer/contact/chat routing and public phone normalization
Change type: minor
Summary of change: Updated the public-facing contact surfaces tied to `/about`, the shared footer/chat routing, and Supabase email/review-response defaults so the canonical call/text line `(740) 602-2155` is primary sitewide, while `(740) 417-6191` is retained only where it is explicitly labeled as secondary or legacy.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? no
- Meta/schema changed? no
Approval token: n/a
Rollback notes: Revert the contact constant, footer/about/chat UI, and Supabase email/review-response defaults on branch `codex/phone-canonicalization-2026-04` if the NAP decision changes.

Date/time: 2026-04-07 17:35 EDT
Post slug and title: about; reviews; contact; domestic-violence-lawyer-delaware-oh; drug-crime-lawyer-delaware-oh | Support-page routing and DV/drug pillar recovery
Change type: minor
Summary of change: Expanded About, Reviews, and Contact into stronger routing assets for OVI, criminal-defense, domestic-violence, and drug-charge journeys; tightened domestic-violence and drug-crime metadata and support-link sections to better match the April recovery priorities and current GSC/BrightLocal signals.

Date/time: 2026-04-07 17:35 EDT
Post slug and title: about; reviews; contact; domestic-violence-lawyer-delaware-oh; drug-crime-lawyer-delaware-oh | Support-page routing and DV/drug pillar recovery
Change type: minor
Summary of change: Expanded About, Reviews, and Contact into stronger routing assets for OVI, criminal-defense, domestic-violence, and drug-charge journeys; tightened domestic-violence and drug-crime metadata and support-link sections to better match the April recovery priorities and current GSC/BrightLocal signals.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: Revert `fix(seo): route support pages into DV and drug recovery` if the support-page routing or pillar copy needs to be rolled back.

Date/time: 2026-03-31 14:05 EDT
Post slug and title: drug-possession-charge-ohio-what-to-do-next; ohio-ovi-driving-privileges-als | Internal-link reinforcement for March indexing recovery
Change type: minor
Summary of change: Added short related-guide sections to the drug-possession and ALS posts so both pages expose clearer in-body pathways to their matching service pages and supporting guides during the March indexing recovery push.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: n/a
Rollback notes: Remove the new related-guide sections in `src/data/blogPosts.ts` if the recovery pass is rolled back.

Date/time: 2026-03-24 19:10 EDT
Post slug and title: Sitemap and OVI checkpoint signals | Consolidate Delaware OVI intent and align checkpoint metadata
Change type: minor
Summary of change: Redirected the redundant Delaware OVI page to the primary OVI pillar, removed the duplicate URL from the sitemap, stabilized sitemap lastmod values, and updated checkpoint page metadata/FAQ content to match the announced-checkpoint positioning.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? no
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: Revert the sitemap, checkpoint page, and Delaware OVI redirect changes in `fix(seo): consolidate ovi intent and tighten checkpoint indexing signals`.

Date/time: 2026-03-06 13:35 EST
Post slug and title: Ohio statute glossary | Add ORC 2919.26 entry required by high-intent protection-order pages
Change type: minor
Summary of change: Added a missing Ohio statute glossary entry for ORC 2919.26 so the high-intent civil protection order rollout can pass protected-content validation and build cleanly.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: n/a
Rollback notes: Revert the ORC 2919.26 entry in `src/data/statutes.ts` and this changelog line if the page rollout is withdrawn.

Date/time: 2026-02-17 17:23 EST
Post slug and title: first-ovi-court-date-delaware-county-ohio | Image URL dedupe for audit gate
Change type: minor
Summary of change: Updated the post featured image reference from a shared hero asset to a unique generated asset path to satisfy duplicate image governance checks and unblock CI for unrelated UI deployment.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: n/a
Rollback notes: revert commit `fix(content): dedupe blog image URL for audit gate`

Date/time: 2026-02-11 20:05 EST
Post slug and title: Governance update | Master PRD + no-drift agent operating controls
Change type: major
Summary of change: Added canonical PRD + annex set, introduced structured-data/SEO/parity CI gates, expanded protected-content checks for schema and firm-fact-sensitive files, and normalized review-response contact references to canonical phone values.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: Revert PRD annex docs and gate scripts (`check-structured-data.mjs`, `seo-smoke.mjs`, `check-prd-doc-parity.mjs`) plus related workflow/script wiring.

Date/time: 2026-02-11 13:28 EST
Post slug and title: blogPosts imageUrl | Enforce per-slug unique featured images + regenerate missing image assets
Change type: major
Summary of change: Removed non-slug and repeated featured image assignments (including reuse of `/images/generated/ovi-dui-defense-hero.png`), switched affected posts to strict `/images/generated/blog-<slug>.png` paths, generated missing slug images for four posts, and added automated audit checks to block duplicate/non-compliant blog image mappings.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: revert `src/data/blogPosts.ts` imageUrl edits and delete generated files `public/images/generated/blog-first-ovi-court-date-delaware-county-ohio.png`, `public/images/generated/blog-no-contact-order-vs-civil-protection-order-ohio.png`, `public/images/generated/blog-drug-possession-charge-ohio-what-to-do-next.png`, `public/images/generated/blog-ohio-ovi-driving-privileges-als.png`

Date/time: 2026-02-08
Post slug and title: super-bowl-dui-checkpoints-ohio | Super Bowl Sunday DUI/OVI Checkpoints in Ohio: What to Know
Change type: major
Summary of change: Added a Super Bowl Sunday DUI/OVI checkpoint awareness post with links to the DUI checkpoint map, OVI explainer, and field sobriety guidance; includes NHTSA sources and a new featured image.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? n/a
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: n/a (new post)

Date/time: 2026-02-04
Post slug and title: sex-crimes-defense-ohio-what-you-need-to-know | Sex Crimes Defense in Ohio: What You Need to Know About Sexual Battery, Registration, and Your Rights
Change type: minor
Summary of change: Repaired a syntax/parsing issue in the file-based blog post data where duplicated fields were accidentally embedded in the post content string; no intended editorial change.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: n/a
Rollback notes: fix/blogPosts parse error (commit 1fe130f)

Date/time: 2026-01-26 14:05 EST
Post slug and title: drug-possession-charge-ohio-what-to-do-next | Charged With Drug Possession in Ohio? What to Do Next and What the State Must Prove
Change type: major
Summary of change: Added new post for week-2 publishing cadence (planned publish date 2026-02-03) covering what the state must prove for drug possession under ORC 2925.11, common search-and-seizure issues, and practical next steps; includes internal links to drug-crimes practice area and trust sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? n/a
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: codex/blog-week2-2026-02

Date/time: 2026-01-26 14:05 EST
Post slug and title: ohio-ovi-driving-privileges-als | Ohio OVI Driving Privileges and ALS: How License Suspensions Work and What Options You May Have
Change type: major
Summary of change: Added new post for week-2 publishing cadence (planned publish date 2026-02-05) explaining ALS under ORC 4511.191, how ALS differs from court suspensions, and practical driving-privileges guidance; includes internal link to OVI practice area and related week-1 first-court-date post.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? n/a
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: codex/blog-week2-2026-02

Date/time: 2026-01-26 12:55 EST
Post slug and title: first-ovi-court-date-delaware-county-ohio | Your First OVI Court Date in Delaware County, Ohio: What Happens and How to Prepare
Change type: major
Summary of change: Added new post for week-1 publishing cadence (planned publish date 2026-01-27) covering first OVI court date expectations, bond conditions, and ALS vs court suspension concepts; includes ORC sources and visual marker.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? n/a
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: codex/blog-week1-2026-01

Date/time: 2026-01-26 12:55 EST
Post slug and title: no-contact-order-vs-civil-protection-order-ohio | No-Contact Orders vs Civil Protection Orders in Ohio: What’s the Difference?
Change type: major
Summary of change: Added new post for week-1 publishing cadence (planned publish date 2026-01-29) explaining criminal no-contact bond conditions vs civil protection orders (CPO), compliance rules, and ORC sources; includes protection-order visuals.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? n/a
- Meta/schema changed? yes
Approval token: n/a
Rollback notes: codex/blog-week1-2026-01

Date/time: 2026-01-01 14:39 EST
Post slug and title: Strategy update | docs/technical/SEO-STRATEGY-2025.md
Change type: minor
Summary of change: Refresh status to reflect SSR/SSG migration + intent pages completion and document remaining cutover/monitoring tasks.
Regression checklist:
- Hero changed? n/a
- Images removed? n/a
- Links changed? n/a
- Headings changed? yes
- Meta/schema changed? n/a
Approval token: n/a
Rollback notes: docs-only update in codex/docs-nextjs-alignment

Date/time: 2025-01-13 12:00 UTC
Post slug and title: motion-practice-criminal-defense | The Power of Motion Practice in Criminal Defense
Change type: major
Summary of change: Expanded and refined motion practice guidance to align with the P0 motion practice update.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: motion-practice-criminal-defense -- merge content updates -- minor -- 2025-01-13T12:00:00Z
Rollback notes: commit pending


Date/time: 2025-01-13 12:00 UTC
Post slug and title: refuse-field-sobriety-test-ohio | Can I Refuse Field Sobriety Tests in Ohio? Your Rights Explained
Change type: major
Summary of change: Rewrote the field sobriety refusal guide with structured sections on rights, test types, consequences, and local considerations; added cross-links to motion practice and lookback guidance.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: refuse-field-sobriety-test-ohio -- merge content updates -- minor -- 2025-01-13T12:00:00Z
Rollback notes: commit pending

Date/time: 2025-12-29 14:30 EST
Post slug and title: what-to-do-after-ovi-arrest-ohio | What to Do After an OVI Arrest in Ohio: A Step-by-Step Guide
Change type: major
Summary of change: Consolidated the OVI arrest guide into the blog system with an 8-step checklist and removed the placeholder resource page.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: what-to-do-after-ovi-arrest-ohio -- blog consolidation + 8-step guide -- major -- 2025-12-29T14:30-0500
Rollback notes: commit pending


Date/time: 2025-12-27 17:32 EST
Post slug and title: understanding-ovi-dui-charges-ohio | Understanding OVI/DUI Charges in Ohio: What You Need to Know
Change type: major
Summary of change: Expanded the OVI primer with visual markers, cost structure, and county/court variation guidance; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: understanding-ovi-dui-charges-ohio -- restore depth + visuals + EEAT -- major -- 2025-12-27T17:32-0500
Rollback notes: commit pending

Date/time: 2025-12-28 12:40 EST
Post slug and title: ex-parte-protection-orders-ohio-defense | Ex Parte Protection Orders in Ohio: What to Do When Accused Without Notice
Change type: major
Summary of change: Implemented Option 2 expansion with communication playbook, procedural abuse framing, custody overlap guidance, venue notes, evidence packet guidance, FAQ, and added OFW/TP links and updated sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: ex-parte-protection-orders-ohio-defense -- option-2 expansion + tools links -- major -- 2025-12-28T12:40-0500
Rollback notes: commit pending
Date/time: 2025-12-27 22:23 EST
Post slug and title: motion-practice-criminal-defense | The Power of Motion Practice in Criminal Defense
Change type: major
Summary of change: Added motion-type visual callout and confirmed compliance with blog visual requirements.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: APPROVED: motion-practice-criminal-defense -- visual callout + compliance pass -- major -- 2025-12-27T22:23-0500
Rollback notes: commit pending

Date/time: 2025-12-27 22:23 EST
Post slug and title: ohio-weapons-charges-ccw-defense | Ohio Weapons Charges: CCW, Improper Handling, and Weapons Disability Defense
Change type: major
Summary of change: Expanded to full-length guide with statutory anchors, added weapons overview and consequences visuals, and updated sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: ohio-weapons-charges-ccw-defense -- expand + visuals + EEAT sources -- major -- 2025-12-27T22:23-0500
Rollback notes: commit pending

Date/time: 2025-12-27 22:23 EST
Post slug and title: ohio-dui-checkpoint-hotspots | Ohio DUI Checkpoints: Legality, What to Expect, and Your Rights
Change type: major
Summary of change: Added checkpoint visuals, updated implied-consent wording to include oral fluid, and refreshed verification date.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: ohio-dui-checkpoint-hotspots -- visuals + implied-consent update -- major -- 2025-12-27T22:23-0500
Rollback notes: commit pending
Date/time: 2025-12-27 21:52 EST
Post slug and title: understanding-ovi-dui-charges-ohio | Understanding OVI/DUI Charges in Ohio: What You Need to Know
Change type: major
Summary of change: Added HB 37 update banner, penalties snapshot, oral-fluid implied-consent language, clarified record sealing limits, expanded FAQ, and refreshed cost framing.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: understanding-ovi-dui-charges-ohio -- HB37 updates + penalties snapshot + oral-fluid update -- major -- 2025-12-27T21:52-0500
Rollback notes: commit pending

Date/time: 2025-12-27 21:52 EST
Post slug and title: ohio-dui-lookback-period | Ohio DUI Lookback Period: How Prior Convictions Can Affect Your Case
Change type: major
Summary of change: Updated lookback definitions for offense/test date windows, corrected HB 37 penalty minimums, added official fee table, and clarified statutory anchors.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: ohio-dui-lookback-period -- HB37 penalties + window clarifications -- major -- 2025-12-27T21:52-0500
Rollback notes: commit pending

Date/time: 2025-12-27 21:52 EST
Post slug and title: refuse-field-sobriety-test-ohio | Can I Refuse Field Sobriety Tests in Ohio? Your Rights Explained
Change type: major
Summary of change: Added oral-fluid implied-consent language and clarified license consequences tied to chemical testing categories.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: refuse-field-sobriety-test-ohio -- oral-fluid + implied-consent clarifications -- major -- 2025-12-27T21:52-0500
Rollback notes: commit pending

Date/time: 2025-12-27 21:52 EST
Post slug and title: physical-control-parked-car-ohio-kevin-mcguff | Physical Control of a Parked Car in Ohio: What the Kevin McGuff Case Teaches About ORC 4511.194
Change type: major
Summary of change: Corrected penalties/points, added elements checklist and operate definition, added implied-consent note, and expanded sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: physical-control-parked-car-ohio-kevin-mcguff -- penalties + elements + sourcing -- major -- 2025-12-27T21:52-0500
Rollback notes: commit pending

Date/time: 2025-12-27 21:52 EST
Post slug and title: holiday-ovi-enforcement-ohio-delaware-dublin-columbus | Holiday OVI Enforcement in Ohio: What Drivers in Delaware, Dublin, and Central Ohio Should Expect
Change type: major
Summary of change: Added sobriety checkpoint legality context and authoritative source link.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: holiday-ovi-enforcement-ohio-delaware-dublin-columbus -- checkpoint legality context -- major -- 2025-12-27T21:52-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:41 EST
Post slug and title: holiday-ovi-enforcement-ohio-delaware-dublin-columbus | Holiday OVI Enforcement in Ohio: What Drivers in Delaware, Dublin, and Central Ohio Should Expect
Change type: major
Summary of change: Reworked holiday enforcement guide to align with approved enforcement messaging, removed unsupported local program specifics, and refreshed sources/verification date.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: holiday-ovi-enforcement-ohio-delaware-dublin-columbus -- finalize holiday OVI guide + sources -- major -- 2025-12-27T20:41-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:41 EST
Post slug and title: physical-control-parked-car-ohio-kevin-mcguff | Physical Control of a Parked Car in Ohio: What the Kevin McGuff Case Teaches About ORC 4511.194
Change type: major
Summary of change: Tightened McGuff case phrasing to remove unsourced BAC detail; refreshed lastVerified while preserving visuals and structure.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: APPROVED: physical-control-parked-car-ohio-kevin-mcguff -- finalize + source-safe edits -- major -- 2025-12-27T20:41-0500
Rollback notes: commit pending

Date/time: 2025-12-27 17:32 EST
Post slug and title: ohio-dui-lookback-period | Ohio DUI Lookback Period: How Prior Convictions Can Affect Your Case
Change type: major
Summary of change: Rebuilt lookback guidance with timeline/scenario visuals, cost structure, and local practice notes; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: ohio-dui-lookback-period -- restore depth + visuals + EEAT -- major -- 2025-12-27T17:32-0500
Rollback notes: commit pending

Date/time: 2025-12-27 17:32 EST
Post slug and title: refuse-field-sobriety-test-ohio | Can I Refuse Field Sobriety Tests in Ohio? Your Rights Explained
Change type: major
Summary of change: Expanded SFST refusal guidance with comparison visuals, local-practice notes, and refreshed lastVerified.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: refuse-field-sobriety-test-ohio -- restore depth + visuals + EEAT -- major -- 2025-12-27T17:32-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: drug-possession-vs-trafficking-ohio | Drug Possession vs. Trafficking: Understanding Ohio Drug Crime Charges
Change type: major
Summary of change: Restored long-form structure with statutory framing, visual markers, and county/court variation guidance; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: drug-possession-vs-trafficking-ohio -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: white-collar-crime-defense-ohio | White Collar Crime Defense: What You Need to Know
Change type: major
Summary of change: Expanded white collar guide with evidence handling, defense themes, and risk assessment guidance; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: white-collar-crime-defense-ohio -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: assault-domestic-violence-defense-ohio | Assault and Domestic Violence Defense in Ohio: Understanding ORC sections 2903.13, 2919.25, and Protection Orders
Change type: major
Summary of change: Rebuilt assault/DV guide with statute links, protection order flow, and defense overview; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: assault-domestic-violence-defense-ohio -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: sex-crimes-defense-ohio-what-you-need-to-know | Sex Crimes Defense in Ohio: What You Need to Know About Sexual Battery, Registration, and Your Rights
Change type: major
Summary of change: Updated sex-crimes guide with ORC 2907/2950 framing, registration duties, and defense themes; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: sex-crimes-defense-ohio-what-you-need-to-know -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: personal-injury-claims-ohio-negligence-law | Personal Injury Claims in Ohio: Understanding Negligence, Damages, and Your Legal Rights
Change type: major
Summary of change: Rebuilt negligence guide with comparative fault, damages, and process details; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: personal-injury-claims-ohio-negligence-law -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: ex-parte-protection-orders-ohio-defense | Ex Parte Protection Orders in Ohio: What to Do When Accused Without Notice
Change type: major
Summary of change: Rebuilt ex parte protection order guide with hearing flow, compliance guidance, and statute links; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: ex-parte-protection-orders-ohio-defense -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending

Date/time: 2025-12-27 20:03 EST
Post slug and title: bond-jail-information-delaware-county-ohio | Bond & Jail Information in Delaware County, Ohio
Change type: major
Summary of change: Rebuilt bond and jail guide with Ohio bail framework, Delaware County posting steps, and local contacts; refreshed lastVerified and sources.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? no
Approval token: APPROVED: bond-jail-information-delaware-county-ohio -- restore depth + visuals + EEAT -- major -- 2025-12-27T20:03-0500
Rollback notes: commit pending


Date/time: 2026-01-27 22:10 EST
Post slug and title: blogPosts imageUrl | Regenerate unique featured images for all blog posts
Change type: major
Summary of change: Generated a unique, no-text featured image per blog post slug and updated `src/data/blogPosts.ts` `imageUrl` fields to `/images/generated/blog-<slug>.png` to eliminate duplicate images and keep hero/thumbnail/OG consistent.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? yes
Approval token: pending
Rollback notes: revert `src/data/blogPosts.ts` imageUrl changes and remove `public/images/generated/blog-*.png`

Date/time: 2026-03-30 17:45 EDT
Post slug and title: ohio-ovi-driving-privileges-als, drug-possession-charge-ohio-what-to-do-next | Strengthen discovery links and cluster pathways
Change type: minor
Summary of change: Added clearer service-page pathways and cluster-specific internal links inside the ALS explainer and drug-possession explainer so both posts connect more directly to the OVI and drug-crime service clusters during the current indexing recovery pass.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? no
- Meta/schema changed? no
Approval token: pending
Rollback notes: revert the new internal-link sentences in `src/data/blogPosts.ts` for the ALS and drug-possession articles.

Date/time: 2026-03-30 20:28 EDT
Post slug and title: first-ovi-court-date-delaware-county-ohio, no-contact-order-vs-civil-protection-order-ohio, drug-possession-charge-ohio-what-to-do-next, ohio-ovi-driving-privileges-als, sex-crimes-defense-ohio-what-you-need-to-know | Point stale image overrides to the new editorial illustrations
Change type: minor
Summary of change: Updated post-level `imageUrl` overrides in `src/data/blogPosts.ts` so these five articles use the new slug-matched watercolor illustration assets instead of older fallback covers, restoring parity between the refreshed blog art system and the actual article pages.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? no
- Headings changed? no
- Meta/schema changed? no
Approval token: pending
Rollback notes: restore the prior `imageUrl` values in `src/data/blogPosts.ts` for the five affected posts.

Date/time: 2026-04-04 11:35 EDT
Post slug and title: about page, blog author surfaces, site metadata | Replace unsupported attorney claims with dossier-backed EEAT facts
Change type: major
Summary of change: Rewrote attorney background, schema, and metadata surfaces to use the publicly supported facts from the April 4 research dossier: Ohio Supreme Court registration no. `0071238`, Central Ohio practice since 1999, Mango Law founding in February 2009, Sixth Circuit admission on November 10, 2014, and published OVI appellate work. Removed unsupported public claims about BAC DataMaster/NHTSA certifications, CLE presenting, and jury-trial counts.
Regression checklist:
- Hero changed? no
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: pending
Rollback notes: revert `src/data/attorneyProfile.ts` and the linked metadata/schema/about/blog/footer updates in this EEAT pass.

Date/time: 2026-04-04 19:10 EDT
Post slug and title: ovi-dui-defense-delaware-oh, criminal-defense-delaware-oh | Tighten April SEO recovery money pages around keyword ownership and proof
Change type: major
Summary of change: Reworked the canonical OVI and Delaware criminal-defense money pages to use clearer Delaware/OVI/criminal-intent language, added verified attorney proof blocks, and tightened cluster links into the OVI, drug, domestic-violence, protection-order, and glossary support pages.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: pending
Rollback notes: revert the scoped updates in `src/app/(site)/ovi-dui-defense-delaware-oh/page.tsx`, `src/views/OviDuiPage.tsx`, `src/app/(site)/criminal-defense-delaware-oh/page.tsx`, and `src/views/CriminalDefensePage.tsx`.

Date/time: 2026-05-03 15:58 EDT
Post slug and title: drug-crime-lawyer-delaware-oh | Drug crime owner-page keyword and indexing prep
Change type: minor
Summary of change: Updated the drug-crime owner page title, metadata, hero, intro, support links, and body copy to align with the seven validated drug-crime tracker terms; added a trafficking statute callout; tightened trafficking/paraphernalia legal claims against current Ohio sources; and refreshed sitemap lastmod before GSC submission.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: APPROVED: continue keyword/tracking/content queue after checkpoint cleanup no longer blocking publication -- 2026-05-03
Rollback notes: revert the scoped updates in `src/app/(site)/drug-crime-lawyer-delaware-oh/page.tsx`, `src/views/DrugCrimePage.tsx`, `src/data/seoRoutingContent.ts`, `src/data/statutes.ts`, and `src/app/sitemap.ts`.

Date/time: 2026-05-03 16:13 EDT
Post slug and title: protection-order-lawyer-delaware-oh | Protection-order owner-page keyword and legal-language cleanup
Change type: minor
Summary of change: Updated the protection-order owner page title, metadata, hero, intro, FAQ language, contextual copy, and support links for the six validated CPO/protection-order tracker terms; softened overbroad firearm and counter-petition claims against current official sources; and refreshed sitemap lastmod before GSC submission.
Regression checklist:
- Hero changed? yes
- Images removed? no
- Links changed? yes
- Headings changed? yes
- Meta/schema changed? yes
Approval token: APPROVED: continue keyword/tracking/content queue after checkpoint cleanup no longer blocking publication -- 2026-05-03
Rollback notes: revert the scoped updates in `src/app/(site)/protection-order-lawyer-delaware-oh/page.tsx`, `src/views/ProtectionOrderPage.tsx`, `src/views/HighIntentPages.tsx`, `src/data/blogPosts.ts`, `src/data/statutes.ts`, and `src/app/sitemap.ts`.
