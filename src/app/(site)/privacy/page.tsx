import type { Metadata } from 'next';
import PrivacyPage from '@/views/PrivacyPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Privacy Policy | Ohio Criminal Defense Attorney - Mango Law LLC',
  description: 'Read how Mango Law LLC collects, uses, and protects information on mango.law.',
  url: '/privacy',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Privacy Policy', item: '/privacy' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <PrivacyPage />
    </>
  );
}
