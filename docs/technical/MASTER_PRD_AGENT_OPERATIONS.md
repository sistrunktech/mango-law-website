# Master PRD: Agent Operations and No-Drift Governance

Last updated: 2026-02-11
Owner: Mango Law Owner + Super Admin
Canonical repo: `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website`
Mirrored repo: `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website-gsc`

## 1) Purpose

This PRD is the canonical source of truth for website strategy and cloud-agent execution across:

- SEO sprints
- blog drafting/finalization
- structured data operations
- image generation workflows
- review-response drafting workflows
- directory ROI decisions

Objective: eliminate operational drift by requiring explicit task contracts, hard gates, and evidence bundles for every publish-affecting workflow.

## 2) Scope

In scope:

- governance architecture and approval model
- task contracts and interfaces
- CI and manual acceptance gates
- evidence and reporting standards
- compliance controls for review solicitation and response
- paid directory testing framework

Out of scope:

- major product rearchitecture
- legal advice generation policy beyond listed guardrails
- unrelated UI redesign or brand changes

## 3) Precedence and Conflict Resolution

Order of precedence:

1. This document (`MASTER_PRD_AGENT_OPERATIONS.md`)
2. PRD annexes (`ANNEX_*` in `docs/technical`)
3. Mapped legacy docs
4. External references

Mapped legacy docs include:

- `docs/CONTENT_GOVERNANCE.md`
- `docs/AGENT_GUARDRAILS.md`
- `docs/OPERATIONS.md`
- `docs/technical/BLOG_REQUIREMENTS.md`
- `docs/technical/SEO_TRUTH_SOURCE_CHECKLIST.md`
- `docs/technical/SEO_EXECUTION_BACKLOG_Q1_2026.md`

If a legacy doc conflicts with this PRD or an annex, this PRD/annex set is controlling until legacy docs are reconciled.

## 4) Canonical + Mirror Operating Model

Primary source-of-truth repo: `mango-law-website`.

Mirror requirement:

- Required PRD docs must be synchronized to `mango-law-website-gsc` in the same change cycle.
- `npm run docs:parity` must pass locally before merge.
- If mirror path is unavailable in CI, parity must still be evidenced in the PR verification notes.

Required mirrored docs:

- `MASTER_PRD_AGENT_OPERATIONS.md`
- `ANNEX_TASK_CONTRACTS.md`
- `ANNEX_ACCEPTANCE_GATES.md`
- `ANNEX_EVIDENCE_AND_REPORTING.md`
- `ANNEX_ROLES_RACI.md`
- `ANNEX_STRUCTURED_DATA_POLICY.md`
- `ANNEX_DIRECTORY_ROI_POLICY.md`

## 5) Core Interfaces

This PRD standardizes the task and decision contracts documented in `ANNEX_TASK_CONTRACTS.md`:

- `TaskBrief`
- `EvidenceBundle`
- `ApprovalTokenRecord`
- `PublishDecision`
- `DirectoryTestCase`

No agent-run change is considered complete without these contracts populated when applicable.

## 6) Delivery Lifecycle

Default workflow:

1. Intake
2. Draft
3. QA
4. Approval
5. Publish
6. Post-publish verification

Gate behavior:

- A failed gate blocks forward movement.
- Blocked tasks must produce required remediations in `PublishDecision.required_remediations`.
- Approvals must reference explicit scope and roles.

## 7) P0/P1/P2 Risk Register

P0:

- schema/property regression in structured data
- canonical contact drift across schema/review response copy
- protected content edits without changelog/token path
- unsourced public trust metrics

P1:

- mirror repo documentation drift
- weak evidence trails in agent handoffs
- compliance ambiguity in review request copy

P2:

- inconsistent outreach/directory test attribution quality
- inconsistent monthly governance cadence

## 8) Structured Data and SEO Trust Controls

Structured-data rules and source tiers are defined in `ANNEX_STRUCTURED_DATA_POLICY.md`.

Hard requirements:

- no placeholder tokens in production JSON-LD
- no invalid historical regression patterns (for example, nonstandard legal-service properties)
- canonical contact/address binding to project source constants

CI gating:

- `npm run check:structured-data`
- `npm run seo:smoke`

Manual gating (still required):

- Monday and Friday validator spot-checks
- evidence logged in activity/performance docs

## 9) Compliance Rules for Reviews

Review workflow rules:

- Any review-solicitation copy, incentive policy, or automation requires Owner/Super Admin signoff.
- Agents may draft response language but cannot self-approve release.
- Offering money/discounts/quid-pro-quo for reviews is prohibited.
- Review-response templates must use canonical contact details.

## 10) Directory Spend Policy

See `ANNEX_DIRECTORY_ROI_POLICY.md`.

Default mode:

- free listings first
- paid tests only after preconditions and attribution readiness
- conservative go/no-go framework based on signed-client economics

## 11) Governance Cadence

Cadence:

- Weekly: gate and drift review
- Monthly: governance and KPI review
- Quarterly: PRD + annex reconciliation with legacy docs

Every governance update must include:

- change summary
- risk classification (P0/P1/P2)
- rollback strategy
- mirrored parity verification

## 12) Success Criteria

This PRD is successful when all are true:

1. One canonical operating model governs all in-scope task types.
2. CI catches schema/content drift classes previously uncaught.
3. Manual evidence cadence is maintained and auditable.
4. Compliance-sensitive tasks cannot bypass human approval.
5. Directory spend decisions are measurable and reproducible.
6. Primary and mirrored docsets remain aligned.
