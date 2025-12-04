export type PracticeArea = {
  title: string;
  href: string;
  summary: string;
  category?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    title: 'Criminal Defense',
    href: '/criminal-defense-delaware-oh',
    summary: 'Comprehensive defense strategies for felony and misdemeanor charges across Delaware County.',
  },
  {
    title: 'OVI / DUI Defense',
    href: '/ovi-dui-defense-delaware-oh',
    summary: 'High-test, felony OVI, underage DUI, refusals, and roadside suppression strategies.',
  },
  {
    title: 'Drug Crimes',
    href: '/drug-crime-lawyer-delaware-oh',
    summary: 'Possession, trafficking, paraphernalia, and diversion issues with an eye on treatment options.',
  },
  {
    title: 'Sex Crimes',
    href: '/sex-crime-defense-lawyer-delaware-oh',
    summary: 'Discreet, aggressive defense with attention to privacy, investigation gaps, and expert testimony.',
  },
  {
    title: 'White Collar Crimes',
    href: '/white-collar-crimes-attorney-delaware-oh',
    summary: 'Fraud, embezzlement, securities issues, and investigations with early-motion practice.',
  },
  {
    title: 'Protection Orders',
    href: '/protection-order-lawyer-delaware-oh',
    summary: 'Defense in civil protection order matters with focus on evidence, procedure, and collateral risks.',
  },
  {
    title: 'Personal Injury',
    href: '/personal-injury-lawyer-delaware-oh',
    summary: 'Limited-scope PI; evaluate liability, coverage, and negotiation posture for select matters.',
  },
];

export const oviSubsections = [
  { id: 'high-test', title: 'High-Test OVI', copy: 'Challenging breath/blood results and field testing protocols.' },
  { id: 'felony-ovi', title: 'Felony OVI', copy: 'Protecting rights and minimizing penalties when prior convictions escalate charges.' },
  { id: 'underage', title: 'Underage DUI', copy: 'Tailored defense that addresses school, license, and future record concerns.' },
  { id: 'drug-ovi', title: 'Drug OVI', copy: 'Questioning lab processes, timelines, and officer observations.' },
  { id: 'refusal', title: 'Breath Test Refusal', copy: 'Addressing implied consent issues and BMV actions.' },
  { id: 'sobriety-refusal', title: 'Field Sobriety Refusal', copy: 'Focusing on evidentiary gaps and motion practice to limit admissibility.' },
];
