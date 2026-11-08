# Mango editorial continuation: October 29, 2026

Tim approved the existing Mango plan and asked to receive verified live links for review. Continue the existing program; do not add another publisher or recurring schedule.

## Existing program and actual state

- Existing heartbeat: **Mango Law three-month recovery**, ID `mango-law-weekly-seo-ops-recheck`, target task `01a078e0-0b17-7c33-aeb8-0c99986369b2`.
- Native definition inspected October 29: **PAUSED**. The September runbook's ACTIVE claim is historical. Other four legacy Mango automations remain paused.
- Preserve its Monday/Wednesday/Friday 9 a.m. America/New_York cadence and December 6 program end. Do not mass-publish missed slots or silently extend the program.
- Existing working copy: `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website.wt/rank-tracker-content-2026-09-06/docs/seo-90-day/`.
- Continue `README.md`, `RUNBOOK.md`, `execution-queue.csv` and the latest dated log there. Five dirty program files were present during this audit; ownership of those existing edits was not claimed or overwritten.
- The last dated execution log is September 18; September/October queue entries are overdue. Reassess each from fresh evidence before advancing it.

## Deduplicated publication queue

| Priority | Item | Current disposition | Completion evidence |
| --- | --- | --- | --- |
| P0 | Halloween 2026 Project Plan Ahead article, `ohio-halloween-rideshare-credits-2026` | Tested source committed as `279d2e2`; [ready PR 174](https://github.com/sistrunktech/mango-law-website/pull/174), all remote checks green. Publication authorized; approved merge path and Cloudflare authentication remain blocked below. | Exact production URL, reviewed content, canonical, sitemap, image, mobile and expiry notice checked after release; then notify Tim. |
| P0 | Checkpoint scheduled ingestion recovery | Four-hour cron active; last completed run September 13 at 08:17 UTC. Tested runtime fix committed as `a795f4c`; [draft PR 175](https://github.com/sistrunktech/mango-law-website/pull/175). Further official-source/freshness work is separate. | Deployed Edge revision, completed scheduled run, normalized source-backed event and actual public rendering. |
| P1 | Lab testing and chain of custody in Ohio drug cases | Next unfinished May 19 pillar-roadmap topic. Research and draft using current official sources; check CMS drafts before creating a new slug. | Source packet, accurate legal claims, review status, unique image, metadata/internal links, intended slot and eventual live receipt. |
| P1 | Police contact about a sex-offense investigation | Following unfinished May 19 topic; avoid duplicating the existing general sex-crimes defense article. | Same source/review/publication requirements; no invented attorney review or case outcomes. |

All ten April publishing-plan topics are represented in the 33-post base inventory; the ALS/driving-privileges item deliberately reused its existing URL. The first three May 19 roadmap priorities are also complete: no-contact bond terms, CDL/out-of-state OVI, and summons versus arrest. Do not recreate or reschedule those as new posts. The historical two-posts-per-week plan is not proof of an enabled current publisher.

## Existing heartbeat resumption packet

In the existing native local task, resume this heartbeat while preserving its current cadence, target, program end and other safeguards. Add the approved article and checkpoint-repair scopes to the current prompt. Give the dated Halloween release priority; carry unresolved dependencies forward, then resume the highest-impact overdue item. Keep the April/May plans as the deduplicated content backlog. Keep all four legacy routines paused.

Each run should distinguish prepared, approved, scheduled, published and live-verified states. Record source commit, exact destination, publication time, source/review evidence and native delivery receipt. Recheck completed slugs/receipts before retrying. A failed generation or deployment retains its draft and reports failure. Future-dated articles remain hidden until their intended date. Do not publish a backlog batch merely because prior slots were missed.

After an authorized publication, notify Tim with its live link only after verifying the actual production page. Report a failing/stale checkpoint job as a confirmed issue, including the last completed run, source-fetch health and newest verified event separately. Do not use CodeQL success, a Vercel preview, a static seed replay or a recent rendered page timestamp as ingestion proof. This continuation authorizes no client email, directory outreach, paid service, access expansion or unrelated profile change.

## Exact execution blockers

1. **Production article release:** PR 174 is ready, clean and green. GitHub rejected server-side auto-merge first as unstable while the readiness workflow ran, then as clean after it completed; no merge executed and no request is pending. The active ruleset requires a PR but has no merge-queue rule; repository instructions prohibit manual merging. Resolve the approved merge path without bypassing checks. Separately, `wrangler whoami` reports unauthenticated; no existing token was found in the inspected standard environment/config locations. No login or credential was created. Restore the existing authorized Cloudflare session, then release only an exact reviewed `origin/main` commit using the Worker candidate/rollback/live-smoke process in `OPERATIONS.md`. The successful Vercel preview is sign-in protected and is not production proof.
2. **Heartbeat resumption:** the native automation tool returned “Automations are only supported for local threads” from this delegated task. No update executed. Resume the existing heartbeat from its native local task; do not edit raw scheduler files or create a workaround schedule.
3. **Full database telemetry:** the existing local management token returned HTTP 401 on the bounded management query. It did not execute; CLI access still supported Edge revision inspection and a read-only scheduler-status RPC. Migration/pg_net history remains unverified.
4. **Search discovery:** the deployed secret name is `SERPER_API_KEY` followed by two newline characters. The handler reads the exact normal name, so it cannot see that entry. No secret was changed or copied. Resolve through the existing authorized secret-management path without printing or creating credentials.

No publication, production data write, deployment, schedule update or external message is claimed by this continuation document. The root dirty checkout and the September program edits remain preserved.
