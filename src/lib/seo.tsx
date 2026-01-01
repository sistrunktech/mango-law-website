import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OFFICE_PHONE_TEL } from './contactInfo';
import { serviceAreas } from '../data/serviceAreas';

function trackPageView(pageTitle: string) {
  const page_location = window.location.href;
  const page_path = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: 'mango_page_view',
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
  faqs?: Array<{ question: string; answer: string }>;
  article?: {
    headline: string;
    author: string;
    datePublished: string;
    dateModified: string;
    image?: string;
  };
  breadcrumbs?: Array<{ name: string; item: string }>;
}

const defaultSEO = {
  title: 'Mango Law LLC - Criminal Defense & OVI Attorney in Delaware, OH',
  description:
    'Aggressive and experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI, drug crimes, assault, sex crimes, and white collar cases.',
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
  faqs,
  article,
  breadcrumbs,
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
    // Development warnings for SEO best practices
    if (import.meta.env.DEV) {
      if (fullTitle.length > 60) {
        console.warn(`SEO Warning: Title is ${fullTitle.length} characters. Recommended max is 60.`);
      }
      if (fullDescription.length > 160) {
        console.warn(`SEO Warning: Description is ${fullDescription.length} characters. Recommended max is 160.`);
      }
      if (fullDescription.length < 50 && fullDescription !== defaultSEO.description) {
        console.warn(`SEO Warning: Description is very short (${fullDescription.length} chars). Recommended min is 50.`);
      }
    }

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

    if (structuredData || faqs) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const combinedData = structuredData ? { ...structuredData } : null;

      if (faqs && faqs.length > 0) {
        const faqSchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq: { question: string; answer: string }) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        };

        if (combinedData) {
          // If there's already structured data, we can either wrap in @graph or add as separate script
          // For simplicity and maximum compatibility, we'll use @graph if combinedData has @graph
          if ((combinedData as any)['@graph']) {
            (combinedData as any)['@graph'].push(faqSchema);
            script.textContent = JSON.stringify(combinedData);
          } else {
            // Otherwise just wrap both in a graph
            script.textContent = JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [combinedData, faqSchema],
            });
          }
        } else {
          script.textContent = JSON.stringify(faqSchema);
        }
      } else if (combinedData) {
        script.textContent = JSON.stringify(combinedData);
      }

    }

    if (article) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        author: {
          '@type': 'Person',
          name: article.author,
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        image: article.image || fullImage,
        publisher: {
          '@type': 'Organization',
          name: 'Mango Law LLC',
          logo: {
            '@type': 'ImageObject',
            url: 'https://mango.law/images/brand/mango-logo-primary-fullcolor.svg',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl,
        },
      };

      let articleScript = document.querySelector('script[data-schema="article"]') as HTMLScriptElement | null;
      if (!articleScript) {
        articleScript = document.createElement('script');
        articleScript.type = 'application/ld+json';
        articleScript.setAttribute('data-schema', 'article');
        document.head.appendChild(articleScript);
      }
      articleScript.textContent = JSON.stringify(articleSchema);
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.item.startsWith('http') ? crumb.item : `${siteUrl}${crumb.item}`,
        })),
      };

      let breadcrumbScript = document.querySelector('script[data-schema="breadcrumbs"]') as HTMLScriptElement | null;
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.type = 'application/ld+json';
        breadcrumbScript.setAttribute('data-schema', 'breadcrumbs');
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    }
  }, [fullTitle, fullDescription, fullImage, fullUrl, type, noindex, structuredData, faqs, article, breadcrumbs]);

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
        '@id': `https://mango.law/locations#${area.slug}`,
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
  '@id': 'https://mango.law/#dominic-mango',
  name: 'Dominic Mango',
  alternateName: 'Nick Mango',
  description:
    'Experienced criminal defense attorney with 26+ years of Ohio criminal law experience in Delaware and Franklin Counties.',
  url: 'https://mango.law/about',
  image: 'https://mango.law/images/headshots/nick-mango-hero.jpg',
  email: 'office@mango.law',
  telephone: `+1${OFFICE_PHONE_TEL}`,
  worksFor: { '@id': 'https://mango.law/#legalservice' },
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
