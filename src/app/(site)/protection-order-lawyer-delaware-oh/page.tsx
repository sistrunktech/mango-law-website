import type { Metadata } from 'next';
import ProtectionOrderPage, { protectionOrderFaqs } from '@/views/ProtectionOrderPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Protection Order Lawyer Delaware, OH | CPO Defense | Mango Law LLC',
  description:
    'Protection order lawyer in Delaware, Ohio for CPO hearings, no-contact issues, evidence preparation, and related domestic-violence case overlap.',
  image: '/images/generated/protection-order-defense-hero.png',
  url: '/protection-order-lawyer-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Protection Orders', item: '/protection-order-lawyer-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={protectionOrderFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <ProtectionOrderPage />
    </>
  );
}
