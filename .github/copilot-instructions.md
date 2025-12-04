# Codex/Windsurf Instructions — Mango Law Website

This repo implements Mango Law LLC’s criminal defense website using the Sistech Website 2025 reproducible template.

Focus areas:
- Maintain brand tokens (black, mango, gold, offWhite, teal).
- Use Inter for all typography.
- Keep layout components consistent (PageHero, PracticeAreaCardGrid, TestimonialsList, CTASection).
- Ensure Delaware, Ohio SEO signals are preserved.
- Maintain clean, accessible markup and responsive spacing.
- All forms should submit to Supabase Edge Functions securely.

Never introduce random libraries unless requested.
Never modify core brand colors or typography without explicit instruction.

Always write PR descriptions clearly and in Sistech format.

When changing environment variables, secrets, or infra:
- Update `.env.example`, `docs/OPERATIONS.md`, and `CHANGELOG.md` in the same PR.
- Note required GitHub/Supabase secrets and variables explicitly in the PR body.
