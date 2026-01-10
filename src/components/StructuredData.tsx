import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  mergeStructuredData,
  type ArticleData,
  type BreadcrumbItem,
  type FAQEntry,
} from '../lib/structured-data';
import { resolveSeo } from '../lib/seo-config';

type StructuredDataProps = {
  structuredData?: object;
  faqs?: FAQEntry[];
  article?: ArticleData;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  url?: string;
  canonicalUrl?: string;
};

export default function StructuredData({
  structuredData,
  faqs,
  article,
  breadcrumbs,
  image,
  url,
  canonicalUrl,
}: StructuredDataProps) {
  const { fullUrl, fullImage } = resolveSeo({ image, url, canonicalUrl });
  const merged = mergeStructuredData(structuredData, faqs);
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? buildBreadcrumbSchema(breadcrumbs) : null;
  const articleSchema = article ? buildArticleSchema(article, fullUrl, fullImage) : null;

  return (
    <>
      {merged && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(merged) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          data-schema="article"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          data-schema="breadcrumbs"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}
