import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { navLinks, practiceAreaLinks } from '../data/navigation';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-brand-forest text-brand-offWhite">
      {/* Top accent bar - vibrant lime */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-brand-leaf via-brand-mango to-brand-leaf" />
      
      {/* Subtle decorative element */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-brand-mango/5 blur-3xl" />

      {/* Main footer content */}
      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="space-y-6">
            <Link to="/" className="group inline-flex items-center gap-3">
              <img
                src="/images/brand/mango-logo-vertical.svg"
                alt="Mango Law LLC"
                className="h-16 w-auto transition-opacity group-hover:opacity-90"
                loading="lazy"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-brand-offWhite/60">
              Criminal defense for Delaware, Ohio. Clear guidance, assertive advocacy, and steady communication when it matters most.
            </p>
            {/* Contact info */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:7406022155"
                className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-mango"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-leaf/10">
                  <Phone className="h-4 w-4 text-brand-leaf" />
                </div>
                (740) 602-2155
              </a>
              <a
                href="mailto:nick@mangolaw.com"
                className="flex items-center gap-3 text-sm text-brand-offWhite/80 transition-colors hover:text-brand-mango"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-leaf/10">
                  <Mail className="h-4 w-4 text-brand-leaf" />
                </div>
                nick@mangolaw.com
              </a>
              <div className="flex items-center gap-3 text-sm text-brand-offWhite/80">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-offWhite/5">
                  <MapPin className="h-4 w-4 text-brand-mango" />
                </div>
                Delaware, Ohio
              </div>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="eyebrow text-brand-gold">Navigation</h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-mango"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas column */}
          <div>
            <h4 className="eyebrow text-brand-gold">Practice Areas</h4>
            <ul className="mt-5 space-y-3">
              {practiceAreaLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-brand-offWhite/70 transition-colors hover:text-brand-mango"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h4 className="eyebrow text-brand-gold">Get Started</h4>
            <p className="mt-5 text-sm text-brand-offWhite/60">
              Facing charges? Get clear answers about your situation today.
            </p>
            <Link
              to="/contact"
              className="btn btn-primary mt-5"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-offWhite/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-brand-offWhite/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Mango Law LLC. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="transition-colors hover:text-brand-mango">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-brand-mango">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
