import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { SEO, attorneySchema } from '../lib/seo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL,
  GENERAL_OFFICE_PHONE_DISPLAY,
  GENERAL_OFFICE_PHONE_TEL,
  OFFICE_EMAIL,
} from '../lib/contactInfo';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Dominic Mango | Criminal Defense Attorney Delaware, OH"
        description="OSU Moritz College of Law graduate with 26+ years of Ohio criminal law experience. Former prosecutor with hundreds of jury trials. Certified in BAC DataMaster and NHTSA field sobriety testing."
        structuredData={attorneySchema}
      />
      <PageHero
        eyebrow="About"
        title="Dominic Mango — focused on clear, assertive defense in Delaware, Ohio."
        description="A practice built on preparation, straight talk, and courtroom advocacy that respects your time and goals."
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
                      <p className="mt-1 text-brand-black/70 font-medium">Criminal Defense Attorney</p>
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
                            <span className="text-xs text-brand-black/60">Call/Text (Direct)</span>
                            <span className="font-semibold">{OFFICE_PHONE_DISPLAY}</span>
                          </div>
                        </a>
                        <a
                          href={`tel:${GENERAL_OFFICE_PHONE_TEL}`}
                          className="inline-flex items-center gap-2 text-brand-leaf hover:text-brand-leaf/80 transition-colors"
                          data-cta="about_mobile_call_secondary"
                          onClick={() => {
                            trackCtaClick('about_mobile_call_secondary');
                            trackLeadSubmitted('phone', 'about_mobile_call_secondary', {
                              target_number: GENERAL_OFFICE_PHONE_TEL,
                            });
                          }}
                        >
                          <span className="text-lg">📱</span>
                          <div className="flex flex-col">
                            <span className="text-xs text-brand-black/60">Office</span>
                            <span className="font-semibold">{GENERAL_OFFICE_PHONE_DISPLAY}</span>
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
                      <img
                        src="/images/headshots/nick-mango-standing-profile-court-steps.png"
                        alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                        width={496}
                        height={984}
                        className="h-[340px] w-full object-contain sm:h-[420px]"
                        loading="lazy"
                        decoding="async"
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
                        <img
                          src="/images/headshots/nick-mango-standing-profile-court-steps.png"
                          alt="Dominic 'Nick' Mango, Criminal Defense Attorney"
                          width={496}
                          height={984}
                          className="h-[560px] w-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 rounded-xl border border-brand-black/10 bg-brand-offWhite p-6 shadow-soft">
                    <h3 className="text-2xl font-bold text-brand-black">Dominic &quot;Nick&quot; Mango</h3>
                    <p className="text-brand-black/70 font-medium">Criminal Defense Attorney</p>
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
                          <span className="text-xs text-brand-black/60">Call/Text (Direct)</span>
                          <span className="font-semibold">{OFFICE_PHONE_DISPLAY}</span>
                        </div>
                      </a>
                      <a
                        href={`tel:${GENERAL_OFFICE_PHONE_TEL}`}
                        className="inline-flex items-center gap-2 text-brand-leaf hover:text-brand-leaf/80 transition-colors"
                        data-cta="about_call_secondary"
                        onClick={() => {
                          trackCtaClick('about_call_secondary');
                          trackLeadSubmitted('phone', 'about_call_secondary', {
                            target_number: GENERAL_OFFICE_PHONE_TEL,
                          });
                        }}
                      >
                        <span className="text-lg">📱</span>
                        <div className="flex flex-col">
                          <span className="text-xs text-brand-black/60">Office</span>
                          <span className="font-semibold">{GENERAL_OFFICE_PHONE_DISPLAY}</span>
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
                    <span>Delaware County focus with awareness of local court practices</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Organized discovery review to spot procedural and evidentiary gaps</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Respectful, discreet handling of sensitive matters</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Experience & Background</h3>
                <p className="text-brand-black/80 leading-relaxed">
                  Dominic Mango is a graduate of The Ohio State University's Moritz College of Law and has been practicing
                  criminal law in Central Ohio since 1999. He is licensed to practice in Ohio (not the state of Delaware) and
                  appears in all Ohio courts, including Federal Court and the Southern District of Ohio. Mango Law LLC was
                  established in February 2009 in Delaware, Ohio. With hundreds of jury trials under his belt, Dominic has
                  extensive experience in jury selection, trial strategy, and courtroom advocacy.
                </p>
                <p className="text-brand-black/80 leading-relaxed">
                  His background includes serving as an Assistant Prosecuting Attorney in Delaware County (1999-2001), where
                  he gained invaluable insight into how prosecutors build cases. This prosecutor's perspective, combined with
                  over two decades of defense work, gives him a strategic advantage in identifying weaknesses and defending clients.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-2xl font-semibold text-brand-black">Certifications & Training</h3>
                <ul className="space-y-3 text-brand-black/80">
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Certified in the operation and calibration of BAC DataMaster breath testing instruments</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Certified in NHTSA Standardized Field Sobriety Test administration and evaluation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Regular presenter at continuing legal education (CLE) seminars on OVI defense and trial practice</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-mango font-bold">•</span>
                    <span>Speaker at OVI driver intervention programs in Franklin and Delaware Counties</span>
                  </li>
                </ul>
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
                    <p className="text-brand-black/70">Assistant Prosecuting Attorney, Delaware County, Ohio</p>
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
