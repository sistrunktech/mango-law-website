# SEO Ops Hardening and Next Queue

Date: 2026-05-09
Owner: Sistrunk Tech / Mango Law

## Deployed Fixes

- Restored the nine May blog/support URLs by deploying the current production source to `https://mango.law`.
- Hardened Google OAuth connect/callback state handling with one-time nonce storage and admin-only connect initiation.
- Locked SEO/admin tables behind admin/service-role policies while preserving public lead intake.
- Removed public/anon access from `check-rankings` and `checkpoint-scraper`; both now require an admin session or verified service-role invocation.
- Removed the hardcoded Serper fallback from rank checking and made all-failed rank runs return a failure status instead of a green success.
- Fixed the admin rank-check UI so it reports checked, successful, and failed keyword counts.
- Repaired the DUI checkpoint scraper scheduler so pg_cron calls the Edge Function with service-role auth every 4 hours.
- Updated checkpoint scraper health handling so vague public notices without street-level locations are warnings, not failed runs.
- Replaced the stale WTOL RSS endpoint and added tests for the RSS source set and geocoding skip logic.
- Fixed the checkpoint map empty-coordinate guard so valid `0` coordinates are not treated as missing.

## Live Verification

- Production deployment aliased to `https://mango.law` returned `200` for the homepage and `/admin/checkpoints`.
- `https://mango.law/sitemap.xml` returned `200` with 59 URLs, including the recovered May blog routes.
- Unauthenticated public calls to `checkpoint-scraper` are rejected with `401`.
- Unauthenticated public calls to `google-oauth-connect` are rejected with `401`.
- Direct service-role rank check returned `status=success`, `processed=17`, `successCount=17`, and `failureCount=0`.
- Direct service-role checkpoint scrape returned `status=success`; warnings were limited to public-source notices that intentionally do not publish a mappable location.
- Database-triggered scheduler run completed on 2026-05-09 at 21:20 UTC with `status=success`, `health=warning`, `errors=[]`, 307 checkpoints found, 308 checkpoint rows updated, 15 announcements upserted, 11 RSS sources checked, and 0 RSS source failures.

## Current GSC Queue

Full sitemap URL Inspection audit output: `output/gsc-2026-05-09-sitemap-domain-audit.json`.

| Priority | URL | Current API status | 2026-05-09 action / next action |
|---|---|---|---|
| P0 | `/blog/no-contact-order-vs-civil-protection-order-ohio` | URL is unknown to Google | Submitted in browser GSC; recheck 2026-05-16. |
| P0 | `/blog/ohio-dui-checkpoint-hotspots` | URL is unknown to Google | Submitted in browser GSC; recheck 2026-05-16. |
| P0 | `/protection-order-lawyer-delaware-oh` | Discovered - currently not indexed | Re-requested in browser GSC; recheck 2026-05-16 and do not duplicate-submit before then. |
| P1 | `/sex-crime-defense-lawyer-delaware-oh` | Discovered - currently not indexed | Submitted in browser GSC; recheck 2026-05-16. |
| P1 | `/white-collar-crimes-attorney-delaware-oh` | Discovered - currently not indexed | Not confirmed submitted; browser focus moved before a GSC confirmation screen was observed. Request in the next browser-owned pass if still not indexed. |
| P1 | `/motion-to-suppress-ovi-ohio` | Discovered - currently not indexed | Request indexing in next browser-owned pass if quota remains. |
| P1 | `/civil-protection-order-defense-ohio` | Discovered - currently not indexed | Request indexing in next browser-owned pass if quota remains. |
| P1 | `/drug-possession-vs-trafficking-ohio-defense` | Discovered - currently not indexed | Request indexing in next browser-owned pass if quota remains. |
| P2 | `/privacy` | URL is unknown to Google | Low SEO value; not submitted. Recheck only for coverage cleanup. |

The prior nine blog URLs that were blocked by production 404/sitemap absence are now live and indexable. Google's URL Inspection API can inspect but cannot click `Request indexing`, so remaining request-indexing work is browser/UI driven and should start with the rows marked `pending_browser_request` in `gsc-indexing-submission-log.csv`.

## Reporting Backend Overhaul Scope

The current admin/reporting stack is useful but should be treated as a foundation, not a finished client handoff product.

### Phase 1: Reliable Data Collection

- Scheduled GSC URL Inspection and sitemap-drift snapshots for the priority queue.
- Scheduled GA4 SEO conversion rollups for form, call, email, chat, and CTA events.
- Scheduled Serper rank checks with failure visibility and key-health alerts.
- Scheduled DUI checkpoint health checks that alert on missed cron runs, blocking scraper errors, and stale public data.

### Phase 2: Secure Client Reporting Surface

- Server-side report APIs only; no service-role keys or vendor API keys in browser code.
- Admin/session-gated dashboard for Sistrunk Tech and client-safe read-only views.
- Stored Google OAuth tokens with nonce/state protection, rotation notes, and access-status checks.
- Monthly report generator that combines GSC, GA4, rank checks, indexing status, checkpoint health, content changes, and local SEO work into a reviewable draft.

### Phase 3: Blogging and On-Site SEO Assistant

- Draft-only content assistant for briefs, internal-link suggestions, metadata, schema candidates, and refresh opportunities.
- Human approval before publishing or changing protected legal content.
- Source/evidence requirements for legal claims and local enforcement/checkpoint updates.
- Task queue that separates safe automated recommendations from browser/manual actions such as GSC indexing requests and vendor-dashboard edits.

## Maintenance Notes

- Rotate the Serper key from the vendor account when practical because an older fallback key existed in source history; the deployed function no longer uses a code fallback.
- Browser-only GSC indexing requests still require an authenticated Google session and cannot be fully automated through the official API.
- The Codex weekly SEO ops recheck and monthly report-prep automations are detached worktree jobs, not desktop-browser jobs, so they do not depend on this Mac staying on.
