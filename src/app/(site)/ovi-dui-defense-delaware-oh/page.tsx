import type { Metadata } from 'next';
import OviDuiPage, { oviDuiFaqs } from '@/views/OviDuiPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Delaware Ohio OVI Lawyer | DUI Defense | Mango Law LLC',
  description:
    'Delaware Ohio OVI lawyer for DUI charges, ALS hearings, checkpoint stops, and Delaware County court defense. Practicing in Central Ohio since 1999.',
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
