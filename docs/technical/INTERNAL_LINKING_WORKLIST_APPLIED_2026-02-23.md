# Internal Linking Worklist (Applied)

Date: 2026-02-23
Owner: SEO_OPS + DEV_OPS
Status: Applied in code

## Objective
Raise internal-link coverage so each money page has at least 8 internal source-page references in core site templates and high-authority sections.

## Method
Coverage count is based on explicit internal link references in `src/` (`href=`, `href:`, `to=`, `to:`, and markdown-style `](/slug)` references).

## Priority Queue and Applied Status

| Priority | Target page | Pre | Post | Status | Primary insertion points |
| --- | --- | ---: | ---: | --- | --- |
| P0 | `/first-offense-ovi-ohio` | 7 | 8 | Applied | `src/components/Footer.tsx` |
| P0 | `/felony-ovi-lawyer-ohio` | 7 | 8 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P0 | `/ovi-test-refusal-lawyer-ohio` | 7 | 8 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P0 | `/als-license-suspension-ohio` | 7 | 8 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P0 | `/motion-to-suppress-ovi-ohio` | 7 | 8 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P0 | `/drug-possession-vs-trafficking-ohio-defense` | 7 | 8 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P1 | `/domestic-violence-lawyer-delaware-oh` | 8 | 9 | Applied | `src/views/ServiceAreasPage.tsx` |
| P1 | `/domestic-violence-first-offense-ohio-defense` | 9 | 10 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P1 | `/civil-protection-order-defense-ohio` | 9 | 10 | Applied | `src/components/Footer.tsx`, `src/views/ServiceAreasPage.tsx` |
| P2 | `/ovi-dui-defense-delaware-oh` | 22 | 22 | Already above threshold | Existing high-authority link network |
| P2 | `/criminal-defense-delaware-oh` | 17 | 18 | Applied | `src/views/ServiceAreasPage.tsx` |
| P2 | `/protection-order-lawyer-delaware-oh` | 11 | 12 | Applied | `src/views/ServiceAreasPage.tsx` |
| P2 | `/drug-crime-lawyer-delaware-oh` | 12 | 13 | Applied | `src/views/ServiceAreasPage.tsx` |

## Page-by-Page Worklist (Fully Applied)

1. `src/views/ServiceAreasPage.tsx`
- Added direct links for all 5 core money pages.
- Added links for all remaining high-intent pages (7-page rollout set + pilot page alignment).
- Kept existing informational/legal guide links intact.

2. `src/components/BlogSidebar.tsx`
- Added `High-Intent Service Pages` block with links to all 8 high-intent service pages.
- Preserved existing priority legal guides and practice-area blocks.

3. `src/components/Footer.tsx`
- Extended `featuredPageLinks` with all high-intent service pages.
- This gives every template rendering the footer a persistent conversion-path link set.

4. `src/views/HighIntentPages.tsx`
- Added missing required support link (`/blog/ohio-ovi-driving-privileges-als`) in OVI refusal page config.

## Acceptance Result
All tracked money pages in this rollout now meet or exceed the 8-link minimum threshold in code.
