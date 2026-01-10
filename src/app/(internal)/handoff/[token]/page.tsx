import type { Metadata } from 'next';
import HandoffSharePage from '@/views/HandoffSharePage';
import { buildMetadata } from '@/lib/seo-metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Shared Document | Mango Law LLC',
  noindex: true,
});

export default function Page() {
  return <HandoffSharePage />;
}
