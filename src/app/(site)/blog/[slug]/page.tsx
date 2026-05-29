import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/views/BlogPostPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { getPublicBlogPostBySlug, getPublicBlogPosts } from '@/lib/blogPostsRepo';
import { resolveBlogSeo } from '@/lib/blog-seo';
import { selectRelatedBlogPosts } from '@/lib/relatedBlogPosts';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug({ slug });
  if (!post) {
    return buildMetadata({
      title: 'Blog Post Not Found | Mango Law',
      noindex: true,
      url: `/blog/${slug}`,
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
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug({ slug });
  if (!post) notFound();

  const allPosts = await getPublicBlogPosts();
  const relatedPosts = selectRelatedBlogPosts({ post, posts: allPosts, limit: 3 });

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
