# Dev Handoff Scope: Hybrid Glossary UI + Statute URLs (React + Vite)

Goal: build a single “statute library” UI that works as both:

- `/glossary` (browse/search hub)
- `/glossary/:slug` (indexable statute detail pages for long-tail SEO)

The statute dataset will be supplied later (start with a small placeholder dataset).

## Dataset status (now available)

ORC datasets are now in the repo root:

- `mango_orc_statutes_v1.json` (103 statutes)
- `mango_orc_statutes_v1.csv` (same content in CSV form)
- `mango_orc_statutes_full_v2.json` / `mango_orc_statutes_full_v2.csv` (expanded dataset)
- `mango_orc_statutes_minimal_v2.csv` (minimal CSV slice used for quick iteration)

These can be used as the first implementation dataset, or moved/normalized into `src/data/statutes.json` once the UI scaffolding is in place.

## Critical constraint

Do **not** build or run an automated crawler against `codes.ohio.gov` without explicit permission or an approved feed. Build the framework assuming the dataset is provided at build time (JSON).

## 1) Routes and UI framework

### Routes

- `GET /glossary`
  - Hub view
  - Left: search + practice-area filters + statute list
  - Right: empty state or “featured statute” detail
- `GET /glossary/:slug`
  - Same hub layout
  - Statute preselected
  - Statute detail content should be present in the HTML output (for SEO)

### Slug format

Use a stable slug pattern that supports SEO + usability:

- `:slug = <primary-keyword>-orc-<section-with-dashes>`

Examples:

- `ovi-dui-orc-4511-19`
- `domestic-violence-orc-2919-25`
- `menacing-by-stalking-orc-2903-211`

Rules:

- lowercase
- hyphen-separated
- ORC number suffix always present
- slug stored in the dataset (not derived at runtime)

Recommended: support `aliases[]` for old slugs and handle redirects/lookups in-app (canonical should remain the primary `slug`).

## 2) UI components

Keep components dumb and composable:

### `GlossaryLayout`

- 2-column layout on desktop
- mobile: list-first then detail (route change on tap)
- consistent header/intro

### `StatuteListPanel`

- Search matches:
  - `4511.19`, `4511-19`, `orc 4511.19`
  - titles + keywords
- Practice area filter chips
- Result count + “clear filters”
- List item shows:
  - ORC number
  - short title
  - practice area badge(s)

### `StatuteDetailPanel`

- H1-style title presentation
- plain-English summary
- “Read full statute” outbound link
- related statutes chips (click to route)
- related practice areas chips (click to filter list)
- “Reviewed by / last reviewed” line
- short disclaimer block (same everywhere)

### `StatuteEmptyState`

- shown on `/glossary` when no statute selected
- include a subtle CTA (call/consult) but keep it light

### Interaction requirements

- Clicking a statute updates URL to `/glossary/:slug`
- Back/forward works (URL is source of truth)
- Related statutes are real links to other statute pages
- Filtering does **not** generate indexable URL variations by default

## 3) Data contract (provided later)

Single JSON file as source of truth (example: `src/data/statutes.json`).

Minimum schema:

```ts
export type PracticeArea =
  | "OVI/DUI"
  | "Criminal Defense"
  | "Protection Orders"
  | "Domestic Violence"
  | "Sex Crimes"
  | "Weapons Charges"
  | "Drug Crimes"
  | "White Collar Crimes"
  | "Personal Injury"
  | "Traffic";

export type Statute = {
  section: string;              // "4511.19"
  slug: string;                 // "ovi-dui-orc-4511-19"
  title: string;                // "Operating a vehicle under the influence"
  shortLabel?: string;          // "OVI / DUI"
  summary: string;              // plain-English
  practiceAreas: PracticeArea[];
  relatedSections?: string[];   // ["4511.191", "4510.11"]
  keywords?: string[];          // ["impaired driving", "breath test refusal", ...]
  officialUrl: string;          // codes.ohio.gov link (manually supplied)
  effectiveDate?: string;       // ISO
  latestLegislation?: string;   // free text
  lastReviewedAt?: string;      // ISO
  reviewedBy?: string;          // "Mango Law"
  status?: "active" | "renumbered" | "repealed";
  aliases?: string[];           // old slugs or old ORC numbers
};
```

## 4) Rendering strategy for SEO (Vite + React)

Need HTML output per statute URL for consistent indexing.

Recommended: **build-time pre-render** (SSG) so hosting stays static.

Implementation options:

- A) React Router framework pre-render (if adopting its framework conventions)
- B) Vite SSR build + static generation script (render each route at build time)
- C) `vite-plugin-ssr` pre-render (dedicated tooling)

For Bolt static hosting, B or C is usually the least painful.

## 5) SEO requirements per statute page

For each `/glossary/:slug`:

- `<title>`: `ORC 4511.19: OVI / DUI (Operating a Vehicle Under the Influence) | Mango Law`
- H1: `ORC 4511.19: Operating a Vehicle Under the Influence (OVI / DUI)`
- meta description: one plain-English sentence about scope + audience
- canonical: `/glossary/<slug>`
- breadcrumbs: Home → Glossary → ORC 4511.19
- sitemap: include `/glossary` + every `/glossary/:slug` (`lastmod` from `lastReviewedAt` or build time)

Avoid duplicate indexation:

- Do not create crawlable internal links to `?q=`, `?practiceArea=`, or `#filters`
- If query params are added later for sharing, keep canonical on the hub and avoid internal linking to parameterized URLs

## 6) Search and filtering requirements

Search must match:

- `4511.19`
- `4511-19`
- `orc 4511.19`
- `OVI`, `DUI`
- statute titles
- keywords + summary

Filtering:

- practice area chips (single-select first; multi-select optional later)

Implementation:

- start with simple token matching
- only add fuzzy search (e.g. Fuse.js) if needed

## 7) Update pipeline (framework only; no crawling)

Assume:

- `statutes.json` is the build input
- `npm run build` produces:
  - pre-rendered pages
  - `sitemap.xml`
  - optional search index JSON

Optional scaffolding:

- `scripts/diff-statutes.ts` to report changes between dataset versions
- `aliases[]` + `status` for renumbered/repealed handling
