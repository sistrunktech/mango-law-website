'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { defaultSEO, resolveSeo } from './seo-config';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  mergeStructuredData,
  type ArticleData,
  type BreadcrumbItem,
  type FAQEntry,
  localBusinessSchema,
  attorneySchema,
} from './structured-data';

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
  primaryKeyword?: string;
  secondaryModifier?: string;
  description?: string;
  image?: string;
  url?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  structuredData?: object;
  faqs?: FAQEntry[];
  article?: ArticleData;
  breadcrumbs?: BreadcrumbItem[];
}

export function SEO({
  title,
  primaryKeyword,
  secondaryModifier,
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
  const pathname = usePathname() ?? '';

  const { fullTitle, fullDescription, fullImage, fullUrl } = resolveSeo({
    title,
    primaryKeyword,
    secondaryModifier,
    description,
    image,
    url,
    canonicalUrl,
    type,
    pathname,
  });

  useEffect(() => {
    // Development warnings for SEO best practices
    if (process.env.NODE_ENV === 'development') {
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

    const mergedData = mergeStructuredData(structuredData, faqs);
    if (mergedData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(mergedData);
    }

    if (article) {
      const articleSchema = buildArticleSchema(article, fullUrl, fullImage);
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
      const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);
      if (breadcrumbSchema) {
        let breadcrumbScript = document.querySelector('script[data-schema="breadcrumbs"]') as HTMLScriptElement | null;
        if (!breadcrumbScript) {
          breadcrumbScript = document.createElement('script');
          breadcrumbScript.type = 'application/ld+json';
          breadcrumbScript.setAttribute('data-schema', 'breadcrumbs');
          document.head.appendChild(breadcrumbScript);
        }
        breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
      }
    }
  }, [fullTitle, fullDescription, fullImage, fullUrl, type, noindex, structuredData, faqs, article, breadcrumbs]);

  useEffect(() => {
    trackPageView(fullTitle);
  }, [pathname, fullTitle]);

  return null;
}

export { localBusinessSchema, attorneySchema };
