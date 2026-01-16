import type { Metadata } from 'next';
import CheckpointAdminPage from '@/views/CheckpointAdminPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Checkpoint Admin | Mango Law LLC',
  noindex: true,
  url: '/admin/checkpoints',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <CheckpointAdminPage />;
}
