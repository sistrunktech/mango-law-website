import type { Metadata } from 'next';
import OfCounselPage from '@/views/OfCounselPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { geoffreySpallSchema } from '@/lib/structured-data';

const seo = {
  title: 'Geoffrey Spall - Of Counsel | Mango Law LLC',
  description:
    'Meet Geoffrey Spall, Of Counsel to Mango Law LLC, providing additional support and expertise across our criminal defense practice areas.',
  url: '/of-counsel',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Of Counsel', item: '/of-counsel' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData structuredData={geoffreySpallSchema} breadcrumbs={breadcrumbs} url={seo.url} />
      <OfCounselPage />
    </>
  );
}
