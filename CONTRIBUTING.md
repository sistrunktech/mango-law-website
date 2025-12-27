# Contributing Workflow

- Branches: use `feat/<topic>`, `chore/<topic>`, or `fix/<topic>`. Prefer opening PRs against `staging`, then merge to `main` after review/CI.
- PRs: include summary, testing (`npm run build` at minimum), and list any new/changed env vars or secrets. Keep brand tokens/typography intact.
- Docs: whenever env/secrets/infra change, update `.env.example`, `docs/OPERATIONS.md`, and `CHANGELOG.md` in the same PR.
- Assets: note any new reference or brand assets in `docs/brand/mango-law-assets.md` with their intended use (reference vs production).
- Avoid direct pushes to `main` unless urgent hotfixes; keep history clean and use small, reviewable PRs.
- Content governance: do **not** edit finalized content without an approval token; always update `docs/CONTENT_CHANGELOG.md` for protected content changes.
- Content governance: explicitly call out SEO/asset regressions (removed links, images, headings, meta/schema changes).
- Blog requirements: review `docs/BLOG_REQUIREMENTS.md` before editing blog content or visuals.
