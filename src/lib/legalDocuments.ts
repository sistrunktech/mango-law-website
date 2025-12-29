export type ChangeType = 'substantive' | 'minor';

export interface LegalDocumentVersion {
  version: string;
  effectiveDate: string;
  changeType: ChangeType;
  summary: string;
}

export interface LegalDocumentConfig {
  id: string;
  title: string;
  currentVersion: string;
  effectiveDate: string;
  history: LegalDocumentVersion[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocumentConfig> = {
  termsOfService: {
    id: 'terms-of-service',
    title: 'Terms of Use',
    currentVersion: '1.0.0',
    effectiveDate: '2025-12-20',
    history: [
      {
        version: '1.0.0',
        effectiveDate: '2025-12-20',
        changeType: 'substantive',
        summary: 'Initial publication of Terms of Use',
      },
    ],
  },
  privacyPolicy: {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    currentVersion: '1.0.0',
    effectiveDate: '2025-12-20',
    history: [
      {
        version: '1.0.0',
        effectiveDate: '2025-12-20',
        changeType: 'substantive',
        summary: 'Initial publication of Privacy Policy',
      },
    ],
  },
};

export function formatEffectiveDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDocument(docId: keyof typeof LEGAL_DOCUMENTS): LegalDocumentConfig {
  return LEGAL_DOCUMENTS[docId];
}

export function getFormattedEffectiveDate(docId: keyof typeof LEGAL_DOCUMENTS): string {
  const doc = LEGAL_DOCUMENTS[docId];
  return formatEffectiveDate(doc.effectiveDate);
}

export function getCurrentCopyrightYear(): number {
  return new Date().getFullYear();
}

export function getCopyrightText(startYear?: number): string {
  const currentYear = getCurrentCopyrightYear();
  if (startYear && startYear < currentYear) {
    return `${startYear}–${currentYear}`;
  }
  return String(currentYear);
}

export const COMPANY_START_YEAR = 2024;
