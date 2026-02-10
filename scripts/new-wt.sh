#!/usr/bin/env bash
set -euo pipefail

type="${1:-}"
slug="${2:-}"

if [[ -z "$type" || -z "$slug" ]]; then
  echo "Usage: ./scripts/new-wt.sh <type> <slug>" >&2
  echo "Example: ./scripts/new-wt.sh chore agent-docs-worktrees" >&2
  echo "Example: ./scripts/new-wt.sh pr 123-fix-footer" >&2
  exit 2
fi

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$repo_root" ]]; then
  echo "Error: not inside a git repo." >&2
  exit 2
fi

if [[ "$(pwd)" != "$repo_root" ]]; then
  echo "Error: run this from the repo/worktree root:" >&2
  echo "  cd \"$repo_root\"" >&2
  exit 2
fi

if [[ "$repo_root" == "$HOME" || "$repo_root" == "/Users/sistech_tim" ]]; then
  echo "STOP: git toplevel resolves to home directory ($repo_root). Refusing to proceed." >&2
  exit 2
fi

repo_name="$(basename "$repo_root")"
parent_dir="$(cd "$repo_root/.." && pwd)"
wt_base="${parent_dir}/${repo_name}.wt"
wt_path="${wt_base}/${type}-${slug}"
branch="${type}/${slug}"

mkdir -p "$wt_base"

# Best-effort fetch so the new branch starts from the latest refs when run on main.
git fetch --all --prune --quiet || true

if git show-ref --verify --quiet "refs/heads/$branch"; then
  echo "Error: branch already exists: $branch" >&2
  exit 2
fi

git worktree add -b "$branch" "$wt_path"

cat <<EOF

Worktree created:
  Path:   $wt_path
  Branch: $branch

Rules:
- Open only the worktree folder in your editor (one conversation per worktree).
- Before any agent task, run:
    pwd
    git rev-parse --show-toplevel
  If toplevel == \$HOME or /Users/sistech_tim: STOP.
EOF

