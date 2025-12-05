# Trouble Tickets

This document tracks known issues and problems that require resolution.

---

## TICKET-001: Logo Generation Failure

**Priority:** High
**Status:** Open
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
- Using original PNG logo (`/public/images/brand/fphht0w135ufwmj8gaogd_(1).png`) in header
- Using custom inline SVG icon component in footer and other locations
- Not using generated SVG assets from `/public/images/brand/generated/`

### Files Affected
```
/public/images/brand/generated/mango-icon-black.svg
/public/images/brand/generated/mango-icon-gradient.svg
/public/images/brand/generated/mango-icon-original.svg
/public/images/brand/generated/mango-icon-white.svg
/public/images/brand/generated/mango-logo-horizontal-black.svg
/public/images/brand/generated/mango-logo-horizontal-gradient.svg
/public/images/brand/generated/mango-logo-horizontal-original.svg
/public/images/brand/generated/mango-logo-horizontal-white.svg
/public/images/brand/generated/mango-logo-vertical-black.svg
/public/images/brand/generated/mango-logo-vertical-gradient.svg
/public/images/brand/generated/mango-logo-vertical-original.svg
/public/images/brand/generated/mango-logo-vertical-white.svg
/src/components/SiteHeader.tsx
/src/components/Footer.tsx
/src/components/MangoIcon.tsx
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
1. Decision needed on which resolution option to pursue
2. If Option 1: Research and contact logo design services
3. If Option 2: Allocate time and resources for manual tracing
4. If Option 3: Document acceptance of current workaround
5. Update brand guidelines documentation once resolved

---

*Add additional trouble tickets below using the same format*
