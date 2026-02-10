# AGENTS.md (Runbook)

This repo supports both human and AI agents. Follow these rules strictly.

## Workspace Rules (Required)

- Do not open `/Users/sistech_tim` (or any home/root/parent directory) as the workspace.
- Open the repo folder directly (or a worktree path), for example:
  - `/Users/sistech_tim/CascadeProjects/personal-website/mango-law-website`
- If the repo shows more than 100 untracked files, STOP and switch to a clean worktree:

```bash
git status --porcelain | rg '^\\?\\?' | wc -l
```

## Branch Strategy

- Keep `main` clean and synced with `origin/main`.
- Use branch prefix `codex/` for agent work.
- Small PRs. One topic per PR.

## Worktree Workflow

Create a clean worktree from `origin/main` (must be on local `main` first):

```bash
./scripts/wt-new.sh codex/my-branch ../_worktrees/mango-law-my-branch
```

Remove a worktree:

```bash
./scripts/wt-rm.sh ../_worktrees/mango-law-my-branch
```

## PR Hygiene

- Commit early/often.
- Split PRs if scope grows.
- Do not commit build output or caches (`.next/`, `dist/`, `node_modules/`, coverage, etc.).
- Never commit secrets. Use `.env.local` locally.

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co' NEXT_PUBLIC_SUPABASE_ANON_KEY='dummy_key' NEXT_PUBLIC_SITE_URL='https://example.com' npm run build
```

## Project-Specific Guardrails

- Protected/finalized content is tracked in `docs/PROTECTED_CONTENT.md`.
- If a task requires editing finalized content, require an approval token in the format:
  - `APPROVED: <slug> -- <what changed> -- <major|minor> -- <timestamp>`
- Log major content/strategy changes in `docs/CONTENT_CHANGELOG.md`.

## Cloud Agent Prompt Template

Copy/paste this to start a consistent cloud thread:

```text
Repo: mango-law-website
Branch: codex/<topic>
Goal:
In scope:
Out of scope:
Paths allowed to change:
Commands to run (min):
Definition of done:
Notes / guardrails:
```

