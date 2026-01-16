import type { Metadata } from 'next';
import DelawareOhioOviLawyerPage, { delawareOviFaqs } from '@/views/DelawareOhioOviLawyerPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Delaware Ohio OVI Lawyer - Local Defense | Mango Law',
  description:
    'Local OVI defense for Delaware, Ohio. Former prosecutor, trial-ready strategy, and clear guidance from arrest through resolution.',
  url: '/delaware-ohio-ovi-lawyer',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'OVI Defense', item: '/ovi-dui-defense-delaware-oh' },
  { name: 'Delaware OVI Lawyer', item: '/delaware-ohio-ovi-lawyer' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={delawareOviFaqs} breadcrumbs={breadcrumbs} url={seo.url} />
      <DelawareOhioOviLawyerPage />
    </>
  );
}
