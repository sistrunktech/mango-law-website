import { ImageResponse } from 'next/og';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL } from '@/lib/seo-config';
import { getBlogPostFeaturedImageUrl } from '@/lib/blogImages';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  const featuredImageUrl = post ? getBlogPostFeaturedImageUrl(post) : '/images/generated/criminal-defense-hero.png';
  const absoluteImageUrl = featuredImageUrl.startsWith('http')
    ? featuredImageUrl
    : `${SITE_URL}${featuredImageUrl}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0A0A0A',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/image is not supported inside ImageResponse markup. */}
        <img
          alt={post?.title ?? 'Mango Law criminal defense article'}
          src={absoluteImageUrl}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
