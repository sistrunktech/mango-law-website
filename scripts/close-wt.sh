#!/usr/bin/env bash
set -euo pipefail

wt_path="${1:-}"

if [[ -z "$wt_path" ]]; then
  echo "Usage: ./scripts/close-wt.sh <worktree-path>" >&2
  echo "Example: ./scripts/close-wt.sh ../<repo>.wt/chore-agent-docs-worktrees" >&2
  exit 2
fi

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$repo_root" ]]; then
  echo "Error: not inside a git repo." >&2
  exit 2
fi

if [[ "$repo_root" == "$HOME" || "$repo_root" == "/Users/sistech_tim" ]]; then
  echo "STOP: git toplevel resolves to home directory ($repo_root). Refusing to proceed." >&2
  exit 2
fi

git worktree remove "$wt_path"

cat <<EOF
Worktree removed: $wt_path

Note:
- This removed the worktree directory.
- Branches are not deleted automatically. If you want to delete the branch later:
    git branch -d <type>/<slug>
EOF

