import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/views/BlogPostPage';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo-metadata';
import { blogPosts } from '@/data/blogPosts';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return buildMetadata({
      title: 'Blog Post Not Found | Mango Law',
      noindex: true,
      url: `/blog/${params.slug}`,
    });
  }

  return buildMetadata({
    title: `${post.title} | Mango Law Blog`,
    description: post.excerpt,
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

export default function Page({ params }: PageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` },
  ];

  return (
    <>
      <StructuredData
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
      <BlogPostPage />
    </>
  );
}
