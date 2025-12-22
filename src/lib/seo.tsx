import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OFFICE_PHONE_TEL } from './contactInfo';

const GA4_MEASUREMENT_ID = 'G-NJZD79GGFG';

function trackPageView(pageTitle: string) {
  const page_location = window.location.href;
  const page_path = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('config', GA4_MEASUREMENT_ID, {
      page_title: pageTitle,
      page_location,
      page_path,
    });
    return;
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: 'page_view',
      page_title: pageTitle,
      page_location,
      page_path,
    });
  }
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: object;
}

const defaultSEO = {
  title: 'Mango Law LLC - Criminal Defense & OVI Attorney in Delaware, OH',
  description:
    'Aggressive and experienced criminal defense attorney serving Delaware and Franklin Counties. Over 20 years defending OVI, drug crimes, assault, sex crimes, and white collar cases.',
  image: '/images/brand/mango-logo-primary-fullcolor.svg',
  type: 'website' as const,
};

export function SEO({
  title,
  description,
  image,
  url,
  canonicalUrl,
  type = 'website',
  noindex = false,
  structuredData,
}: SEOProps) {
  const location = useLocation();

  const siteUrl = 'https://mango.law';
  const fullTitle = title ?? defaultSEO.title;
  const fullDescription = description ?? defaultSEO.description;
  const fullImage = image
    ? image.startsWith('http')
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${defaultSEO.image}`;
  const fullUrl = canonicalUrl || url || `${siteUrl}${location.pathname}`;

  useEffect(() => {
    document.title = fullTitle;

    const metaTags: Array<{ name?: string; property?: string; content: string }> = [
      { name: 'description', content: fullDescription },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: fullDescription },
      { property: 'og:image', content: fullImage },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Mango Law LLC' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: fullDescription },
      { name: 'twitter:image', content: fullImage },
    ];

    if (noindex) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' });
    }

    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property';
      const value = (name || property) as string;
      let element = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalLink) {
      canonicalLink.href = fullUrl;
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = fullUrl;
      document.head.appendChild(link);
    }

    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [fullTitle, fullDescription, fullImage, fullUrl, type, noindex, structuredData]);

  useEffect(() => {
    trackPageView(fullTitle);
  }, [location.pathname, location.search, location.hash, fullTitle]);

  return null;
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': 'https://mango.law/#legalservice',
      name: 'Mango Law LLC',
      alternateName: 'Mango Law',
      description:
        'Criminal defense and OVI/DUI attorney serving Delaware and Franklin Counties in Ohio.',
      url: 'https://mango.law',
      logo: 'https://mango.law/images/brand/mango-logo-primary-fullcolor.svg',
      image: 'https://mango.law/images/headshots/nick-mango-hero.jpg',
      telephone: `+1${OFFICE_PHONE_TEL}`,
      email: 'office@mango.law',
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
      areaServed: [
        {
          '@type': 'City',
          name: 'Delaware',
          '@id': 'https://en.wikipedia.org/wiki/Delaware,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Columbus',
          '@id': 'https://en.wikipedia.org/wiki/Columbus,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Dublin',
          '@id': 'https://en.wikipedia.org/wiki/Dublin,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Westerville',
          '@id': 'https://en.wikipedia.org/wiki/Westerville,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Marysville',
          '@id': 'https://en.wikipedia.org/wiki/Marysville,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Gahanna',
          '@id': 'https://en.wikipedia.org/wiki/Gahanna,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Grove City',
          '@id': 'https://en.wikipedia.org/wiki/Grove_City,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Reynoldsburg',
          '@id': 'https://en.wikipedia.org/wiki/Reynoldsburg,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Upper Arlington',
          '@id': 'https://en.wikipedia.org/wiki/Upper_Arlington,_Ohio',
        },
        {
          '@type': 'City',
          name: 'Hilliard',
          '@id': 'https://en.wikipedia.org/wiki/Hilliard,_Ohio',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Delaware County',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Franklin County',
        },
      ],
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
      founder: { '@id': 'https://mango.law/#dominic-mango' },
    },
    {
      '@type': 'Person',
      '@id': 'https://mango.law/#dominic-mango',
      name: 'Dominic Mango',
      alternateName: 'Nick Mango',
      jobTitle: 'Criminal Defense Attorney',
      url: 'https://mango.law/about',
      image: 'https://mango.law/images/headshots/nick-mango-hero.jpg',
      worksFor: { '@id': 'https://mango.law/#legalservice' },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Attorney',
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
  '@id': 'https://mango.law/#dominic-mango',
  name: 'Dominic Mango',
  alternateName: 'Nick Mango',
  description:
    'Experienced criminal defense attorney with over 20 years of practice in Delaware and Franklin Counties, Ohio.',
  url: 'https://mango.law/about',
  image: 'https://mango.law/images/headshots/nick-mango-hero.jpg',
  email: 'office@mango.law',
  telephone: `+1${OFFICE_PHONE_TEL}`,
  worksFor: { '@id': 'https://mango.law/#legalservice' },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Attorney',
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
