# Agent Guardrails (Content Governance)

Use these rules for any AI coding agent working on content or CMS features.

- Treat **finalized** content as read-only unless a valid approval token is provided.
- Any change that removes images, links, headings, or SEO metadata is a **regression risk** and must be called out.
- Always update `docs/CONTENT_CHANGELOG.md` when protected content changes.
- Do not edit nearby content as collateral changes.
- Approval token format:
  `APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>`
- If unsure whether a change is minor or major, treat it as **major**.

References:
- `docs/CONTENT_GOVERNANCE.md`
- `docs/PROTECTED_CONTENT.md`
- `docs/CONTENT_CHANGELOG.md`
