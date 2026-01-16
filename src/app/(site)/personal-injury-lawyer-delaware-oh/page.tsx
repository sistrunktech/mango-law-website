import type { Metadata } from 'next';
import PersonalInjuryPage, { personalInjuryFaqs } from '@/views/PersonalInjuryPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Personal Injury Lawyer Delaware, OH | Mango Law LLC',
  description:
    'Selective personal injury representation for cases with clear liability and insurance coverage. Experienced legal guidance in Delaware and Franklin Counties.',
  image: '/images/generated/personal-injury-hero.png',
  url: '/personal-injury-lawyer-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Personal Injury', item: '/personal-injury-lawyer-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData
        faqs={personalInjuryFaqs}
        breadcrumbs={breadcrumbs}
        image={seo.image}
        url={seo.url}
      />
      <PersonalInjuryPage />
    </>
  );
}
