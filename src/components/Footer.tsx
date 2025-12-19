import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { navLinks, practiceAreaLinks } from '../data/navigation';
import {
  OFFICE_PHONE_DISPLAY,
  OFFICE_PHONE_TEL,
  NICK_DIRECT_PHONE_DISPLAY,
  NICK_DIRECT_PHONE_TEL,
  OFFICE_EMAIL,
  OFFICE_ADDRESS_STREET,
  OFFICE_ADDRESS_CITY_STATE_ZIP,
} from '../lib/contactInfo';
import FooterAccordion from './FooterAccordion';

const resourceLinks = [
  { href: '/resources/dui-checkpoints', label: 'DUI Checkpoint Map' },
  { href: '/glossary', label: 'Legal Glossary' },
  { href: '/resources/bond-jail-information', label: 'Bond and Jail Information' },
  { href: '/resources/what-to-do-after-ovi-arrest', label: 'What to Do After an OVI Arrest' },
  { href: '/locations', label: 'Service Areas' },
];

const localSeoLinks = [
  { href: '/criminal-defense-delaware-oh', label: 'Delaware, OH Criminal Defense' },
  { href: '/ovi-dui-defense-delaware-oh', label: 'Delaware, OH OVI Defense' },
  { href: '/practice-areas', label: 'Central Ohio Criminal Defense' },
  { href: '/locations', label: 'Service Areas' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-brand-forest text-brand-offWhite" role="contentinfo">
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-brand-leaf via-brand-mango to-brand-leaf" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-brand-mango/5 blur-3xl" />

      <div className="container relative py-12 lg:py-16">
        <div className="pt-4 lg:hidden">
          <div className="mb-8">
            <Link to="/" className="mb-4 inline-block">
              <img
                src="/images/brand/mango-logo-white-cropped.png"
                alt="Mango Law LLC"
                width={48}
                height={48}
                className="h-12 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-brand-offWhite/60">
              Criminal defense for Delaware, Ohio. Clear guidance, assertive advocacy, and steady communication when it matters most.
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-leaf"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-mango/10">
                <Phone className="h-4 w-4 text-brand-mango" />
              </div>
              <div>
                <div className="text-xs text-brand-offWhite/50">Office</div>
                <div className="font-medium">{OFFICE_PHONE_DISPLAY}</div>
              </div>
            </a>
            <a
              href={`tel:${NICK_DIRECT_PHONE_TEL}`}
              className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-leaf"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-leaf/20">
                <Phone className="h-4 w-4 text-brand-leaf" />
              </div>
              <div>
                <div className="text-xs text-brand-offWhite/50">Nick Direct</div>
                <div className="font-medium">{NICK_DIRECT_PHONE_DISPLAY}</div>
              </div>
            </a>
            <a
              href={`mailto:${OFFICE_EMAIL}`}
              className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-leaf"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-mango/10">
                <Mail className="h-4 w-4 text-brand-mango" />
              </div>
              <div>
                <div className="text-xs text-brand-offWhite/50">Email</div>
                <div className="font-medium">{OFFICE_EMAIL}</div>
              </div>
            </a>
            <div className="flex items-center gap-3 text-sm text-brand-offWhite/80">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-offWhite/5">
                <MapPin className="h-4 w-4 text-brand-mango" />
              </div>
              <div>
                <div className="text-xs text-brand-offWhite/50">Office</div>
                <div className="font-medium">{OFFICE_ADDRESS_STREET}</div>
                <div className="text-brand-offWhite/60">{OFFICE_ADDRESS_CITY_STATE_ZIP}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-offWhite/10 pt-6">
            <FooterAccordion title="Navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-leaf"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Resources">
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-leaf"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>

            <FooterAccordion title="Practice Areas">
              <ul className="space-y-3">
                {practiceAreaLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-leaf"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/practice-areas"
                    className="text-sm font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
                  >
                    View all practice areas
                  </Link>
                </li>
              </ul>
            </FooterAccordion>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[1.3fr_1fr_1fr_1.2fr_1.1fr] lg:gap-8">
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <img
                src="/images/brand/mango-logo-white-cropped.png"
                alt="Mango Law LLC"
                width={56}
                height={56}
                className="h-14 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="max-w-[220px] text-sm leading-relaxed text-brand-offWhite/60">
              Criminal defense for Delaware, Ohio. Clear guidance, assertive advocacy, and steady communication when it matters most.
            </p>
            <p className="text-xs text-brand-offWhite/50">
              Serving Delaware, Ohio and surrounding Central Ohio communities.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-brand-gold">Navigation</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-leaf"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-brand-gold">Resources</h4>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-leaf"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-brand-gold">Practice Areas</h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
              {practiceAreaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-xs text-brand-offWhite/70 transition-colors hover:text-brand-leaf"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/practice-areas"
              className="mt-4 inline-block text-xs font-semibold text-brand-leaf transition-colors hover:text-brand-mango"
            >
              View all practice areas
            </Link>
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <a
                href={`tel:${OFFICE_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-leaf"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-mango/10">
                  <Phone className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/60">Office</div>
                  <div>{OFFICE_PHONE_DISPLAY}</div>
                </div>
              </a>
              <a
                href={`tel:${NICK_DIRECT_PHONE_TEL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-leaf"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-leaf/20">
                  <Phone className="h-4 w-4 text-brand-leaf" />
                </div>
                <div>
                  <div className="text-xs text-brand-offWhite/60">Nick Direct</div>
                  <div>{NICK_DIRECT_PHONE_DISPLAY}</div>
                </div>
              </a>
              <a
                href={`mailto:${OFFICE_EMAIL}`}
                className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-leaf"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-mango/10">
                  <Mail className="h-4 w-4 text-brand-mango" />
                </div>
                {OFFICE_EMAIL}
              </a>
              <div className="flex items-center gap-3 text-sm text-brand-offWhite/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-offWhite/5">
                  <MapPin className="h-4 w-4 text-brand-mango" />
                </div>
                <div>
                  <div>{OFFICE_ADDRESS_STREET}</div>
                  <div className="text-brand-offWhite/60">{OFFICE_ADDRESS_CITY_STATE_ZIP}</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-brand-offWhite/10 bg-brand-offWhite/5 p-4">
              <p className="eyebrow mb-2 text-brand-gold">Get Started</p>
              <p className="mb-3 text-xs text-brand-offWhite/60">
                Facing charges? Get clear answers today.
              </p>
              <Link to="/contact" className="btn btn-primary w-full text-center text-sm">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-offWhite/10">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-brand-offWhite/40">
            {localSeoLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <Link
                  to={link.href}
                  className="transition-colors hover:text-brand-leaf"
                >
                  {link.label}
                </Link>
                {index < localSeoLinks.length - 1 && (
                  <span className="ml-2 text-brand-offWhite/20">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-brand-offWhite/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-brand-offWhite/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Mango Law LLC. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="transition-colors hover:text-brand-leaf">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-brand-leaf">
              Terms of Service
            </Link>
            <a
              href="https://sistrunktech.com"
              target="_blank"
              rel="noopener noreferrer"
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
