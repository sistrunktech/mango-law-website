import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/views/BlogPostPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { getPublicBlogPostBySlug, getPublicBlogPosts } from '@/lib/blogPostsRepo';
import { resolveBlogSeo } from '@/lib/blog-seo';

type PageProps = {
  params: { slug: string };
};

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPublicBlogPostBySlug({ slug: params.slug });
  if (!post) {
    return buildMetadata({
      title: 'Blog Post Not Found | Mango Law',
      noindex: true,
      url: `/blog/${params.slug}`,
    });
  }

  const seo = resolveBlogSeo(post);

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    image: post.imageUrl,
    url: `/blog/${post.slug}`,
    type: 'article',
    article: {
      author: post.author,
      datePublished: post.date,
      dateModified: post.lastVerified,
    },
  });
}

export default async function Page({ params }: PageProps) {
  const post = await getPublicBlogPostBySlug({ slug: params.slug });
  if (!post) notFound();

  const allPosts = await getPublicBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` },
  ];

  return (
    <>
      <StructuredData
        faqs={post.faqs}
        article={{
          headline: post.title,
          author: post.author,
          datePublished: post.date,
          dateModified: post.lastVerified,
          image: post.imageUrl,
        }}
        breadcrumbs={breadcrumbs}
        image={post.imageUrl}
        url={`/blog/${post.slug}`}
      />
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </>
  );
}
