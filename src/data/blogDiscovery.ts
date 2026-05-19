export type BlogDiscoveryLink = {
  title: string;
  description: string;
  href: string;
};

export type BlogIssuePathGroup = {
  label: string;
  summary: string;
  links: BlogDiscoveryLink[];
};

export const homepageBlogPrioritySlugs = [
  'what-to-do-after-dui-checkpoint-stop-ohio',
  'civil-protection-order-hearing-delaware-county-ohio',
  'drug-possession-charge-ohio-what-to-do-next',
];

export const oviFastPathLinks: BlogDiscoveryLink[] = [
  {
    title: 'Ohio DUI checkpoint map',
    description: 'Recent announced checkpoints, hotspot context, and public-source activity.',
    href: '/resources/dui-checkpoints',
  },
  {
    title: 'After a DUI checkpoint stop',
    description: 'Evidence to preserve, license deadlines to watch, and first-court-date prep.',
    href: '/blog/what-to-do-after-dui-checkpoint-stop-ohio',
  },
  {
    title: 'OVI / DUI defense overview',
    description: 'The broad strategy page for stops, testing, negotiations, and court posture.',
    href: '/ovi-dui-defense-delaware-oh',
  },
  {
    title: 'First-offense OVI in Ohio',
    description: 'The first-charge guide for court steps, penalties, license issues, and early decisions.',
    href: '/first-offense-ovi-ohio',
  },
  {
    title: 'Driving privileges after an OVI',
    description: 'How ALS and limited driving privileges usually work after an arrest.',
    href: '/blog/ohio-ovi-driving-privileges-als',
  },
  {
    title: 'Motion to suppress OVI evidence',
    description: 'Where stop legality, detention scope, and testing problems become the core defense issue.',
    href: '/motion-to-suppress-ovi-ohio',
  },
];

export const blogIssuePathGroups: BlogIssuePathGroup[] = [
  {
    label: 'OVI / DUI',
    summary: 'Stops, checkpoints, license pressure, testing, and first-court-date planning.',
    links: [
      oviFastPathLinks[1],
      oviFastPathLinks[0],
      oviFastPathLinks[3],
    ],
  },
  {
    label: 'Criminal Case',
    summary: 'Court timing, bond, evidence review, and the difference between charge levels.',
    links: [
      {
        title: 'Delaware County criminal case timeline',
        description: 'Arraignment, discovery, motions, negotiation, and trial-setting basics.',
        href: '/blog/delaware-county-criminal-case-timeline',
      },
      {
        title: 'Misdemeanor vs. felony charges',
        description: 'How charge level changes court path, exposure, and defense planning.',
        href: '/blog/ohio-misdemeanor-vs-felony-charges-delaware-county',
      },
      {
        title: 'Criminal defense overview',
        description: 'The main page for broader Delaware County criminal-defense strategy.',
        href: '/criminal-defense-delaware-oh',
      },
    ],
  },
  {
    label: 'Protection / Domestic',
    summary: 'CPO hearings, no-contact rules, domestic allegations, and compliance first steps.',
    links: [
      {
        title: 'Delaware County CPO hearing guide',
        description: 'Evidence, deadlines, and what to prepare before the full hearing.',
        href: '/blog/civil-protection-order-hearing-delaware-county-ohio',
      },
      {
        title: 'Protection order defense',
        description: 'Local defense path for CPO and no-contact order questions.',
        href: '/protection-order-lawyer-delaware-oh',
      },
      {
        title: 'Domestic violence defense',
        description: 'Criminal-case strategy when domestic allegations are also pending.',
        href: '/domestic-violence-lawyer-delaware-oh',
      },
    ],
  },
  {
    label: 'Drug Charges',
    summary: 'Possession, trafficking, vehicle searches, lab proof, and first-step decisions.',
    links: [
      {
        title: 'Drug possession charge: what to do next',
        description: 'Search issues, proof questions, and early mistakes to avoid.',
        href: '/blog/drug-possession-charge-ohio-what-to-do-next',
      },
      {
        title: 'Vehicle drug possession defense',
        description: 'How shared vehicles, stops, and searches affect possession proof.',
        href: '/blog/drug-possession-in-car-ohio',
      },
      {
        title: 'Drug crimes defense overview',
        description: 'The main page for possession, trafficking, paraphernalia, and search issues.',
        href: '/drug-crime-lawyer-delaware-oh',
      },
    ],
  },
];
