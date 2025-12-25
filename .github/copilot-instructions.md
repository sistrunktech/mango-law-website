# Codex/Windsurf Instructions — Mango Law Website

This repo implements Mango Law LLC's criminal defense website using the Sistech Website 2025 reproducible template.

## Focus Areas
- Maintain brand tokens (black, mango, gold, offWhite, teal).
- Use Inter for all typography.
- Keep layout components consistent (PageHero, PracticeAreaCardGrid, TestimonialsList, CTASection).
- Ensure Delaware, Ohio SEO signals are preserved.
- Maintain clean, accessible markup and responsive spacing.
- All forms should submit to Supabase Edge Functions securely.

## Trust & Compliance Rules

### Bar Number Format
Always use the formal format: **"Ohio Supreme Court Registration No. 0071238"**

Do NOT use:
- "OH Bar #0071238" (too informal)
- "Ohio Bar #0071238" (informal)
- "Bar No. 0071238" (too vague)

The Supreme Court of Ohio is the licensing authority. Using its full name signals legitimacy and compliance.

Placement:
- Attorney identity block (homepage photo overlay): yes
- Footer (small text): yes
- Hero headline/subheadline: no

### CTA Language
Use action-oriented, help-first CTAs on practice area cards and service entry points.

Recommended patterns:
- "Get help with OVI charges"
- "Talk to a lawyer about drug charges"
- "Discuss your criminal case"
- "Fight a protection order"

Avoid passive/educational language:
- "Explore OVI Defense" (wrong)
- "Learn more" (wrong)

**Rule:** If the CTA sounds like homework, it's wrong. If it sounds like help, it's right.

### Primary CTA Button Text
Use "Free Case Review" (not "Free Consultation") for primary CTA buttons sitewide.

## Code Guidelines
Never introduce random libraries unless requested.
Never modify core brand colors or typography without explicit instruction.

Always write PR descriptions clearly and in Sistech format.

When changing environment variables, secrets, or infra:
- Update `.env.example`, `docs/OPERATIONS.md`, and `CHANGELOG.md` in the same PR.
- Note required GitHub/Supabase secrets and variables explicitly in the PR body.
