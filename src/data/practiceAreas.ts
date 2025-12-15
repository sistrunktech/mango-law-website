import type { LucideIcon } from 'lucide-react';
import { Scale, Car, Pill, ShieldAlert, Briefcase, FileWarning, Stethoscope } from 'lucide-react';

export type PracticeArea = {
  title: string;
  href: string;
  summary: string;
  category?: string;
  icon?: LucideIcon;
  imageUrl?: string;
  imageAlt?: string;
  orcSection?: string;
  practiceAreaKey?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    title: 'Criminal Defense',
    href: '/criminal-defense-delaware-oh',
    summary: 'Comprehensive defense strategies for felony and misdemeanor charges across Delaware County.',
    icon: Scale,
    imageUrl: '/images/generated/criminal-defense-hero.png',
    imageAlt: 'Criminal Defense representation in Delaware County Ohio',
    practiceAreaKey: 'criminal-defense',
    orcSection: '2903.13',
  },
  {
    title: 'OVI / DUI Defense',
    href: '/ovi-dui-defense-delaware-oh',
    summary: 'High-test, felony OVI, underage DUI, refusals, and roadside suppression strategies.',
    icon: Car,
    imageUrl: '/images/generated/ovi-dui-defense-hero.png',
    imageAlt: 'OVI DUI Defense lawyer in Delaware Ohio',
    practiceAreaKey: 'ovi-dui',
    orcSection: '4511.19',
  },
  {
    title: 'Drug Crimes',
    href: '/drug-crime-lawyer-delaware-oh',
    summary: 'Possession, trafficking, paraphernalia, and diversion issues with an eye on treatment options.',
    icon: Pill,
    imageUrl: '/images/generated/drug-crimes-defense-hero.png',
    imageAlt: 'Drug crimes defense attorney in Delaware Ohio',
    practiceAreaKey: 'drug-crimes',
    orcSection: '2925.11',
  },
  {
    title: 'Sex Crimes',
    href: '/sex-crime-defense-lawyer-delaware-oh',
    summary: 'Discreet, aggressive defense with attention to privacy, investigation gaps, and expert testimony.',
    icon: ShieldAlert,
    imageUrl: '/images/generated/sex-crimes-defense-hero.png',
    imageAlt: 'Sex crimes defense lawyer in Delaware Ohio',
    practiceAreaKey: 'sex-crimes',
    orcSection: '2907.03',
  },
  {
    title: 'White Collar Crimes',
    href: '/white-collar-crimes-attorney-delaware-oh',
    summary: 'Fraud, embezzlement, securities issues, and investigations with early-motion practice.',
    icon: Briefcase,
    imageUrl: '/images/generated/white-collar-defense-hero.png',
    imageAlt: 'White collar crimes attorney in Delaware Ohio',
    practiceAreaKey: 'white-collar',
    orcSection: '2913.42',
  },
  {
    title: 'Protection Orders',
    href: '/protection-order-lawyer-delaware-oh',
    summary: 'Defense in civil protection order matters with focus on evidence, procedure, and collateral risks.',
    icon: FileWarning,
    imageUrl: '/images/generated/protection-order-defense-hero.png',
    imageAlt: 'Protection order defense lawyer in Delaware Ohio',
    practiceAreaKey: 'protection-orders',
    orcSection: '3113.31',
  },
  {
    title: 'Personal Injury',
    href: '/personal-injury-lawyer-delaware-oh',
    summary: 'Limited-scope PI; evaluate liability, coverage, and negotiation posture for select matters.',
    icon: Stethoscope,
    imageUrl: '/images/generated/personal-injury-hero.png',
    imageAlt: 'Personal injury lawyer in Delaware Ohio',
    practiceAreaKey: 'personal-injury',
    orcSection: '2315.33',
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
