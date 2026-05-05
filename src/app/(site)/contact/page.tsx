import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { contactPageMetaDescription } from '@/data/seoRoutingContent';

const seo = {
  title: 'Contact Mango Law',
  description: contactPageMetaDescription,
  url: '/contact',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Contact', item: '/contact' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <ContactPage />
    </>
  );
}
