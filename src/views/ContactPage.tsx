'use client';

import { CheckCircle, Shield, Clock, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import PageHero from '../components/PageHero';
import LocationBlock from '../components/LocationBlock';
import { SEO } from '../lib/seo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL,
  GENERAL_OFFICE_PHONE_DISPLAY,
  GENERAL_OFFICE_PHONE_TEL,
} from '../lib/contactInfo';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Mango Law LLC | Delaware, OH Criminal Defense Attorney"
        description={`Schedule a consultation with experienced criminal defense attorney Dominic "Nick" Mango. Located in Delaware, OH. Call or text ${OFFICE_PHONE_DISPLAY} or email office@mango.law.`}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Contact', item: '/contact' },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Schedule a consult with Mango Law."
        description="Share a few details and we’ll respond promptly. For urgent matters, call or text our direct line."
        ctaLabel="Call/Text now"
        ctaHref={`tel:${OFFICE_PHONE_TEL}`}
        variant="light"
        phoneCtaId="contact_hero_call_office"
      />

      <section className="bg-white">
        <div className="container grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-brand-black">Send a message</h2>
              <p className="text-sm text-brand-black/70">
                Fast reply, clear next steps, and a plan you can understand.
              </p>
            </div>

            <div className="card bg-brand-offWhite/60">
              <p className="text-sm font-bold text-brand-black">What happens next</p>
              <ol className="mt-4 space-y-3 text-sm text-brand-black/70">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">1</span>
                  <span>Submit the form (or call if urgent).</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">2</span>
                  <span>We review and respond promptly with next steps.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-mango/15 text-xs font-bold text-brand-mangoText">3</span>
                  <span>We schedule a strategy call and outline your options.</span>
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              {[
                { icon: MapPin, title: 'Local Delaware County representation', body: 'Focused on Delaware and nearby courts.' },
                { icon: Clock, title: 'Responsive communication', body: 'Clear timelines and quick updates.' },
                { icon: Shield, title: 'Trial-ready defense', body: 'Prepared for hearings and negotiations.' },
                { icon: CheckCircle, title: 'Confidential consultations', body: 'Share details privately and securely.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-brand-black/10 bg-brand-offWhite/40 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-mango/10">
                    <item.icon className="h-5 w-5 text-brand-mangoText" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-black">{item.title}</p>
                    <p className="mt-1 text-xs text-brand-black/60">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-goldText">Prefer to call?</p>
              <p className="mt-2 text-sm text-brand-black/70">For the quickest response, call or text our direct line.</p>
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${OFFICE_PHONE_TEL}`}
                  className="btn btn-primary w-full"
                  data-cta="contact_page_call_office"
                  onClick={() => {
                    trackCtaClick('contact_page_call_office');
                    trackLeadSubmitted('phone', 'contact_page_call_office', {
                      target_number: OFFICE_PHONE_TEL,
                    });
                  }}
                >
                  Call/Text {OFFICE_PHONE_DISPLAY}
                </a>
                <a
                  href={`tel:${GENERAL_OFFICE_PHONE_TEL}`}
                  className="btn btn-secondary w-full"
                  data-cta="contact_page_call_secondary"
                  onClick={() => {
                    trackCtaClick('contact_page_call_secondary');
                    trackLeadSubmitted('phone', 'contact_page_call_secondary', {
                      target_number: GENERAL_OFFICE_PHONE_TEL,
                    });
                  }}
                >
                  Office {GENERAL_OFFICE_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-mango/20 via-brand-offWhite to-brand-leaf/10 blur-xl" aria-hidden="true" />
            <div className="relative rounded-3xl border border-brand-black/10 bg-gradient-to-b from-brand-offWhite to-white p-6 shadow-soft-lg">
              <ContactForm />
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
