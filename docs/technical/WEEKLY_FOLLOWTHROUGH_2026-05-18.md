# Mango Law Weekly Follow-Through - 2026-05-18

Purpose: current operating notes for the week of May 18, 2026, after parallel repo, GSC, citation, and content/GBP audits.

## Operating Base

- Use `/Users/sistech_tim/Dev/workspaces/sistech_tim/clients/mango-law/mango-law-website.wt/weekly-followthrough-2026-05-18`.
- Branch: `codex/weekly-followthrough-2026-05-18`.
- Base: `origin/main` at `bfff6f099fa406649613b782c288729c254ff7a9`.
- Do not use the stale April worktree `mango-indexing-followthrough-2026-04` for new edits; it is behind `origin/main` and carries dirty local state.

## GSC Status

Read-only Search Console URL Inspection API check completed on 2026-05-18 at `17:57:58Z` against `sc-domain:mango.law`.

- Indexed now:
  - `/drug-crime-lawyer-delaware-oh`
  - `/domestic-violence-lawyer-delaware-oh`
  - `/als-license-suspension-ohio`
  - `/ovi-test-refusal-lawyer-ohio`
  - `/blog/ohio-livs-law-ovi-changes`
  - all eight May support posts submitted after the May 4 approval
- Manual request submitted:
  - `/protection-order-lawyer-delaware-oh` was still `Discovered - currently not indexed` with no crawl time in the Google Index view.
  - Search Console accepted `Request indexing` on 2026-05-18 at 14:25 EDT: `Indexing requested`; the URL was added to a priority crawl queue.
  - Live test at 14:26 EDT returned `URL is available to Google`, `Page can be indexed`, with valid Breadcrumbs and FAQ.

Follow-up: reinspect `/protection-order-lawyer-delaware-oh` on 2026-05-25.

## Live Surface Checks

`npm run seo:smoke:live` passed against `https://mango.law` on 2026-05-18.

- Homepage, robots, sitemap, checkpoint resource, OVI owner, criminal-defense owner, practice areas, and sampled blog URLs return `200`.
- `/delaware-ohio-ovi-lawyer` returns `308` to `/ovi-dui-defense-delaware-oh`.
- Sitemap includes current owner pages, including `/domestic-violence-lawyer-delaware-oh`.
- Public UTM targets for the remaining May GBP posts return `200`.

## GBP / Content

Current May content exists on `origin/main`; the older Q2 cadence doc from the stale April worktree is no longer current.

Remaining scheduled GBP windows from the May calendar:

- Tue 2026-05-19 10:00 AM EDT: `/blog/ovi-refusal-vs-failed-test-ohio`, `utm_content=ovi_refusal_vs_failed_test`
- Thu 2026-05-21 10:00 AM EDT: `/holiday-ovi-enforcement-ohio`, `utm_content=memorial_day_ovi_enforcement`
- Tue 2026-05-26 10:00 AM EDT: `/blog/drug-ovi-ohio`, `utm_content=drug_ovi_ohio`
- Thu 2026-05-28 10:00 AM EDT: `/blog/delaware-county-criminal-case-timeline`, `utm_content=criminal_case_timeline`

2026-05-18 BrightLocal admin verification:

- Mango Law LLC location `3937875` has GBP connected.
- GBP Post Scheduler shows `14` live posts and `4` scheduled posts.
- Remaining scheduled posts match the May calendar above: May 19, May 21, May 26, and May 28 at 10:00 EDT.

## Citation / NAP Status

Current external citation source of truth from the May 8 audit:

- Primary public/SMS phone: `(740) 602-2155`
- Secondary office phone: `(740) 417-6191`

The May 8 phone-role decision is now confirmed as authoritative for the website and code too. Apply `(740) 602-2155` as the sitewide primary public/SMS line and keep `(740) 417-6191` only as the secondary office line.

2026-05-18 execution:

- Updated the website/code source of truth so `602` is primary and `417` is secondary only.
- Pre-deploy live GA4 controlled validation observed the deployed header phone CTA as `tel:7404176191`, proving production was stale before this branch landed.
- PR #140 merged on 2026-05-18 at 21:24:59Z, producing merge commit `a875a226394ecf6086c6a2d01fac1b6de8c2f551`.
- Post-merge live verification confirmed `https://mango.law` returns seven `tel:7406022155` links, one secondary `tel:7404176191` link, and structured data telephone `+17406022155`.
- Post-merge live verification confirmed `/protection-order-lawyer-delaware-oh` returns HTTP `200` from Vercel and the same seven primary / one secondary phone-link split.
- Gmail check found Nick's April 8 Justia reply (`Will do`) from `mangolawoffice@gmail.com` and no later Justia follow-up from Nick. Forwarded Justia's latest `Click to Complete` instruction email again to both `nick@mango.law` and `mangolawoffice@gmail.com`.
- Gmail check found Kaylyn Malinowski (`kaylynmalinowski@gmail.com`) as the assistant contact from the January Apple/ezlocal thread. Nick had already sent the EZLOCAL text screenshot in that thread.
- BrightLocal Gmail check found no support/validation update after the May 8 pending phone-role save, only billing/marketing messages.
- BrightLocal admin check confirmed the saved phone roles: primary phone `+1 740-602-2155`, SMS `+17406022155`, GBP alternate phone `(740) 417-6191`, and Citation Builder mobile `(740) 602-2155`.
- Citation Builder campaign `921991` is complete overall, but the dashboard still has one action item for ezlocal verification. BrightLocal support was not contacted because the admin data now reflects the approved phone roles and the only remaining item is the client-side ezlocal verification.
- Replied to Kaylyn on the January verification thread, cc'ing `mangolawoffice@gmail.com` and `nick@mango.law`, asking whether ezlocal was completed after Nick's January screenshot and offering to handle it during the call if not.

## GA4 Validation

Controlled live validation file: `docs/technical/seo-aeo-round-2026-05-03/ga4-real-path-controlled-validation-2026-05-18.md`

- Phone click: one `generate_lead` from `lead_source=phone`; live production still targeted `7404176191`.
- Email click: one `generate_lead` from `lead_source=email`.
- Contact form: one `generate_lead` from `lead_source=form`; backend `submit-contact` request was intercepted before real submission.

Approval still needed before action:

- Draft/send ReachAttorneys support escalation.
- Use YellowPages or ezlocal verification flows.
- Take any Yelp/MapQuest admin-write action after read-only rechecks.

## Measurement

GA4/GTM status remains conversion-cautious:

- GTM Version 5 is live.
- `generate_lead` is configured and synthetic validation worked.
- Reporting memo still showed `0` GA4 key events.

Approval needed before action: controlled production test lead or GA4/GTM DebugView work that creates real events.

## Next Local Work

1. Reinspect `/protection-order-lawyer-delaware-oh` in GSC on 2026-05-25.
2. Wait for Kaylyn/Nick on ezlocal. Do not chase BrightLocal support unless a fresh dashboard or support-state mismatch appears.
3. Continue local-only cleanup: stale doc quarantine, ReachAttorneys draft refinement, and monthly memo preparation.
