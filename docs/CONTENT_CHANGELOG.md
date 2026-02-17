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
