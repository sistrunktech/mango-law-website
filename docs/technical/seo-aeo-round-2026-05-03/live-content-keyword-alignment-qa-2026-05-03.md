# Live Content Keyword Alignment QA

Date: 2026-05-03
Scope: onsite SEO/AEO keyword-content alignment after Google Ads Keyword Planner capture

## Inputs Reviewed

- `docs/technical/seo-keyword-research-tracking-2026-04/google-ads-keyword-planner-seed-list-50.txt`
- `docs/technical/seo-keyword-research-tracking-2026-04/final-tracked-keywords.csv`
- `docs/technical/seo-keyword-research-tracking-2026-04/page-ownership-map.csv`
- `docs/technical/seo-keyword-research-tracking-2026-04/blog-publishing-plan-2026-04.csv`
- `docs/technical/seo-aeo-round-2026-05-03/google-ads-keyword-planner-results-capture.csv`
- `docs/technical/seo-aeo-round-2026-05-03/google-ads-keyword-planner-historical-metrics-export-2026-05-03.csv`
- `src/data/blogPosts.ts`
- `src/lib/blogPostsRepo.ts`
- `src/app/(site)/**/page.tsx` for the reviewed owner/support routes
- `src/views/OviDuiPage.tsx`
- `src/views/CriminalDefensePage.tsx`
- `src/views/DomesticViolencePage.tsx`
- `src/views/HighIntentPages.tsx`
- `src/views/DUICheckpointsPage.tsx`
- `src/views/OviCheckpointsOhioPage.tsx`
- `src/components/StructuredData.tsx`
- `src/lib/seo-metadata.ts`

## Planner Evidence Summary

Planner returned row-level volume for 12 of the 50 tracked terms. Blank rows should stay in tracking because they are attorney-intent variants, but they should not drive new content ahead of measured clusters.

| Cluster | Measured Planner signal | QA priority |
|---|---:|---|
| Criminal defense | `delaware county criminal defense attorney` 500; `delaware county criminal lawyer` 500; `criminal defense attorney delaware ohio` 50 | Highest commercial onsite priority |
| First offense OVI | `first offense ovi ohio` 500 | Highest OVI support priority |
| Checkpoints | `ohio dui checkpoints` 500; `ohio ovi checkpoints` 500 | Highest resource/freshness priority |
| OVI/DUI commercial | `delaware ohio ovi lawyer` 50; `delaware county dui lawyer` 50 | Keep pillar owner; support with narrower pages |
| Domestic violence | `domestic violence lawyer delaware ohio` 50; `first offense domestic violence ohio` 50 | Keep owner/support split |
| Motion to suppress | `motion to suppress ovi ohio` 50 | Keep dedicated support page and link from high-tier/test content |
| High-tier OVI | `high tier ovi ohio` 50 | Use new post as support, not a new owner page |
| ALS/refusal | No row-level volume returned for ALS/refusal terms | Keep pages because they are urgent lead-intent support and were already mapped/indexing-priority pages |

## Recommended Owner Map

| Keyword cluster | Recommended owner | Support content | QA decision |
|---|---|---|---|
| Criminal defense | `/criminal-defense-delaware-oh` | Future Delaware County criminal timeline and misdemeanor/felony articles | Valid owner. Planner now makes county phrasing more important than the current title/meta emphasize. |
| OVI/DUI | `/ovi-dui-defense-delaware-oh` | `/first-offense-ovi-ohio`, `/als-license-suspension-ohio`, `/ovi-test-refusal-lawyer-ohio`, `/motion-to-suppress-ovi-ohio`, high-tier post, checkpoint pages | Valid owner. Do not assign `/delaware-ohio-ovi-lawyer`; it redirects. |
| First offense OVI | `/first-offense-ovi-ohio` | OVI pillar and ALS/refusal pages | Valid dedicated support owner. Planner volume warrants optimization ahead of new low-volume posts. |
| High-tier OVI | `/blog/high-tier-ovi-ohio-17-test` as support; `/ovi-dui-defense-delaware-oh` remains commercial owner | `/first-offense-ovi-ohio`, `/felony-ovi-lawyer-ohio`, ALS/refusal pages | Valid support article. Do not create a separate high-tier service owner yet. |
| Checkpoints | `/resources/dui-checkpoints` for `ohio dui checkpoints`; `/ovi-checkpoints-ohio` for `ohio ovi checkpoints` | OVI pillar, first-offense, ALS, motion pages | Valid split, but freshness and cross-linking must stay tight to avoid duplicate-resource drift. |
| Domestic violence | `/domestic-violence-lawyer-delaware-oh` | `/domestic-violence-first-offense-ohio-defense`, protection-order pages | Valid owner/support split. Add exact "lawyer" variant where natural. |
| Motion to suppress | `/motion-to-suppress-ovi-ohio` | OVI pillar, high-tier post, criminal motion-practice blog | Valid support owner. Needs more links from testing/high-tier content. |
| ALS/refusal | `/als-license-suspension-ohio` and `/ovi-test-refusal-lawyer-ohio` | OVI pillar, first-offense OVI, Liv's Law/high-tier posts | Valid urgent-intent support pages despite blank Planner volume. Indexing and internal links matter more than new content. |

## Live Alignment Findings

1. Criminal defense is the biggest Planner-backed commercial gap.
   `/criminal-defense-delaware-oh` is the right owner and already has FAQ, breadcrumb schema, internal links to drug/DV/protection/OVI, and a strong H1. The issue is emphasis: the top Planner terms are county phrases at 500 average monthly searches, while the title/meta/H1 lead with "Delaware Ohio." Next onsite round should add "Delaware County criminal defense attorney" naturally to title/meta/H1 or early body copy.

2. First-offense OVI should outrank refusal/ALS posts in the next optimization queue.
   `/first-offense-ovi-ohio` has exact title/H1 alignment, FAQ schema, and links to the OVI/ALS/refusal/suppression pages. Because Planner returned 500 average monthly searches for `first offense ovi ohio`, optimize this live page before drafting lower-evidence refusal content.

3. The high-tier OVI post is QA-positive with one internal-link gap.
   `src/data/blogPosts.ts` adds `/blog/high-tier-ovi-ohio-17-test` with exact title/H1 alignment, current official sources, FAQ/article schema via the blog route, and an existing generated image. It links to OVI, felony OVI, ALS, first-offense OVI, refusal, and contact. Add a contextual link to `/motion-to-suppress-ovi-ohio` in the testing/challenge section during the next source edit because the post discusses test admissibility and Planner shows measured volume for `motion to suppress ovi ohio`.

4. Checkpoint ownership is valid but needs freshness discipline.
   `/resources/dui-checkpoints` cleanly owns `ohio dui checkpoints`, while `/ovi-checkpoints-ohio` owns `ohio ovi checkpoints`. Both have metadata, breadcrumbs, and FAQ schema patterns. Because both Planner terms show 500 average monthly searches, keep both tracked only if the map/update process remains current and cross-links route legal-intent users back to `/ovi-dui-defense-delaware-oh`.

5. Domestic violence owner split is now defensible.
   `/domestic-violence-lawyer-delaware-oh` should own local commercial DV terms. `/domestic-violence-first-offense-ohio-defense` should own `first offense domestic violence ohio`. Both have FAQ/breadcrumb schema. The commercial page title uses "Attorney" while Planner measured "lawyer"; add "domestic violence lawyer Delaware Ohio" naturally in body copy or metadata, but do not move ownership to the first-offense support page.

6. ALS/refusal pages are aligned even without Planner volume.
   `/als-license-suspension-ohio` and `/ovi-test-refusal-lawyer-ohio` have title/meta/H1/schema/internal-link alignment for their support roles. Since Planner returned no row-level volume, do not publish extra standalone ALS/refusal articles ahead of measured first-offense OVI, criminal-defense, and checkpoint work. Keep the pages because they are lead-urgent and support OVI conversions.

## Implementation Queue

| Priority | Work item | Rationale |
|---|---|---|
| P0 | Optimize `/criminal-defense-delaware-oh` for "Delaware County criminal defense attorney" and "Delaware County criminal lawyer." | Two 500-volume Planner rows plus commercial defense intent. Highest ROI onsite change. |
| P0 | Optimize `/first-offense-ovi-ohio` before drafting more OVI support posts. | `first offense ovi ohio` returned 500 searches; page already exists and can capture without new publishing. |
| P0 | Keep checkpoint freshness/reindexing checks active for `/resources/dui-checkpoints` and `/ovi-checkpoints-ohio`. | Both checkpoint terms returned 500 searches; stale data would undermine trust and AEO usefulness. |
| P1 | Add `/motion-to-suppress-ovi-ohio` link inside the high-tier OVI post's evidence/testing section. | `motion to suppress ovi ohio` has measured volume and is contextually relevant to high-tier testing challenges. |
| P1 | Add exact "domestic violence lawyer Delaware Ohio" phrasing to the DV commercial owner page. | Planner measured that exact commercial term at 50 searches; current title leads with "Attorney." |
| P1 | Submit/follow up GSC indexing for April not-indexed P1 owner/support pages before relying on rankings. | Drug, protection-order, DV, ALS, and refusal owners were live-test-valid but not indexed in April. |
| P2 | Keep ALS/refusal support pages linked from all OVI posts, but delay new ALS/refusal articles unless GSC shows query demand. | Planner returned blank row-level volume for these terms; they remain conversion-support assets, not next content drivers. |

## 10-Post Plan Ordering Recommendation

Planner data warrants a minor reorder, not a rewrite:

1. Keep published/drafted: Liv's Law post and high-tier OVI post.
2. Move first-offense OVI live-page optimization ahead of the planned refusal-vs-failed-test article.
3. Move the Delaware County criminal case timeline article earlier than drug OVI if production capacity is tight, because county criminal-defense terms returned the strongest commercial Planner signal.
4. Keep domestic-violence arrest article in the next two weeks because DV has measured commercial volume and the owner page needs support/indexing.
5. Keep CPO, drug possession, misdemeanor/felony, and criminal timeline pieces in the 5-week plan, but prioritize the two criminal-defense support pieces above lower-evidence ALS/refusal expansion.

Suggested next order:

| Order | Asset | Change |
|---:|---|---|
| 1 | Optimize `/criminal-defense-delaware-oh` | Move to top of onsite queue. |
| 2 | Optimize `/first-offense-ovi-ohio` | Move ahead of new refusal article. |
| 3 | Maintain/checkpoint QA for `/resources/dui-checkpoints` and `/ovi-checkpoints-ohio` | Treat as ongoing freshness task. |
| 4 | Publish "What Happens After a Domestic Violence Arrest in Delaware County, Ohio?" | Keep near-term because DV has measured local volume. |
| 5 | Publish "Delaware County Criminal Case Timeline..." | Move earlier if only one criminal-defense support piece can be produced. |
| 6 | Publish "Misdemeanor vs. Felony Charges in Delaware County..." | Supports strong criminal-defense cluster. |
| 7 | Publish "OVI Refusal vs. Failed Test in Ohio..." | Keep, but after measured first-offense/criminal/checkpoint work. |
| 8 | Publish "Drug OVI in Ohio..." | Completed 2026-05-03 as a bridge between OVI, drug-defense, suppression, refusal, ALS, and oral-fluid testing topics. |
| 9 | Publish "Civil Protection Order Hearing in Delaware County..." | Keep unless Planner/GSC later shows stronger CPO demand. |
| 10 | Publish "Drug Possession in a Car in Ohio..." | Keep as later support for drug owner. |

## Bottom Line

The April ownership map mostly holds after Planner evidence. The main adjustment is priority, not ownership: push criminal-defense county phrasing and first-offense OVI optimization to the front, keep checkpoint freshness as a high-volume resource task, and use high-tier/DV/motion pages as targeted support rather than creating new owner pages.
