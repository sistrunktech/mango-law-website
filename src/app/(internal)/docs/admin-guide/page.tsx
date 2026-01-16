import type { Metadata } from 'next';
import AdminGuidePage from '@/views/AdminGuidePage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Admin Guide | Mango Law LLC',
  noindex: true,
  url: '/docs/admin-guide',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <AdminGuidePage />;
}
