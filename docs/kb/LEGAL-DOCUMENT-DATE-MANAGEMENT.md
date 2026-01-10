# Legal Document Date Management

This document describes how to manage effective dates for legal documents (Terms of Service, Privacy Policy) and automated copyright year updates.

## Overview

All legal document metadata is centralized in `src/lib/legalDocuments.ts`. This provides:

- Single source of truth for effective dates
- Version history tracking
- Automated copyright year calculation
- Consistent date formatting

## File Locations

| File | Purpose |
|------|---------|
| `src/lib/legalDocuments.ts` | Central configuration for all legal documents |
| `src/pages/TermsPage.tsx` | Terms of Use page |
| `src/pages/PrivacyPage.tsx` | Privacy Policy page |
| `src/components/Footer.tsx` | Footer with copyright year |

## Updating Effective Dates

### When to Update the Effective Date

**DO update the effective date for SUBSTANTIVE changes:**
- Adding new terms or clauses
- Modifying existing policies (data handling, user rights, etc.)
- Changing legal obligations or user responsibilities
- Adding or removing services covered by the policy
- Changes to data collection or sharing practices
- Modifications to dispute resolution procedures
- Changes to governing law or jurisdiction

**DO NOT update the effective date for MINOR changes:**
- Fixing typos or grammatical errors
- Clarifying existing language without changing meaning
- Formatting or styling changes
- Updating contact information
- Fixing broken links
- Accessibility improvements that don't change content

### How to Update

1. Open `src/lib/legalDocuments.ts`

2. Update the relevant document configuration:

```typescript
termsOfService: {
  id: 'terms-of-service',
  title: 'Terms of Use',
  currentVersion: '1.1.0',  // Increment version
  effectiveDate: '2026-03-15',  // New effective date (YYYY-MM-DD)
  history: [
    {
      version: '1.1.0',
      effectiveDate: '2026-03-15',
      changeType: 'substantive',  // or 'minor'
      summary: 'Added cookie consent requirements',
    },
    // ... keep previous history entries
  ],
},
```

3. Version numbering convention:
   - **Major version (X.0.0)**: Complete rewrites or fundamental changes
   - **Minor version (1.X.0)**: Substantive policy changes
   - **Patch version (1.0.X)**: Minor corrections or clarifications

## Copyright Year Automation

The copyright year automatically updates based on the current system date. No manual intervention is required.

### How It Works

The `getCopyrightText()` function in `legalDocuments.ts`:
- Returns just the current year if it matches the start year
- Returns a range (e.g., "2024–2025") if the current year is later than the start year

### Configuration

Set the company start year in `legalDocuments.ts`:

```typescript
export const COMPANY_START_YEAR = 2024;
```

### Usage in Components

```tsx
import { getCopyrightText, COMPANY_START_YEAR } from '../lib/legalDocuments';

// In component:
<span>© {getCopyrightText(COMPANY_START_YEAR)} Mango Law LLC</span>
```

## Testing Procedures

### Manual Testing

1. **Effective Date Display**
   - Navigate to `/terms` and verify the effective date displays correctly
   - Navigate to `/privacy` and verify the effective date displays correctly
   - Format should be: "December 20, 2025"

2. **Copyright Year**
   - Check the footer on any page
   - Should display current year or year range
   - If current year is 2025 and start year is 2024, should show "2024–2025"

### Automated Testing

Create a test file `test/legalDocuments.test.ts`:

```typescript
import {
  formatEffectiveDate,
  getCopyrightText,
  getFormattedEffectiveDate,
} from '../src/lib/legalDocuments';

// Test date formatting
const formatted = formatEffectiveDate('2025-12-20');
console.assert(formatted === 'December 20, 2025', 'Date formatting failed');

// Test copyright year
const currentYear = new Date().getFullYear();
const copyrightSameYear = getCopyrightText(currentYear);
console.assert(copyrightSameYear === String(currentYear), 'Same year copyright failed');

const copyrightRange = getCopyrightText(2020);
console.assert(copyrightRange === `2020–${currentYear}`, 'Range copyright failed');

// Test document retrieval
const tosDate = getFormattedEffectiveDate('termsOfService');
console.assert(tosDate === 'December 20, 2025', 'TOS date retrieval failed');

console.log('All legal document tests passed!');
```

## Fallback Procedures

If the automated system fails:

1. **Hardcode the date temporarily** in the page component:
   ```tsx
   <p>Effective Date: December 20, 2025</p>
   ```

2. **For copyright year**, ensure JavaScript is enabled. The system uses `new Date().getFullYear()` which requires client-side JavaScript.

3. **Check for import errors** - ensure `legalDocuments.ts` exports are correct.

## Changelog

| Date | Change | Type |
|------|--------|------|
| 2025-12-20 | Initial implementation of centralized legal document management | Setup |

## Contact

For questions about legal document updates, contact the development team or legal counsel.
