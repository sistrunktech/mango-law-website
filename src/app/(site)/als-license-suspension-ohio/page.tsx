import type { Metadata } from 'next';
import { AlsLicenseSuspensionOhioPage, alsLicenseSuspensionFaqs } from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'ALS License Suspension in Ohio | OVI License Defense',
  description:
    'Dealing with an Ohio ALS suspension? See how ALS works, what can vary, and what to do early to protect driving options.',
  image: '/images/generated/ovi-case-strategy.png',
  url: '/als-license-suspension-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'ALS License Suspension Ohio', item: '/als-license-suspension-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={alsLicenseSuspensionFaqs} breadcrumbs={breadcrumbs} image={seo.image} url={seo.url} />
      <AlsLicenseSuspensionOhioPage />
    </>
  );
}
