import type { Metadata } from 'next';
import { FirstOffenseOviOhioPage, firstOffenseOviFaqs } from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'First Offense OVI in Ohio | Lawyer Guidance',
  description:
    'Charged with a first offense OVI in Ohio? Learn what happens next, where risk usually comes from, and how to protect your license and record early.',
  image: '/images/generated/ovi-case-strategy.png',
  url: '/first-offense-ovi-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'First Offense OVI in Ohio', item: '/first-offense-ovi-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={firstOffenseOviFaqs} breadcrumbs={breadcrumbs} image={seo.image} url={seo.url} />
      <FirstOffenseOviOhioPage />
    </>
  );
}
