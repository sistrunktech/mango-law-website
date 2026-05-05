import type { Metadata } from 'next';
import {
  DomesticViolenceFirstOffenseOhioDefensePage,
  domesticViolenceFirstOffenseFaqs,
} from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'First Offense DV Defense Ohio',
  description:
    'Charged with domestic violence in Ohio for the first time? Understand immediate risks, court process, and defense strategy options.',
  image: '/images/generated/blog-assault-domestic-violence.png',
  url: '/domestic-violence-first-offense-ohio-defense',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Domestic Violence First Offense Ohio Defense', item: '/domestic-violence-first-offense-ohio-defense' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={domesticViolenceFirstOffenseFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <DomesticViolenceFirstOffenseOhioDefensePage />
    </>
  );
}
