# Annex: Evidence and Reporting

## 1) Evidence Bundle Standard

Every publish-affecting task must include an evidence bundle containing:

1. verification timestamp
2. source register (tier + purpose)
3. artifacts (links/screenshots/logs)
4. before/after summary
5. risk flags
6. rollback plan

## 2) Artifact Requirements by Task

- `structured_data_update`: rendered JSON-LD sample + validator outcome notes
- `blog_finalize`: changelog entry + approval token record + diff summary
- `review_response_draft`: draft text + compliance reviewer note + final decision
- `directory_evaluation`: attribution outputs, referral quality notes, CPA math, decision

## 3) Weekly Evidence Cadence

On Monday and Friday:

- run schema spot-check workflow
- capture pass/fail notes for representative pages
- log in performance/activity docs

Recommended destinations:

- `docs/ACTIVITY_LOG.md`
- `docs/performance/search-console/<date>.md`

## 4) Parity Checklist Evidence

When PRD docs change:

1. run `npm run docs:parity`
2. include parity output in verification notes
3. include list of mirrored files in PR summary

## 5) Evidence Retention

Retain artifacts for at least one full quarterly review cycle.
