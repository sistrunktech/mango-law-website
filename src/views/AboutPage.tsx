'use client';

import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { SEO, attorneySchema } from '../lib/seo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import {
  attorneyProfile,
  attorneyPublicRecordHighlights,
  attorneyRepresentativeMatters,
  attorneyTrustMetadata,
} from '../data/attorneyProfile';
import {
  NICK_DIRECT_PHONE_DISPLAY,
  NICK_DIRECT_PHONE_TEL,
  OFFICE_EMAIL,
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL,
} from '../lib/contactInfo';
import { aboutPageMetaDescription, aboutSupportLinks } from '../data/seoRoutingContent';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Dominic Mango | Delaware, OH Criminal Defense & OVI Attorney"
        description={aboutPageMetaDescription}
        structuredData={attorneySchema}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
        ]}
      />
      <PageHero
        eyebrow="About"
        title="Dominic Mango — focused on clear, assertive defense in Delaware, Ohio."
        description="Learn how Nick Mango approaches OVI and criminal-defense matters in Central Ohio, then move into the page that best matches the charge or issue."
        ctaLabel="Schedule a consult"
        ctaHref="/contact"
        variant="light"
        phoneCtaId="about_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-1">
              {/* Mobile: single combined profile card */}
              <div className="mx-auto max-w-sm lg:hidden">
                <div className="overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-soft">
                  <div className="px-5 pb-4 pt-5">
                    <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
                      <h3 className="text-2xl font-bold text-brand-black">Dominic &quot;Nick&quot; Mango</h3>
                      <p className="mt-1 text-brand-black/70 font-medium">Ohio Criminal Defense Attorney</p>
                      <p className="mt-1 text-xs text-brand-black/55">
                        Ohio Supreme Court Registration No. {attorneyProfile.registrationNumber}
                      </p>
                      <div className="mt-4 flex flex-col gap-3 border-t border-brand-black/10 pt-4">
                        <a
                          href={`tel:${OFFICE_PHONE_TEL}`}
                          className="inline-flex items-center gap-2 text-brand-mango hover:text-brand-mango/80 transition-colors"
                          data-cta="about_mobile_call_office"
                          onClick={() => {
                            trackCtaClick('about_mobile_call_office');
                            trackLeadSubmitted('phone', 'about_mobile_call_office', {
                              target_number: OFFICE_PHONE_TEL,
                            });
                          }}
                        >
                          <span className="text-lg">📞</span>
                          <div className="flex flex-col">
                            <span className="text-xs text-brand-black/60">Primary Call/Text</span>
                            <span className="font-semibold">{OFFICE_PHONE_DISPLAY}</span>
                          </div>
                        </a>
                        <a
                          href={`tel:${NICK_DIRECT_PHONE_TEL}`}
                          className="inline-flex items-center gap-2 text-brand-leaf hover:text-brand-leaf/80 transition-colors"
                          data-cta="about_mobile_call_secondary"
                          onClick={() => {
                            trackCtaClick('about_mobile_call_secondary');
                            trackLeadSubmitted('phone', 'about_mobile_call_secondary', {
                              target_number: NICK_DIRECT_PHONE_TEL,
                            });
                          }}
                        >
                          <span className="text-lg">📱</span>
                          <div className="flex flex-col">
                            <span className="text-xs text-brand-black/60">Secondary line</span>
                            <span className="font-semibold">{NICK_DIRECT_PHONE_DISPLAY}</span>
                          </div>
                        </a>
                        <a
                          href={`mailto:${OFFICE_EMAIL}`}
                          className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 transition-colors"
                          data-cta="about_mobile_email_office"
                          onClick={() => {
                            trackCtaClick('about_mobile_email_office');
                            trackLeadSubmitted('email', 'about_mobile_email_office', {
                              target_email: OFFICE_EMAIL,
                            });
                          }}
                        >
                          <span className="text-lg">✉️</span>
                          <span className="font-semibold">{OFFICE_EMAIL}</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-brand-offWhite to-white p-3 pt-0">
                    <div className="relative overflow-hidden rounded-xl bg-white ring-1 ring-brand-black/5">
                      <Image
                        src="/images/headshots/nick-mango-standing-profile-court-steps.png"
                        alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                        width={496}
                        height={984}
                        className="h-[340px] w-full object-contain sm:h-[420px]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop: sticky photo + contact card */}
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <div className="relative overflow-hidden rounded-2xl border border-brand-black/10 bg-gradient-to-br from-brand-offWhite to-white shadow-soft-lg">
                    <div className="p-4">
                      <div className="relative overflow-hidden rounded-xl bg-white ring-1 ring-brand-black/5">
                        <Image
                          src="/images/headshots/nick-mango-standing-profile-court-steps.png"
                          alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                          width={496}
                          height={984}
                          className="h-[560px] w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 rounded-xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-soft">
                    <h3 className="text-2xl font-bold text-brand-black">Dominic &quot;Nick&quot; Mango</h3>
                    <p className="text-brand-black/70 font-medium">Ohio Criminal Defense Attorney</p>
                    <p className="text-xs text-brand-black/55">
                      Ohio Supreme Court Registration No. {attorneyProfile.registrationNumber}
                    </p>
                    <div className="flex flex-col gap-3 border-t border-brand-black/10 pt-3">
                      <a
                        href={`tel:${OFFICE_PHONE_TEL}`}
                        className="inline-flex items-center gap-2 text-brand-mango hover:text-brand-mango/80 transition-colors"
                        data-cta="about_call_office"
                        onClick={() => {
                          trackCtaClick('about_call_office');
                          trackLeadSubmitted('phone', 'about_call_office', {
                            target_number: OFFICE_PHONE_TEL,
                          });
                        }}
                      >
                        <span className="text-lg">📞</span>
                        <div className="flex flex-col">
                          <span className="text-xs text-brand-black/60">Primary Call/Text</span>
                          <span className="font-semibold">{OFFICE_PHONE_DISPLAY}</span>
                        </div>
                      </a>
                      <a
                        href={`tel:${NICK_DIRECT_PHONE_TEL}`}
                        className="inline-flex items-center gap-2 text-brand-leaf hover:text-brand-leaf/80 transition-colors"
                        data-cta="about_call_secondary"
                        onClick={() => {
                          trackCtaClick('about_call_secondary');
                          trackLeadSubmitted('phone', 'about_call_secondary', {
                            target_number: NICK_DIRECT_PHONE_TEL,
                          });
                        }}
                      >
                        <span className="text-lg">📱</span>
                        <div className="flex flex-col">
                          <span className="text-xs text-brand-black/60">Secondary line</span>
                          <span className="font-semibold">{NICK_DIRECT_PHONE_DISPLAY}</span>
                        </div>
                      </a>
                      <a
                        href={`mailto:${OFFICE_EMAIL}`}
                        className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 transition-colors"
                        data-cta="about_email_office"
                        onClick={() => {
                          trackCtaClick('about_email_office');
                          trackLeadSubmitted('email', 'about_email_office', {
                            target_email: OFFICE_EMAIL,
                          });
                        }}
                      >
                        <span className="text-lg">✉️</span>
                        <span className="font-semibold">{OFFICE_EMAIL}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <h2 className="font-display text-3xl font-bold text-brand-black">Defense approach</h2>
                <p className="text-lg text-brand-black/80 leading-relaxed">
                  Dominic focuses on early case assessment, motion practice where facts support it, and candid communication.
                  You will always know what is happening, why it matters, and what the options are.
                </p>
                <p className="text-lg text-brand-black/80 leading-relaxed">
                  Whether negotiating with prosecutors or preparing for hearing, the goal is to protect your record and
                  minimize collateral impacts on work, licensure, or family.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Local knowledge</h3>
                <ul className="space-y-3 text-brand-black/80">
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Delaware and Franklin County focus across OVI, criminal, domestic-violence, and drug-charge matters</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Organized discovery review to spot procedural, evidentiary, and search-related gaps</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Respectful, discreet handling of sensitive matters</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Start with the page closest to the charge or issue</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  People who land on the about page are usually verifying experience first, then deciding which guide actually
                  matches the allegation, hearing, or stop they are dealing with now.
                </p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {aboutSupportLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-2xl border border-brand-black/10 bg-brand-offWhite/50 p-5 transition-colors hover:border-brand-mango/40 hover:bg-white"
                    >
                      <p className="font-semibold text-brand-black">{item.title}</p>
                      <p className="mt-2 text-sm text-brand-black/65">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Experience & Background</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  {attorneyProfile.aboutIntro}
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  {attorneyProfile.aboutExpanded}
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  {attorneyProfile.aboutCourtAdmission}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Public record highlights</h3>
                <p className="text-brand-black/70 leading-relaxed">
                  These are selected public-source markers and representative credentials, not a complete case list or resume.
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-black/45">
                  Public-source review last updated {attorneyTrustMetadata.lastVerified}
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {attorneyPublicRecordHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-brand-black/10 bg-brand-offWhite/55 p-5 shadow-soft"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-goldText">
                        {item.label}
                      </p>
                      <p className="mt-2 text-xl font-bold text-brand-black">{item.value}</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/65">{item.detail}</p>
                      {item.sourceUrl && (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
                        >
                          {item.sourceLabel ?? 'View public source'} →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Representative published matters</h3>
                <p className="text-brand-black/70 leading-relaxed">
                  Published trial and appellate opinions are only part of a defense practice, but they do provide a public record of the kinds of OVI issues Dominic Mango has litigated.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {attorneyRepresentativeMatters.map((matter) => (
                    <a
                      key={matter.title}
                      href={matter.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-soft transition-colors hover:border-brand-mango/35"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-goldText">
                        {matter.court}
                      </p>
                      <p className="mt-2 text-lg font-bold text-brand-black">{matter.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-brand-black/65">{matter.summary}</p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf">
                        View opinion →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Professional Timeline</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-brand-mango pl-4">
                    <p className="font-semibold text-brand-black">Feb 2009 – Present</p>
                    <p className="text-brand-black/70">Attorney, Mango Law LLC</p>
                  </div>
                  <div className="border-l-4 border-brand-leaf pl-4">
                    <p className="font-semibold text-brand-black">2001 – 2009</p>
                    <p className="text-brand-black/70">Associate Attorney, Local Firm</p>
                  </div>
                  <div className="border-l-4 border-brand-teal pl-4">
                    <p className="font-semibold text-brand-black">1999 – 2001</p>
                    <p className="text-brand-black/70">Assistant prosecutor role, Delaware County area</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Philosophy</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  Every case is different, and cookie-cutter approaches don't work. Nick takes the time to understand your
                  unique situation, your goals, and what matters most to you. His defense strategy is tailored to your
                  specific circumstances, whether that means aggressive courtroom litigation or strategic negotiation.
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  You deserve an attorney who respects your time, answers your questions, and fights for your future. That's
                  the Mango Law difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Talk through your case with Dominic Mango"
        primaryLabel="Schedule a consult"
        primaryHref="/contact"
        secondaryLabel="Call the office"
        secondaryHref={`tel:${OFFICE_PHONE_TEL}`}
        secondaryCtaId="about_cta_call_office"
      />
    </>
  );
}
