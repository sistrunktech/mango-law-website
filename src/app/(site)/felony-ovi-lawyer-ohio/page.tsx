import type { Metadata } from 'next';
import { FelonyOviLawyerOhioPage, felonyOviFaqs } from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Felony OVI Lawyer Ohio',
  description:
    'Facing felony OVI allegations in Ohio? Learn what raises risk, what the process can look like, and how early defense strategy can protect options.',
  image: '/images/generated/ovi-case-strategy.png',
  url: '/felony-ovi-lawyer-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Felony OVI Lawyer Ohio', item: '/felony-ovi-lawyer-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={felonyOviFaqs} breadcrumbs={breadcrumbs} image={seo.image} url={seo.url} />
      <FelonyOviLawyerOhioPage />
    </>
  );
}
