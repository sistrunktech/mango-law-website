import type { Metadata } from 'next';
import ServiceAreasPage from '@/views/ServiceAreasPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Areas We Serve',
  description:
    'Mango Law serves clients in Delaware County, Franklin County, and Central Ohio for criminal defense and OVI matters.',
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
