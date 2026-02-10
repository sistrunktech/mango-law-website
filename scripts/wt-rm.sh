#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <worktree-path>" >&2
}

if [[ "${1:-}" == "" ]]; then
  usage
  exit 2
fi

WORKTREE_PATH="$1"

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "Error: not inside a git repo." >&2
  exit 1
fi

git worktree remove "$WORKTREE_PATH"
echo "Worktree removed: $WORKTREE_PATH"

