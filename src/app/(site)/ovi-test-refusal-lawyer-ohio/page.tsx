import type { Metadata } from 'next';
import { OviTestRefusalLawyerOhioPage, oviTestRefusalFaqs } from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'OVI Test Refusal Lawyer in Ohio | Breath Test Refusal Defense',
  description:
    'Refused a breath or chemical test in Ohio? Understand ALS risk, court impact, and how refusal cases are defended.',
  image: '/images/generated/ovi-case-strategy.png',
  url: '/ovi-test-refusal-lawyer-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'OVI Test Refusal Lawyer Ohio', item: '/ovi-test-refusal-lawyer-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={oviTestRefusalFaqs} breadcrumbs={breadcrumbs} image={seo.image} url={seo.url} />
      <OviTestRefusalLawyerOhioPage />
    </>
  );
}
