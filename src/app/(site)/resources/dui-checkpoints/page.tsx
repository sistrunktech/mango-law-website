import type { Metadata } from 'next';
import DUICheckpointsPage from '@/views/DUICheckpointsPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Ohio DUI Checkpoint Map | Real-Time Sobriety Checkpoints',
  description:
    'View real-time locations of sobriety checkpoints across Ohio. Know your rights, plan your route, and stay informed about upcoming checkpoints.',
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
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <DUICheckpointsPage />
    </>
  );
}
