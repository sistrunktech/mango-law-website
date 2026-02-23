import type { Metadata } from 'next';
import {
  DrugPossessionVsTraffickingOhioDefensePage,
  drugPossessionVsTraffickingFaqs,
} from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Drug Possession vs Trafficking Defense in Ohio | Key Differences',
  description:
    'Charged with possession or trafficking in Ohio? Understand legal differences, evidence issues, and defense strategy priorities.',
  image: '/images/generated/drug-crimes-defense-hero.png',
  url: '/drug-possession-vs-trafficking-ohio-defense',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Drug Possession vs Trafficking Ohio Defense', item: '/drug-possession-vs-trafficking-ohio-defense' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={drugPossessionVsTraffickingFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <DrugPossessionVsTraffickingOhioDefensePage />
    </>
  );
}
