export type CaseType =
  | 'ovi_dui'
  | 'criminal_defense'
  | 'drug_crimes'
  | 'sex_crimes'
  | 'white_collar'
  | 'protection_orders'
  | 'personal_injury'
  | 'bond_jail'
  | 'other';

export const CASE_TYPE_OPTIONS: Array<{ value: CaseType; label: string }> = [
  { value: 'ovi_dui', label: 'OVI / DUI' },
  { value: 'criminal_defense', label: 'Criminal defense (other charge)' },
  { value: 'drug_crimes', label: 'Drug crimes' },
  { value: 'sex_crimes', label: 'Sex crimes' },
  { value: 'white_collar', label: 'White collar / fraud' },
  { value: 'protection_orders', label: 'Protection order / CPO' },
  { value: 'bond_jail', label: 'Bond / jail / bail' },
  { value: 'personal_injury', label: 'Personal injury' },
  { value: 'other', label: 'Not sure / other' },
];

export type Urgency = 'exploring' | 'soon' | 'urgent' | 'emergency';

export const URGENCY_OPTIONS: Array<{ value: Urgency; label: string }> = [
  { value: 'exploring', label: 'Just exploring options' },
  { value: 'soon', label: 'Court date in next 2 weeks' },
  { value: 'urgent', label: 'Court date this week' },
  { value: 'emergency', label: 'Already arrested / need help now' },
];

export type HowFound =
  | 'google_search'
  | 'referral'
  | 'social'
  | 'blog'
  | 'other'
  | 'prefer_not_to_say';

export const HOW_FOUND_OPTIONS: Array<{ value: HowFound; label: string }> = [
  { value: 'google_search', label: 'Google search' },
  { value: 'referral', label: 'Referral' },
  { value: 'social', label: 'Social media' },
  { value: 'blog', label: 'Blog / resource article' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const COUNTY_OPTIONS = ['Delaware', 'Franklin', 'Union', 'Marion', 'Morrow', 'Licking', 'Knox', 'Other'] as const;
export type CountyOption = (typeof COUNTY_OPTIONS)[number];

