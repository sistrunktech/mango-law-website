import type { Metadata } from 'next';
import OviCheckpointsOhioPage, { oviCheckpointsFaqs } from '@/views/OviCheckpointsOhioPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Ohio OVI Checkpoints - Laws and What to Expect | Mango Law',
  description:
    'Learn how Ohio OVI checkpoints work, your rights during a stop, and how to respond if an officer suspects impairment.',
  url: '/ovi-checkpoints-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Ohio OVI Checkpoints', item: '/ovi-checkpoints-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={oviCheckpointsFaqs} breadcrumbs={breadcrumbs} url={seo.url} />
      <OviCheckpointsOhioPage />
    </>
  );
}
