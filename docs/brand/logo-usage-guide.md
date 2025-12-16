# Mango Law Logo Usage Guide

This guide documents the brand assets for Mango Law LLC, the professional design workflow, and how to manage assets throughout the website.

## Available Logo Assets

All logo assets are located in `/public/images/brand/generated/` and are in SVG format with transparent backgrounds.

### Icon Only (4 variants)
- `mango-icon-original.svg` - Golden mango with natural gradient
- `mango-icon-white.svg` - All-white version for dark backgrounds
- `mango-icon-black.svg` - All-black version for light backgrounds
- `mango-icon-gradient.svg` - Warm mango-to-gold gradient

**Usage:** Favicons, social media avatars, small decorative elements

### Vertical Lockup (4 variants)
- `mango-logo-vertical-original.svg` - Icon above text, full color
- `mango-logo-vertical-white.svg` - All-white for dark backgrounds
- `mango-logo-vertical-black.svg` - All-black for light backgrounds
- `mango-logo-vertical-gradient.svg` - Gradient version

**Usage:** Mobile headers, square/portrait layouts, footer

### Horizontal Lockup (4 variants)
- `mango-logo-horizontal-original.svg` - Icon beside text, full color
- `mango-logo-horizontal-white.svg` - All-white for dark backgrounds
- `mango-logo-horizontal-black.svg` - All-black for light backgrounds
- `mango-logo-horizontal-gradient.svg` - Gradient version

**Usage:** Desktop headers, letterheads, wide layouts

## Current Implementation

### Site Header
- **File:** `src/components/SiteHeader.tsx`
- **Asset:** `mango-logo-horizontal-original.svg`
- **Size:** `h-16 w-auto`

### Footer
- **File:** `src/components/Footer.tsx`
- **Asset:** `mango-logo-vertical-white.svg`
- **Size:** `h-24 w-auto`

### Favicon
- **File:** `public/favicon.svg`
- **Source:** `public/images/brand/mango-logo-option1-16x16px.svg` (copied into `public/favicon.svg`)

### MangoIcon Component
- **File:** `src/components/MangoIcon.tsx`
- **Default:** Uses `mango-icon-original.svg`
- **Light variant:** Uses `mango-icon-white.svg`
- **Silhouette:** Uses `mango-icon-black.svg`

## Color Guidelines

**Primary Colors:**
- Mango: `#D4A84B` (brand-mango)
- Gold: `#C9A043` (brand-gold)
- Leaf: `#22C55E` (brand-leaf)

**Neutral Colors:**
- Black: `#0A0A0A` (brand-black)
- Off-white: `#FAFAFA` (brand-offWhite)

## Best Practices

1. **Always use SVG format** for crisp rendering at any size
2. **Choose the right variant** based on background color
3. **Maintain adequate clear space** around logos (minimum 50% of icon height)
4. **Never distort** - always maintain aspect ratio
5. **Use original colors** unless specifically requiring monochrome

## Professional Logo Design Workflow

### Why Use Professional Designers

AI-generated logos (like those from FAL.ai) cannot create true vector files. While they output SVG format, these are actually rasterized images wrapped in SVG—not editable vector paths. For production logos, always use professional designers to create true vector graphics that:

- Scale perfectly to any size
- Can be edited and refined
- Have properly defined vector paths
- Export cleanly for print and digital use
- Maintain brand consistency

### Penji Design Workflow

For logo updates, revisions, or new variants:

#### 1. Request from Designer (Penji)

- Submit a design request to Penji with specific requirements:
  - Variant type needed (horizontal, vertical, icon, favicon)
  - Color variations (full color, white, black, single color)
  - Dimensions and use cases
  - File format requirements (SVG vector, PNG raster)
  - Reference the existing Mango Law brand identity

#### 2. Designer Creates True Vector Files

- Penji designers create assets in professional tools (Adobe Illustrator, Figma)
- Receive editable vector SVG files with proper paths (not rasterized)
- Review and request revisions if needed
- Approve final designs

#### 3. Upload to Supabase Storage

Once approved, upload logo files to Supabase:

```bash
# Upload via Supabase Dashboard:
# 1. Navigate to Storage in Supabase Dashboard
# 2. Select or create "brand-assets" bucket
# 3. Create folder structure: logos/, icons/, favicons/
# 4. Upload SVG files with descriptive names
```

#### 4. Add Metadata to Database

Record asset metadata in the `brand_assets` table:

```sql
INSERT INTO brand_assets (
  file_path,
  variant_type,
  color_variant,
  file_format,
  dimensions,
  usage_notes,
  is_active
) VALUES (
  'logos/mango-logo-horizontal-full.svg',
  'logo-horizontal',
  'full-color',
  'svg',
  '400x100',
  'Primary logo for website headers and desktop layouts',
  true
);
```

#### 5. Update Website References

- Update component imports to use Supabase URLs
- Test across all breakpoints and backgrounds
- Verify fallback behavior for loading states
- Update this documentation

#### 6. Archive Old Versions

- Set `is_active = false` on replaced assets in database
- Keep old files in Supabase for version history
- Document change in CHANGELOG.md

### Database Schema

The `brand_assets` table stores metadata for all brand assets:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Unique identifier |
| file_path | text | Path to asset in Supabase Storage |
| variant_type | text | Asset type (logo-horizontal, icon, etc.) |
| color_variant | text | Color version (full-color, white, black) |
| file_format | text | File format (svg, png, jpg) |
| dimensions | text | Asset dimensions |
| usage_notes | text | Guidelines for proper usage |
| is_active | boolean | Whether asset is currently in use |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

### Querying Active Assets

```typescript
// Example: Load active horizontal logo
const { data: logo } = await supabase
  .from('brand_assets')
  .select('file_path')
  .eq('variant_type', 'logo-horizontal')
  .eq('color_variant', 'full-color')
  .eq('is_active', true)
  .maybeSingle();
```

## Legacy AI-Generated Assets

The `/public/images/brand/generated/` directory contains AI-generated logos from FAL.ai's Recraft V3 model. These are suitable for prototyping but should be replaced with professional designer assets for production use.

**Generation Date:** December 5, 2025
**Model:** fal-ai/recraft-v3
**Format:** SVG (rasterized images in SVG format)
**Status:** Prototype assets, replace with Penji-designed vectors
