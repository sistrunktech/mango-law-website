# Location Expansion Validation

Date: 2026-05-20
Owner: Sistrunk Tech internal
Status: staging-preview research and implementation brief

## Decision

Build the first location-expansion preview for:

- Route: `/ovi-dui-defense-union-county-oh`
- Working title: Union County OVI and criminal defense for Marysville court cases
- Status: noindex, nofollow, excluded from sitemap, direct-link review only

This is a Vercel/staging preview. It should not be promoted into production indexing until the client approves the page, route, copy, sitemap behavior, and internal-link plan.

## Why Union County First

The subagent research split the decision:

- Franklin County / Columbus has the strongest official-source depth and remains the highest-authority next location target.
- Union County / Marysville has the cleaner first preview opportunity because it is close to Mango Law's Delaware base, has active competitor demand, has enough official local-process material, and is less saturated than Columbus.

The first preview should test the county-page model in the lower-risk market. Franklin County should follow after the model is approved.

## Official Sources Checked

| Source | URL | Use |
|---|---|---|
| Marysville Municipal Court | `https://marysvilleohio.org/670/Municipal-Court/` | Court address, hours, resources, and local municipal-court context. |
| Marysville Municipal Court - About the Court | `https://marysvilleohio.org/705/About-the-Court` | Court matter examples including minor violations, drug paraphernalia, assault, theft, bad checks, domestic violence, civil, and small claims. |
| Marysville Municipal Court - Criminal/Traffic | `https://marysvilleohio.org/722/CriminalTraffic` | Citation, proof-of-insurance, court-program, traffic, and criminal/traffic resource context. |
| Marysville Municipal Court - Probation | `https://marysvilleohio.org/694/Probation` | Probation communication, violation, modification, and compliance guidance. |
| Union County Prosecutor - Criminal Matters | `https://www.unioncountyohio.gov/departments/Prosecutor/criminal-matters` | Local criminal-process, plea-practice, diversion/intervention, and prosecutor-context material. |
| Union County Common Pleas Court | `https://www.unioncountyohio.gov/CommonPleasCourt/` | Common Pleas location, personnel, schedule, forms, local rules, and court-services resources. |
| Union County Clerk of Courts | `https://www.unioncountyohio.gov/departments/clerkofcourts` | Common Pleas records, legal filings, bonds, payments, and Clerk contact information. |

## Competitor and Keyword Findings

Public SERP/competitor research found active Marysville/Union County OVI targeting, including Dominy Law, Bridges/Jillisky, and thin Marysville-specific attorney pages. The pattern validates demand while also showing a quality gap: several competitor/location pages are templated, thin, or over-broad.

Candidate keyword set for the preview:

- Marysville OVI lawyer
- Union County OVI attorney
- Marysville DUI lawyer
- Union County criminal defense lawyer
- Marysville Municipal Court OVI lawyer
- OVI lawyer near Marysville Municipal Court

These should not be uploaded or treated as final tracker terms until BrightLocal/GSC/Ahrefs validation is complete. They are enough to justify a noindexed preview page and content QA.

## SEO Guardrails

- No doorway-page pattern.
- No city/county name swapping.
- No claim of a Union County office.
- No unsupported "best lawyer" or guaranteed outcome language.
- Use county pages before suburb/city pages unless the city page has material differentiation.
- Keep local process sections specific to official court/prosecutor resources.
- Link into existing pillar/support pages instead of letting the location page become an orphan.
- Keep preview noindexed and out of sitemap until production approval.
- Keep phone source of truth aligned: `(740) 602-2155` primary call/text, `(740) 417-6191` secondary office line only where intentionally labeled.

## Promotion Checklist After Approval

Before production promotion:

1. Finalize route and visible copy.
2. Remove noindex only after approval.
3. Add route to `src/app/sitemap.ts` with current `lastmod`.
4. Add internal links from `/locations`, OVI owner page, and relevant support posts.
5. Add/update tests proving sitemap inclusion and internal-link routing.
6. Log production content in `docs/CONTENT_CHANGELOG.md`.
7. Request GSC inspection only after the production URL is live.
8. Add the approved terms to the 10-day benchmark/watchlist.

## Current Implementation Notes

Preview branch adds:

- `src/app/(site)/ovi-dui-defense-union-county-oh/page.tsx`
- `src/app/(site)/ovi-dui-defense-union-county-oh/metadata.ts`
- `src/views/UnionCountyOviCriminalDefensePreviewPage.tsx`
- `src/lib/sitemapEntries.ts`
- `test/locationPreviewSitemapSafety.test.ts`

The safety test asserts that the exported route metadata has `noindex`/`nofollow` behavior and that generated sitemap entries do not include the preview URL.
