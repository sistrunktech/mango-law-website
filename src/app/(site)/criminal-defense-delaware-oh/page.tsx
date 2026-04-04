import type { Metadata } from 'next';
import CriminalDefensePage, { criminalDefenseFaqs } from '@/views/CriminalDefensePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Criminal Defense Attorney Delaware, OH | Mango Law LLC',
  description:
    'Aggressive criminal defense for drug crimes, assault, theft, weapons charges, and more. Former prosecutor practicing criminal law in Central Ohio since 1999.',
  image: '/images/generated/criminal-defense-hero.png',
  url: '/criminal-defense-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Criminal Defense', item: '/criminal-defense-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={criminalDefenseFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <CriminalDefensePage />
    </>
  );
}
