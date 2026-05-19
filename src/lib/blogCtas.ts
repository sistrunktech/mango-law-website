import type { BlogPost } from '../data/blogPosts';
import { resolveBlogScope } from '../data/blogPosts';

export type BlogCtaLink = {
  label: string;
  href: string;
  description: string;
};

export type BlogCtaContent = {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  nextSteps: BlogCtaLink[];
};

const defaultCta: BlogCtaContent = {
  heading: 'Need legal guidance?',
  body: 'Talk through the facts, deadline, and next court step before making a decision that is hard to undo.',
  primaryLabel: 'Request case review',
  primaryHref: '/contact',
  nextSteps: [
    {
      label: 'Criminal defense overview',
      href: '/criminal-defense-delaware-oh',
      description: 'Use this if you are still sorting out the charge, court path, or defense posture.',
    },
    {
      label: 'Contact Mango Law',
      href: '/contact',
      description: 'Use this when a court date, bond term, or police contact needs a faster answer.',
    },
  ],
};

export function getBlogCtaContent(post: BlogPost): BlogCtaContent {
  const scope = resolveBlogScope(post);

  if (scope === 'ovi_dui') {
    return {
      heading: 'Facing an OVI, checkpoint, or license deadline?',
      body: 'Get the stop, testing, ALS, and first-court-date questions sorted before the next deadline.',
      primaryLabel: 'Request OVI case review',
      primaryHref: '/contact',
      nextSteps: [
        {
          label: 'If your license is suspended',
          href: '/als-license-suspension-ohio',
          description: 'Review ALS timing, limited driving privileges, and suspension paperwork.',
        },
        {
          label: 'If this is a first OVI',
          href: '/first-offense-ovi-ohio',
          description: 'Start with first-offense court steps, license issues, and early decisions.',
        },
        {
          label: 'If the stop or testing seems wrong',
          href: '/motion-to-suppress-ovi-ohio',
          description: 'See how stop legality, detention scope, and testing issues are challenged.',
        },
      ],
    };
  }

  if (scope === 'protection_orders' || scope === 'domestic_violence') {
    return {
      heading: 'Facing a CPO, no-contact order, or domestic allegation?',
      body: 'Start with compliance, hearing dates, and evidence preservation before any contact mistake creates new risk.',
      primaryLabel: 'Request protection-order review',
      primaryHref: '/contact',
      nextSteps: [
        {
          label: 'If bond says no contact',
          href: '/blog/no-contact-bond-terms-domestic-violence-ohio',
          description: 'Review contact, housing, parenting, and property risks before replying or returning home.',
        },
        {
          label: 'If you were just served',
          href: '/blog/civil-protection-order-hearing-delaware-county-ohio',
          description: 'Confirm the hearing date, order terms, evidence, and courthouse logistics.',
        },
        {
          label: 'If there is also a criminal case',
          href: '/domestic-violence-lawyer-delaware-oh',
          description: 'Coordinate bond, no-contact, and protection-order issues with the criminal defense.',
        },
        {
          label: 'If the order terms are unclear',
          href: '/protection-order-lawyer-delaware-oh',
          description: 'Use the local CPO defense overview before guessing at what contact is allowed.',
        },
      ],
    };
  }

  if (scope === 'drug_crimes') {
    return {
      heading: 'Facing a drug charge or search issue?',
      body: 'Preserve the stop, search, lab, and possession facts before the case is reduced to one police-report summary.',
      primaryLabel: 'Request drug-charge review',
      primaryHref: '/contact',
      nextSteps: [
        {
          label: 'If drugs were found in a car',
          href: '/blog/drug-possession-in-car-ohio',
          description: 'Review constructive possession, vehicle searches, and passenger issues.',
        },
        {
          label: 'If possession vs. trafficking matters',
          href: '/drug-possession-vs-trafficking-ohio-defense',
          description: 'Compare charge theories, quantity issues, and intent evidence.',
        },
        {
          label: 'If you need the main defense page',
          href: '/drug-crime-lawyer-delaware-oh',
          description: 'Use the local drug-crimes page for broader case strategy.',
        },
      ],
    };
  }

  if (scope === 'criminal_defense') {
    return {
      heading: 'Facing a Delaware County criminal case?',
      body: 'Get the charge, court date, bond terms, and discovery questions organized before a plea or deadline.',
      primaryLabel: 'Request criminal case review',
      primaryHref: '/contact',
      nextSteps: [
        {
          label: 'If you need the main defense page',
          href: '/criminal-defense-delaware-oh',
          description: 'Start with the broader criminal-defense overview and local court context.',
        },
        {
          label: 'If bond or jail is the immediate issue',
          href: '/blog/bond-jail-information-delaware-county-ohio',
          description: 'Review bond types, release timing, and modification questions.',
        },
        {
          label: 'If evidence may be suppressible',
          href: '/blog/motion-practice-criminal-defense',
          description: 'See how pretrial motions challenge evidence and preserve issues.',
        },
      ],
    };
  }

  return defaultCta;
}
