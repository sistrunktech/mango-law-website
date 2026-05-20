import type { Metadata } from 'next';
import { buildMetadata } from '../../../lib/seo-metadata';

export const unionCountyLocationSeo = {
  title: 'Union County OVI & Criminal Defense Lawyer | Mango Law',
  description:
    'Union County and Marysville OVI and criminal-defense guidance for court dates, ALS issues, criminal/traffic charges, and early case planning.',
  url: '/ovi-dui-defense-union-county-oh',
  canonicalUrl: '/ovi-dui-defense-union-county-oh',
  noindex: true,
};

export const unionCountyLocationBreadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Service Areas', item: '/locations' },
  { name: 'Union County OVI Defense', item: '/ovi-dui-defense-union-county-oh' },
];

export const metadata: Metadata = buildMetadata(unionCountyLocationSeo);
