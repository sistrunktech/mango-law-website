import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { OFFICE_PHONE_DISPLAY } from '@/lib/contactInfo';

const seo = {
  title: 'Contact Mango Law LLC | Delaware, OH Criminal Defense Attorney',
  description: `Schedule a consultation with experienced criminal defense attorney Dominic "Nick" Mango. Located in Delaware, OH. Call or text ${OFFICE_PHONE_DISPLAY} or email office@mango.law.`,
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
