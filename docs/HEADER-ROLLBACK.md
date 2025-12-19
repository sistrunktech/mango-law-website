# Header Rollback (Quick Revert)

This repo sometimes ships header changes quickly during launch prep. This file documents **how to revert header-only changes** without undoing other site updates.

## What the current header includes
- A **single** desktop “top green bar” with **Call/Text** + a **DUI Checkpoint Map** link (`src/components/SiteHeader.tsx`).
- A mobile-only “Live DUI Checkpoint Map” banner that can be dismissed (stored in `localStorage`).

## Revert header-only changes (preferred)

### Option A (recommended): revert the specific commits
This keeps history intact and is easiest to audit.

1. Fetch latest:
   - `git fetch origin`
2. Revert the header commits you want to undo (newest first). Example:
   - `git revert <commit_sha>`
3. Resolve conflicts (if any), then:
   - `npm test && npm run build`
   - `git push origin main`

### Option B: restore only the header file to a known-good version
This is useful if you want a header from an earlier point but don’t want to revert other unrelated commits.

1. Find the last known-good commit SHA:
   - `git log --oneline -- src/components/SiteHeader.tsx`
2. Restore the file from that commit:
   - `git checkout <commit_sha> -- src/components/SiteHeader.tsx`
3. Validate and ship:
   - `npm test && npm run build`
   - `git commit -m "revert(header): restore previous SiteHeader"`
   - `git push origin main`

## Notes
- If the “green bar” seems to disappear on mobile, it may have been dismissed; clear `localStorage` key `mango_dui_map_banner_dismissed_v1` to show it again.

