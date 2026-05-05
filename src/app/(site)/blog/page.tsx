import type { Metadata } from 'next';
import BlogPage from '@/views/BlogPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { getPublicBlogPosts } from '@/lib/blogPostsRepo';
import { attorneyProfile } from '@/data/attorneyProfile';

const seo = {
  title: 'Mango Law Blog',
  description:
    `Stay informed with Ohio criminal defense and OVI/DUI articles from Dominic Mango, Ohio Supreme Court registration no. ${attorneyProfile.registrationNumber}.`,
  url: '/blog',
};

const breadcrumbs = [
  { name: 'Home', item: '/' },
  { name: 'Blog', item: '/blog' },
];

export const metadata: Metadata = buildMetadata(seo);

export default async function Page() {
  const posts = await getPublicBlogPosts();

  return (
    <>
      <StructuredData breadcrumbs={breadcrumbs} url={seo.url} />
      <BlogPage posts={posts} />
    </>
  );
}
