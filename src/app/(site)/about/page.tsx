import type { Metadata } from 'next';
import AboutPage from '@/views/AboutPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { attorneySchema } from '@/lib/structured-data';

const seo = {
  title: 'About Dominic Mango | Criminal Defense Attorney Delaware, OH',
  description:
    'OSU Moritz College of Law graduate with 26+ years of Ohio criminal law experience. Former prosecutor with hundreds of jury trials. Certified in BAC DataMaster and NHTSA field sobriety testing.',
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
