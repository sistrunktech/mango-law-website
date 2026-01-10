# Content Governance (v1)

This protocol protects Mango Law LLC's authoritative legal content and strategic SEO assets from unreviewed changes by human or AI contributors.

## 🛡️ Purpose
To ensure site integrity, maintain legal accuracy (EEAT), and preserve high-value search rankings through strict change control and a clear audit trail.

## 📁 Scope
- **Practice Area Content**: Specialized defense strategies and penalty grids.
- **Blog Archive**: Verified informational articles.
- **SEO Metadata**: Unique titles, descriptions, and JSON-LD schema.
- **Firm Facts**: Critical identity data (Ohio licensure, experience years).

## 🏢 Firm Facts (Locked)
- **Attorney**: Dominic "Nick" Mango (Licensed in Ohio since 1999).
- **Experience**: 26+ years of Ohio criminal law experience.
- **Establishment**: Mango Law LLC founded in February 2009.
- **Location**: Delaware, Ohio (serving Delaware, Franklin, Union, Morrow, and Marion counties).
- **Licensure**: OHIO only. Never imply licensure in Delaware (state).

## 🔄 Content Lifecycle
- **draft**: Initial research/drafting; not public.
- **published**: Live content; requires logging for all edits.
- **finalized**: Verified content locked against all but approved strategic changes.

## 🏷️ Change Classification
- **Minor**: Typos, formatting, non-substantive clarifications.
- **Major**: Changes to penalties, legal claims, removal of sources/links, hero image swaps, or schema restructuring.

## 🔑 Approval Token Protocol
Any edit to **finalized** content or any **major** change requires an Approval Token.
**Format**: `APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>`

## 🎭 Role Permissions
| Role | Edit Draft/Pub | Finalize | Edit Finalized |
|------|----------------|----------|----------------|
| Owner (Nick) | Yes | Yes | Yes (Token required) |
| Super Admin (Tim) | Yes | Yes | Yes (Token required) |
| AI Agent / Admin | Yes | No | No (Change Request required) |

## 📜 Logging & Audit
- Every change must be recorded in `docs/CONTENT_CHANGELOG.md`.
- Finalized slugs must be registered in `docs/PROTECTED_CONTENT.md`.
- AI agents must follow `docs/AGENT_GUARDRAILS.md` at all times.

---
*Last Verified: 2026-01-01*
