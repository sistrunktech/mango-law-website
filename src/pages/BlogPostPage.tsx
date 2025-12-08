import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blogPosts';
import CTASection from '../components/CTASection';
import AuthorBio from '../components/AuthorBio';
import RelatedPosts from '../components/RelatedPosts';
import { SEO } from '../lib/seo';
import {
  PenaltyGrid,
  CostBreakdown,
} from '../components/blog';

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function getRelatedPosts(currentSlug: string, category: string, limit = 3) {
  return blogPosts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}


export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-black">Post Not Found</h1>
          <p className="mt-4 text-brand-black/60">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary mt-8 inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | Mango Law Blog`}
        description={post.excerpt}
        image={post.imageUrl}
        type="article"
      />
      <section className="bg-white py-12">
        <div className="container max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-mango transition-colors hover:text-brand-leaf"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>

          <div className="mt-8">
            <div className="inline-block rounded-full bg-brand-mango/10 px-4 py-1.5 text-sm font-semibold text-brand-mango">
              {post.category}
            </div>

            <h1 className="mt-6 text-4xl font-bold text-brand-black md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-brand-black/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {estimateReadingTime(post.content)} min read
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="mt-8 w-full rounded-2xl object-cover shadow-lg"
              style={{ maxHeight: '500px' }}
            />
          )}

          <div className="rounded-lg border-l-4 border-brand-mango bg-brand-mango/5 p-4 text-sm text-brand-black/70">
            <strong>Legal Disclaimer:</strong> This article is for educational purposes only and
            does not constitute legal advice. Criminal defense and personal injury law are complex
            and fact-specific. Always consult with a qualified Ohio attorney about your specific
            situation.
          </div>

          <div className="prose prose-lg mt-8 max-w-none
            prose-headings:font-bold prose-headings:text-brand-black
            prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-3xl
            prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-2xl
            prose-h4:mt-8 prose-h4:mb-2 prose-h4:text-xl
            prose-p:mb-6 prose-p:mt-0 prose-p:leading-relaxed prose-p:text-brand-black/80
            prose-a:font-medium prose-a:text-brand-mango prose-a:no-underline hover:prose-a:text-brand-leaf hover:prose-a:underline
            prose-strong:font-semibold prose-strong:text-brand-black
            prose-ul:my-6 prose-ul:space-y-3
            prose-ol:my-6 prose-ol:space-y-3
            prose-li:text-brand-black/80 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-brand-mango prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-brand-black/70
            prose-code:rounded prose-code:bg-brand-black/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm
            prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-xl prose-pre:bg-brand-black/5 prose-pre:p-4
            prose-hr:my-10 prose-hr:border-brand-black/10
            prose-table:my-8
            prose-img:rounded-xl prose-img:shadow-md">
            {(() => {
              const sections: JSX.Element[] = [];
              const parts = post.content.split(/(\[VISUAL:\w+\])/g);

              parts.forEach((part, index) => {
                if (part.match(/\[VISUAL:(\w+)\]/)) {
                  const visualType = part.match(/\[VISUAL:(\w+)\]/)?.[1];

                  if (visualType === 'OVI_PENALTIES') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="First-Time OVI Penalties in Ohio"
                        columns={[
                          { key: 'offense', label: 'Offense Type' },
                          { key: 'jail', label: 'Jail Time' },
                          { key: 'fine', label: 'Fine Range' },
                          { key: 'license', label: 'License Suspension' }
                        ]}
                        rows={[
                          {
                            offense: 'Standard OVI',
                            jail: '3 days - 6 months',
                            fine: '$375 - $1,075',
                            license: '6 months - 3 years'
                          },
                          {
                            offense: 'High BAC (.17+)',
                            jail: '6 days minimum',
                            fine: '$375 - $1,075',
                            license: '1 year minimum'
                          },
                          {
                            offense: 'Refusal',
                            jail: '3 days - 6 months',
                            fine: '$375 - $1,075',
                            license: '1 year minimum'
                          }
                        ]}
                      />
                    );
                  } else if (visualType === 'OVI_COSTS') {
                    sections.push(
                      <CostBreakdown
                        key={`visual-${index}`}
                        title="Total Cost of First OVI Conviction"
                        items={[
                          { label: 'Court Fines', amount: '$375-$1,075', description: 'Mandatory court-imposed fines' },
                          { label: 'License Reinstatement', amount: '$475', description: 'BMV fees to restore driving privileges' },
                          { label: 'Alcohol Education', amount: '$200-$500', description: 'Required intervention program' },
                          { label: 'SR-22 Insurance', amount: '$1,500-$3,000', description: 'Increased insurance costs over 3 years' },
                          { label: 'Ignition Interlock', amount: '$800-$1,500', description: 'Device installation and monitoring' },
                          { label: 'Attorney Fees', amount: '$2,500-$7,500', description: 'Legal representation' },
                          { label: 'Total Estimated Cost', amount: '$5,850-$14,050', isTotal: true }
                        ]}
                      />
                    );
                  }
                } else if (part.trim()) {
                  sections.push(
                    <ReactMarkdown
                      key={`markdown-${index}`}
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, ...props }) => {
                          const isExternal = props.href?.startsWith('http');
                          const isInternal = props.href?.startsWith('/');

                          if (isInternal) {
                            return (
                              <Link
                                to={props.href || '#'}
                                className="text-brand-mango underline hover:text-brand-leaf"
                              >
                                {props.children}
                              </Link>
                            );
                          }

                          return (
                            <a
                              {...props}
                              className="text-brand-mango underline hover:text-brand-leaf"
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                            />
                          );
                        },
                        ul: ({ node, ...props }) => (
                          <ul {...props} className="my-4 space-y-2" />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mango" />
                            <span className="text-brand-black/80">{props.children}</span>
                          </li>
                        ),
                      }}
                    >
                      {part}
                    </ReactMarkdown>
                  );
                }
              });

              return sections;
            })()}
          </div>

          <AuthorBio
            name="Dominic Mango"
            title="Criminal Defense Attorney"
            credentials="Ohio Bar Member"
            bio="Dominic Mango is a criminal defense and personal injury attorney serving Delaware and Franklin Counties in Ohio. With extensive courtroom experience and a client-focused approach, Dominic has successfully defended hundreds of clients facing OVI/DUI, drug crimes, assault, weapons charges, and other serious criminal allegations."
            imageUrl="/images/headshots/nick-mango-01.jpg"
          />

          <RelatedPosts posts={getRelatedPosts(post.slug, post.category)} />
        </div>
      </section>

      <CTASection
        title="Need legal guidance?"
        body="If you're facing criminal charges, contact Mango Law for experienced representation in Delaware and Franklin County."
        primaryLabel="Free Consultation"
        primaryHref="/contact"
        secondaryLabel="(740) 602-2155"
        secondaryHref="tel:7406022155"
      />
    </>
  );
}
