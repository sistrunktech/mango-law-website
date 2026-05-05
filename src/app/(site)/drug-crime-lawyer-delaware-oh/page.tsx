import type { Metadata } from 'next';
import DrugCrimePage, { drugCrimeFaqs } from '@/views/DrugCrimePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { drugCrimePageMetaDescription } from '@/data/seoRoutingContent';

const seo = {
  title: 'Drug Crime Lawyer Delaware Ohio',
  description: drugCrimePageMetaDescription,
  image: '/images/generated/drug-crimes-defense-hero.png',
  url: '/drug-crime-lawyer-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Drug Crimes', item: '/drug-crime-lawyer-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={drugCrimeFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <DrugCrimePage />
    </>
  );
}
