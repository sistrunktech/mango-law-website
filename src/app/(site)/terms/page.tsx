import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Terms of Use | Mango Law LLC - Ohio Criminal Defense',
  description: 'Terms of use for mango.law, including jurisdiction, confidentiality, and legal disclaimer.',
  url: '/terms',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Terms of Use', item: '/terms' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <TermsPage />
    </>
  );
}
