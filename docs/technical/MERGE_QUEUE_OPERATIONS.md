# Merge queue operations

Activated 2026-10-29 after the checked [CI bootstrap PR179](https://github.com/sistrunktech/mango-law-website/pull/179).

## Enforced configuration

Repository ruleset11727992 requires `build`, `lint`, `test`, `guard` from GitHub Actions app ID15368 on the default branch. CI reports these contexts for PRs and `merge_group: checks_requested`, using Node22 LTS.

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

The initial canary uses this document plus a temporary test-runner failure limited to the merge-group event. The temporary failure must be removed before the final documentation-only change can merge. Negative and positive run receipts belong in the companion PR and execution evidence.
