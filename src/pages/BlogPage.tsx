import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import PageHero from '../components/PageHero';
import { blogPosts } from '../data/blogPosts';

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Legal insights and updates"
        description="Stay informed with articles about criminal defense, OVI/DUI law, and your rights in Ohio courts."
        ctaLabel="Free Consultation"
        ctaHref="/contact"
        variant="light"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex items-center gap-4 text-xs text-brand-black/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {post.author}
                  </div>
                </div>

                <div className="mt-3 inline-block rounded-full bg-brand-mango/10 px-3 py-1 text-xs font-semibold text-brand-mango">
                  {post.category}
                </div>

                <h2 className="mt-4 text-xl font-bold text-brand-black transition-colors group-hover:text-brand-mango">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-brand-black/70">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-brand-leaf">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
