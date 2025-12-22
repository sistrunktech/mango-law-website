import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import PageHero from '../components/PageHero';
import BlogSidebar from '../components/BlogSidebar';
import CTASection from '../components/CTASection';
import { blogPosts } from '../data/blogPosts';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';

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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');

  const filteredPosts = selectedCategory === 'All Posts'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Legal insights and updates"
        description="Stay informed with articles about criminal defense, OVI/DUI law, and your rights in Ohio courts."
        ctaLabel="Free Consultation"
        ctaHref="/contact"
        variant="light"
        phoneCtaId="blog_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => {
              const count = category === 'All Posts'
                ? blogPosts.length
                : blogPosts.filter(p => p.category === category).length;

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
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
                  >
                    {post.imageUrl && (
                      <div className="relative aspect-video overflow-hidden bg-brand-offWhite">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute left-4 top-4">
                          <span className="inline-block rounded-full bg-brand-mango px-3 py-1 text-xs font-semibold text-brand-black shadow-soft">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
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
                    No articles found in this category.
                  </p>
                  <button
                    onClick={() => setSelectedCategory('All Posts')}
                    className="mt-4 text-sm font-semibold text-brand-mangoText hover:text-brand-leaf"
                  >
                    View all posts
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need Legal Help?"
        title="Get a free case evaluation"
        body="Don't wait to protect your rights. Contact us today for a confidential consultation about your case."
        primaryLabel="Schedule Consultation"
        primaryHref="/contact"
        secondaryLabel={`Call ${OFFICE_PHONE_DISPLAY}`}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="blog_cta_call_office"
      />
    </>
  );
}
