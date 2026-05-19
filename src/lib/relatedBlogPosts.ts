import type { BlogPost } from '../data/blogPosts';
import { resolveBlogScope } from '../data/blogPosts';

export const relatedBlogPostSlugsBySlug: Record<string, string[]> = {
  'cdl-out-of-state-driver-ovi-ohio': [
    'ohio-ovi-driving-privileges-als',
    'first-ovi-court-date-delaware-county-ohio',
    'ovi-refusal-vs-failed-test-ohio',
  ],
  'ohio-ovi-driving-privileges-als': [
    'cdl-out-of-state-driver-ovi-ohio',
    'first-ovi-court-date-delaware-county-ohio',
    'ovi-refusal-vs-failed-test-ohio',
  ],
  'what-to-do-after-dui-checkpoint-stop-ohio': [
    'ohio-dui-checkpoint-hotspots',
    'ohio-ovi-driving-privileges-als',
    'first-ovi-court-date-delaware-county-ohio',
    'holiday-ovi-enforcement-ohio-delaware-dublin-columbus',
  ],
  'ohio-dui-checkpoint-hotspots': [
    'what-to-do-after-dui-checkpoint-stop-ohio',
    'holiday-ovi-enforcement-ohio-delaware-dublin-columbus',
    'refuse-field-sobriety-test-ohio',
  ],
  'holiday-ovi-enforcement-ohio-delaware-dublin-columbus': [
    'what-to-do-after-dui-checkpoint-stop-ohio',
    'ohio-dui-checkpoint-hotspots',
    'ohio-ovi-driving-privileges-als',
  ],
  'no-contact-bond-terms-domestic-violence-ohio': [
    'domestic-violence-arrest-delaware-county-ohio',
    'no-contact-order-vs-civil-protection-order-ohio',
    'civil-protection-order-hearing-delaware-county-ohio',
  ],
  'domestic-violence-arrest-delaware-county-ohio': [
    'no-contact-bond-terms-domestic-violence-ohio',
    'no-contact-order-vs-civil-protection-order-ohio',
    'civil-protection-order-hearing-delaware-county-ohio',
  ],
  'no-contact-order-vs-civil-protection-order-ohio': [
    'no-contact-bond-terms-domestic-violence-ohio',
    'domestic-violence-arrest-delaware-county-ohio',
    'civil-protection-order-hearing-delaware-county-ohio',
  ],
};

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function selectRelatedBlogPosts(args: {
  post: BlogPost;
  posts: BlogPost[];
  limit?: number;
}): BlogPost[] {
  const { post, posts } = args;
  const limit = args.limit ?? 3;
  const selected: BlogPost[] = [];
  const selectedSlugs = new Set<string>([post.slug]);
  const postsBySlug = new Map(posts.map((candidate) => [candidate.slug, candidate]));

  const addPost = (candidate?: BlogPost) => {
    if (!candidate || selectedSlugs.has(candidate.slug) || selected.length >= limit) return;
    selected.push(candidate);
    selectedSlugs.add(candidate.slug);
  };

  for (const slug of relatedBlogPostSlugsBySlug[post.slug] ?? []) {
    addPost(postsBySlug.get(slug));
  }

  const postScope = resolveBlogScope(post);
  const sortedCandidates = sortByDateDesc(posts.filter((candidate) => candidate.slug !== post.slug));

  for (const candidate of sortedCandidates) {
    if (selected.length >= limit) break;
    if (resolveBlogScope(candidate) === postScope) {
      addPost(candidate);
    }
  }

  for (const candidate of sortedCandidates) {
    if (selected.length >= limit) break;
    addPost(candidate);
  }

  return selected;
}
