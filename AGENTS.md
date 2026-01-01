# Contribution Guidelines for AI Assistants

To help Codex, Copilot, and other AI contributors ship high-quality, reviewable PRs without wasting tokens/credits, follow these rules.

---

## Autonomous PR & Branch Policy

- **Do not open PRs manually.** When local tests pass, **push** to `codex/{feature}` or `copilot/{feature}` (e.g. `codex/fix-lint`).
- CI (`.github/workflows/ci.yml`) will:
  1) run build/lint/test,  
  2) auto-open a PR, apply `chore, automerge`,  
  3) enable “Merge when ready,” and  
  4) let the **merge queue** merge after required checks pass.
- Keep diffs **small and scoped**. Use Conventional Commits (`feat(scope): …`, `fix(scope): …`, `chore(scope): …`).

**Before pushing**
```bash
npm ci
npm run lint
npm test
```

---

## Ground rules

1. **Scope your edits.** Edit only files explicitly listed in the task plus any files strictly required to compile, build, or pass tests (imports/types/fixtures). If you need >3 extra files, propose a stacked-PR plan in the PR body.
2. **Diff-first output, with context.** Return unified diffs only for code changes and include a short **Rationale** and **Verification** block (each ≤150 words) so reviewers can reproduce and reason about the change.
3. **Content Governance & Finalized Content.**
   - Treat all files marked as **finalized** in the database or `docs/PROTECTED_CONTENT.md` as read-only.
   - To edit finalized content, you MUST be provided with a valid **Approval Token**.
   - Format: `APPROVED: <slug> -- <action> -- <major|minor> -- <timestamp>`.
   - Update `docs/CONTENT_CHANGELOG.md` for every major content or strategy edit.
4. **PR size limits.** Soft cap ≤200 changed lines, hard cap ≤400 (lockfiles excluded). If you’ll exceed, split into stacked PRs (part 1/2/…) and state the plan up front.
4. **Workflows, lockfiles, env.**
   - **Do not modify** workflow files, lockfiles, or environment configuration **unless the task explicitly says** `ci:` or `build:`.
   - Use commit messages that follow: `feat(scope): summary`, `fix(scope): summary`, `chore(scope): summary`.
   - Run the **build sequence** (see below) before pushing; CI is the source of truth.
   - One intent per PR; keep the scope focused.
   - **Pre-freeze:** Lockfile changes allowed only when `package.json` deps/devDeps or toolchain version changes, or a clean install deterministically updates the lockfile. Add **`deps:lockfile`** and a one-line reason in the PR body. Lockfile diffs are excluded from line caps.
   - **Stability Freeze:** When in freeze (label **`stability-freeze`** or `release/*`), lockfiles are immutable. Only **`deps:security`** or **`hotfix`** may update them.
   - **Concurrency:** Only one open **`deps:lockfile`** PR at a time.
5. **Commit messages.** Conventional Commits; include body with **Context, Change, Risk, Test plan**.
6. **Build & checks.** Assume CI is the source of truth. Include a **Self-check** note (lint/type assumptions, known risks). CI must pass build, lint, and test.
7. **One intent per PR.** Keep each PR to a single category: feat / fix / refactor / chore / docs. Drive-by typos allowed only in files you already touch.
8. **Tests required for behavior changes.** When visible behavior or contracts change, add/adjust at least one unit or snapshot/integration test in the same PR.
9. **Docs & DX.** Update README/CHANGELOG or inline docs when APIs or visible behavior change. Include screenshots for UI deltas.
10. **Security.** Never commit secrets. If config is required, update `.env.example` and document keys.
11. **A11y & i18n (UI).** Preserve semantics and i18n keys. Ensure keyboard/focus and aria are correct for UI changes.
12. **Performance guardrail.** Avoid O(n²) in hot paths; note expected complexity when rendering >1k items.
13. **Exception hatch.** If breaking a rule preserves quality or avoids rework, add **NEED-EXCEPTION:** at the top of the PR body with a concise justification.

---

## CI & Merge Queue Policy

- **Required checks** are enforced by the **merge queue** (not by manual merges). Only the stable PR checks are required:
  - `CI (safety) / build (pull_request)`
  - `CI (safety) / lint (pull_request)`
  - `CI (safety) / test (pull_request)`
  - `CI Policy Guard / guard (pull_request)`
- **CI Policy Guard** blocks unauthorized PR-triggered workflows. Allowed PR workflows are:
  - `ci-pr-safety.yml`, `ci-policy-guard.yml`, `openapi-contract.yml`, `pr-triage.yml`
- **Lockfile workflows** (`lockfile-sync.yml`, labeler) run on **schedule/dispatch** or are **label-gated**; they are **not required** checks.
- Use the manual **rerun helper** (`rerun-failed-checks.yml`) to re-run flaky checks without pushing no-op commits.

### CI expectations (example)

```yaml
# .github/workflows/ci.yml (excerpt)

- uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
    cache: 'npm'

- run: npm ci
- run: npm run build
- run: npm test --if-present
```

---

## Build Sequence (local)

```bash
# Build with required dummy envs
NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co' NEXT_PUBLIC_SUPABASE_ANON_KEY='dummy_key' NEXT_PUBLIC_SITE_URL='https://example.com' npm run build

# Validate
npx tsc --noEmit
npm run lint --if-present
npm test --if-present
```

---

## PR template (include in description)

**REQUIRED sections (enforced by \`pr-body-qa.yml\`):**
- **Summary:** Brief explanation of what and why (≤150 words), include intent type (feat/fix/refactor/chore/docs)
- **Changes:** Bullet list of main changes + short list of changed files
- **Testing:** How you verified the changes (automated and/or manual)

**Also include:**
- **Risk & rollback:** what could go wrong / how to revert
- **Screenshots:** before/after (if UI changes)

---

## Lockfile lifecycle

**Pre-freeze (default):** move fast; commit lockfile changes that result from legitimate dependency edits. Prefer patch/minor bumps; justify any major bump in the PR rationale.

**Stability Freeze (label \`stability-freeze\` or \`release/*\`):**
1. CI enforces immutable installs (\`npm ci\` / \`yarn install --immutable\` / \`pnpm install --frozen-lockfile\`).
2. Allowed lockfile PRs: \`deps:security\` (high/critical) or \`hotfix\` (break-the-build regressions).
3. Batch all other updates post-release via Renovate/Dependabot or scheduled maintenance.

---

## Quick reference

```text
Branch naming (agents): codex/{feature}, copilot/{feature}
Do not open PRs manually; CI opens and queues via pr-on-green.yml
Keep PRs <200 lines (soft), <400 (hard), lockfiles excluded
One intent per PR (feat/fix/refactor/chore/docs)
Run local build/lint/test before pushing
Use merge queue; never force push
```
