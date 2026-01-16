import type { Metadata } from 'next';
import ServiceAreasPage from '@/views/ServiceAreasPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Areas We Serve | Criminal Defense Attorney in Delaware & Franklin Counties, Ohio',
  description:
    'Mango Law LLC serves clients throughout Delaware County, Franklin County, and Central Ohio. Experienced criminal defense representation in Columbus, Dublin, Westerville, and surrounding communities.',
  url: '/locations',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Service Areas', item: '/locations' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <ServiceAreasPage />
    </>
  );
}
