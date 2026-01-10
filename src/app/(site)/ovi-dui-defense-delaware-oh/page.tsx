import type { Metadata } from 'next';
import OviDuiPage, { oviDuiFaqs } from '@/views/OviDuiPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'OVI/DUI Defense Lawyer Delaware, OH | Mango Law LLC',
  description:
    'Experienced OVI/DUI defense attorney in Delaware County. Challenge traffic stops, field sobriety tests, and breathalyzer results. Certified in BAC DataMaster and NHTSA testing.',
  image: '/images/generated/ovi-dui-defense-hero.png',
  url: '/ovi-dui-defense-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'OVI / DUI Defense', item: '/ovi-dui-defense-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={oviDuiFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <OviDuiPage />
    </>
  );
}
