# Contributing Workflow

- Branches: use `feat/<topic>`, `chore/<topic>`, or `fix/<topic>`. Prefer opening PRs against `staging`, then merge to `main` after review/CI.
- PRs: include summary, testing (`npm run build` at minimum), and list any new/changed env vars or secrets. Keep brand tokens/typography intact.
- Docs: whenever env/secrets/infra change, update `.env.example`, `docs/OPERATIONS.md`, and `CHANGELOG.md` in the same PR.
- Assets: note any new reference or brand assets in `docs/brand/mango-law-assets.md` with their intended use (reference vs production).
- Avoid direct pushes to `main` unless urgent hotfixes; keep history clean and use small, reviewable PRs.
