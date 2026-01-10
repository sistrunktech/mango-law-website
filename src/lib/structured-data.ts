import { OFFICE_PHONE_TEL } from './contactInfo';
import { serviceAreas } from '../data/serviceAreas';
import { SITE_URL } from './seo-config';

export type FAQEntry = { question: string; answer: string };
export type BreadcrumbItem = { name: string; item: string };
export type ArticleData = {
  headline: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
};

export function buildFaqSchema(faqs: FAQEntry[]) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function mergeStructuredData(structuredData?: object, faqs?: FAQEntry[]) {
  const faqSchema = faqs && faqs.length > 0 ? buildFaqSchema(faqs) : null;
  const combinedData = structuredData ? { ...structuredData } : null;

  if (combinedData && faqSchema) {
    if ((combinedData as any)['@graph']) {
      (combinedData as any)['@graph'].push(faqSchema);
      return combinedData;
    }
    return {
      '@context': 'https://schema.org',
      '@graph': [combinedData, faqSchema],
    };
  }

  return combinedData || faqSchema;
}

export function buildArticleSchema(article: ArticleData, fullUrl: string, fallbackImage: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: article.image || fallbackImage,
    publisher: {
      '@type': 'Organization',
      name: 'Mango Law LLC',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/brand/mango-logo-primary-fullcolor.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  };
}

export function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  if (!breadcrumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${SITE_URL}${crumb.item}`,
    })),
  };
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': `${SITE_URL}/#legalservice`,
      name: 'Mango Law LLC',
      alternateName: 'Mango Law',
      description:
        'Criminal defense and OVI/DUI attorney serving Delaware and Franklin Counties in Ohio.',
      url: SITE_URL,
      logo: `${SITE_URL}/images/brand/mango-logo-primary-fullcolor.svg`,
      image: `${SITE_URL}/images/headshots/nick-mango-hero.jpg`,
      telephone: `+1${OFFICE_PHONE_TEL}`,
      email: 'office@mango.law',
      foundingDate: '2009-02',
      foundingLocation: {
        '@type': 'Place',
        name: 'Delaware, Ohio',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Delaware',
          addressRegion: 'OH',
          addressCountry: 'US',
        },
      },
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '46 W. Winter Street',
        addressLocality: 'Delaware',
        addressRegion: 'OH',
        postalCode: '43015',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 40.2987,
        longitude: -83.068,
      },
      areaServed: serviceAreas.map((area) => ({
        '@type': area.type === 'city' ? 'City' : area.type === 'county' ? 'AdministrativeArea' : 'Place',
        name: area.name,
        '@id': `${SITE_URL}/locations#${area.slug}`,
      })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'https://schema.org/Monday',
            'https://schema.org/Tuesday',
            'https://schema.org/Wednesday',
            'https://schema.org/Thursday',
            'https://schema.org/Friday',
          ],
          opens: '09:00',
          closes: '17:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Legal Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'OVI/DUI Defense',
              description: 'Defense representation for OVI and DUI charges in Ohio.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Criminal Defense',
              description:
                'Defense for drug crimes, assault, theft, weapons charges, and other criminal matters.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Protection Order Defense',
              description: 'Defense against civil protection orders and domestic violence allegations.',
            },
          },
        ],
      },
      founder: { '@id': `${SITE_URL}/#dominic-mango` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#dominic-mango`,
      name: 'Dominic Mango',
      alternateName: 'Nick Mango',
      jobTitle: 'Criminal Defense Attorney',
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/images/headshots/nick-mango-hero.jpg`,
      worksFor: { '@id': `${SITE_URL}/#legalservice` },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Attorney',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Ohio Bar License',
        credentialCategory: 'Bar Admission',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Supreme Court of Ohio',
        },
        dateIssued: '1999',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'The Ohio State University Moritz College of Law',
      },
      knowsAbout: [
        'Criminal Defense',
        'OVI Defense',
        'DUI Defense',
        'Drug Crime Defense',
        'White Collar Defense',
      ],
    },
  ],
};

export const attorneySchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#dominic-mango`,
  name: 'Dominic Mango',
  alternateName: 'Nick Mango',
  description:
    'Experienced criminal defense attorney with 26+ years of Ohio criminal law experience in Delaware and Franklin Counties.',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/headshots/nick-mango-hero.jpg`,
  email: 'office@mango.law',
  telephone: `+1${OFFICE_PHONE_TEL}`,
  worksFor: { '@id': `${SITE_URL}/#legalservice` },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Attorney',
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Ohio Bar License',
    credentialCategory: 'Bar Admission',
    recognizedBy: {
      '@type': 'Organization',
      name: 'Supreme Court of Ohio',
    },
    dateIssued: '1999',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'The Ohio State University Moritz College of Law',
  },
  knowsAbout: [
    'Criminal Defense',
    'OVI Defense',
    'DUI Defense',
    'Drug Crime Defense',
    'Assault Defense',
    'Domestic Violence Defense',
    'Sex Crime Defense',
    'White Collar Crime Defense',
    'Protection Order Defense',
  ],
  award: [
    'Certified in BAC DataMaster Operation',
    'NHTSA Field Sobriety Test Certification',
  ],
};
