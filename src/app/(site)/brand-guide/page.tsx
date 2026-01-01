import type { Metadata } from 'next';
import BrandGuidelinesPage from '@/views/BrandGuidelinesPage';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Brand Guidelines | Mango Law LLC',
  noindex: true,
  url: '/brand-guide',
};

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return <BrandGuidelinesPage />;
}
