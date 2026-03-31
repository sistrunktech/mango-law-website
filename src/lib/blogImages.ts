import type { BlogPost } from '@/data/blogPosts';

export function getBlogPostFeaturedImageUrl(post: BlogPost): string {
  return post.imageUrl ?? `/images/generated/blog-${post.slug}.png`;
}

export function getBlogPostFeaturedImageAlt(post: BlogPost): string {
  return `Editorial illustration for ${post.title}`;
}
