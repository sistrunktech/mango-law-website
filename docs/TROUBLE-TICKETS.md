# Trouble Tickets

This document tracks known issues and problems that require resolution.

---

## TICKET-001: Logo Generation Failure

**Priority:** High
**Status:** Closed
**Date Created:** 2025-12-05
**Assigned To:** TBD

### Issue Summary
Generated logo assets do not match the required brand specifications provided in the original design file (`fphht0w135ufwmj8gaogd_(1).png`).

### Problem Details
- Attempted to generate SVG versions of the Mango Law LLC logo using AI/automated tools
- Generated assets in `/public/images/brand/generated/` directory do not accurately represent the brand
- Multiple iterations failed to match:
  - Mango fruit shape and proportions (teardrop vs. realistic mango)
  - Gold gradient colors and shading (incorrect color values and gradient direction)
  - Leaf design and positioning (simplified vs. detailed original)
  - Overall professional quality and polish
  - Text layout for full logo variations (horizontal, vertical layouts)
  - Font styling for "Mango Law LLC" text
  - "CRIMINAL & OVI/DUI DEFENSE" tagline positioning

### Impact
- Brand identity compromised across the website
- Temporary reversion to original PNG file required
- Inconsistent asset quality between header and footer
- Loss of scalability benefits of SVG format

### Current Workaround
- Resolved by replacing placeholder/generated assets with the official, designer-provided assets in `public/images/brand/`.
- Header now uses the cropped tagline logo asset; footer uses the official vertical full-color logo.

### Files Affected
```
/src/components/SiteHeader.tsx
/src/components/Footer.tsx
/public/images/brand/mango-logo-tagline-cropped.png
/public/images/brand/mango-logo-vertical-fullcolor.svg
/public/images/brand/mango-icon-fullcolor.svg
```

### Required Resolution Options

#### Option 1: Professional Logo Design Service
- Hire professional designer to create proper vector versions
- Cost: $200-500
- Timeline: 1-2 weeks
- Quality: Guaranteed professional result

#### Option 2: Manual Vector Tracing
- Use Adobe Illustrator or Inkscape to manually trace PNG
- Requires design skills and software access
- Timeline: 4-8 hours of work
- Quality: Depends on skill level

#### Option 3: Keep Current Workaround
- Continue using PNG in header
- Use inline SVG icon components elsewhere
- Accept compromise on scalability
- Cost: $0
- Quality: Acceptable but not ideal

### Required Deliverables (if pursuing Option 1 or 2)
- Icon-only versions (mango fruit with leaf)
- Horizontal logo (icon + "Mango Law LLC")
- Vertical logo (icon above text)
- Color variants for each:
  - Original (gold gradient #E8C060 to #A8863A)
  - White (for dark backgrounds)
  - Black (for light backgrounds)
- SVG format, optimized and clean
- Maintain exact proportions from original design

### Notes
- Original logo file shows high-quality gradient work and detailed styling
- AI generation tools consistently failed to capture the nuanced design
- Manual professional work likely required for acceptable results
- Consider this an investment in brand consistency and quality

### Next Steps
1. Optional cleanup (low priority): remove/archival of older placeholder/generated assets once confirmed unused.
2. Optional (recommended): add proper PNG favicons (16×16, 32×32, apple-touch-icon) and wire in `index.html`.

---

## TICKET-002: Floating Chat Progressive Disclosure + Chooser

**Priority:** Medium
**Status:** Closed
**Date Created:** 2025-12-12
**Assigned To:** TBD

### Issue Summary
Floating chat launcher is currently always “expanded label” and does not implement the intended progressive disclosure / chooser (Chat / Call / Consult).

### Desired Behavior
- Expanded (icon + label) for first ~10 seconds or until scroll.
- Collapsed (icon-only) after user has “seen it”.
- Tap opens chooser with: Chat now, Call (office), Request consult (lead modal).
- Must not overlap map controls on `/resources/dui-checkpoints` (add per-page offset override).

### Files Likely Involved
`src/components/ChatIntakeLauncher.tsx`, `src/components/Layout.tsx`, `src/components/chat/ConversationWindow.tsx`, `src/components/LeadCaptureModal.tsx`

---

## TICKET-003: Favicon Assets (16/32) Not Wired

**Priority:** Low
**Status:** Open
**Date Created:** 2025-12-12
**Assigned To:** TBD

### Issue Summary
Site currently uses `public/favicon.svg` only. We should add standard PNG favicon assets (`favicon-16x16.png`, `favicon-32x32.png`, optional `apple-touch-icon.png`) and update `index.html`.

---

*Add additional trouble tickets below using the same format*
