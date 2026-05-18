'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import FooterAccordion from './FooterAccordion';
import {
  footerOviGuideLinks,
  footerResourceLinks,
  footerServiceLinks,
} from '../data/navigation';
import {
  OFFICE_ADDRESS_CITY_STATE_ZIP,
  OFFICE_ADDRESS_STREET,
  OFFICE_EMAIL,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  SECONDARY_OFFICE_PHONE_DISPLAY,
  SECONDARY_OFFICE_PHONE_TEL,
} from '../lib/contactInfo';
import { getCopyrightText, COMPANY_START_YEAR } from '../lib/legalDocuments';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import { attorneyProfile } from '../data/attorneyProfile';

function FooterLinkList({
  links,
  compact = false,
}: {
  links: Array<{ label: string; href: string }>;
  compact?: boolean;
}) {
  return (
    <ul className={compact ? 'space-y-2' : 'space-y-3'}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={compact ? 'text-sm text-brand-offWhite/70 transition-colors hover:text-brand-leaf' : 'text-sm text-brand-offWhite/72 transition-colors hover:text-brand-leaf'}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#11221A] to-brand-forest text-brand-offWhite"
      role="contentinfo"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-leaf via-brand-mango to-brand-gold" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[320px] w-[320px] rounded-full bg-brand-mango/8 blur-3xl" />

      <div className="container relative py-12 lg:py-16">
        <div className="space-y-8 lg:hidden">
          <div className="rounded-[1.75rem] border border-brand-offWhite/10 bg-white/5 p-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/brand/mango-logo-primary-fullcolor-tagline-cropped-to-content.png"
                alt="Mango Law LLC"
                width={1704}
                height={555}
                className="h-14 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-offWhite/68">
              Straight answers, steady communication, and a defense plan that fits the charge in front of you.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/85 transition-colors hover:text-brand-leaf"
                data-cta="footer_mobile_call_office"
                onClick={() => {
                  trackCtaClick('footer_mobile_call_office');
                  trackLeadSubmitted('phone', 'footer_mobile_call_office', {
                    target_number: PRIMARY_PHONE_TEL,
                  });
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mango/12">
                  <Phone className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/50">Call or text Mango Law</div>
                  <div className="font-semibold">{PRIMARY_PHONE_DISPLAY}</div>
                </div>
              </a>

              <a
                href={`mailto:${OFFICE_EMAIL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/85 transition-colors hover:text-brand-leaf"
                data-cta="footer_mobile_email_office"
                onClick={() => {
                  trackCtaClick('footer_mobile_email_office');
                  trackLeadSubmitted('email', 'footer_mobile_email_office', {
                    target_email: OFFICE_EMAIL,
                  });
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-leaf/14">
                  <Mail className="h-4 w-4 text-brand-leaf" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/50">Email</div>
                  <div className="font-semibold">{OFFICE_EMAIL}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm text-brand-offWhite/80">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8">
                  <MapPin className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div className="font-semibold">{OFFICE_ADDRESS_STREET}</div>
                  <div className="text-brand-offWhite/58">{OFFICE_ADDRESS_CITY_STATE_ZIP}</div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="btn btn-primary mt-6 w-full text-center">
              Start Free Case Review
            </Link>
          </div>

          <div className="rounded-[1.5rem] border border-brand-offWhite/10 bg-white/5 px-5">
            <FooterAccordion title="Core Services">
              <FooterLinkList links={footerServiceLinks} compact />
            </FooterAccordion>
            <FooterAccordion title="OVI Defense Guides">
              <FooterLinkList links={footerOviGuideLinks} compact />
            </FooterAccordion>
            <FooterAccordion title="Resources & Firm">
              <FooterLinkList links={footerResourceLinks} compact />
            </FooterAccordion>
          </div>
        </div>

        <div className="hidden gap-8 lg:grid lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-brand-offWhite/10 bg-white/5 p-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/brand/mango-logo-primary-fullcolor-tagline-cropped-to-content.png"
                alt="Mango Law LLC"
                width={1704}
                height={555}
                className="h-14 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-offWhite/68">
              Criminal and OVI defense rooted in clear advice, careful preparation, and calm communication when the stakes are high.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/84 transition-colors hover:text-brand-leaf"
                data-cta="footer_call_office"
                onClick={() => {
                  trackCtaClick('footer_call_office');
                  trackLeadSubmitted('phone', 'footer_call_office', {
                    target_number: PRIMARY_PHONE_TEL,
                  });
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-mango/12">
                  <Phone className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/50">Primary call/text</div>
                  <div className="font-semibold">{PRIMARY_PHONE_DISPLAY}</div>
                </div>
              </a>

              <a
                href={`tel:${SECONDARY_OFFICE_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/84 transition-colors hover:text-brand-leaf"
                data-cta="footer_call_secondary"
                onClick={() => {
                  trackCtaClick('footer_call_secondary');
                  trackLeadSubmitted('phone', 'footer_call_secondary', {
                    target_number: SECONDARY_OFFICE_PHONE_TEL,
                  });
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-leaf/14">
                  <Phone className="h-4 w-4 text-brand-leaf" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/50">Secondary office line</div>
                  <div className="font-semibold">{SECONDARY_OFFICE_PHONE_DISPLAY}</div>
                </div>
              </a>

              <a
                href={`mailto:${OFFICE_EMAIL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/84 transition-colors hover:text-brand-leaf"
                data-cta="footer_email_office"
                onClick={() => {
                  trackCtaClick('footer_email_office');
                  trackLeadSubmitted('email', 'footer_email_office', {
                    target_email: OFFICE_EMAIL,
                  });
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
                  <Mail className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/50">Email</div>
                  <div className="font-semibold">{OFFICE_EMAIL}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm text-brand-offWhite/78">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
                  <MapPin className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div className="font-semibold">{OFFICE_ADDRESS_STREET}</div>
                  <div className="text-brand-offWhite/56">{OFFICE_ADDRESS_CITY_STATE_ZIP}</div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="btn btn-primary mt-6 inline-flex">
              Start Free Case Review
            </Link>
          </div>

          <div>
            <h4 className="eyebrow text-brand-gold">Core Services</h4>
            <div className="mt-5">
              <FooterLinkList links={footerServiceLinks} />
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-brand-gold">OVI Defense Guides</h4>
            <div className="mt-5">
              <FooterLinkList links={footerOviGuideLinks} />
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-brand-gold">Resources & Firm</h4>
            <div className="mt-5">
              <FooterLinkList links={footerResourceLinks} />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-offWhite/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-brand-offWhite/50 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span>© {getCopyrightText(COMPANY_START_YEAR)} Mango Law LLC. All rights reserved.</span>
            <span className="text-brand-offWhite/40">
              Dominic N. Mango | Ohio Supreme Court Registration No. {attorneyProfile.registrationNumber} | Practicing in Central Ohio since {attorneyProfile.practiceSinceYear}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-brand-leaf">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand-leaf">
              Terms of Use
            </Link>
            <a
              href="https://sistrunktech.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="transition-colors hover:text-brand-leaf"
            >
              Built and hosted by Sistrunk Tech in Columbus, Ohio.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
