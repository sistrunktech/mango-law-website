import type { Metadata } from 'next';
import GlossaryPage from '@/views/GlossaryPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Ohio Revised Code Glossary | Criminal & Traffic Law Terms',
  description:
    'A plain-English guide to Ohio criminal and civil statutes. Search by statute number, practice area, or keyword.',
  url: '/glossary',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Glossary', item: '/glossary' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <GlossaryPage />
    </>
  );
}
