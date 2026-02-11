# Annex: Acceptance Gates

## 1) Gate Matrix

| Gate | Applies To | Hard Block Condition |
| --- | --- | --- |
| Content governance check | Blog, schema, firm-fact-sensitive edits | Protected paths changed without changelog update |
| Structured data gate | Structured data and SEO tasks | Missing required fields, placeholder tokens, invalid known regression patterns |
| SEO smoke check | SEO and indexing-sensitive edits | Missing critical route coverage or robots/sitemap guardrail failure |
| Docs parity check | PRD/annex updates | Missing required docs or mirror mismatch when mirror path exists |
| Compliance approval | Review solicitation/automation policy/copy | Missing Owner/Super Admin signoff |
| Directory ROI gate | Paid listing tests | Missing attribution plan, baseline, or cap thresholds |

## 2) CI Gate Commands

Run in CI and locally:

- `npm run content:check`
- `npm run check:structured-data`
- `npm run seo:smoke`
- `npm run docs:parity`

## 3) Manual Gates (cannot be skipped)

- Monday and Friday schema validator + rich-results spot-check
- Evidence log update after each spot-check
- Human signoff for compliance-sensitive review workflows

## 4) Publish Decision Rules

A task can be `approved` only when:

1. All CI gates pass.
2. Required manual gates are recorded.
3. Required contract records are complete.
4. No unresolved P0 risk flags remain.

## 5) Blocking Severity

- P0: immediate block, remediation required before merge
- P1: block unless explicit owner exception
- P2: may proceed with documented follow-up ticket
