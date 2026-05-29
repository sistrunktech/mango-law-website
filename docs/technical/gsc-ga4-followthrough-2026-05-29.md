# GSC and GA4 Follow-Through - 2026-05-29

Purpose: capture the approved Search Console and GA4 follow-through after the May 29 SEO/AIO technical pass.

## Source Exports

Raw local exports were written outside this worktree in the existing reporting output directory:

- `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website/output/gsc-2026-05-29-priority-refresh.json`
- `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website/output/gsc-ga4-2026-05-29-live-pull.json`
- `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website/output/gsc-2026-05-29-request-indexing-log.json`

Capture times:

- GSC URL Inspection API: 2026-05-29 15:06-15:08 EDT.
- GSC and GA4 reporting pull: 2026-05-29 15:09 EDT.
- GSC manual request-indexing confirmations: 2026-05-29 15:15 EDT.

## GSC URL Inspection

Both `sc-domain:mango.law` and `https://mango.law/` returned the same priority status summary:

| State | Count |
| --- | ---: |
| Submitted and indexed | 5 |
| Discovered - currently not indexed | 4 |
| URL is unknown to Google | 1 |

Indexed / healthy:

- `https://mango.law/ovi-dui-defense-delaware-oh` - last crawl 2026-05-28 16:30 UTC.
- `https://mango.law/resources/dui-checkpoints` - last crawl 2026-05-29 11:11 UTC.
- `https://mango.law/blog/no-contact-bond-terms-domestic-violence-ohio` - last crawl 2026-05-19 20:53 UTC.
- `https://mango.law/blog/cdl-out-of-state-driver-ovi-ohio` - last crawl 2026-05-20 13:05 UTC.
- `https://mango.law/blog/summons-vs-arrest-delaware-county-ohio` - last crawl 2026-05-20 13:05 UTC.

Still not indexed before manual action:

- `https://mango.law/motion-to-suppress-ovi-ohio`
- `https://mango.law/blog/ohio-ovi-driving-privileges-als`
- `https://mango.law/blog/drug-possession-charge-ohio-what-to-do-next`
- `https://mango.law/protection-order-lawyer-delaware-oh`

AIO discovery surface:

- `https://mango.law/llms.txt` was `URL is unknown to Google` before the expanded `llms.txt` route is deployed.

## Manual GSC Actions

With user pre-approval, manual `Request indexing` was submitted in GSC for:

- `https://mango.law/motion-to-suppress-ovi-ohio`
- `https://mango.law/blog/ohio-ovi-driving-privileges-als`
- `https://mango.law/blog/drug-possession-charge-ohio-what-to-do-next`
- `https://mango.law/protection-order-lawyer-delaware-oh`

GSC confirmed each URL was added to the priority crawl queue.

Do not request these same URLs again in the next follow-up; repeated submission does not change queue position or priority.

## GSC Performance

Comparison windows:

- Current 10-day window: 2026-05-19 through 2026-05-28.
- Prior 10-day window: 2026-05-09 through 2026-05-18.

| Window | Clicks | Impressions | Avg position |
| --- | ---: | ---: | ---: |
| 2026-05-19 to 2026-05-28 | 552 | 10,750 | 7.47 |
| 2026-05-09 to 2026-05-18 | 150 | 6,460 | 9.69 |

Current top page:

- `https://mango.law/resources/dui-checkpoints`: 523 clicks, 9,475 impressions, avg position 6.60.

Current indexed support-page signals:

- `/blog/no-contact-bond-terms-domestic-violence-ohio`: 3 clicks, 130 impressions, avg position 10.82.
- `/blog/cdl-out-of-state-driver-ovi-ohio`: 0 clicks, 107 impressions, avg position 15.37.
- `/blog/summons-vs-arrest-delaware-county-ohio`: visible in GA4 page engagement; no meaningful GSC click signal yet.

Top current queries remain checkpoint-led, including `where are dui checkpoints tonight`, `dui checkpoints tonight`, `dui checkpoints tonight near me`, and `dui checkpoints near me`.

## GA4

GA4 property selected by the stored integration:

- Account: Mango Law
- Property: Mango Law GA4
- Property ID: `517166804`

GA4 current 10-day window, 2026-05-19 through 2026-05-28:

- Active users: 4
- New users: 3
- Event count: 71
- Key events: 2

GA4 last 30 days, 2026-04-29 through 2026-05-28:

- Active users: 65
- New users: 62
- Event count: 521
- Key events: 7

Current 10-day event detail:

- `page_view`: 36 events.
- `cta_click`: 2 events.
- `generate_lead`: 2 events, counted as 2 key events.
- `user_engagement`: 9 events.

Interpretation boundary: GA4 now shows `generate_lead` key events in the reporting API, but the sample is very small. Report as validated tracking visibility, not as conversion growth.

## Completed On-Site Actions

The May 29 site patch supports the GSC/AIO follow-through by:

- Expanding the `llms.txt` route into a canonical AI-readable discovery and citation guide.
- Removing the duplicate static `public/llms.txt`.
- Refreshing sitemap lastmod hints for the current OVI/checkpoint/support surfaces.
- Adding `llms.txt` to the sitemap discovery surface after GSC reported no referring sitemap for the newly deployed file.
- Removing the sitemap route's IndexNow side effect.
- Fixing the missing 192px favicon metadata reference.
- Removing client-side head mutation from top checkpoint, OVI, and criminal-defense pages that already have App Router metadata/schema.
- Strengthening the indexing surface smoke script so local and live checks fail on bad status/canonical/sitemap/robots/llms signals.

## Post-Deploy Follow-Up

Completed after the May 29 deployment:

1. Submitted `https://mango.law/sitemap.xml` in GSC for both the domain and URL-prefix properties.
2. Inspected `https://mango.law/llms.txt`; it was `URL is unknown to Google`.
3. Tried manual indexing requests for `llms.txt` under both properties; GSC returned its retry-later UI error, so discovery should rely on root availability plus sitemap inclusion.

Next reporting follow-up:

1. Reinspect the four requested URLs after Google has had time to crawl:
   - `/motion-to-suppress-ovi-ohio`
   - `/blog/ohio-ovi-driving-privileges-als`
   - `/blog/drug-possession-charge-ohio-what-to-do-next`
   - `/protection-order-lawyer-delaware-oh`
2. Reinspect `https://mango.law/llms.txt` after the sitemap version that includes it has been deployed and resubmitted.
3. Keep conversion language cautious until GA4 has more real `generate_lead` events.
