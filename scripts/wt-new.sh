#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: $0 <branch> <worktree-path>" >&2
}

if [[ "${1:-}" == "" || "${2:-}" == "" ]]; then
  usage
  exit 2
fi

BRANCH="$1"
WORKTREE_PATH="$2"

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "Error: not inside a git repo." >&2
  exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "Error: must run from local 'main' branch (currently: '$CURRENT_BRANCH')." >&2
  exit 1
fi

git fetch origin
git pull --ff-only origin main

if [[ -e "$WORKTREE_PATH" ]]; then
  echo "Error: worktree path already exists: $WORKTREE_PATH" >&2
  exit 1
fi

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git worktree add "$WORKTREE_PATH" "$BRANCH"
else
  git worktree add -b "$BRANCH" "$WORKTREE_PATH" origin/main
fi

echo "Worktree created: $WORKTREE_PATH (branch: $BRANCH)"

