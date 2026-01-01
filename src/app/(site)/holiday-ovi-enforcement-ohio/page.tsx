import type { Metadata } from 'next';
import HolidayOviEnforcementOhioPage, { holidayOviFaqs } from '@/views/HolidayOviEnforcementOhioPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Holiday OVI Enforcement Ohio - What Drivers Should Know | Mango Law',
  description:
    'Seasonal OVI enforcement guidance for Ohio drivers: what to expect, how checkpoints work, and how to protect your rights.',
  url: '/holiday-ovi-enforcement-ohio',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'OVI Defense', item: '/ovi-dui-defense-delaware-oh' },
  { name: 'Holiday Enforcement', item: '/holiday-ovi-enforcement-ohio' },
];

export const metadata: Metadata = buildMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData faqs={holidayOviFaqs} breadcrumbs={breadcrumbs} url={seo.url} />
      <HolidayOviEnforcementOhioPage />
    </>
  );
}
