import type { LucideIcon } from 'lucide-react';
import { Scale, Car, Pill, ShieldAlert, Briefcase, FileWarning, Stethoscope } from 'lucide-react';

export type PracticeArea = {
  title: string;
  href: string;
  summary: string;
  category?: string;
  icon?: LucideIcon;
  orcSection?: string;
  orcTitle?: string;
  orcDefinition?: string;
  orcLink?: string;
  orcExtras?: Array<{
    section: string;
    label: string;
    definition: string;
    link: string;
  }>;
  practiceAreaKey?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    title: 'Criminal Defense',
    href: '/criminal-defense-delaware-oh',
    summary: 'Comprehensive defense strategies for felony and misdemeanor charges across Delaware County.',
    icon: Scale,
    practiceAreaKey: 'criminal-defense',
    orcSection: '2903.13',
    orcTitle: 'Assault',
    orcDefinition: 'Prohibits knowingly causing or attempting to cause physical harm to another. Represents one of many criminal offenses we defend.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-2903.13',
    orcExtras: [
      {
        section: '2919.25',
        label: 'Domestic Violence',
        definition: 'Knowingly causing physical harm to a family or household member.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2919.25',
      },
      {
        section: '2903.11',
        label: 'Felonious Assault',
        definition: 'Causing serious physical harm or harm by means of a deadly weapon.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2903.11',
      },
      {
        section: '2913.02',
        label: 'Theft',
        definition: 'Obtaining control over property or services without consent.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2913.02',
      },
      {
        section: '2921.13',
        label: 'Falsification',
        definition: 'Making false statements to public officials or in official proceedings.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2921.13',
      },
    ],
  },
  {
    title: 'OVI / DUI Defense',
    href: '/ovi-dui-defense-delaware-oh',
    summary: 'High-test, felony OVI, underage DUI, refusals, and roadside suppression strategies.',
    icon: Car,
    practiceAreaKey: 'ovi-dui',
    orcSection: '4511.19',
    orcTitle: 'Operating Vehicle Under the Influence',
    orcDefinition: 'Prohibits operating any vehicle while under the influence of alcohol, drugs, or a combination of both.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-4511.19',
    orcExtras: [
      {
        section: '4511.191',
        label: 'Implied Consent',
        definition: 'Establishes implied consent to chemical testing when arrested for OVI.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-4511.191',
      },
      {
        section: '4511.194',
        label: 'Physical Control',
        definition: 'Prohibits being in physical control of a vehicle while impaired.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-4511.194',
      },
      {
        section: '4510.14',
        label: 'OVI Suspension Violation',
        definition: 'Driving while license is suspended for OVI-related conviction.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-4510.14',
      },
      {
        section: '4511.203',
        label: 'Wrongful Entrustment',
        definition: 'Allowing another person to operate your vehicle while intoxicated.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-4511.203',
      },
    ],
  },
  {
    title: 'Drug Crimes',
    href: '/drug-crime-lawyer-delaware-oh',
    summary: 'Possession, trafficking, paraphernalia, and diversion issues with an eye on treatment options.',
    icon: Pill,
    practiceAreaKey: 'drug-crimes',
    orcSection: '2925.11',
    orcTitle: 'Possession of Controlled Substances',
    orcDefinition: 'Criminalizes knowingly obtaining, possessing, or using controlled substances without a valid prescription.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-2925.11',
    orcExtras: [
      {
        section: '2925.03',
        label: 'Drug Trafficking',
        definition: 'Selling or preparing controlled substances for distribution.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2925.03',
      },
      {
        section: '2925.14',
        label: 'Drug Paraphernalia',
        definition: 'Using, possessing, or selling drug paraphernalia.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2925.14',
      },
    ],
  },
  {
    title: 'Sex Crimes',
    href: '/sex-crime-defense-lawyer-delaware-oh',
    summary: 'Discreet, aggressive defense with attention to privacy, investigation gaps, and expert testimony.',
    icon: ShieldAlert,
    practiceAreaKey: 'sex-crimes',
    orcSection: '2907.03',
    orcTitle: 'Sexual Battery',
    orcDefinition: 'Prohibits sexual conduct when consent cannot be freely given due to age, mental condition, or position of authority.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-2907.03',
    orcExtras: [
      {
        section: '2907.04',
        label: 'Sexual Conduct with Minor',
        definition: 'Sexual conduct with someone between 13 and 16 years old.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2907.04',
      },
      {
        section: '2907.21',
        label: 'Importuning',
        definition: 'Soliciting a person to engage in sexual activity when the offender knows the person is under 16 or is a law enforcement officer posing as a person under 16.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2907.21',
      },
      {
        section: '2903.214',
        label: 'Stalking',
        definition: 'Pattern of conduct causing someone to believe you will cause harm.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2903.214',
      },
    ],
  },
  {
    title: 'White Collar Crimes',
    href: '/white-collar-crimes-attorney-delaware-oh',
    summary: 'Fraud, embezzlement, securities issues, and investigations with early-motion practice.',
    icon: Briefcase,
    practiceAreaKey: 'white-collar',
    orcSection: '2913.42',
    orcTitle: 'Theft in Office (Embezzlement)',
    orcDefinition: 'Criminalizes theft committed by an officer, employee, or agent while in their position of trust.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-2913.42',
    orcExtras: [
      {
        section: '2913.02',
        label: 'Theft',
        definition: 'Obtaining control over property or services without consent.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2913.02',
      },
      {
        section: '2921.13',
        label: 'Falsification',
        definition: 'Making false statements to public officials or in official proceedings.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2921.13',
      },
    ],
  },
  {
    title: 'Protection Orders',
    href: '/protection-order-lawyer-delaware-oh',
    summary: 'Defense in civil protection order matters with focus on evidence, procedure, and collateral risks.',
    icon: FileWarning,
    practiceAreaKey: 'protection-orders',
    orcSection: '3113.31',
    orcTitle: 'Civil Protection Orders',
    orcDefinition: 'Authorizes courts to issue protection orders in domestic violence cases, including ex parte orders without the accused being present.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-3113.31',
    orcExtras: [
      {
        section: '2919.27',
        label: 'Violating Protection Order',
        definition: 'Criminal offense to violate the terms of a protection order.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2919.27',
      },
      {
        section: '2903.214',
        label: 'Stalking',
        definition: 'Pattern of conduct causing someone to believe you will cause harm.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2903.214',
      },
      {
        section: '2903.211',
        label: 'Menacing',
        definition: 'Causing another person to believe you will cause physical harm.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2903.211',
      },
    ],
  },
  {
    title: 'Personal Injury',
    href: '/personal-injury-lawyer-delaware-oh',
    summary: 'Limited-scope PI; evaluate liability, coverage, and negotiation posture for select matters.',
    icon: Stethoscope,
    practiceAreaKey: 'personal-injury',
    orcSection: '2315.33',
    orcTitle: 'Comparative Negligence',
    orcDefinition: 'Establishes that an injured party can recover damages even if partially at fault, with recovery reduced by their percentage of fault.',
    orcLink: 'https://codes.ohio.gov/ohio-revised-code/section-2315.33',
    orcExtras: [
      {
        section: '2305.10',
        label: 'Statute of Limitations',
        definition: 'Sets a two-year time limit for filing most personal injury lawsuits.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2305.10',
      },
      {
        section: '2315.18',
        label: 'Damages Cap',
        definition: 'Limits non-economic damages in most tort cases.',
        link: 'https://codes.ohio.gov/ohio-revised-code/section-2315.18',
      },
    ],
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
