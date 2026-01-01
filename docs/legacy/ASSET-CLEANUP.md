# Asset Cleanup & Organization Guide

This document outlines the asset cleanup process for organizing scattered brand assets and establishing a single source of truth in Supabase.

## Current Asset Locations

Brand assets are currently scattered across three locations:

1. `/public/images/brand/` - Hand-coded SVG logos
2. `/public/images/brand/generated/` - AI-generated logos from FAL.ai
3. `/public/generated/` - Additional generated assets

## Cleanup Strategy

### Phase 1: Inventory Current Assets (Completed)

✅ Identified all logo files in multiple locations
✅ Documented which assets are currently in use
✅ Created database schema for brand_assets table

### Phase 2: Professional Logo Creation

**Action Required:** Work with Penji to create production-ready logos

**Deliverables Needed:**
- Horizontal lockup (full color, white, black, mango)
- Vertical lockup (full color, white, black, mango)
- Icon only (full color, white, black, mango)
- Favicon variants (16px, 32px, 180px, 192px, 512px)

**File Format:** True vector SVG with editable paths (NOT rasterized)

### Phase 3: Supabase Migration

**Action Required:** Upload Penji-designed assets to Supabase

1. **Create Storage Bucket**
   - Name: `brand-assets`
   - Policy: Public read, authenticated write
   - Folder structure:
     ```
     brand-assets/
     ├── logos/
     │   ├── horizontal/
     │   ├── vertical/
     │   └── stacked/
     ├── icons/
     └── favicons/
     ```

2. **Upload Professional Assets**
   - Upload all Penji-designed logos to appropriate folders
   - Use consistent naming: `mango-logo-[variant]-[color].svg`
   - Example: `mango-logo-horizontal-full.svg`

3. **Populate Database**
   - Insert metadata for each asset into `brand_assets` table
   - Mark all professional assets as `is_active = true`
   - Include usage notes for each variant

### Phase 4: Update Website References

**Action Required:** Update components to load from Supabase

**Files to Update:**
- `src/components/SiteHeader.tsx` - Load horizontal logo from Supabase
- `src/components/Footer.tsx` - Load vertical logo from Supabase
- `src/components/MangoIcon.tsx` - Load icon from Supabase
- `public/favicon.svg` - Replace with Supabase URL

**Implementation Pattern:**
```typescript
import { supabase } from './lib/supabaseClient';

// Example: Load logo dynamically
const [logoUrl, setLogoUrl] = useState('/images/brand/logo-horizontal.svg'); // fallback

useEffect(() => {
  const loadLogo = async () => {
    const { data } = await supabase
      .from('brand_assets')
      .select('file_path')
      .eq('variant_type', 'logo-horizontal')
      .eq('color_variant', 'full-color')
      .eq('is_active', true)
      .maybeSingle();

    if (data) {
      const url = supabase.storage.from('brand-assets').getPublicUrl(data.file_path);
      setLogoUrl(url.data.publicUrl);
    }
  };

  loadLogo();
}, []);
```

### Phase 5: Archive Old Assets

**DO NOT DELETE** - Archive for version history

1. **Create Archive Directory**
   ```bash
   mkdir -p docs/archive/logos/ai-generated-2025-12-05
   ```

2. **Move AI-Generated Assets**
   ```bash
   # Move from public/images/brand/generated/ to archive
   mv public/images/brand/generated/* docs/archive/logos/ai-generated-2025-12-05/
   ```

3. **Mark in Database**
   ```sql
   -- Mark old assets as inactive (if they were in database)
   UPDATE brand_assets
   SET is_active = false
   WHERE variant_type LIKE '%generated%';
   ```

4. **Document in CHANGELOG**
   - Record which assets were archived
   - Document when Penji assets replaced AI assets
   - Include migration date

### Phase 6: Cleanup & Verification

**Verify:**
- ✅ All pages load logos correctly from Supabase
- ✅ Fallback logos work if Supabase is unavailable
- ✅ Logo quality is sharp at all sizes
- ✅ No 404 errors for missing assets
- ✅ Build process completes successfully
- ✅ Performance impact is acceptable (< 100ms load time for logos)

**Remove Empty Directories:**
```bash
# After confirming all works
rm -rf public/images/brand/generated/
rm -rf public/generated/
```

**Keep:**
- `/public/images/brand/` - Keep hand-coded SVGs as fallback
- `docs/archive/` - Version history

## Asset Naming Conventions

### Logos
- Format: `mango-logo-[layout]-[color].svg`
- Layouts: `horizontal`, `vertical`, `stacked`
- Colors: `full`, `white`, `black`, `mango`, `gradient`
- Examples:
  - `mango-logo-horizontal-full.svg`
  - `mango-logo-vertical-white.svg`
  - `mango-logo-stacked-black.svg`

### Icons
- Format: `mango-icon-[color].svg`
- Colors: `full`, `white`, `black`, `mango`
- Examples:
  - `mango-icon-full.svg`
  - `mango-icon-white.svg`

### Favicons
- Format: `favicon-[size].png` or `favicon.svg`
- Sizes: `16x16`, `32x32`, `180x180`, `192x192`, `512x512`
- Examples:
  - `favicon-16x16.png`
  - `favicon-32x32.png`
  - `favicon.svg` (scalable)

## Future Maintenance

### Adding New Assets
1. Request from Penji with clear specifications
2. Review and approve designs
3. Upload to Supabase Storage in appropriate folder
4. Add metadata to `brand_assets` table
5. Update documentation

### Updating Existing Assets
1. Request revision from Penji
2. Upload new version to Supabase with version number
3. Update `file_path` in database (keep old record for history)
4. Set old asset `is_active = false`
5. Test website references
6. Archive replaced file in `docs/archive/`

### Deprecating Assets
1. Set `is_active = false` in database
2. DO NOT delete from Supabase (maintain history)
3. Document reason in `usage_notes` column
4. Update CHANGELOG.md

## Timeline

- **Completed:** Database schema, documentation, inventory
- **Pending:** Penji logo creation, Supabase upload, component updates
- **Target:** Complete migration within 2 weeks of receiving Penji assets

## Success Criteria

✅ All website components load logos from Supabase
✅ Zero scattered asset locations (single source of truth)
✅ True vector SVG logos (professionally designed)
✅ Fallback system in place for offline scenarios
✅ Clear documentation for future asset management
✅ Version history maintained in archive

---

**Last Updated:** December 7, 2025
**Status:** Phase 2 (Awaiting Penji Designs)
**Next Action:** Submit design requests to Penji for production logos
