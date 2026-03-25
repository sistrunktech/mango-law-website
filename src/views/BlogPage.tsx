'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Search, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import BlogSidebar from '../components/BlogSidebar';
import CTASection from '../components/CTASection';
import type { BlogPost } from '../data/blogPosts';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import BlogCoverArt from '../components/BlogCoverArt';
import { formatCalendarDate } from '../lib/formatting';

const categories = [
  'All Posts',
  'OVI/DUI Defense',
  'Criminal Defense',
  'Drug Crimes',
  'Sex Crimes',
  'Protection Orders',
  'White Collar Crimes',
  'Personal Injury',
];

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  const sortedBlogPosts = useMemo(
    () =>
      [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts]
  );

  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filteredPosts = useMemo(() => {
    let posts = sortedBlogPosts;

    if (selectedCategory !== 'All Posts') {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase().trim();
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [deferredSearchQuery, selectedCategory, sortedBlogPosts]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const featuredPost = sortedBlogPosts[0];
  const postsToRender =
    featuredPost && selectedCategory === 'All Posts' && !searchQuery.trim()
      ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
      : filteredPosts;

  return (
    <>
      <PageHero
        eyebrow="Mango Law Articles"
        title="Answers for the part people are usually most unsure about."
        description="Use the blog to understand deadlines, license issues, court steps, and how Ohio criminal and OVI cases usually move."
        ctaLabel="Talk Through Your Case"
        ctaHref="/contact"
        variant="light"
        compact
        showQuickActions={false}
        phoneCtaId="blog_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          {featuredPost && (
            <div className="mb-10 grid gap-6 rounded-[2rem] border border-brand-black/10 bg-brand-offWhite/55 p-5 shadow-soft lg:grid-cols-[1.15fr_0.85fr] lg:p-6">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group overflow-hidden rounded-[1.5rem]"
              >
                <BlogCoverArt
                  post={featuredPost}
                  variant="hero"
                  contentMode="minimal"
                  className="transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </Link>
              <div className="flex flex-col justify-between gap-5 rounded-[1.5rem] bg-white p-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-goldText">
                    Latest guide
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-brand-black">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-black/65">
                    {featuredPost.excerpt}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-brand-black/60">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-mango/12 px-3 py-1 font-semibold text-brand-mangoText">
                      {featuredPost.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatCalendarDate(featuredPost.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {estimateReadTime(featuredPost.content)} min read
                    </span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-mangoText transition-colors hover:text-brand-leaf"
                  >
                    Read the latest article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-black/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-xl border border-brand-black/10 bg-white py-3 pl-12 pr-10 text-sm text-brand-black placeholder-brand-black/40 shadow-soft transition-all focus:border-brand-mango focus:outline-none focus:ring-2 focus:ring-brand-mango/20"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-brand-black/40 transition-colors hover:bg-brand-black/5 hover:text-brand-black"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-brand-black/60">
                {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
                {selectedCategory !== 'All Posts' && ` in ${selectedCategory}`}
              </p>
            )}
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => {
              const count =
                category === 'All Posts'
                  ? sortedBlogPosts.length
                  : sortedBlogPosts.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-brand-mango text-brand-black shadow-soft'
                      : 'bg-brand-offWhite text-brand-black hover:bg-brand-mango/10'
                  }`}
                >
                  {category}
                  <span className="ml-1.5 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-8 md:grid-cols-2">
                {postsToRender.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-[1.5rem] border border-brand-black/10 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
                  >
                    <BlogCoverArt post={post} />

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-brand-black/60">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatCalendarDate(post.date)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {estimateReadTime(post.content)} min read
                        </div>
                      </div>

                      <h2 className="mt-3 text-xl font-bold leading-tight text-brand-black transition-colors group-hover:text-brand-mangoText">
                        {post.title}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-brand-black/70">
                        {post.excerpt}
                      </p>

                      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-mangoText transition-colors group-hover:text-brand-leaf">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="rounded-2xl border border-brand-black/10 bg-brand-offWhite p-12 text-center">
                  <p className="text-lg text-brand-black/60">
                    {searchQuery
                      ? `No articles found matching "${searchQuery}"`
                      : 'No articles found in this category.'}
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3">
                    {searchQuery && (
                      <button
                        onClick={handleClearSearch}
                        className="text-sm font-semibold text-brand-mangoText hover:text-brand-leaf"
                      >
                        Clear search
                      </button>
                    )}
                    {selectedCategory !== 'All Posts' && (
                      <button
                        onClick={() => setSelectedCategory('All Posts')}
                        className="text-sm font-semibold text-brand-mangoText hover:text-brand-leaf"
                      >
                        View all categories
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:block lg:col-span-1">
              <div className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-2 lg:pb-6">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need Legal Help?"
        title="Still unsure how your case is likely to play out?"
        body="Use the articles for orientation, then reach out when you want advice tied to the actual facts of your stop, charge, or court date."
        primaryLabel="Request Case Review"
        primaryHref="/contact"
        secondaryLabel={`Call ${OFFICE_PHONE_DISPLAY}`}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="blog_cta_call_office"
      />
    </>
  );
}
