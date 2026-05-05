import type { Metadata } from 'next';
import { MotionToSuppressOviOhioPage, motionToSuppressOviFaqs } from '@/views/HighIntentPages';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Motion to Suppress OVI Evidence',
  description:
    'Learn when OVI evidence may be challenged in Ohio and how suppression strategy can affect negotiations and trial posture.',
  image: '/images/generated/ovi-case-strategy.png',
  url: '/motion-to-suppress-ovi-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Motion to Suppress OVI Ohio', item: '/motion-to-suppress-ovi-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={motionToSuppressOviFaqs} breadcrumbs={breadcrumbs} image={seo.image} url={seo.url} />
      <MotionToSuppressOviOhioPage />
    </>
  );
}
