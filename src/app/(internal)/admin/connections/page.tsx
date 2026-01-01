import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConnectionsPage from '@/views/ConnectionsPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Google Connections | Mango Law LLC',
  noindex: true,
  url: '/admin/connections',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConnectionsPage />
    </Suspense>
  );
}
