# BrightLocal Finish Scope

Updated: 2026-04-08
Owner: Sistrunk Tech / Mango Law
Priority: BrightLocal first, then downstream citations

## Purpose
This runbook exists so another Codex session or a dedicated second machine can finish the Mango Law BrightLocal cleanup without repeating discovery work or hijacking an actively used browser.

This scope is intentionally narrow:
- finish BrightLocal core and campaign alignment
- verify GBP-facing campaign fields
- document what is actually live
- only after BrightLocal is clean, resume lower-value citation cleanup

## Recommended execution setup
Best option:
- run this on a separate machine or a dedicated Chrome profile/window that the human is not actively using

If using the same machine:
- only use a dedicated Chrome window for this task
- do not switch or reuse unrelated active tabs
- do not touch general Gmail, GSC, GA4, Vercel, or personal browsing tabs unless explicitly required for this scope

## Source-of-truth NAP
- Legal business name: `Mango Law LLC`
- Accepted display variant: `Mango Law`
- Address: `43 S Franklin St, Delaware, OH 43015`
- Website: `https://mango.law`
- Public listing email: `office@mango.law`
- Account/login email: `info@mango.law`
- Public office/default phone: `(740) 417-6191`
- Nick direct cell: `(740) 602-2155`

## BrightLocal assets and IDs
- Location ID: `3937875`
- Campaign slug/reference: `MANGOLAWLLC-43015`
- Citation Builder campaign screen:
  - `https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/3937875/cb/edit`
- Core location edit screen:
  - `https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/3937875/edit`
- Citation Builder view screen:
  - `https://tools.brightlocal.com/seo-tools/admin/location-dashboard/location/3937875/cb/view`

## Current verified state

### BrightLocal core record
Verified live on 2026-04-08:
- business phone: `+1 740-417-6191`
- SMS phone: `+17404176191`
- website: `https://mango.law`
- business name: `Mango Law LLC`
- `Personal injury attorney` is no longer selected in the GBP additional-category field
- old `Alternative Phone(s)` alert for `602` is gone
- criminal-defense-focused description is present

Still not fully optimized:
- the core service list reverted and still needs cleanup
- desired service set:
  - `OVI / DUI Defense`
  - `Criminal Defense`
  - `Domestic Violence Defense`
  - `Drug Charge Defense`
  - `License Suspension Defense`

### BrightLocal Citation Builder campaign
Still stale as of 2026-04-08:
- business telephone still `+1 740-602-2155`
- mobile still `(740) 602-2155`
- description still blank
- campaign is not reliably inheriting from the corrected core record

### Active Sync / drift
The remaining visible BrightLocal drift is primarily:
- `Mango Law LLC` vs `Mango Law` display variance

That is acceptable as a consumer-map display variant and should not trigger a broad rewrite away from `Mango Law LLC` as the master record.

## Exact BrightLocal objectives
Do these in order.

1. Re-open the core location edit screen and confirm the corrected phone/category state still holds.
2. Update and save the core service set to the desired campaign-aligned service list.
3. Confirm the core description is still criminal-defense focused.
4. Re-open Citation Builder and make the campaign layer match the source of truth:
   - business phone `+1 740-417-6191`
   - mobile only if intentionally needed; otherwise do not leave `602` as the business/default public number
   - description populated with criminal-defense-focused copy
   - service list aligned to the same BrightLocal campaign priorities
5. Verify whether Citation Builder can now be saved cleanly through real user input, not DOM-only edits.
6. Re-check the Citation Builder view/report state after save.
7. Verify GBP-related category/service language is still aligned with current SEO priorities:
   - OVI / DUI
   - criminal defense
   - domestic violence defense
   - drug charge defense
   - license-suspension defense

## What not to do
- Do not change the master business name from `Mango Law LLC` to `Mango Law`
- Do not switch the public/default business phone back to `602`
- Do not broaden scope into low-value citations before BrightLocal is clean
- Do not assume Citation Builder inherited changes just because core saved
- Do not use random active Chrome windows/tabs

## Acceptance criteria
BrightLocal is considered complete only when all of the following are true:
- core business phone is `417`
- core service set matches the current campaign priorities
- no live `Personal injury attorney` selection remains in the core additional categories
- Citation Builder business phone is also `417`
- Citation Builder no longer uses `602` as the public/default business line
- Citation Builder description is filled
- BrightLocal campaign copy and fields align with the current Mango SEO campaign
- audit notes are updated to reflect verified live state, not assumptions

## Evidence and companion files
Review these before making more edits:
- [NAP_AUDIT_2026-04-06.md](./NAP_AUDIT_2026-04-06.md)
- [NAP_AUDIT_2026-04-06.csv](./NAP_AUDIT_2026-04-06.csv)

These files already contain:
- corrected phone-role decision
- verified current Yelp state
- verified current MapQuest state
- ReachAttorneys structural blocker
- YellowPages loop blocker

## After BrightLocal is complete
Only then resume downstream cleanup in this order:
1. YellowPages claim completion
2. ReachAttorneys support/webmaster escalation
3. Yelp category pruning
4. other legacy or lower-value citation cleanup

## Ready-to-paste Codex kickoff prompt
Use this on the other machine if needed:

```text
Finish Mango Law BrightLocal cleanup first and do not broaden scope until BrightLocal is fully aligned.

Start by reading:
- docs/technical/brightlocal-handoff/BRIGHTLOCAL_FINISH_SCOPE_2026-04-08.md
- docs/technical/brightlocal-handoff/NAP_AUDIT_2026-04-06.md
- docs/technical/brightlocal-handoff/NAP_AUDIT_2026-04-06.csv

Priority order:
1. BrightLocal core
2. BrightLocal Citation Builder campaign
3. BrightLocal optimization for current OVI / criminal-defense SEO priorities
4. Only after BrightLocal is clean, resume YellowPages / ReachAttorneys / Yelp category cleanup

Rules:
- Use a dedicated browser window/profile only
- Do not hijack unrelated tabs
- Do not change the master business name away from Mango Law LLC
- Public office/default phone is 740-417-6191
- Nick direct cell is 740-602-2155
- Verify every BrightLocal change after save
- Update the audit files with only verified live state
```
