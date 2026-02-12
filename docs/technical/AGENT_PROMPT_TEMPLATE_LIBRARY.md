# Agent Prompt Template Starter Library

Use these templates to assign cloud-agent work with clear scope, quality gates, and deliverables.

## Universal Prompt Header (use for all tasks)

```md
You are working in the Mango Law website repository.

Goal:
<one-sentence outcome>

Context:
- Business priority: <priority>
- Audience: <who this is for>
- Why now: <time-sensitive reason>

Constraints:
- Follow docs/technical/MASTER_PRD_AGENT_OPERATIONS.md and annexes.
- Do not change protected/finalized content without approval token.
- Keep source accuracy and no-drift standards.
- If uncertain, stop and raise assumptions before publishing.

Deliverables:
1. <deliverable 1>
2. <deliverable 2>
3. Evidence bundle with verification steps.

Acceptance gates:
- content:check passes
- check:structured-data passes (when relevant)
- seo:smoke passes (when relevant)
- docs:parity passes (when docs/governance touched)

Output format:
- Summary
- Files changed
- Verification run + results
- Risks and rollback notes
```

## 1) SEO Sprint Template

```md
Task type: seo_sprint

Objective:
Improve <target query cluster/page set> rankings and crawl clarity while preserving legal accuracy and trust signals.

Inputs:
- Target URLs: <list>
- Query intents: <list>
- Baseline metrics: <impressions/clicks/rank positions>
- Current evidence docs: <paths>

Work required:
1. Diagnose technical/content/internal-link blockers for target pages.
2. Propose prioritized P0/P1/P2 actions with ROI and effort.
3. Implement approved fixes (metadata, internal links, schema, sitemap/robots if needed).
4. Update tracking notes for weekly recheck.

Source rules:
- Tier 1: Google Search docs + Schema.org for technical SEO policy.
- Tier 2: vetted tactical references only when Tier 1 is silent.
- Tier 3: existing Mango docs and historical tickets.

Deliverables:
- Changed files list
- Before/after rationale per URL
- KPI impact expectation (30/60/90 day)
- Evidence bundle

Hard stops:
- No unsourced numeric trust claims.
- No private/noindex route leaks into sitemap.
```

## 2) UX Improvement Template

```md
Task type: ux_improvement

Objective:
Improve <funnel/page> usability and conversion clarity without introducing design drift.

Inputs:
- Primary page(s): <paths>
- Primary CTA(s): <cta names>
- User pain point: <issue>
- Device focus: desktop/mobile/both

Work required:
1. Identify UX friction points with concrete heuristics.
2. Propose changes with behavior-level acceptance criteria.
3. Implement minimal-scope updates.
4. Validate accessibility (keyboard/focus/labels/contrast as applicable).

Deliverables:
- UX issue list -> fix mapping
- Updated components/pages
- QA checklist results
- Screenshots (before/after)

Acceptance criteria:
- Primary CTA discoverability improved
- No regression in navigation/accessibility
- Lint/typecheck/build pass
```

## 3) Analytics / Tracking Template

```md
Task type: analytics_tracking

Objective:
Ensure event tracking for <journey/CTA/form> is accurate, deduplicated, and reportable.

Inputs:
- Events in scope: <event names>
- Trigger pages/components: <paths>
- Target toolchain: GTM + GA4 (+ optional CRM/reporting)

Work required:
1. Audit current event emissions and naming consistency.
2. Define/confirm event contract (event name + required params).
3. Implement/adjust instrumentation.
4. Add validation steps for debug view and payload sanity.

Deliverables:
- Event contract table
- Files changed
- Validation evidence (debug traces/screenshots/notes)
- Any follow-up tagging requirements

Hard stops:
- No breaking changes to existing core events without migration note.
- No PII in analytics payloads.
```

## 4) Reporting Template (Weekly/Monthly)

```md
Task type: reporting

Objective:
Generate <weekly/monthly> report for <stakeholder> with actionable deltas and next actions.

Inputs:
- Date window: <start/end>
- Data sources: GSC, GA4, ranking tracker, citations, CRM/leads
- Baseline reference: <previous report path>

Work required:
1. Pull comparable metrics and compute deltas.
2. Separate signal from noise (what changed materially).
3. Tie outcomes to completed work.
4. Recommend next sprint priorities.

Output structure:
- Executive summary
- KPI dashboard (table)
- Wins
- Risks
- Work completed -> impact
- Next 2-week action plan

Rules:
- Include timestamp and source for every metric block.
- Flag low-confidence metrics explicitly.
```

## 5) Client Follow-Up Template

```md
Task type: client_follow_up

Objective:
Draft a concise client update for <client/stakeholder> covering status, outcomes, risks, and next steps.

Inputs:
- Completed work items: <list>
- Pending items: <list>
- Decisions needed: <list>
- Deadlines: <dates>

Tone:
- Clear, professional, direct, no fluff.

Output:
- Subject line options (3)
- Final message draft
- Action checklist for recipient

Rules:
- No legal guarantees.
- No unsourced performance claims.
- Keep commitments concrete and dated.
```

## Quick Fill-In Short Form

```md
Task type: <type>
Goal: <outcome>
Inputs: <links/files>
Constraints: <must/must-not>
Deliverables: <list>
Deadline: <date/timezone>
Approval needed from: <role>
```
