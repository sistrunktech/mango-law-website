import type { Metadata } from 'next';
import SexCrimePage, { sexCrimeFaqs } from '@/views/SexCrimePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Sex Crime Defense Lawyer Delaware, OH | Mango Law LLC',
  description:
    'Discreet and aggressive defense for sex crime allegations. Former prosecutor with 26+ years of experience defending clients in Delaware and Franklin Counties.',
  image: '/images/generated/sex-crimes-defense-hero.png',
  url: '/sex-crime-defense-lawyer-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Sex Crimes', item: '/sex-crime-defense-lawyer-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={sexCrimeFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <SexCrimePage />
    </>
  );
}
