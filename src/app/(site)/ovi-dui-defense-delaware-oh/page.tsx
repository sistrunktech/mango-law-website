import type { Metadata } from 'next';
import OviDuiPage, { oviDuiFaqs } from '@/views/OviDuiPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'OVI/DUI Defense Lawyer Delaware, OH | Mango Law LLC',
  description:
    'OVI/DUI defense attorney in Delaware County handling traffic stops, field sobriety issues, breath-test evidence, and appeals. Practicing in Central Ohio since 1999.',
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
