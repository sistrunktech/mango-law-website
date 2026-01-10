import type { Metadata } from 'next';
import WhiteCollarPage, { whiteCollarFaqs } from '@/views/WhiteCollarPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'White Collar Crimes Attorney Delaware, OH | Mango Law LLC',
  description:
    'Strategic defense for fraud, embezzlement, and white collar investigations. Former prosecutor with 26+ years of experience in Delaware and Franklin Counties.',
  image: '/images/generated/white-collar-defense-hero.png',
  url: '/white-collar-crimes-attorney-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'White Collar Crimes', item: '/white-collar-crimes-attorney-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={whiteCollarFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <WhiteCollarPage />
    </>
  );
}
