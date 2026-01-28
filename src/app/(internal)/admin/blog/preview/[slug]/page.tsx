import type { Metadata } from 'next';
import AdminBlogPreviewPage from '@/views/AdminBlogPreviewPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Blog Preview | Mango Law LLC',
  noindex: true,
  url: '/admin/blog/preview',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <AdminBlogPreviewPage />;
}
