export type NavChildLink = {
  label: string;
  href: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
  summary: string;
  children: NavChildLink[];
};

export const navLinks: NavLink[] = [
  {
    label: 'OVI / DUI Defense',
    href: '/ovi-dui-defense-delaware-oh',
    summary: 'Start with the OVI overview, then jump to the specific issue that fits your case.',
    children: [
      {
        label: 'First offense OVI',
        href: '/first-offense-ovi-ohio',
        description: 'What to do next, what to expect, and where early mistakes cost you.',
      },
      {
        label: 'Felony OVI defense',
        href: '/felony-ovi-lawyer-ohio',
        description: 'Higher-risk OVI cases with bigger penalties and more aggressive motion work.',
      },
      {
        label: 'OVI test refusal',
        href: '/ovi-test-refusal-lawyer-ohio',
        description: 'Understand refusal cases, ALS exposure, and how the court side changes.',
      },
      {
        label: 'ALS license suspension',
        href: '/als-license-suspension-ohio',
        description: 'Protect your license and understand the administrative timeline quickly.',
      },
      {
        label: 'Motion to suppress',
        href: '/motion-to-suppress-ovi-ohio',
        description: 'Where stop, testing, and evidence challenges can change the case.',
      },
    ],
  },
  {
    label: 'Criminal Defense',
    href: '/criminal-defense-delaware-oh',
    summary: 'Navigate the core case types first, then go deeper into the pages tied to your charge.',
    children: [
      {
        label: 'Domestic violence defense',
        href: '/domestic-violence-lawyer-delaware-oh',
        description: 'Immediate strategy for allegations that can affect court, family, and firearms rights.',
      },
      {
        label: 'Protection order defense',
        href: '/protection-order-lawyer-delaware-oh',
        description: 'Prepare for CPO hearings, ex parte orders, and fast-moving court deadlines.',
      },
      {
        label: 'Drug crimes defense',
        href: '/drug-crime-lawyer-delaware-oh',
        description: 'Possession, trafficking, search issues, and lab/evidence challenges.',
      },
      {
        label: 'Sex crimes defense',
        href: '/sex-crime-defense-lawyer-delaware-oh',
        description: 'Serious allegations that demand a discreet, trial-ready defense approach.',
      },
      {
        label: 'White collar crimes',
        href: '/white-collar-crimes-attorney-delaware-oh',
        description: 'Fraud, theft, business-related charges, and document-heavy investigations.',
      },
    ],
  },
  {
    label: 'Resources',
    href: '/blog',
    summary: 'Use these pages when you need answers, timelines, and practical next-step guidance.',
    children: [
      {
        label: 'Legal blog',
        href: '/blog',
        description: 'Ohio criminal and OVI articles written to answer real client questions.',
      },
      {
        label: 'DUI checkpoint guide',
        href: '/resources/dui-checkpoints',
        description: 'Announced checkpoint activity, rights information, and related OVI resources.',
      },
      {
        label: 'Legal glossary',
        href: '/glossary',
        description: 'Plain-English explanations of common criminal and OVI terms.',
      },
      {
        label: 'Client reviews',
        href: '/reviews',
        description: 'See how clients describe communication, preparation, and courtroom presence.',
      },
      {
        label: 'Service areas',
        href: '/locations',
        description: 'Coverage across Delaware, Franklin, and surrounding Central Ohio communities.',
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    summary: 'Learn about Nick Mango, how the firm works, and the fastest way to get in touch.',
    children: [
      {
        label: 'Meet Nick Mango',
        href: '/about',
        description: 'Background, courtroom experience, and what clients can expect when they hire the firm.',
      },
      {
        label: 'Contact the office',
        href: '/contact',
        description: 'Reach out for a case review or call/text for a faster response.',
      },
      {
        label: 'Of counsel',
        href: '/of-counsel',
        description: 'Learn about Geoffrey Spall and the broader support behind complex matters.',
      },
    ],
  },
];

export const footerServiceLinks = [
  { label: 'OVI / DUI Defense', href: '/ovi-dui-defense-delaware-oh' },
  { label: 'Criminal Defense', href: '/criminal-defense-delaware-oh' },
  { label: 'Domestic Violence', href: '/domestic-violence-lawyer-delaware-oh' },
  { label: 'Protection Orders', href: '/protection-order-lawyer-delaware-oh' },
  { label: 'Drug Crimes', href: '/drug-crime-lawyer-delaware-oh' },
  { label: 'Sex Crimes', href: '/sex-crime-defense-lawyer-delaware-oh' },
];

export const footerOviGuideLinks = [
  { label: 'First Offense OVI', href: '/first-offense-ovi-ohio' },
  { label: 'Felony OVI Defense', href: '/felony-ovi-lawyer-ohio' },
  { label: 'OVI Test Refusal', href: '/ovi-test-refusal-lawyer-ohio' },
  { label: 'ALS Suspension Defense', href: '/als-license-suspension-ohio' },
  { label: 'Motion to Suppress', href: '/motion-to-suppress-ovi-ohio' },
];

export const footerResourceLinks = [
  { label: 'Legal Blog', href: '/blog' },
  { label: 'DUI Checkpoint Guide', href: '/resources/dui-checkpoints' },
  { label: 'Client Reviews', href: '/reviews' },
  { label: 'Legal Glossary', href: '/glossary' },
  { label: 'Service Areas', href: '/locations' },
  { label: 'About Nick Mango', href: '/about' },
  { label: 'Contact the Office', href: '/contact' },
  { label: 'Of Counsel', href: '/of-counsel' },
];
