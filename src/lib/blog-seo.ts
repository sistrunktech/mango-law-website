import type { BlogPost } from '@/data/blogPosts';

type BlogSeoOverride = {
  title: string;
  description: string;
};

const BLOG_SEO_OVERRIDES: Record<string, BlogSeoOverride> = {
  'civil-protection-order-hearing-delaware-county-ohio': {
    title: 'Delaware County CPO Hearing Defense',
    description:
      'Prepare for a Delaware County CPO hearing: deadlines, evidence, temporary orders, and compliance risks for respondents.',
  },
  'drug-possession-in-car-ohio': {
    title: 'Drug Possession in a Car in Ohio',
    description:
      'Ohio vehicle drug possession guide covering stops, searches, constructive possession, passenger issues, lab proof, and statements.',
  },
  'drug-ovi-ohio': {
    title: 'Drug OVI in Ohio',
    description:
      'Ohio drug OVI defense guide for marijuana, prescriptions, blood, urine, oral-fluid testing, ALS pressure, and impairment evidence.',
  },
  'ovi-refusal-vs-failed-test-ohio': {
    title: 'OVI Refusal vs Failed Test in Ohio',
    description:
      'Compare Ohio OVI refusals and failed tests, including ALS risk, chemical testing, field sobriety issues, and court strategy.',
  },
  'high-tier-ovi-ohio-17-test': {
    title: 'High-Tier OVI in Ohio',
    description:
      'What a .17 or higher Ohio OVI test can change for jail exposure, driving privileges, evidence review, and defense strategy.',
  },
  'domestic-violence-arrest-delaware-county-ohio': {
    title: 'Domestic Violence Arrest in Delaware County',
    description:
      'Delaware County domestic violence arrest guide covering booking, bond, no-contact terms, protection orders, and evidence to preserve.',
  },
  'delaware-county-criminal-case-timeline': {
    title: 'Delaware County Criminal Case Timeline',
    description:
      'Delaware County criminal case timeline for arraignment, bond, pretrials, discovery, motions, negotiations, and trial settings.',
  },
  'ohio-misdemeanor-vs-felony-charges-delaware-county': {
    title: 'Ohio Misdemeanor vs Felony Charges',
    description:
      'Compare Ohio misdemeanor and felony charges, court paths, penalties, bond pressure, negotiation leverage, and defense priorities.',
  },
  'ohio-livs-law-ovi-changes': {
    title: "Ohio Liv's Law OVI Changes",
    description:
      "Ohio Liv's Law OVI update covering fines, interlock, oral-fluid testing, ALS issues, and what changed after April 9, 2025.",
  },
  'bond-jail-information-delaware-county-ohio': {
    title: 'Delaware County Bond and Jail Guide',
    description:
      'Delaware County bond and jail guide for OVI and criminal arrests, bail basics, release steps, and early defense planning.',
  },
  'what-to-do-after-ovi-arrest-ohio': {
    title: 'What to Do After an OVI Arrest in Ohio',
    description:
      'Ohio OVI arrest checklist covering the first 48 hours, license appeal timing, driving privileges, and first court appearance.',
  },
  'understanding-ovi-dui-charges-ohio': {
    title: 'Ohio OVI and DUI Charges',
    description:
      'Ohio OVI and DUI charge guide covering ORC 4511.19, penalties, defense issues, and first steps after an arrest.',
  },
  'motion-practice-criminal-defense': {
    title: 'Motion Practice in Criminal Defense',
    description:
      'How defense motions challenge stops, searches, testing, and evidence before trial in Ohio criminal and OVI cases.',
  },
  'drug-possession-vs-trafficking-ohio': {
    title: 'Drug Possession vs Trafficking in Ohio',
    description:
      'Ohio drug possession vs trafficking guide covering charge differences, evidence issues, and defense strategy.',
  },
  'white-collar-crime-defense-ohio': {
    title: 'White Collar Crime Defense',
    description:
      'Ohio white collar defense overview for fraud, embezzlement, document review, investigations, and reputation protection.',
  },
  'refuse-field-sobriety-test-ohio': {
    title: 'Refusing Field Sobriety Tests in Ohio',
    description:
      'Ohio field sobriety test refusal guide covering rights, OVI strategy, and how refusal differs from chemical testing.',
  },
  'ohio-dui-lookback-period': {
    title: 'Ohio DUI Lookback Period',
    description:
      'Ohio DUI and OVI lookback guide covering prior convictions, repeat-offense risk, and fact-specific defense review.',
  },
  'ex-parte-protection-orders-ohio-defense': {
    title: 'Ohio Ex Parte Protection Orders',
    description:
      'Ohio ex parte protection order guide for respondents, temporary restrictions, hearing prep, and next steps before court.',
  },
  'ohio-weapons-charges-ccw-defense': {
    title: 'Ohio Weapons Charges Defense',
    description:
      'Ohio weapons charge guide covering CCW, improper handling, weapons disability, vehicle issues, and ORC Chapter 2923.',
  },
  'sex-crimes-defense-ohio-what-you-need-to-know': {
    title: 'Sex Crimes Defense in Ohio',
    description:
      'Ohio sex crime defense overview covering sexual battery, registration exposure, investigation risk, and early defense steps.',
  },
  'personal-injury-claims-ohio-negligence-law': {
    title: 'Ohio Personal Injury Claims',
    description:
      'Ohio personal injury overview covering negligence, comparative fault, damages, deadlines, and claim proof.',
  },
  'assault-domestic-violence-defense-ohio': {
    title: 'Assault and Domestic Violence Defense',
    description:
      'Ohio assault and domestic violence overview covering ORC 2903.13, ORC 2919.25, protection orders, and defense issues.',
  },
  'ohio-dui-checkpoint-hotspots': {
    title: 'Ohio DUI Checkpoints',
    description:
      'Ohio DUI checkpoint guide covering legality, checkpoint procedure, driver rights, and what to do after an OVI stop.',
  },
  'what-to-do-after-dui-checkpoint-stop-ohio': {
    title: 'After an Ohio DUI Checkpoint Stop',
    description:
      'Ohio DUI checkpoint stop checklist covering evidence, ALS license deadlines, field sobriety tests, chemical tests, and court prep.',
  },
  'holiday-ovi-enforcement-ohio-delaware-dublin-columbus': {
    title: 'Ohio Holiday OVI Enforcement',
    description:
      'Ohio holiday OVI enforcement guide for Delaware, Dublin, and Central Ohio drivers, including checkpoints and stop risk.',
  },
  'physical-control-parked-car-ohio-kevin-mcguff': {
    title: 'Physical Control of a Parked Car in Ohio',
    description:
      'Ohio physical-control guide explaining parked-car cases, ORC 4511.194, OVI differences, and defense issues.',
  },
  'first-ovi-court-date-delaware-county-ohio': {
    title: 'First OVI Court Date in Delaware County',
    description:
      'Delaware County OVI court-date guide covering first appearance, what to bring, ALS timing, and common mistakes.',
  },
  'no-contact-order-vs-civil-protection-order-ohio': {
    title: 'No-Contact Orders vs CPOs in Ohio',
    description:
      'Ohio no-contact order vs CPO guide explaining court source, restrictions, violation risk, and defense planning.',
  },
  'drug-possession-charge-ohio-what-to-do-next': {
    title: 'Charged With Drug Possession in Ohio',
    description:
      'Ohio drug possession first-step guide covering search issues, proof, practical risks, and what to preserve early.',
  },
  'ohio-ovi-driving-privileges-als': {
    title: 'Ohio OVI Driving Privileges and ALS',
    description:
      'Delaware County OVI driving privileges guide covering ALS suspension, appeals, ignition interlock, and local filing issues.',
  },
};

function truncateDescription(value: string) {
  if (value.length <= 155) return value;

  const truncated = value.slice(0, 152);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${truncated.slice(0, lastSpace > 110 ? lastSpace : 152).trimEnd()}.`;
}

export function resolveBlogSeo(post: BlogPost) {
  const override = BLOG_SEO_OVERRIDES[post.slug];

  return {
    title: override?.title || post.title,
    description: override?.description || truncateDescription(post.excerpt),
  };
}
