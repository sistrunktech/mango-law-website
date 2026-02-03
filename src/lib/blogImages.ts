import type { BlogPost, BlogScope } from '@/data/blogPosts';
import { resolveBlogScope } from '@/data/blogPosts';

const defaultImageByScope: Record<BlogScope, string> = {
  ovi_dui: '/images/generated/ovi-dui-defense-hero.png',
  criminal_defense: '/images/generated/criminal-defense-hero.png',
  drug_crimes: '/images/generated/drug-crimes-defense-hero.png',
  sex_crimes: '/images/generated/sex-crimes-defense-hero.png',
  protection_orders: '/images/generated/protection-order-defense-hero.png',
  white_collar: '/images/generated/white-collar-defense-hero.png',
  personal_injury: '/images/generated/personal-injury-hero.png',
  domestic_violence: '/images/generated/blog-assault-domestic-violence.png',
  general: '/images/generated/criminal-defense-hero.png',
};

export function getBlogPostFeaturedImageUrl(post: BlogPost): string {
  if (post.imageUrl) return post.imageUrl;
  const scope = resolveBlogScope(post);
  return defaultImageByScope[scope];
}

export function getBlogPostFeaturedImageAlt(post: BlogPost): string {
  return `Editorial image for ${post.title}`;
}
