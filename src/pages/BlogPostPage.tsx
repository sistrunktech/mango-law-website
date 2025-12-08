import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Scale, AlertTriangle, TrendingUp } from 'lucide-react';
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
  ComparisonCard,
  IconStat,
  TimelineBar,
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

                  if (visualType === 'BAC_LIMITS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 flex flex-wrap gap-4">
                        <IconStat icon={Scale} value="0.08%" label="Standard Adult Limit" color="mango" />
                        <IconStat icon={AlertTriangle} value="0.17%" label="High-Test Threshold" color="red" />
                        <IconStat icon={Scale} value="0.02%" label="Under 21 Limit" color="gold" />
                        <IconStat icon={Scale} value="0.04%" label="Commercial Driver" color="blue" />
                      </div>
                    );
                  } else if (visualType === 'HB37_COMPARISON') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="House Bill 37 Changes (Effective April 9, 2025)"
                        leftItem={{
                          label: 'Before H.B. 37',
                          value: '$375 min',
                          description: 'Minimum fine: $375 | Reinstatement: $475'
                        }}
                        rightItem={{
                          label: 'After H.B. 37',
                          value: '$565 min',
                          description: 'Minimum fine: $565 (+$190) | Reinstatement: $315 (-$160)'
                        }}
                        leftColor="gold"
                        rightColor="mango"
                      />
                    );
                  } else if (visualType === 'FIRST_OFFENSE_PENALTIES') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="First-Time OVI Penalties in Ohio"
                        columns={[
                          { key: 'offense', label: 'Penalty Type' },
                          { key: 'jail', label: 'Details' }
                        ]}
                        rows={[
                          {
                            offense: 'Jail or Driver-Intervention Program',
                            jail: 'Mandatory 3-day program or 3 days jail (up to 6 months possible)'
                          },
                          {
                            offense: 'Fines',
                            jail: '$565 - $1,075 (minimum increased by H.B. 37 from $375)'
                          },
                          {
                            offense: 'License Suspension',
                            jail: '1-3 years (unlimited privileges available with ignition interlock)'
                          },
                          {
                            offense: 'Points & Insurance',
                            jail: '6 points on license, dramatically higher insurance premiums'
                          },
                          {
                            offense: 'Reinstatement Fee',
                            jail: '$315 (reduced from $475 by H.B. 37)'
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
                          { label: 'Court Fines', amount: '$565-$1,075', description: 'Mandatory court-imposed fines (updated by H.B. 37)' },
                          { label: 'License Reinstatement', amount: '$315', description: 'BMV fees to restore driving privileges (reduced by H.B. 37)' },
                          { label: 'Alcohol Education', amount: '$200-$500', description: 'Required intervention program' },
                          { label: 'SR-22 Insurance', amount: '$1,500-$3,000', description: 'Increased insurance costs over 3 years' },
                          { label: 'Ignition Interlock', amount: '$800-$1,500', description: 'Device installation and monitoring' },
                          { label: 'Attorney Fees', amount: '$2,500-$7,500', description: 'Legal representation' },
                          { label: 'Total Estimated Cost', amount: '$5,880-$13,890', isTotal: true }
                        ]}
                      />
                    );
                  } else if (visualType === 'REPEAT_OFFENSE_PENALTIES') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Repeat OVI Offenses (Within 10 Years)"
                        columns={[
                          { key: 'offense', label: 'Offense' },
                          { key: 'jail', label: 'Jail Time' },
                          { key: 'fine', label: 'Fines' },
                          { key: 'license', label: 'License Suspension' },
                          { key: 'other', label: 'Additional Consequences' }
                        ]}
                        rows={[
                          {
                            offense: 'Second Offense (Low Test)',
                            jail: 'Min 10 days (up to 6 months)',
                            fine: '$715-$1,625',
                            license: '1-7 years',
                            other: '90-day vehicle immobilization, mandatory treatment'
                          },
                          {
                            offense: 'Second Offense (High Test/Refusal)',
                            jail: 'Min 20 days (up to 6 months)',
                            fine: '$715-$1,625',
                            license: '1-7 years',
                            other: 'Same as above + ignition interlock required'
                          },
                          {
                            offense: 'Third Offense',
                            jail: 'Min 30 days (low) / 60 days (high)',
                            fine: '$1,040-$2,750',
                            license: '2-12 years',
                            other: 'Vehicle forfeiture, yellow plates, mandatory assessment'
                          }
                        ]}
                      />
                    );
                  } else if (visualType === 'ALS_TIMELINE') {
                    sections.push(
                      <TimelineBar
                        key={`visual-${index}`}
                        title="Administrative License Suspension (ALS) Durations"
                        items={[
                          { label: 'Test Failure (0.08-0.17 BAC)', duration: '90 days', color: 'gold', width: '30%' },
                          { label: 'High-Test Failure (0.17+ BAC)', duration: '1 year', color: 'red', width: '60%' },
                          { label: 'Chemical Test Refusal', duration: '1 year', color: 'red', width: '60%' }
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
                        h1: ({ node, ...props }) => (
                          <h1 className="mb-6 mt-12 font-display text-4xl font-bold text-brand-black" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="mb-4 mt-12 font-display text-3xl font-bold text-brand-black" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="mb-3 mt-10 font-display text-2xl font-bold text-brand-black" {...props} />
                        ),
                        h4: ({ node, ...props }) => (
                          <h4 className="mb-2 mt-8 text-xl font-semibold text-brand-black" {...props} />
                        ),
                        h5: ({ node, ...props }) => (
                          <h5 className="mb-2 mt-6 text-lg font-semibold text-brand-black" {...props} />
                        ),
                        h6: ({ node, ...props }) => (
                          <h6 className="mb-2 mt-6 text-base font-semibold text-brand-black" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="mb-6 mt-0 leading-relaxed text-brand-black/80" {...props} />
                        ),
                        a: ({ node, ...props }) => {
                          const isExternal = props.href?.startsWith('http');
                          const isInternal = props.href?.startsWith('/');

                          if (isInternal) {
                            return (
                              <Link
                                to={props.href || '#'}
                                className="font-medium text-brand-mango no-underline hover:text-brand-leaf hover:underline"
                              >
                                {props.children}
                              </Link>
                            );
                          }

                          return (
                            <a
                              {...props}
                              className="font-medium text-brand-mango no-underline hover:text-brand-leaf hover:underline"
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                            />
                          );
                        },
                        ul: ({ node, ...props }) => (
                          <ul {...props} className="my-6 space-y-3" />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="flex items-start gap-3 leading-relaxed text-brand-black/80">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mango" />
                            <span>{props.children}</span>
                          </li>
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold text-brand-black" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="my-6 border-l-4 border-brand-mango pl-6 italic text-brand-black/70" {...props} />
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
