import { Link } from 'react-router-dom';
import { Phone, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import PageHero from '../components/PageHero';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';

export default function WhatToDoAfterOVIPage() {
  return (
    <>
      <PageHero
        eyebrow="OVI Defense Resources"
        title="What to Do After an OVI Arrest"
        description="Critical steps to take in the first 24-48 hours after an OVI arrest in Ohio. Time-sensitive deadlines and important decisions explained."
        compact
        alignLeft
        showQuickActions={false}
        phoneCtaId="what_to_do_ovi_hero_call_office"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 rounded-xl border-2 border-red-500/20 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-red-600" />
                <div>
                  <h2 className="mb-2 font-display text-lg font-bold text-brand-black">
                    Time-Sensitive: License Appeal Deadline
                  </h2>
                  <p className="mb-4 text-brand-black/70">
                    In Ohio, you only have <strong>30 days</strong> from your arrest to appeal an
                    Administrative License Suspension (ALS). Missing this deadline can result in
                    losing driving privileges for an extended period.
                  </p>
                  <a
                    href={`tel:${OFFICE_PHONE_TEL}`}
                    className="btn btn-primary inline-flex items-center gap-2"
                    data-cta="what_to_do_ovi_call_office"
                    onClick={() => {
                      trackCtaClick('what_to_do_ovi_call_office');
                      trackLeadSubmitted('phone', 'what_to_do_ovi_call_office', {
                        target_number: OFFICE_PHONE_TEL,
                      });
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    Call {OFFICE_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="mb-12 rounded-xl border border-brand-black/10 bg-brand-offWhite p-8 text-center">
                <Clock className="mx-auto mb-4 h-12 w-12 text-brand-leaf" />
                <h2 className="mb-2 font-display text-xl font-bold text-brand-black">
                  Comprehensive Guide Coming Soon
                </h2>
                <p className="mb-6 text-brand-black/70">
                  We are preparing a detailed step-by-step guide for what to do after an OVI arrest
                  in Delaware County and throughout Central Ohio.
                </p>
                <p className="text-sm text-brand-black/60">
                  In the meantime, please contact our office immediately after an arrest.
                  Early intervention often leads to better outcomes.
                </p>
              </div>

              <h2 className="flex items-center gap-3 text-brand-black">
                <CheckCircle className="h-6 w-6 text-brand-leaf" />
                Topics We Will Cover
              </h2>
              <ul className="text-brand-black/80">
                <li>Immediate steps to take after being released</li>
                <li>Understanding the 30-day ALS appeal deadline</li>
                <li>What documents to gather and preserve</li>
                <li>How to request occupational driving privileges</li>
                <li>What to expect at your arraignment</li>
                <li>The difference between ALS and court-ordered suspensions</li>
                <li>How a first OVI differs from subsequent offenses</li>
                <li>Why early attorney involvement matters</li>
              </ul>

              <div className="mt-8 rounded-xl border border-brand-leaf/20 bg-brand-leaf/5 p-6">
                <h3 className="mb-3 font-display text-lg font-bold text-brand-black">
                  Related Resource
                </h3>
                <p className="mb-4 text-brand-black/70">
                  Learn more about OVI charges, penalties, and defense strategies on our main
                  OVI/DUI defense page.
                </p>
                <Link
                  to="/ovi-dui-defense-delaware-oh"
                  className="font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
                >
                  OVI/DUI Defense Overview
                </Link>
              </div>
            </div>

            <div className="mt-12 rounded-xl bg-brand-forest p-8 text-center">
              <h3 className="mb-4 font-display text-xl font-bold text-white">
                Just Arrested for OVI?
              </h3>
              <p className="mb-6 text-brand-offWhite/80">
                The sooner you act, the more options you may have. Get experienced guidance today.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
