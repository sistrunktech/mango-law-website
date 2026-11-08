# Merge queue operations

Activated 2026-10-29 after the checked [CI bootstrap PR179](https://github.com/sistrunktech/mango-law-website/pull/179).

## Enforced configuration

Repository ruleset11727992 requires `build`, `lint`, `test`, `guard` from GitHub Actions app ID 15368 on the default branch. CI reports these contexts for PRs and `merge_group: checks_requested`, using Node22 LTS.

The queue uses squash and ALLGREEN, with one PR/build/group at a time, a 30-minute check timeout and a 5-minute minimum-group wait. Minimum group size is 1. Strict branch freshness is disabled because the mandatory queue tests the current base.

The existing PR requirement, review parameters, force-update prohibition, deletion prohibition and empty bypass list remain unchanged.

## Operator workflow

1. Push a scoped agent branch; the existing PR automation opens its PR.
2. Review its exact head and all four check results. Queue entry requires authorization for that PR; blanket agent auto-enqueue is not configured.
3. Enqueue the reviewed head through GitHub's normal queue operation. Do not use a manual merge, jump the queue or bypass checks.
4. Confirm the merge-group event reports all four contexts on the queue SHA.
5. Record the queue-produced squash commit and the final main check results.

A failed required queue check must prevent merging and remove the failing entry. Fix the branch, recheck the new head, then enqueue again. Do not disable a check, change protections or remove the queue to clear a failure.

## Verification record

[Canary PR180](https://github.com/sistrunktech/mango-law-website/pull/180) passed ordinary PR checks, then intentionally failed only its required merge-group test. [Queue run 40940032367](https://github.com/sistrunktech/mango-law-website/actions/runs/40940032367) tested queue SHA 9bbef0ee8d7829498b061165856326e51f3761e6.

GitHub removed the entry with reason `failed_checks` at 2026-10-29T19:27:09Z. The PR remained open and main remained 2927ac1a2abb639fad256eb7d499cbe94df33d35. The original test runner was restored byte-for-byte before the final documentation-only change.

Positive verification requires all four checks on the corrected queue SHA and a queue-produced squash merge. Its receipts are on PR180 and in the execution report; configuration alone does not establish successful queue behavior.
