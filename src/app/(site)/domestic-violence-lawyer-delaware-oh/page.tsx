import type { Metadata } from 'next';
import DomesticViolencePage, { domesticViolenceFaqs } from '@/views/DomesticViolencePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { domesticViolencePageMetaDescription } from '@/data/seoRoutingContent';

const seo = {
  title: 'Domestic Violence Lawyer Delaware OH',
  description: domesticViolencePageMetaDescription,
  image: '/images/generated/blog-assault-domestic-violence.png',
  url: '/domestic-violence-lawyer-delaware-oh',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Practice Areas', item: '/practice-areas' },
  { name: 'Domestic Violence', item: '/domestic-violence-lawyer-delaware-oh' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={domesticViolenceFaqs} breadcrumbs={breadcrumbs} image={seo.image} url={seo.url} />
      <DomesticViolencePage />
    </>
  );
}
