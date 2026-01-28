'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BlogPostPage from '@/views/BlogPostPage';
import type { BlogPost } from '@/data/blogPosts';
import { supabase } from '@/lib/supabaseClient';

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
  created_at: string;
  updated_at: string;
};

function toIsoDate(input: string | null | undefined): string | null {
  if (!input) return null;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

function normalizeCmsPost(row: CmsBlogPostRow): BlogPost {
  const publishedIso = toIsoDate(row.published_date);
  const createdIso = toIsoDate(row.created_at);
  const updatedIso = toIsoDate(row.updated_at);

  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content,
    category: row.category || 'Criminal Defense',
    date: publishedIso || createdIso || new Date().toISOString().slice(0, 10),
    author: row.author_name || 'Dominic Mango',
    lastVerified: updatedIso || publishedIso || createdIso || new Date().toISOString().slice(0, 10),
    sources: [],
    imageUrl: row.featured_image || undefined,
  };
}

export default function AdminBlogPreviewPage() {
  const params = useParams<{ slug: string | string[] }>();
  const slugParam = params?.slug;
  const slug = useMemo(() => (Array.isArray(slugParam) ? slugParam[0] : slugParam), [slugParam]);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!slug) return;
      if (!supabase) {
        setError('Supabase client not initialized');
        setLoading(false);
        return;
      }

      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        router.push('/admin/login');
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('blog_posts')
        .select(
          'id,title,slug,excerpt,content,status,published_date,author_name,category,featured_image,created_at,updated_at'
        )
        .eq('slug', slug)
        .maybeSingle();

      if (!mounted) return;

      if (error || !data) {
        setError(error?.message || 'Post not found');
        setPost(null);
        setRelatedPosts([]);
        setLoading(false);
        return;
      }

      const normalized = normalizeCmsPost(data as CmsBlogPostRow);
      setPost(normalized);

      const { data: related, error: relatedError } = await supabase
        .from('blog_posts')
        .select(
          'id,title,slug,excerpt,content,status,published_date,author_name,category,featured_image,created_at,updated_at'
        )
        .in('status', ['published', 'finalized'])
        .neq('slug', slug)
        .eq('category', data.category)
        .order('published_date', { ascending: false })
        .limit(2);

      if (!mounted) return;

      if (relatedError || !related) {
        setRelatedPosts([]);
      } else {
        setRelatedPosts((related as CmsBlogPostRow[]).map(normalizeCmsPost));
      }

      setLoading(false);
    }

    load();

    return () => {
      mounted = false;
    };
  }, [router, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-offWhite flex items-center justify-center">
        <div className="text-brand-black/70">Loading preview…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-offWhite">
        <div className="container py-16">
          <div className="rounded-xl border border-brand-black/10 bg-white p-6">
            <div className="text-sm font-semibold text-brand-black">Preview unavailable</div>
            <div className="mt-2 text-sm text-brand-black/60">{error || 'Post not found.'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 z-50 border-b border-brand-black/10 bg-amber-50">
        <div className="container py-2 text-xs font-semibold text-amber-900">
          Admin preview: this may include draft or scheduled content.
        </div>
      </div>
      <BlogPostPage post={post} relatedPosts={relatedPosts} />
    </div>
  );
}
