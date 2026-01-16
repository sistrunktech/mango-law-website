import type { Metadata } from 'next';
import HomePage from '@/views/HomePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { localBusinessSchema } from '@/lib/structured-data';

const seo = {
  title: 'Criminal Defense & OVI Attorney Delaware, OH | Mango Law LLC',
  description:
    'Experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI/DUI, drug crimes, assault, sex crimes, and white collar cases. Former prosecutor.',
  url: '/',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData structuredData={localBusinessSchema} url={seo.url} />
      <HomePage />
    </>
  );
}
