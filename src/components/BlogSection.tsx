import Link from 'next/link';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { blogPosts, type BlogPost } from '../data/blogPosts';

function getRecentDiversePosts(posts: BlogPost[], count: number): BlogPost[] {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const selected: BlogPost[] = [];
  const usedCategories = new Set<string>();

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

export default function BlogSection() {
  const recentPosts = getRecentDiversePosts(blogPosts, 3);

  return (
    <section className="section bg-brand-offWhite">
      <div className="container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
              <div className="flex items-center gap-3">
              <div className="accent-line" />
              <p className="eyebrow text-brand-goldText">Know Your Rights</p>
            </div>
            <h2 className="font-display text-display-sm md:text-display-md">
              Arrested in Ohio? Start Here.
            </h2>
            <p className="max-w-xl text-brand-black/60">
              Understand your situation, your rights, and your options with guidance from an Ohio defense attorney.
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
              className="group card card-hover p-0 overflow-hidden"
            >
                {post.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-brand-offWhite">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                )}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-leaf/10 px-3 py-1 font-semibold text-brand-leaf">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-black/60">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
