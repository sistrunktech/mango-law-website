import type { Metadata } from 'next';
import ReviewsPage from '@/views/ReviewsPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Client Reviews | Mango Law LLC',
  description:
    'Read what past clients have to say about working with criminal defense attorney Dominic Mango in Delaware and Franklin Counties.',
  url: '/reviews',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Reviews', item: '/reviews' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <ReviewsPage />
    </>
  );
}
