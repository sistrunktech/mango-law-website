import { useParams, Link } from 'react-router-dom';
import {
  Calendar, User, ArrowLeft, Clock, Scale, AlertTriangle, TrendingUp,
  Shield, Gavel, FileText, Ban, AlertOctagon, DollarSign, Users,
  Timer, CheckCircle, XCircle, Info, Briefcase, Home
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogPosts } from '../data/blogPosts';
import CTASection from '../components/CTASection';
import AuthorBio from '../components/AuthorBio';
import RelatedPosts from '../components/RelatedPosts';
import { SEO } from '../lib/seo';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import {
  PenaltyGrid,
  CostBreakdown,
  ComparisonCard,
  IconStat,
  TimelineBar,
  StatCard,
  HighlightBox,
  ProgressBar,
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

  const hasVisuals = post.content.includes('[VISUAL:');

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
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Last verified{' '}
                {new Date(post.lastVerified).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <div className="mt-8 overflow-hidden rounded-2xl bg-brand-offWhite shadow-lg">
              <div className="relative aspect-[16/9] max-h-[500px]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  width={1200}
                  height={675}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="rounded-lg border-l-4 border-brand-mango bg-brand-mango/5 p-4 text-sm text-brand-black/70">
            <strong>Legal Disclaimer:</strong> This article is for educational purposes only and
            does not constitute legal advice. Criminal defense and personal injury law are complex
            and fact-specific. Always consult with a qualified Ohio attorney about your specific
            situation.
          </div>

          {hasVisuals && (
            <div className="mt-4 rounded-lg border-l-4 border-brand-leaf bg-brand-leaf/5 p-4 text-sm text-brand-black/70">
              <strong>Visual note:</strong> Visual summaries are simplified; confirm any legal details and numbers in{' '}
              <a
                href="#sources"
                className="font-semibold text-brand-mangoText underline-offset-2 hover:text-brand-leaf hover:underline"
              >
                Sources
              </a>
              . Last verified{' '}
              {new Date(post.lastVerified).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              .
            </div>
          )}

          {post.sources.length > 0 && (
            <div id="sources" className="mt-6 rounded-2xl border border-brand-black/10 bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-black">
                <FileText className="h-4 w-4 text-brand-mangoText" />
                Sources
              </div>
              <p className="mt-2 text-xs text-brand-black/60">
                Visual summaries and timelines are simplified. Use these sources to confirm current law and details.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-brand-black/70">
                {post.sources.map((source) => (
                  <li key={source.url} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-brand-mangoText underline-offset-2 hover:text-brand-leaf hover:underline"
                    >
                      {source.label}
                    </a>
                    {source.type && (
                      <span className="rounded-full bg-brand-offWhite px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-black/60">
                        {source.type}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

                  // BAC Limits
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
                        title="Common OVI-Related Costs (Varies)"
                        items={[
                          { label: 'Court Fines', amount: 'Varies', description: 'Depends on offense level and court' },
                          { label: 'License Reinstatement', amount: 'Varies', description: 'BMV fees and requirements depend on history' },
                          { label: 'Programs / Treatment', amount: 'Varies', description: 'Driver intervention, education, or treatment' },
                          { label: 'Insurance Impact', amount: 'Varies', description: 'Premium changes depend on insurer and coverage' },
                          { label: 'Ignition Interlock', amount: 'Varies', description: 'Only if ordered; costs vary by provider and duration' },
                          { label: 'Attorney Fees', amount: 'Varies', description: 'Depends on complexity, court, and posture of the case' },
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

                  // Motion Types
                  else if (visualType === 'MOTION_TYPES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-3">
                        <StatCard icon={Ban} value="Suppress" label="Motion to Suppress Evidence" color="mango" description="Challenge illegally obtained evidence" />
                        <StatCard icon={Gavel} value="Dismiss" label="Motion to Dismiss" color="gold" description="Request charge dismissal" />
                        <StatCard icon={FileText} value="Limine" label="Motion in Limine" color="leaf" description="Exclude prejudicial evidence" />
                      </div>
                    );
                  }

                  // Drug Possession vs Trafficking
                  else if (visualType === 'POSSESSION_VS_TRAFFICKING') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="Possession vs. Trafficking"
                        leftItem={{
                          label: 'Possession',
                          value: 'Personal Use',
                          description: 'Lower-level offense, smaller quantities, potential diversion'
                        }}
                        rightItem={{
                          label: 'Trafficking',
                          value: 'Sale/Distribution',
                          description: 'Felony charges, mandatory prison, bulk amount thresholds'
                        }}
                        leftColor="gold"
                        rightColor="red"
                      />
                    );
                  }

                  // Bulk Amount Thresholds
                  else if (visualType === 'BULK_AMOUNT_THRESHOLDS') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Ohio Drug Bulk Amount Thresholds"
                        columns={[
                          { key: 'drug', label: 'Drug Type' },
                          { key: 'bulk', label: 'Bulk Amount' },
                          { key: 'penalty', label: 'Penalty Range' }
                        ]}
                        rows={[
                          { drug: 'Cocaine', bulk: '5+ grams', penalty: 'F4/F3 - 6 months to 3 years' },
                          { drug: 'Heroin', bulk: '1+ gram', penalty: 'F4/F3 - 6 months to 3 years' },
                          { drug: 'Fentanyl', bulk: '5+ grams', penalty: 'F3/F2 - 2 to 8 years' },
                          { drug: 'Marijuana', bulk: '200+ grams', penalty: 'F5/F3 - 6 months to 5 years' }
                        ]}
                      />
                    );
                  }

                  // Defense Strategies
                  else if (visualType === 'DEFENSE_STRATEGIES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <HighlightBox variant="info" title="Challenge the Evidence">
                          <p>Question search legality, chain of custody, and lab testing procedures</p>
                        </HighlightBox>
                        <HighlightBox variant="success" title="Negotiate Alternatives">
                          <p>Pursue diversion programs, treatment courts, or reduced charges</p>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // Diversion Options
                  else if (visualType === 'DIVERSION_OPTIONS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-3">
                        <StatCard icon={Shield} value="ILC" label="Intervention in Lieu" color="leaf" description="Treatment instead of conviction" />
                        <StatCard icon={CheckCircle} value="Sealed" label="Record Sealing" color="gold" description="Clean record after completion" />
                        <StatCard icon={Users} value="Community" label="Community Control" color="mango" description="Supervised probation" />
                      </div>
                    );
                  }

                  // White Collar Defense Strategies
                  else if (visualType === 'WHITE_COLLAR_DEFENSE_STRATEGIES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <HighlightBox variant="info" title="Documentation Review">
                          <p>Challenge financial records, audit procedures, and accounting interpretations</p>
                        </HighlightBox>
                        <HighlightBox variant="warning" title="Intent Analysis">
                          <p>Prove lack of criminal intent or demonstrate good faith business decisions</p>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // White Collar Penalties
                  else if (visualType === 'WHITE_COLLAR_PENALTIES') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="White Collar Charges: Penalty Drivers (Overview)"
                        columns={[
                          { key: 'charge', label: 'Charge Type' },
                          { key: 'severity', label: 'Severity' },
                          { key: 'drivers', label: 'What Often Drives Penalties' }
                        ]}
                        rows={[
                          { charge: 'Theft / Fraud', severity: 'Varies', drivers: 'Value involved, intent, prior record, restitution' },
                          { charge: 'Identity Fraud', severity: 'Varies', drivers: 'Number of victims, losses, and alleged scheme scope' },
                          { charge: 'Forgery', severity: 'Varies', drivers: 'Document type, losses, and alleged intent' },
                          { charge: 'Federal exposure', severity: 'Sometimes', drivers: 'Interstate conduct and federal charging decisions' }
                        ]}
                      />
                    );
                  }

                  // Rights Highlight
                  else if (visualType === 'RIGHTS_HIGHLIGHT') {
                    sections.push(
                      <HighlightBox key={`visual-${index}`} variant="warning" title="Know Your Rights">
                        <p>You have the right to remain silent and the right to an attorney. Field sobriety tests are voluntary, and you can politely decline without penalty.</p>
                      </HighlightBox>
                    );
                  }

                  // FST Refusal Comparison
                  else if (visualType === 'FST_REFUSAL_COMPARISON') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="Field Sobriety Tests: Comply vs. Refuse"
                        leftItem={{
                          label: 'Taking FSTs',
                          value: 'Evidence Created',
                          description: 'Officer observations can be used against you even if you pass'
                        }}
                        rightItem={{
                          label: 'Refusing FSTs',
                          value: 'No Evidence',
                          description: 'No new evidence created, no legal penalty for refusal'
                        }}
                        leftColor="red"
                        rightColor="leaf"
                      />
                    );
                  }

                  // Chemical vs FST Comparison
                  else if (visualType === 'CHEMICAL_VS_FST_COMPARISON') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="Chemical Tests vs. Field Sobriety Tests"
                        leftItem={{
                          label: 'Chemical Tests',
                          value: 'Mandatory',
                          description: 'Breath/blood/urine - refusal can trigger an administrative suspension (length depends on history)'
                        }}
                        rightItem={{
                          label: 'Field Sobriety',
                          value: 'Voluntary',
                          description: 'Roadside coordination tests - generally voluntary; refusal may still be noted'
                        }}
                        leftColor="red"
                        rightColor="gold"
                      />
                    );
                  }

                  // Refusal Stats
                  else if (visualType === 'REFUSAL_STATS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-3">
                        <StatCard icon={AlertTriangle} value="Subjective" label="FST Results" color="red" description="Conditions and interpretation can matter a lot" />
                        <StatCard icon={Ban} value="Voluntary" label="FST Refusal" color="leaf" description="Generally no separate criminal charge for refusing" />
                        <StatCard icon={Timer} value="ALS" label="Chemical Refusal" color="gold" description="Can trigger an administrative license suspension" />
                      </div>
                    );
                  }

                  // Lookback Timeline
                  else if (visualType === 'LOOKBACK_TIMELINE') {
                    sections.push(
                      <TimelineBar
                        key={`visual-${index}`}
                        title="Ohio OVI Lookback Periods"
                        items={[
                          { label: 'Criminal Sentencing', duration: '10 years', color: 'mango', width: '50%' },
                          { label: 'License Suspension (Conviction)', duration: '20 years', color: 'red', width: '100%' },
                          { label: 'ALS Suspension (Refusal)', duration: '10 years', color: 'gold', width: '50%' }
                        ]}
                      />
                    );
                  }

                  // Repeat Offense Grid
                  else if (visualType === 'REPEAT_OFFENSE_GRID') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Repeat OVI Offense Penalties"
                        columns={[
                          { key: 'offense', label: 'Offense Number' },
                          { key: 'jail', label: 'Minimum Jail' },
                          { key: 'suspension', label: 'License Suspension' }
                        ]}
                        rows={[
                          { offense: 'Second OVI', jail: '10 days', suspension: '1-7 years' },
                          { offense: 'Third OVI', jail: '30 days', suspension: '2-12 years' },
                          { offense: 'Fourth OVI', jail: '60 days', suspension: '3 years to life' }
                        ]}
                      />
                    );
                  }

                  // Law Change Comparison
                  else if (visualType === 'LAW_CHANGE_COMPARISON') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="House Bill 37 Impact (Effective April 2025)"
                        leftItem={{
                          label: 'Before H.B. 37',
                          value: '$375',
                          description: 'Minimum fine plus $475 reinstatement fee'
                        }}
                        rightItem={{
                          label: 'After H.B. 37',
                          value: '$565',
                          description: 'Increased fine, reduced $315 reinstatement'
                        }}
                        leftColor="gold"
                        rightColor="mango"
                      />
                    );
                  }

                  // Suspension Comparison
                  else if (visualType === 'SUSPENSION_COMPARISON') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="ALS vs. Court-Ordered Suspension"
                        leftItem={{
                          label: 'ALS (Admin)',
                          value: 'Immediate',
                          description: 'Automatic at arrest, before conviction'
                        }}
                        rightItem={{
                          label: 'Court Suspension',
                          value: 'After Conviction',
                          description: 'Imposed by judge upon guilty verdict'
                        }}
                        leftColor="red"
                        rightColor="mango"
                      />
                    );
                  }

                  // Lookback Scenarios
                  else if (visualType === 'LOOKBACK_SCENARIOS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 space-y-4">
                        <HighlightBox variant="info" title="Scenario 1: Within 10-Year Window">
                          <p>2015 OVI + 2024 OVI = Counted as 2nd offense with enhanced penalties</p>
                        </HighlightBox>
                        <HighlightBox variant="success" title="Scenario 2: Outside 10-Year Window">
                          <p>2013 OVI + 2024 OVI = Both treated as 1st offenses for criminal sentencing</p>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // Cost Breakdown (generic)
                  else if (visualType === 'COST_BREAKDOWN') {
                    sections.push(
                      <CostBreakdown
                        key={`visual-${index}`}
                        title="Cost Categories (Varies)"
                        items={[
                          { label: 'Court fines & fees', amount: 'Varies', description: 'Depends on the specific charge(s) and court' },
                          { label: 'Attorney fees', amount: 'Varies', description: 'Depends on complexity and stage of the case' },
                          { label: 'Programs / treatment', amount: 'Varies', description: 'If ordered or recommended' },
                          { label: 'Other costs', amount: 'Varies', description: 'Insurance impacts, monitoring, travel, and time off work' },
                        ]}
                      />
                    );
                  }

                  // Ex Parte Restrictions
                  else if (visualType === 'EX_PARTE_RESTRICTIONS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 space-y-3">
                        <HighlightBox variant="warning" title="Common Ex Parte CPO Restrictions">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>No contact with protected person (direct or indirect)</li>
                            <li>Stay away from residence and workplace</li>
                            <li>Surrender firearms within 24 hours</li>
                            <li>Move out of shared residence immediately</li>
                          </ul>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // CPO Misuse Scenarios
                  else if (visualType === 'CPO_MISUSE_SCENARIOS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <HighlightBox variant="error" title="Custody Disputes">
                          <p>False allegations filed to gain advantage in divorce or custody proceedings</p>
                        </HighlightBox>
                        <HighlightBox variant="warning" title="Retaliation">
                          <p>Orders sought as revenge for breakup or to harass former partner</p>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // CPO Dos and Don'ts
                  else if (visualType === 'CPO_DOS_DONTS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <HighlightBox variant="success" title="DO">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Read order carefully and comply fully</li>
                            <li>Hire an attorney immediately</li>
                            <li>Document all evidence</li>
                            <li>Attend full hearing</li>
                          </ul>
                        </HighlightBox>
                        <HighlightBox variant="error" title="DON'T">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Contact petitioner directly</li>
                            <li>Go near protected locations</li>
                            <li>Ignore court deadlines</li>
                            <li>Violate any order provisions</li>
                          </ul>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // Hearing Timeline
                  else if (visualType === 'HEARING_TIMELINE') {
                    sections.push(
                      <TimelineBar
                        key={`visual-${index}`}
                        title="CPO Process Timeline"
                        items={[
                          { label: 'Ex Parte Filed', duration: 'Day 0', color: 'red', width: '0%' },
                          { label: 'Service of Order', duration: '1-3 days', color: 'gold', width: '20%' },
                          { label: 'Full Hearing', duration: '7-10 days', color: 'mango', width: '50%' },
                          { label: 'Final Order', duration: 'Up to 5 years', color: 'leaf', width: '100%' }
                        ]}
                      />
                    );
                  }

                  // SORN Tiers
                  else if (visualType === 'SORN_TIERS') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Ohio Sex Offender Registration Tiers"
                        columns={[
                          { key: 'tier', label: 'Tier' },
                          { key: 'duration', label: 'Duration' },
                          { key: 'frequency', label: 'Reporting' }
                        ]}
                        rows={[
                          { tier: 'Tier I', duration: '15 years', frequency: 'Annual' },
                          { tier: 'Tier II', duration: '25 years', frequency: 'Every 180 days' },
                          { tier: 'Tier III', duration: 'Life', frequency: 'Every 90 days' }
                        ]}
                      />
                    );
                  }

                  // Collateral Consequences
                  else if (visualType === 'COLLATERAL_CONSEQUENCES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-3">
                        <StatCard icon={Home} value="Housing" label="Residence Restrictions" color="red" description="Limited where you can live" />
                        <StatCard icon={Briefcase} value="Employment" label="Job Limitations" color="gold" description="Many careers closed off" />
                        <StatCard icon={Users} value="Relationships" label="Social Stigma" color="mango" description="Public registry listing" />
                      </div>
                    );
                  }

                  // Sex Crimes Defenses
                  else if (visualType === 'SEX_CRIMES_DEFENSES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <HighlightBox variant="info" title="Challenge Credibility">
                          <p>Examine inconsistencies in accuser's statements and timeline</p>
                        </HighlightBox>
                        <HighlightBox variant="success" title="Present Evidence">
                          <p>Alibi witnesses, phone records, surveillance footage</p>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // Comparative Fault Examples
                  else if (visualType === 'COMPARATIVE_FAULT_EXAMPLES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 space-y-4">
                        <HighlightBox variant="info" title="Example: 20% at Fault">
                          <p>$100,000 damages × 80% = $80,000 recovery</p>
                        </HighlightBox>
                        <HighlightBox variant="warning" title="Example: 51% at Fault">
                          <p>No recovery allowed under Ohio's modified comparative fault rule</p>
                        </HighlightBox>
                      </div>
                    );
                  }

                  // Statute of Limitations
                  else if (visualType === 'STATUTE_LIMITATIONS') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Timing: Filing Deadlines Can Be Strict"
                        columns={[
                          { key: 'type', label: 'Claim Type' },
                          { key: 'deadline', label: 'Filing Deadline' }
                        ]}
                        rows={[
                          { type: 'Personal injury (many cases)', deadline: 'Often 2 years (exceptions apply)' },
                          { type: 'Wrongful death', deadline: 'Often 2 years (exceptions apply)' },
                          { type: 'Medical malpractice', deadline: 'Often shorter; get advice quickly' },
                          { type: 'Other claims', deadline: 'Varies by claim type and facts' }
                        ]}
                      />
                    );
                  }

                  // Damage Caps
                  else if (visualType === 'DAMAGE_CAPS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <StatCard icon={DollarSign} value="May apply" label="Non-Economic Cap" color="mango" description="Depends on injury type and case facts" />
                        <StatCard icon={AlertTriangle} value="Often uncapped" label="Economic Damages" color="leaf" description="Medical bills, lost wages, and other out-of-pocket losses" />
                      </div>
                    );
                  }

                  // Assault Penalty Grid
                  else if (visualType === 'ASSAULT_PENALTY_GRID') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Ohio Assault Penalties"
                        columns={[
                          { key: 'offense', label: 'Offense' },
                          { key: 'level', label: 'Level' },
                          { key: 'penalty', label: 'Penalty' }
                        ]}
                        rows={[
                          { offense: 'Simple Assault', level: 'Misdemeanor (often)', penalty: 'Jail and fines possible' },
                          { offense: 'Felonious Assault', level: 'Felony', penalty: 'Prison possible' },
                          { offense: 'Aggravated Assault', level: 'Felony (often)', penalty: 'Prison possible' },
                          { offense: 'Assault on Police', level: 'Felony (often)', penalty: 'Prison possible' }
                        ]}
                      />
                    );
                  }

                  // DV Repeat Penalties
                  else if (visualType === 'DV_REPEAT_PENALTIES') {
                    sections.push(
                      <PenaltyGrid
                        key={`visual-${index}`}
                        title="Domestic Violence Repeat Offenses"
                        columns={[
                          { key: 'offense', label: 'Offense' },
                          { key: 'level', label: 'Level' },
                          { key: 'jail', label: 'Minimum Jail' }
                        ]}
                        rows={[
                          { offense: 'First DV', level: 'M1', jail: 'Up to 180 days' },
                          { offense: 'Second DV (within 5 years)', level: 'M4', jail: '30 days mandatory' },
                          { offense: 'Third DV', level: 'F4', jail: '6-18 months' }
                        ]}
                      />
                    );
                  }

                  // CPO Timeline
                  else if (visualType === 'CPO_TIMELINE') {
                    sections.push(
                      <TimelineBar
                        key={`visual-${index}`}
                        title="Civil Protection Order Duration"
                        items={[
                          { label: 'Ex Parte (Temporary)', duration: '7-10 days', color: 'red', width: '20%' },
                          { label: 'Standard CPO', duration: 'Up to 5 years', color: 'mango', width: '100%' }
                        ]}
                      />
                    );
                  }

                  // Defense Comparison
                  else if (visualType === 'DEFENSE_COMPARISON') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="Defense Strategy Approaches"
                        leftItem={{
                          label: 'Self-Defense',
                          value: 'Justified Force',
                          description: 'Prove you acted in reasonable self-defense'
                        }}
                        rightItem={{
                          label: 'False Allegations',
                          value: 'No Crime Occurred',
                          description: 'Demonstrate inconsistencies and lack of evidence'
                        }}
                        leftColor="leaf"
                        rightColor="mango"
                      />
                    );
                  }

                  // Firearm Consequences
                  else if (visualType === 'FIREARM_CONSEQUENCES') {
                    sections.push(
                      <HighlightBox key={`visual-${index}`} variant="error" title="Weapons Consequences">
                        <p>DV convictions trigger federal firearms prohibition under 18 U.S.C. § 922(g)(9). You cannot possess firearms or ammunition, even for hunting or work.</p>
                      </HighlightBox>
                    );
                  }

                  // Checkpoint Hotspot Blog Visualizations
                  else if (visualType === 'HOTSPOT_FACTORS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard icon={TrendingUp} value="High" label="Traffic Volume" color="mango" description="Major highways and downtown corridors" />
                        <StatCard icon={Users} value="Entertainment" label="Districts" color="gold" description="Bars, restaurants, nightlife areas" />
                        <StatCard icon={Scale} value="Historical" label="DUI Data" color="leaf" description="Areas with recurring incidents" />
                        <StatCard icon={Calendar} value="Event-Based" label="Targeting" color="blue" description="Sports, concerts, holidays" />
                      </div>
                    );
                  }
                  else if (visualType === 'CHECKPOINT_PATTERNS') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 flex flex-wrap gap-4">
                        <IconStat icon={Clock} value="10PM-2AM" label="Peak Hours" color="mango" />
                        <IconStat icon={Calendar} value="Fri-Sat" label="Weekend Nights" color="gold" />
                        <IconStat icon={Home} value="I-70/71/75" label="Major Interstates" color="leaf" />
                        <IconStat icon={Users} value="College Towns" label="University Areas" color="blue" />
                      </div>
                    );
                  }
                  else if (visualType === 'REGIONAL_HOTSPOTS_MAP') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-2">
                        <StatCard value="Cleveland" label="Northeast Ohio" color="mango" description="W. 6th St, Detroit Ave, I-90/I-71 exits near entertainment districts" />
                        <StatCard value="Columbus" label="Central Ohio" color="gold" description="High St, Short North, OSU campus, I-70/I-71 interchanges" />
                        <StatCard value="Cincinnati" label="Southwest Ohio" color="leaf" description="Over-the-Rhine, downtown, I-75/I-71 convergence areas" />
                        <StatCard value="Akron/Canton" label="Northeast Corridor" color="blue" description="SR-8, downtown areas, I-77 interchanges" />
                      </div>
                    );
                  }
                  else if (visualType === 'CHECKPOINT_PROCESS') {
                    sections.push(
                      <TimelineBar
                        key={`visual-${index}`}
                        title="DUI Checkpoint Process"
                        items={[
                          { label: 'Approach Checkpoint', duration: 'Slow down, follow officer instructions', color: 'blue', width: '25%' },
                          { label: 'Initial Screening', duration: 'Provide license, brief questions', color: 'gold', width: '50%' },
                          { label: 'Secondary Screening (if needed)', duration: 'Field sobriety tests, further questioning', color: 'mango', width: '75%' },
                          { label: 'Arrest or Release', duration: 'Citation issued or free to go', color: 'leaf', width: '100%' }
                        ]}
                      />
                    );
                  }
                  else if (visualType === 'CHECKPOINT_RIGHTS') {
                    sections.push(
                      <ComparisonCard
                        key={`visual-${index}`}
                        title="Your Rights at DUI Checkpoints"
                        leftItem={{
                          label: 'MUST DO',
                          value: 'Required',
                          description: '• Stop at checkpoint\n• Provide license & registration\n• Identify yourself'
                        }}
                        rightItem={{
                          label: 'DON\'T HAVE TO',
                          value: 'Optional',
                          description: '• Answer where you\'ve been\n• Admit to drinking\n• Perform field sobriety tests'
                        }}
                        leftColor="red"
                        rightColor="leaf"
                      />
                    );
                  }
                  else if (visualType === 'AVOIDANCE_STRATEGIES') {
                    sections.push(
                      <div key={`visual-${index}`} className="my-8 grid gap-4 md:grid-cols-3">
                        <StatCard icon={AlertTriangle} value="Plan" label="Ahead" color="mango" description="Check news, social media, and checkpoint maps before driving" />
                        <StatCard icon={Users} value="Alternate" label="Transportation" color="gold" description="Use designated drivers, rideshare, or public transit" />
                        <StatCard icon={Clock} value="Avoid" label="High-Risk Times" color="leaf" description="Weekend late nights (10PM-2AM) and holiday periods" />
                      </div>
                    );
                  }

                  // Fallback for unknown visual types
                  else {
                    sections.push(
                      <div key={`visual-${index}`} className="my-6 rounded-lg border-2 border-brand-mango/20 bg-brand-mango/5 p-4">
                        <p className="text-sm text-brand-black/70">
                          <span className="font-semibold">Visual Component:</span> {visualType}
                        </p>
                      </div>
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
                        table: ({ node, ...props }) => (
                          <div className="my-8 overflow-x-auto rounded-lg border border-brand-black/10">
                            <table className="w-full border-collapse text-sm" {...props} />
                          </div>
                        ),
                        thead: ({ node, ...props }) => (
                          <thead className="bg-brand-offWhite" {...props} />
                        ),
                        tbody: ({ node, ...props }) => (
                          <tbody className="divide-y divide-brand-black/10" {...props} />
                        ),
                        tr: ({ node, ...props }) => (
                          <tr className="border-b border-brand-black/10 last:border-0" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                          <th className="px-4 py-3 text-left font-semibold text-brand-black" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="px-4 py-3 text-brand-black/80" {...props} />
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
            imageUrl="/images/nick_mango_profile_shot.jpg"
          />

          <RelatedPosts posts={getRelatedPosts(post.slug, post.category)} />
        </div>
      </section>

      <CTASection
        title="Need legal guidance?"
        body="If you're facing criminal charges, contact Mango Law for experienced representation in Delaware and Franklin County."
        primaryLabel="Free Consultation"
        primaryHref="/contact"
        secondaryLabel={OFFICE_PHONE_DISPLAY}
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="blog_post_cta_call_office"
      />
    </>
  );
}
