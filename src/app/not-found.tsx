import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import NotFoundPage from '@/views/NotFoundPage';
import { buildMetadata } from '@/lib/seo-metadata';

export const metadata: Metadata = buildMetadata({
  title: '404 - Page Not Found | Mango Law LLC',
  noindex: true,
});

export default function NotFound() {
  return (
    <Layout>
      <NotFoundPage />
    </Layout>
  );
}
