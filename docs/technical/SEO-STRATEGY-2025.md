# Master SEO & Growth Strategy Blueprint (2025)
Sitemap-Aligned Version (Dec 28, 2025)

Project: Mango Law LLC (Delaware, OH)
Core Market: Delaware + Franklin Counties (Dominance)
Expansion Market: Union, Morrow, Marion (Rural Growth)
Primary Objective: Capture high-intent OVI/criminal defense queries while building durable authority through integrated resource hubs (/glossary and /resources/dui-checkpoints).

## Status Update (2026-01-01)
Completed:
- SEO component now supports FAQPage, Article, and BreadcrumbList schema plus dynamic `areaServed` from `src/data/serviceAreas.ts`.
- Social tags are standardized and dev-only SEO length warnings are active.
- Favicon declarations consolidated and robots rules hardened.
- Breadcrumbs/FAQ schema deployed on practice pages; admin/auth/internal routes set to `noindex`.

Remaining P0:
- Migrate CSR to SSR/SSG (Astro or Next.js) so metadata renders without JS.
- Build intent pages: `/ovi-checkpoints-ohio`, `/delaware-ohio-ovi-lawyer`, `/holiday-ovi-enforcement-ohio`.
- Enforce SEO title/description naming pattern defaults.
- Monitor GSC for rich result coverage and icon propagation; track CWV after rollout.

## 1) Project Overview & Objective
Mango Law LLC is positioning as a boutique, technical defense practice in Central Ohio. The strategy prioritizes high-intent OVI and criminal defense queries, reinforced by authoritative resource hubs that create a navigable, crawlable topical graph.

## 2) Current Sitemap Inventory (Baseline)

### 2.1 Core Practice Pages (Delaware-Focused)
- /ovi-dui-defense-delaware-oh
- /criminal-defense-delaware-oh
- /drug-crime-lawyer-delaware-oh
- /protection-order-lawyer-delaware-oh
- /sex-crime-defense-lawyer-delaware-oh
- /white-collar-crimes-attorney-delaware-oh
- /personal-injury-lawyer-delaware-oh (secondary)

### 2.2 Resource Hubs (Primary SEO Assets)
- /glossary (ORC/legal authority hub; long-tail capture + internal explainer linking)
- /resources/dui-checkpoints (geo-intent utility hub + high-recency asset)

## 3) Conversion Moat (Boutique Technical Defense)
Every practice, county, and blog page must operationalize:
- Former prosecutor advantage (local court fluency and negotiation leverage)
- NHTSA SFST certification (challenge field sobriety administration and scoring)
- BAC DataMaster certification (challenge breath test mechanics and calibration)

## 4) Resource Hub Implementation Strategy

### 4.1 ORC Glossary (/glossary)
Goal: Capture "What is [term]?" queries and route users to practice pages.

Linking rule: Every entry links to:
- the most relevant practice pillar page
- at least one related blog post when appropriate
- the contact CTA (subtle)

2025 scope (minimum viable set):
- OVI terms: OVI, DUI, BAC, ALS, refusal, SFST, HGN, Datamaster, per se, priors, lookback
- Procedure terms: arraignment, discovery, motion to suppress, probable cause, administrative suspension
- DV/CPO terms: ex parte, CPO, temporary orders, firearms disability implications
- Weapons terms: CCW, improper handling, weapons disability, transport rules
- Drug terms: possession vs trafficking, bulk amount thresholds (keep conservative and sourced)

Implementation note:
If glossary is a single hub page, keep it that way unless term pages can be non-thin and distinct.

### 4.2 DUI Checkpoint Map (/resources/dui-checkpoints)
Goal: Drive geo-intent traffic and high-authority links.

Linking rule:
- Map page links to county OVI pages and the OVI pillar.
- County OVI pages link back to the map with an "Enforcement in [County]" section.
- Relevant blog posts link to the map + county pages (not just the map).

Content requirements:
- Rights-based checklist
- Legality overview
- "What to do if stopped" guidance
- Recency signals (updated date, ongoing map status)
- CTA that matches urgency without being spammy

## 5) Geographic Expansion Roadmap (2025)
Primary expansion unit: county pages (avoid thin city pages).

### Tier 1 Core
- Delaware County (Delaware + exurban towns)
- Franklin County (Columbus + core suburbs)

### Tier 2 Rural Growth
- Union County (Marysville hub)
- Morrow County (Mt. Gilead hub)
- Marion County (Marion hub)

### High-Value Suburbs (only if demand justifies)
- Dublin, Powell, New Albany, Westerville

### New Route Roadmap (county pages)
OVI:
- /ovi-dui-defense-union-county-oh
- /ovi-dui-defense-morrow-county-oh
- /ovi-dui-defense-marion-county-oh

Criminal defense:
- /criminal-defense-union-county-oh
- /criminal-defense-morrow-county-oh
- /criminal-defense-marion-county-oh

Drug crimes (optional, rural ROI):
- /drug-crimes-union-county-oh
- /drug-crimes-morrow-county-oh
- /drug-crimes-marion-county-oh

Rule:
Suburb pages only if they are materially different from the county page (no synonym swapping).

## 6) Blog Corpus Integration (Clusters)

### 6.1 OVI/DUI Cluster (P0)
Existing posts:
- holiday enforcement
- checkpoint hotspots
- lookback period
- refusal/SFST
- physical control
- understanding OVI/DUI charges

Actions:
- Link each to /ovi-dui-defense-delaware-oh, /resources/dui-checkpoints
- Add glossary links for core terms
- Link to new county OVI pages where contextually relevant

### 6.2 Courts/Process Cluster
Existing posts:
- bond/jail info (Delaware County)
- motion practice

Actions:
- Link to criminal defense pillar and relevant county pages
- Link to glossary terms (arraignment, bond, motions)

### 6.3 Specialty Clusters (P1/P2)
- DV/assault + protection orders
- weapons/CCW
- drug possession vs trafficking
- sex crimes
- white collar
- PI negligence (secondary)

## 7) Measurement Plan
Core:
- GSC impressions/clicks for OVI + county/city terms
- Performance of /resources/dui-checkpoints (links, time on page, conversions)
- Glossary traffic and assisted conversions

Expansion:
- Union/Morrow/Marion county page indexing and impressions
- Suburb pages only if built (Dublin/New Albany)

## 8) Content Integrity & Trust Standards (E-E-A-T)
Objective: Maintain 99.9% accuracy to build peak user trust and satisfy Google's E-E-A-T requirements.

### 8.1 Single Source of Truth (ORC)
- Authority: All legal references must be verified against `codes.ohio.gov`.
- Policy: No "mostly true" or "probably correct" statements.
- Terminology: Definitions must capture exact statutory elements; accuracy trumps speed.

### 8.2 Sourcing & Citations
- Primary sources: .gov reports, official court publications, ORC.
- Explicit citations: Every claim or statistic must include an inline citation or link.

### 8.3 Content Lifecycle & Audits
- Quarterly reviews: glossary, FAQs, and evergreen pillars.
- Timestamping: show `lastVerified` dates to signal freshness.
- Change control: log protected content updates in `docs/CONTENT_CHANGELOG.md`.

Reference docs:
- `docs/CONTENT_GOVERNANCE.md`
- `docs/BLOG_REQUIREMENTS.md`
- `docs/PENALTY-LANGUAGE-STYLE-GUIDE.md`

## 9) DUI Checkpoint Verification Protocol
Verified inputs only: draw from official announcements (OSHP press releases, local PD alerts, verified news reports).

Operational rules:
- Avoid user-generated or unverified tips.
- Update daily during peak periods; remove expired entries immediately.
- De-duplicate entries across sources and standardize times/locations.
- Display recency signals (announcement date or update timestamp).
- If no checkpoints are scheduled, show "No announced checkpoints at this time."

## 10) Implementation Brief (Codex 5.2)
Goals:
- Extend data model for service areas
- Expand JSON-LD areaServed
- Wire glossary + checkpoints as top-tier resources

Tasks:
1) Extend `src/data/serviceAreas.ts` (counties, hub cities, courts, parent relationships)
2) Update `src/lib/seo.tsx` (areaServed includes Delaware, Franklin, Union, Morrow, Marion + select suburbs)
3) Add Resources section to mega menu (links to /glossary and /resources/dui-checkpoints)
4) Audit existing blog posts for glossary + checkpoint links
5) Integrity audit: cross-verify glossary and blog legal points against ORC
6) Checkpoint cleanup: de-duplication and expiration logic to prevent stale map pins

Constraints:
- No thin city pages.
- County pages are the expansion units.
- Personal injury remains secondary and not emphasized.
