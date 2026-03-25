import type { Metadata } from 'next';
import DUICheckpointsPage from '@/views/DUICheckpointsPage';
import StructuredData from '@/components/StructuredData';
import { duiCheckpointMapFaqs } from '@/data/duiCheckpointMapFaqs';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Ohio DUI Checkpoint Map and Guide | Announced Checkpoints',
  description:
    'Browse announced Ohio DUI checkpoints, understand how checkpoint stops work, and review your rights after an OVI checkpoint stop.',
  url: '/resources/dui-checkpoints',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'DUI Checkpoints', item: '/resources/dui-checkpoints' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} faqs={duiCheckpointMapFaqs} url={seo.url} />
      <DUICheckpointsPage renderedAt={new Date().toISOString()} />
    </>
  );
}
