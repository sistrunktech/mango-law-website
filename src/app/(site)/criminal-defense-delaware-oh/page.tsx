import type { Metadata } from 'next';
import CriminalDefensePage, { criminalDefenseFaqs } from '@/views/CriminalDefensePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Delaware County Criminal Defense Attorney | Mango Law LLC',
  description:
    'Delaware County criminal defense attorney for drug charges, domestic violence, assault, theft, weapons, and felony or misdemeanor cases in Delaware, Ohio.',
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
