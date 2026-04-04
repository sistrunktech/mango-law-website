import type { Metadata } from 'next';
import AboutPage from '@/views/AboutPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { attorneySchema } from '@/lib/structured-data';
import { attorneyProfile } from '@/data/attorneyProfile';

const seo = {
  title: 'About Dominic Mango | Criminal Defense Attorney Delaware, OH',
  description: attorneyProfile.aboutMetaDescription,
  url: '/about',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'About', item: '/about' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData structuredData={attorneySchema} breadcrumbs={breadcrumbs} url={seo.url} />
      <AboutPage />
    </>
  );
}
