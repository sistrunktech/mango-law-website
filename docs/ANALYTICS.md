# Analytics Source of Truth

## Canonical Pipeline

- GA4 property: `Mango Law GA4` (`517166804`)
- Web stream: `Mango Law CX Website` (`13173376535`)
- Measurement ID: `G-NJZD79GGFG`
- Tag Manager container: `GTM-WLJQZKB5`
- Source contract: `mango_page_view` maps to `page_view`, `cta_click` maps to `cta_click`, and
  `lead_submitted` maps to the GA4 key event `generate_lead`.

The repository intentionally installs only `GTM-WLJQZKB5` in `src/app/layout.tsx`. Do not hard-code a GA4 tag or a
second GTM container in application source.

## Consent Policy Boundary

The current policy is conservative Consent Mode v2: analytics and advertising storage default to denied. A first-time
visitor receives the site banner and may accept, reject, or customize consent. The choice is stored in
`ml_consent_v2` and is applied immediately through `window.__mlConsent.update(...)`.

Do not change the default to granted without firm approval and advertising/privacy review.

## Production Verification: 2026-08-06

A clean Chromium session confirmed:

- the consent banner is visible after hydration on the homepage;
- initial analytics requests carry `gcs=G100`;
- clicking **Accept all** stores `ml_consent_v2` and subsequent requests carry `gcs=G111`;
- the `submit-contact` CORS preflight returns `204` from a clean network;
- an empty, non-submitting validation probe returns the expected `400` response;
- `/delaware-ohio-ovi-lawyer` already returns a permanent `308` to `/ovi-dui-defense-delaware-oh`.

This verifies the repository consent grant path. The authenticated GA4 console check described below confirms the
canonical event stream and key-event configuration.

## Non-Canonical Hosting Tag: Resolved 2026-08-06

Production previously loaded `GTM-KPSF4BMD` and sent page views to `G-DXTMLCTX3V` through the first-party `/zvxt/` path.
Neither identifier nor path exists in this repository. The observed behavior matches Cloudflare's zone-level Google tag
gateway, which can override an existing site tag and proxy scripts and collection through a first-party path.

The authenticated Cloudflare console confirmed an active `mango.law` Google Tag Gateway configuration for
`GTM-KPSF4BMD` on `/zvxt`. The gateway was disabled without changing the repository's consent or GTM setup. Fresh
loads of `/`, `/resources/dui-checkpoints`, and `/blog/what-to-do-after-dui-checkpoint-stop-ohio` then contained only
the canonical pipeline; `/zvxt`, `GTM-KPSF4BMD`, and `G-DXTMLCTX3V` were absent. The Cloudflare domain list also
reported the `mango.law` gateway as inactive.

The authenticated GA4 console also confirmed that:

- `generate_lead` is marked as a key event and has activity from `Mango Law CX Website`;
- canonical property `517166804` is receiving `page_view`, `cta_click`, and `generate_lead` events; and
- no-stream property `517271016` was renamed `ARCHIVE - Empty - Mango Law Website` instead of being deleted.

For future recurrence, remove the non-canonical destination in the hosting/tag consoles, not by adding a client-side blocker:

1. In the Cloudflare `mango.law` zone, inspect **Google tag gateway for advertisers** and its `/zvxt` measurement path.
2. Identify why that zone-level setup loads `GTM-KPSF4BMD` and destination `G-DXTMLCTX3V`.
3. Disable/remove that destination, or reconfigure the gateway to serve only the canonical `G-NJZD79GGFG` pipeline.
4. Recheck `/`, `/resources/dui-checkpoints`, and one blog page in a clean session; exactly one GA4 `tid` must fire for
   each `page_view`.
5. In GA4 Admin, clearly rename or remove any empty duplicate property. Property deletion is an external, destructive
   action and requires owner confirmation.

Cloudflare documents that Google tag gateway is configured at the zone level and can override an existing GTM script:
<https://developers.cloudflare.com/google-tag-gateway/>.

## Appendix A: GSC Quarterly and Monthly Trend Re-cut

Source: GSC performance data supplied on 2026-08-06. The 90-day periods are May 4-August 3 and February 4-May 3.
August contains only August 1-3 and is excluded from month-over-month conclusions.

### Site-wide 90 days versus previous 90 days

| Metric | May 4-Aug 3 | Feb 4-May 3 | Change |
| --- | ---: | ---: | ---: |
| Clicks | 3,500 | 223 | +1,470% |
| Impressions | 80.1K | 7.06K | +1,035% |
| CTR | 4.4% | 3.2% | +1.2 points |
| Average position | 7.7 | 21.5 | -13.8 |

### Key pages on the same 90-day comparison

| Page | Clicks | Impressions | Average position |
| --- | ---: | ---: | ---: |
| `/resources/dui-checkpoints` | 3,202 vs 24 | 62,573 vs 1,059 | 6.9 vs 11.2 |
| `/` | 157 vs 162 | 2,994 vs 3,950 | 9.2 vs 25.9 |
| `/of-counsel` | 5 vs 8 | 388 vs 384 | 7.8 vs 11.0 |
| Top six blog posts | ~135 vs 0 | ~10.9K vs 0 | New |

### Monthly trend

| Month | Clicks | Impressions | CTR | Average position | Checkpoint clicks |
| --- | ---: | ---: | ---: | ---: | ---: |
| Feb 4-28 | 63 | 1,665 | 3.8% | 14.0 | 0 |
| March | 71 | 1,905 | 3.7% | 12.0 | 0 |
| April | 68 | 2,934 | 2.3% | 33.9 | 10 |
| May | 858 | 22,540 | 3.8% | 8.4 | 768 |
| June | 910 | 23,995 | 3.8% | 7.4 | 805 |
| July | 1,685 | 32,083 | 5.3% | 7.3 | 1,586 |
| Aug 1-3 | 65 | 2,007 | 3.2% | 9.2 | 57 |

April's average-position decline reflects a changed query mix, including deep-position Delaware-state-intent estate,
probate, and collection-defense impressions. It should not be treated as evidence of a site-wide ranking loss.

Commercial-intent queries (`lawyer|attorney|defense|law firm`) produced monthly impressions of 355, 442, 1,247,
734, 546, and 787 from February through July. Monthly clicks were 0, 0, 0, 1, 0, and 0. Visibility improved, but
the dataset does not show meaningful commercial click capture.

### Interpretation boundaries

- The checkpoint page changed from 10 total clicks in February-April to 768 in May and 1,586 in July. OSHP
  enforcement announcements and holiday timing are plausible seasonal drivers, but GSC alone does not prove causation.
- The homepage improved from position 25.9 to 9.2 while clicks stayed roughly flat and impressions declined 24%.
  This supports a click-capture or query-mix problem; it does not by itself prove cannibalization.
- Position-one, zero-click commercial queries may reflect geographic mismatch or SERP features. Do not attribute them
  specifically to AI Overviews without separate SERP evidence.
- `/of-counsel` remains too low-volume for meaningful month-over-month inference.
- July is the pre-fix seasonal peak baseline. A decline after Labor Day may be normal seasonality, so measurement
  integrity and conversion validation should be evaluated separately from checkpoint traffic decay.
