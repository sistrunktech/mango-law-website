import type { Metadata } from 'next';
import HomePage from '@/views/HomePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { localBusinessSchema, organizationGraphNode, websiteGraphNode } from '@/lib/structured-data';
import { getPublicBlogPosts } from '@/lib/blogPostsRepo';

const seo = {
  title: 'Criminal Defense & OVI Attorney Delaware, OH',
  description:
    'Experienced criminal defense attorney serving Delaware and Franklin Counties. 26+ years defending OVI/DUI, drug crimes, assault, sex crimes, and white collar cases. Former prosecutor.',
  url: '/',
};

export const metadata: Metadata = buildMetadata(seo);

const homeStructuredData = {
  ...localBusinessSchema,
  '@graph': [...(localBusinessSchema as any)['@graph'], websiteGraphNode, organizationGraphNode],
};

export default async function Page() {
  const posts = await getPublicBlogPosts();

  return (
    <>
      <StructuredData structuredData={homeStructuredData} url={seo.url} />
      <HomePage posts={posts} />
    </>
  );
}
