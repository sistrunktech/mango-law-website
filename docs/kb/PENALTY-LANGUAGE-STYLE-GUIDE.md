# Penalty / Cost Language Style Guide (“No Drift” Rules)

This SOP governs how we write about **penalties, costs, timelines, thresholds, and “absolute” legal claims** on mango.law so content remains accurate, reviewable, and resistant to drift.

## Goals
- Prevent stale numbers (fines, jail days, suspension lengths, fees, thresholds, deadlines).
- Avoid overconfident statements that can be wrong in edge cases or specific counties/courts.
- Make every material claim easy to verify via clear sources and a “last verified” date.

## Definitions
- **Numeric claim:** any specific number (e.g., `$___`, `__ days`, `__ years`, `0.__`, `__%`, “within __ hours”).
- **Absolute claim:** “always / never / guaranteed / cannot / will be dismissed / must be thrown out”.
- **Primary source:** controlling authority (statute, rule, court decision, official agency publication).
- **Secondary source:** reputable explanation (bar association, legal aid org, major .gov pages, reputable treatise).

## Required trust metadata (blog posts)
Each post must include:
- `lastVerified` — ISO-like date string (`YYYY-MM-DD`) for when we verified the post’s material legal/numeric claims.
- `sources` — a list of citations with:
  - `label` (human-readable name)
  - `url` (canonical link)
  - optional `type` (`primary` | `secondary` | `guide`)

## Rules (writing)
### 1) Prefer conservative verbs and scope
Use: “may”, “can”, “often”, “typically”, “in many cases”, “depending on…”.

Avoid: “will”, “always”, “guaranteed”, “never”, “the judge must… (unless you cite a controlling rule/statute)”.

### 2) Always add “What varies…” near penalty/cost discussions
When discussing outcomes, add a short section that names common drivers of variation, e.g.:
- county/court local practice
- prior record / lookback rules
- facts (accident, minors, test result type, refusals)
- prosecutor policies and diversion availability
- timing, deadlines, and administrative processes

### 3) Numeric claims must be sourced
If a post includes numeric claims, it must include **direct citations** (prefer primary sources):
- For statutes/rules: cite the specific section/rule.
- For agency fees/forms: cite the official agency page (not screenshots).
- For effective dates: cite the bill/enactment or official publication.

If a numeric claim cannot be reliably sourced, **remove it or rewrite it as non-numeric** (“penalties can increase significantly”).

### 4) Don’t “summarize” numbers without context
If you include a range or threshold, include the context that makes it true:
- offense level / enhancements
- minimum vs maximum
- mandatory vs discretionary
- administrative vs criminal consequences

### 5) No tables/visuals with hard numbers unless governed
Tables, infographics, and `[VISUAL:*]` components that contain numbers must have:
- clearly linked sources (ideally adjacent to the visual and also in `sources`)
- a visible “Last verified” date on the page

If we can’t maintain a numeric visual, **replace it** with:
- qualitative guidance (“how penalties escalate”) or
- a checklist / flowchart without numbers.

## Rules (sources)
### 1) Source priority order
1. **Primary:** ORC / OAC, Supreme Court of Ohio rules, Ohio BMV / OSHP / local LEA official pages, controlling caselaw.
2. **Secondary:** Ohio Bar Association / legal aid orgs / reputable .gov explainers.
3. **Guide:** internal explainers, practice guides, non-authoritative summaries (must not be the only support for numeric claims).

### 2) Source quality rules
- Avoid citations to aggregators, SEO pages, or unsourced blog posts for numeric claims.
- Use stable URLs when possible; prefer official PDFs/pages that are likely to persist.
- If citing caselaw, use the official court PDF (or a reputable legal database link) when available.

## Review cadence (“last verified” discipline)
- Update `lastVerified` only after re-checking every material claim that could drift (especially numbers).
- If the law changes or we discover drift:
  - fix the content,
  - update `lastVerified`,
  - add/adjust sources to match the updated statements.

## Quick checklist (copy/paste for PR review)
- [ ] No “always/never/guaranteed” unless narrowly scoped and cited.
- [ ] Every numeric claim has a credible source (prefer primary).
- [ ] Post includes “What varies…” section(s) for outcomes/penalties.
- [ ] Any numeric table/visual has sources + last verified (or is removed).
- [ ] `lastVerified` is current for the claims present.

