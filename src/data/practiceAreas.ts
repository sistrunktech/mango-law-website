import type { LucideIcon } from 'lucide-react';
import { Scale, Car, Pill, ShieldAlert, Briefcase, FileWarning, Stethoscope } from 'lucide-react';

export type PracticeArea = {
  title: string;
  href: string;
  summary: string;
  category?: string;
  icon?: LucideIcon;
};

export const practiceAreas: PracticeArea[] = [
  {
    title: 'Criminal Defense',
    href: '/criminal-defense-delaware-oh',
    summary: 'Comprehensive defense strategies for felony and misdemeanor charges across Delaware County.',
    icon: Scale,
  },
  {
    title: 'OVI / DUI Defense',
    href: '/ovi-dui-defense-delaware-oh',
    summary: 'High-test, felony OVI, underage DUI, refusals, and roadside suppression strategies.',
    icon: Car,
  },
  {
    title: 'Drug Crimes',
    href: '/drug-crime-lawyer-delaware-oh',
    summary: 'Possession, trafficking, paraphernalia, and diversion issues with an eye on treatment options.',
    icon: Pill,
  },
  {
    title: 'Sex Crimes',
    href: '/sex-crime-defense-lawyer-delaware-oh',
    summary: 'Discreet, aggressive defense with attention to privacy, investigation gaps, and expert testimony.',
    icon: ShieldAlert,
  },
  {
    title: 'White Collar Crimes',
    href: '/white-collar-crimes-attorney-delaware-oh',
    summary: 'Fraud, embezzlement, securities issues, and investigations with early-motion practice.',
    icon: Briefcase,
  },
  {
    title: 'Protection Orders',
    href: '/protection-order-lawyer-delaware-oh',
    summary: 'Defense in civil protection order matters with focus on evidence, procedure, and collateral risks.',
    icon: FileWarning,
  },
  {
    title: 'Personal Injury',
    href: '/personal-injury-lawyer-delaware-oh',
    summary: 'Limited-scope PI; evaluate liability, coverage, and negotiation posture for select matters.',
    icon: Stethoscope,
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
