'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, FileText, Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import LocationBlock from '../components/LocationBlock';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import {
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  OFFICE_EMAIL,
} from '../lib/contactInfo';
import { attorneyProfile } from '../data/attorneyProfile';
import { contactIssueGuideLinks } from '../data/seoRoutingContent';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Mango Law"
        title="Tell us what happened and we’ll help sort the first move."
        description="Use the form for a clear written summary, or call/text if the situation is moving quickly and you need the fastest response."
        ctaLabel="Call/Text now"
        ctaHref={`tel:${PRIMARY_PHONE_TEL}`}
        variant="light"
        compact
        showQuickActions={false}
        phoneCtaId="contact_hero_call_office"
      />

      <section className="bg-white">
        <div className="container grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-brand-black">Choose the fastest way to reach us.</h2>
              <p className="text-sm text-brand-black/70">
                If you already know the urgent issue, say it directly. OVI arrests, no-contact orders, search issues,
                bond conditions, court dates, and police contact are all useful to mention up front.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="group rounded-[1.5rem] border border-brand-black/10 bg-brand-offWhite/45 p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
                data-cta="contact_page_call_office"
                onClick={() => {
                  trackCtaClick('contact_page_call_office');
                  trackLeadSubmitted('phone', 'contact_page_call_office', {
                    target_number: PRIMARY_PHONE_TEL,
                  });
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-mango/12 text-brand-mangoText">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-medium text-brand-black/60">Call or text now</p>
                <p className="mt-1 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-mangoText">
                  {PRIMARY_PHONE_DISPLAY}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-mangoText transition-colors group-hover:text-brand-leaf">
                  Fastest response
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>

              <a
                href={`mailto:${OFFICE_EMAIL}`}
                className="group rounded-[1.5rem] border border-brand-black/10 bg-brand-offWhite/45 p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
                data-cta="contact_page_email_office"
                onClick={() => {
                  trackCtaClick('contact_page_email_office');
                  trackLeadSubmitted('email', 'contact_page_email_office', {
                    target_email: OFFICE_EMAIL,
                  });
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-leaf/12 text-brand-leaf">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-medium text-brand-black/60">Send a written summary</p>
                <p className="mt-1 text-lg font-bold text-brand-black transition-colors group-hover:text-brand-leaf">
                  {OFFICE_EMAIL}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-leaf">
                  Good for detailed timelines
                </span>
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-brand-black/10 bg-brand-offWhite/55 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-goldText">What happens next</p>
              <ol className="mt-4 space-y-3 text-sm text-brand-black/70">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">1</span>
                  <span>Share the basics through the form or by phone/text if timing matters.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">2</span>
                  <span>We review the facts and identify the first decision that actually needs attention.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">3</span>
                  <span>You get a prompt response with next steps and the best follow-up option.</span>
                </li>
              </ol>
            </div>

            <div className="rounded-[1.75rem] border border-brand-black/10 bg-white p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-leaf/10 text-brand-leaf">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">Helpful details to include</p>
                  <ul className="mt-3 space-y-2 text-sm text-brand-black/65">
                    <li>Charge or allegation, if you know it</li>
                    <li>County, court date, or bond conditions</li>
                    <li>License suspension, no-contact, or search-related questions</li>
                    <li>Any immediate deadline you are worried about</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-[1.5rem] border border-brand-black/10 bg-white p-5 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mango/12 text-brand-mangoText">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-black">Serving Delaware and nearby courts</p>
                <p className="mt-1 text-sm text-brand-black/60">
                  Based in Delaware, Ohio and handling OVI, criminal-defense, domestic-violence, drug, and related protection-order matters throughout Delaware and Franklin Counties.
                </p>
                <p className="mt-1 text-xs text-brand-black/45">
                  Led by {attorneyProfile.legalName}, Ohio Supreme Court Registration No. {attorneyProfile.registrationNumber}.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-mango/20 via-brand-offWhite to-brand-leaf/10 blur-xl" aria-hidden="true" />
            <div className="relative rounded-3xl border border-brand-black/10 bg-gradient-to-b from-brand-offWhite to-white p-6 shadow-soft-lg">
              <div className="mb-5 rounded-2xl border border-brand-black/8 bg-white px-4 py-3 text-sm text-brand-black/65">
                Share the version you know now. We can clarify the rest in follow-up.
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-offWhite/45">
        <div className="container py-12">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-goldText">Start with the closest guide</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand-black">If the issue is already clear, use the matching page first.</h2>
              <p className="mt-3 text-brand-black/70">
                These are the pages people most often need before or right after reaching out about an OVI, domestic-violence,
                drug, protection-order, or broader criminal-defense issue.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {contactIssueGuideLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-soft transition-colors hover:border-brand-mango/40"
                >
                  <p className="font-semibold text-brand-black">{item.title}</p>
                  <p className="mt-2 text-sm text-brand-black/65">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LocationBlock
        eyebrow="Serving Delaware County"
        title="Serving Delaware County and nearby courts"
        description="Located in Delaware, Ohio and serving clients across Delaware and Franklin Counties."
        mapHeight={280}
      />
    </>
  );
}
