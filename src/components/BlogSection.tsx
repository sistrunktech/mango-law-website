import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '../data/blogPosts';
import BlogCoverArt from './BlogCoverArt';
import { formatCalendarDate } from '../lib/formatting';

const recoveryPrioritySlugs = [
  'ohio-ovi-driving-privileges-als',
  'drug-possession-charge-ohio-what-to-do-next',
  'first-ovi-court-date-delaware-county-ohio',
];

function getRecentDiversePosts(posts: BlogPost[], count: number): BlogPost[] {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const selected: BlogPost[] = [];
  const usedCategories = new Set<string>();

  for (const slug of recoveryPrioritySlugs) {
    const match = sorted.find((post) => post.slug === slug);
    if (!match || selected.includes(match) || selected.length >= count) continue;
    selected.push(match);
    usedCategories.add(match.category);
  }

  for (const post of sorted) {
    if (selected.length >= count) break;
    if (!usedCategories.has(post.category)) {
      selected.push(post);
      usedCategories.add(post.category);
    }
  }

  if (selected.length < count) {
    for (const post of sorted) {
      if (selected.length >= count) break;
      if (!selected.includes(post)) {
        selected.push(post);
      }
    }
  }

  return selected.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const recentPosts = getRecentDiversePosts(posts, 3);

  return (
    <section className="section bg-brand-offWhite">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-brand-goldText">Start Here</p>
            </div>
            <h2 className="font-display text-display-sm md:text-display-md">
              Useful answers before the next phone call, court date, or license deadline.
            </h2>
            <p className="max-w-xl text-brand-black/60">
              These are the articles people read when they want the practical version first: what happened, what matters next, and where the case usually turns.
            </p>
          </div>
          <Link
            href="/blog"
            className="group hidden items-center gap-2 text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf md:inline-flex"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-brand-black/10 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <BlogCoverArt post={post} />
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-leaf/10 px-3 py-1 font-semibold text-brand-leaf">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-black/60">
                    <Calendar className="h-3 w-3" />
                    {formatCalendarDate(post.date)}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-brand-black transition-colors group-hover:text-brand-mangoText">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-brand-black/60">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-leaf">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="btn btn-secondary">
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
