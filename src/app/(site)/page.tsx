import type { Metadata } from 'next';
import HomePage from '@/views/HomePage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { localBusinessSchema, organizationGraphNode, websiteGraphNode } from '@/lib/structured-data';
import { getPublicBlogPosts } from '@/lib/blogPostsRepo';
import { attorneyProfile } from '@/data/attorneyProfile';

const seo = {
  title: 'Criminal Defense & OVI Attorney Delaware, OH',
  description: attorneyProfile.siteDescription,
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
