'use client';

import Image from 'next/image';
import BlogSection from '../components/BlogSection';
import TestimonialsList from '../components/TestimonialsList';
import CTASection from '../components/CTASection';
import LocationBlock from '../components/LocationBlock';
import QuickIntakeForm from '../components/QuickIntakeForm';
import { CheckCircle, FileText, Mail, Phone, Users, Clock } from 'lucide-react';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import PracticeAreaCardGrid from '../components/PracticeAreaCardGrid';
import DeferredSection from '../components/DeferredSection';
import RelatedDefenseGuides from '../components/RelatedDefenseGuides';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import { OFFICE_EMAIL, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import type { BlogPost } from '../data/blogPosts';
import { attorneyProfile } from '../data/attorneyProfile';

const whyChooseUs = [
  {
    icon: FileText,
    title: 'Motion practice that works',
    description: 'Challenging stops, searches, and testing procedures with precision.',
  },
  {
    icon: Users,
    title: 'Local court knowledge',
    description: 'Negotiation informed by Delaware and Franklin County expectations.',
  },
  {
    icon: CheckCircle,
    title: 'Organized case management',
    description: 'Court-ready filings and thorough discovery review.',
  },
  {
    icon: Clock,
    title: 'Clear communication',
    description: 'Timelines and next steps at every milestone.',
  },
];

export default function HomePage({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <PageHero
        eyebrow="Central Ohio OVI/DUI & Criminal Defense"
        subtitle={attorneyProfile.homeSubtitle}
        title="Charged, arrested, or under investigation? Get calm next steps today."
        description="Talk through what happened, what matters first, and how to protect your license, record, and court position in Delaware and Franklin Counties."
        ctaLabel="Free Case Review"
        ctaHref="/contact"
        phoneNumber={PRIMARY_PHONE_DISPLAY}
        showQuickActions={false}
        phoneCtaId="home_hero_call_office"
      />

      {/* Why Choose Us Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div className="space-y-8">
	              <div className="space-y-4">
	                  <div className="flex items-center gap-3">
	                  <div className="accent-line" />
	                  <p className="eyebrow text-brand-goldText">Why Mango Law</p>
	                </div>
                <h2 className="text-display-sm md:text-display-md">
	                  Direct answers. Smart case planning. No unnecessary fog.
	                </h2>
	                <p className="text-lg text-brand-black/60">
	                  Nick Mango focuses on the part clients care about most: what happened, what the court is likely to care about next, and where a defense strategy can actually change the outcome.
	                </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                    aria-label="Meet Nick Mango"
                  >
                    Meet Nick →
                  </Link>
                  <p className="text-xs text-brand-black/48">
                    Practicing in Central Ohio since {attorneyProfile.practiceSinceYear} · Ohio Supreme Court Registration No.{' '}
                    {attorneyProfile.registrationNumber}
                  </p>
	              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {whyChooseUs.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Gold icons */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mango/10">
                      <item.icon className="h-5 w-5 text-brand-mangoText" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-black">{item.title}</h3>
                      <p className="mt-1 text-sm text-brand-black/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attorney Photo */}
	            <div className="relative">
	              <Link
                  href="/about"
                  className="group relative block overflow-hidden rounded-2xl shadow-soft-lg transition-all duration-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-mango/30"
                  style={{ background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' }}
                  aria-label="Read about Dominic “Nick” Mango"
                >
	                <div className="p-4">
	                  <div className="duotone-forest relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/headshots/nick-mango-hero-664w.jpg"
                      alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                      width={700}
                      height={900}
                      sizes="(min-width: 1024px) 520px, 100vw"
                      priority
                      className="mx-auto h-auto max-h-[520px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
	                </div>
	                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/90 via-brand-black/60 to-transparent p-8 transition-all duration-300 group-hover:from-brand-black/95">
	                  <h3 className="text-2xl font-bold text-white">Dominic "Nick" Mango</h3>
	                  <p className="text-sm font-medium text-brand-gold">Criminal Defense Attorney</p>
	                  <p className="mt-1 text-xs text-brand-offWhite/70">Ohio Supreme Court Registration No. 0071238</p>
	                  <p className="mt-2 text-xs text-brand-offWhite/90">Serving Delaware, Franklin & surrounding counties throughout Central Ohio.</p>
	                </div>
	              </Link>
	            </div>
	          </div>
	        </div>
	      </section>

      <PracticeAreaCardGrid />

      <RelatedDefenseGuides
        title="Start with the page that sounds most like your situation."
        description="If you already know the issue driving the case, use one of these direct paths instead of digging through broad overviews first."
        links={[
          {
            title: 'First offense OVI in Ohio',
            description: 'What to expect after a first OVI arrest, including court, license, and immediate next steps.',
            href: '/first-offense-ovi-ohio',
          },
          {
            title: 'Felony OVI defense',
            description: 'Where repeat offenses, higher stakes, and evidence challenges change the defense plan.',
            href: '/felony-ovi-lawyer-ohio',
          },
          {
            title: 'OVI refusal defense',
            description: 'How refusal allegations affect the ALS side and what usually matters in court.',
            href: '/ovi-test-refusal-lawyer-ohio',
          },
          {
            title: 'ALS license suspension defense',
            description: 'A clearer look at the suspension timeline, driving privileges, and pressure points.',
            href: '/als-license-suspension-ohio',
          },
          {
            title: 'Motion to suppress OVI evidence',
            description: 'The stop, testing, and search issues that often decide whether evidence stays in.',
            href: '/motion-to-suppress-ovi-ohio',
          },
          {
            title: 'Ohio DUI checkpoint map',
            description: 'Track announced checkpoint activity, recent history, and the Ohio areas that show up most often.',
            href: '/resources/dui-checkpoints',
          },
          {
            title: 'What to do after a DUI checkpoint stop',
            description: 'A practical checklist for court dates, license paperwork, evidence, and next steps after a stop.',
            href: '/blog/what-to-do-after-dui-checkpoint-stop-ohio',
          },
          {
            title: 'Ohio OVI driving privileges and ALS',
            description: 'A practical explainer on license suspension timing, driving privileges, and the paperwork that matters early.',
            href: '/blog/ohio-ovi-driving-privileges-als',
          },
          {
            title: 'Domestic violence first-offense defense',
            description: 'A first-step guide for allegations that can affect criminal court and family life at once.',
            href: '/domestic-violence-first-offense-ohio-defense',
          },
          {
            title: 'Civil protection order defense',
            description: 'How to get ready for the hearing, the evidence fight, and the practical fallout.',
            href: '/civil-protection-order-defense-ohio',
          },
          {
            title: 'Drug possession vs trafficking defense',
            description: 'Why the charge distinction matters and where the evidence usually gets challenged.',
            href: '/drug-possession-vs-trafficking-ohio-defense',
          },
          {
            title: 'Charged with drug possession in Ohio?',
            description: 'A practical first-step article on search issues, what the state must prove, and what to do next.',
            href: '/blog/drug-possession-charge-ohio-what-to-do-next',
          },
        ]}
      />

      <section className="section bg-white">
        <div className="container">
          <DeferredSection minHeight={420}>
            <TestimonialsList variant="featured" />
          </DeferredSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="accent-line" />
                  <p className="eyebrow text-brand-goldText">Request a Case Review</p>
                </div>
                <h2 className="text-display-sm md:text-display-md">
                  Tell us what happened and we’ll help you sort the urgent part first.
                </h2>
                <p className="text-lg text-brand-black/60">
                  Reach out if you need a quick read on license issues, bond conditions, the next court date, or how serious the charge really is.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`tel:${PRIMARY_PHONE_TEL}`}
                  className="group rounded-[1.5rem] border border-brand-black/10 bg-brand-offWhite/45 p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
                  data-cta="home_contact_call_office"
                  onClick={() => {
                    trackCtaClick('home_contact_call_office');
                    trackLeadSubmitted('phone', 'home_contact_call_office', {
                      target_number: PRIMARY_PHONE_TEL,
                    });
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-mango/12 text-brand-mangoText transition-colors group-hover:bg-brand-mango/18">
                    <Phone className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-brand-black/60">Need the fastest response?</p>
                  <p className="mt-1 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-mangoText">
                    Call or text {PRIMARY_PHONE_DISPLAY}
                  </p>
                </a>

                <a
                  href={`mailto:${OFFICE_EMAIL}`}
                  className="group rounded-[1.5rem] border border-brand-black/10 bg-brand-offWhite/45 p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
                  data-cta="home_contact_email_office"
                  onClick={() => {
                    trackCtaClick('home_contact_email_office');
                    trackLeadSubmitted('email', 'home_contact_email_office', {
                      target_email: OFFICE_EMAIL,
                    });
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-leaf/12 text-brand-leaf transition-colors group-hover:bg-brand-leaf/18">
                    <Mail className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-brand-black/60">Prefer to send details first?</p>
                  <p className="mt-1 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-leaf">
                    Email {OFFICE_EMAIL}
                  </p>
                </a>
              </div>

              <div className="rounded-[1.75rem] border border-brand-black/10 bg-brand-offWhite/55 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-goldText">What happens next</p>
                <ol className="mt-4 space-y-3 text-sm text-brand-black/70">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">1</span>
                    <span>We review the facts you send over and identify the first real priority.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">2</span>
                    <span>You get a prompt reply with clearer next steps and a recommendation on the best follow-up.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">3</span>
                    <span>If it makes sense to move forward, we schedule the strategy conversation and case review.</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="card border-brand-black/5 bg-brand-offWhite p-8 shadow-soft-lg">
              <DeferredSection minHeight={380}>
                <QuickIntakeForm />
              </DeferredSection>
            </div>
          </div>
        </div>
      </section>

      <DeferredSection minHeight={520}>
        <BlogSection posts={posts} />
      </DeferredSection>

      <DeferredSection minHeight={420}>
        <LocationBlock />
      </DeferredSection>

      <DeferredSection minHeight={260}>
        <CTASection
          title="Need counsel now? Start with the conversation that clears up the next move."
          body="If the charge is fresh, the paperwork is confusing, or the court date is close, reach out now instead of guessing at the timeline."
          primaryLabel="Free Case Review"
          primaryHref="/contact"
          secondaryLabel={PRIMARY_PHONE_DISPLAY}
          secondaryHref={`tel:${PRIMARY_PHONE_TEL}`}
          secondaryCtaId="home_cta_call_office"
        />
      </DeferredSection>
    </>
  );
}
