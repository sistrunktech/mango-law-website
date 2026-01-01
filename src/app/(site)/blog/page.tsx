import type { Metadata } from 'next';
import BlogPage from '@/views/BlogPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Mango Law Blog | Legal Insights & Ohio Criminal Defense Updates',
  description:
    'Stay informed with articles about criminal defense, OVI/DUI law, and your rights in Ohio courts from attorney Dominic Mango.',
  url: '/blog',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Blog', item: '/blog' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <BlogPage />
    </>
  );
}
