import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from '@/data/blogPosts';
import { blogPosts as legacyBlogPosts } from '@/data/blogPosts';
import { supabaseAnonKey, supabaseUrl } from '@/lib/supabaseClient';

type CmsBlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string | null;
  published_date: string | null;
  author_name: string | null;
  category: string | null;
  featured_image: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function getTodayIsoDateInET(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(now);
}

function isVisibleByDate(args: { publishDate: string; now: Date }): boolean {
  const today = getTodayIsoDateInET(args.now);
  return args.publishDate <= today;
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function normalizeLegacyPost(post: BlogPost): BlogPost {
  return post;
}

function normalizeCmsPost(row: CmsBlogPostRow): BlogPost | null {
  if (!row.slug || !row.title || !row.content) return null;

  const publishedAt = row.published_date ? new Date(row.published_date) : null;
  const publishedDate = publishedAt ? toIsoDate(publishedAt) : null;

  const createdAt = row.created_at ? new Date(row.created_at) : null;
  const createdDate = createdAt ? toIsoDate(createdAt) : null;

  const updatedAt = row.updated_at ? new Date(row.updated_at) : publishedAt;
  const lastVerified = updatedAt ? toIsoDate(updatedAt) : publishedDate;

  const normalized: BlogPost = {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content,
    category: row.category || 'Criminal Defense',
    date: publishedDate || createdDate || toIsoDate(new Date()),
    author: row.author_name || 'Dominic Mango',
    lastVerified: lastVerified || createdDate || toIsoDate(new Date()),
    sources: [],
    imageUrl: row.featured_image || undefined,
  };

  return normalized;
}

async function fetchCmsPosts(args: { includeUnpublished: boolean; now: Date }): Promise<BlogPost[]> {
  if (!supabaseUrl || !supabaseAnonKey) return [];

  const client = createClient(supabaseUrl, supabaseAnonKey);

  let query = client
    .from('blog_posts')
    .select(
      'id,title,slug,excerpt,content,status,published_date,author_name,category,featured_image,created_at,updated_at'
    )
    .order('published_date', { ascending: false });

  if (!args.includeUnpublished) {
    query = query.in('status', ['published', 'finalized']);
    query = query.not('published_date', 'is', null);
    query = query.lte('published_date', args.now.toISOString());
  }

  const { data, error } = await query;
  if (error || !data) return [];

  const normalized = (data as CmsBlogPostRow[])
    .map(normalizeCmsPost)
    .filter(Boolean) as BlogPost[];

  return normalized;
}

function mergePostsPreferFirst(primary: BlogPost[], secondary: BlogPost[]): BlogPost[] {
  const map = new Map<string, BlogPost>();
  for (const p of primary) map.set(p.slug, p);
  for (const p of secondary) {
    if (!map.has(p.slug)) map.set(p.slug, p);
  }
  return Array.from(map.values());
}

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPublicBlogPosts(now: Date = new Date()): Promise<BlogPost[]> {
  const legacy = legacyBlogPosts
    .map(normalizeLegacyPost)
    .filter((p) => isVisibleByDate({ publishDate: p.date, now }));

  try {
    const cms = await fetchCmsPosts({ includeUnpublished: false, now });
    return sortByDateDesc(mergePostsPreferFirst(cms, legacy));
  } catch {
    return sortByDateDesc(legacy);
  }
}

export async function getPublicBlogPostBySlug(args: { slug: string; now?: Date }): Promise<BlogPost | null> {
  const now = args.now ?? new Date();

  try {
    const posts = await getPublicBlogPosts(now);
    return posts.find((p) => p.slug === args.slug) ?? null;
  } catch {
    return null;
  }
}

export async function getAllBlogPostsForAdminPreview(now: Date = new Date()): Promise<BlogPost[]> {
  const legacy = legacyBlogPosts.map(normalizeLegacyPost);

  try {
    const cms = await fetchCmsPosts({ includeUnpublished: true, now });
    return sortByDateDesc(mergePostsPreferFirst(cms, legacy));
  } catch {
    return sortByDateDesc(legacy);
  }
}

export async function getAllBlogSlugsForSitemap(now: Date = new Date()): Promise<string[]> {
  const posts = await getPublicBlogPosts(now);
  return posts.map((p) => p.slug);
}
