import type { Metadata } from 'next';
import {
  CivilProtectionOrderDefenseOhioPage,
  civilProtectionOrderDefenseFaqs,
} from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Civil Protection Order Defense Ohio',
  description:
    'Responding to a civil protection order in Ohio? Learn hearing-stage priorities, evidence prep, and defense strategy considerations.',
  image: '/images/generated/protection-order-defense-hero.png',
  url: '/civil-protection-order-defense-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Civil Protection Order Defense Ohio', item: '/civil-protection-order-defense-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={civilProtectionOrderDefenseFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <CivilProtectionOrderDefenseOhioPage />
    </>
  );
}
