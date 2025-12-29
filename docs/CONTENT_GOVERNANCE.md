# Content Governance (v1)

## Purpose
Protect approved and finalized content from accidental or unreviewed changes while preserving a clear audit trail for edits.

## Scope
- Blog posts (primary focus)
- Associated assets (hero images, internal links, metadata, schema)
- Admin CMS edits and file-based content edits

## Firm Facts (Locked)
- Dominic "Nick" Mango has been licensed to practice law in Ohio since 1999 (26+ years of Ohio criminal law experience).
- Mango Law LLC was established in February 2009 in Delaware, Ohio.
- Do not state or imply licensure in the state of Delaware; the firm practices Ohio law.

## Blog Post Lifecycle
- **draft**: internal working content; not public.
- **published**: public content; changes allowed but logged.
- **finalized**: locked content; changes require approval token and privileged role.

## Change Classification
- **Minor**: wording tweaks, typos, formatting fixes, non-substantive clarifications.
- **Major**: legal meaning changes, new/removed sections, changes to penalties, deadlines, prices, stats, or claims; removal of sources or links; hero image changes.

## Approval Token Protocol
Format:
```
APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>
```
Example:
```
APPROVED: ohio-dui-lookback-period -- clarify ALS timing -- minor -- 2025-12-26T18:12:00Z
```

Tokens are required for:
- **Any edit to finalized content**
- **All major changes**

## Role Permissions
| Role | Can edit draft/published | Can finalize | Can edit finalized |
|------|---------------------------|--------------|--------------------|
| owner | Yes | Yes | Yes (token required) |
| super_admin | Yes | Yes | Yes (token required) |
| admin | Yes | No | No (must submit change request) |

Change request flow:
- Admins submit change requests for finalized posts.
- Owners/super admins review, approve with an approval token, and apply changes.

## Protected Assets Rules
These changes are treated as **major** and require approval tokens:
- Hero/featured images
- Internal links (add/remove or change target)
- Meta description and schema changes
- Section headings (H2/H3) removal or renaming

## Dual-Baseline Regression Detection
- **Baseline A (last saved)**: warns editor on immediate regressions (links/images/headings removed).
- **Baseline B (last finalized)**: approval required if regression detected in finalized content.

## Logging & Rollback
- Every update creates a version snapshot.
- Major or finalized edits require approval tokens recorded in the version log.
- Change type/reason is stored with version snapshots when provided by editors.
- Rollback should reference a `blog_post_versions` entry ID or timestamp.

## Source-of-Truth Notes
Current state:
- `src/data/blogPosts.ts` contains the rich, public-facing content.
- The database (`blog_posts`) powers the admin CMS interface.

Long term:
- Migrate to DB-only and deprecate file-based source.

## Operational Expectations
- Update `docs/CONTENT_CHANGELOG.md` for any content edits.
- Keep `docs/PROTECTED_CONTENT.md` up to date with approved slugs and last approval dates.
- Privileged users must supply approval tokens when required.
