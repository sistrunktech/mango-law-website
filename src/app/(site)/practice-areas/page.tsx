import type { Metadata } from 'next';
import PracticeAreasPage from '@/views/PracticeAreasPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Criminal Defense Practice Areas | Mango Law LLC',
  description:
    'Focused on criminal defense and OVI/DUI in Delaware, Ohio. Explore our practice areas and schedule a free consultation.',
  url: '/practice-areas',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <PracticeAreasPage />
    </>
  );
}
