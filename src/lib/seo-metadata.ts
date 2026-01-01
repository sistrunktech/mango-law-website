import type { Metadata } from 'next';
import { resolveSeo, type SeoInput } from './seo-config';

export type SeoMetadataInput = SeoInput & {
  noindex?: boolean;
  article?: {
    author: string;
    datePublished: string;
    dateModified?: string;
  };
};

export function buildMetadata(input: SeoMetadataInput): Metadata {
  const { fullTitle, fullDescription, fullImage, fullUrl, type } = resolveSeo(input);
  const canonical = input.canonicalUrl || input.url || undefined;
  const resolvedType = type === 'article' || input.article ? 'article' : 'website';

  const metadata: Metadata = {
    title: { absolute: fullTitle },
    description: fullDescription,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: resolvedType,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      siteName: 'Mango Law LLC',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
  };

  if (resolvedType === 'article' && input.article) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      authors: [input.article.author],
      publishedTime: input.article.datePublished,
      modifiedTime: input.article.dateModified || input.article.datePublished,
    };
  }

  if (input.noindex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
