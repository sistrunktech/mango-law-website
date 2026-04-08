import type { Metadata } from 'next';
import ReviewsPage from '@/views/ReviewsPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { reviewsPageMetaDescription } from '@/data/seoRoutingContent';

const seo = {
  title: 'Client Reviews for OVI & Criminal Defense | Mango Law LLC',
  description: reviewsPageMetaDescription,
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
