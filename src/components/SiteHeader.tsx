import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks } from '../data/navigation';
import MegaMenu from './MegaMenu';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import type { LeadSource } from './LeadCaptureModal';

interface SiteHeaderProps {
  onOpenLeadModal?: (trigger: LeadSource) => void;
}

export default function SiteHeader({ onOpenLeadModal }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoSrc = '/images/brand/mango-logo-tagline-cropped.png';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'relative z-50 transition-all lg:sticky lg:top-0 lg:z-50',
        isScrolled
          ? [
              'lg:border-b lg:shadow-sm lg:backdrop-blur-sm',
              'lg:bg-white/95 lg:border-brand-black/10',
            ].join(' ')
          : '',
      ].join(' ')}
      role="banner"
    >
      {/* Main navigation bar */}
      <div className="bg-brand-offWhite border-b border-brand-black/10">
        <div
          className={`container flex items-center justify-between py-4 transition-all ${isScrolled ? 'lg:py-2' : ''}`}
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Mango Law LLC - Criminal & OVI/DUI Defense"
              className={`h-14 w-auto transition-all hover:opacity-90 ${isScrolled ? 'lg:h-12' : ''}`}
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if (link.label === 'Practice Areas') {
                return <MegaMenu key="practice-areas-mega" variant="light" />;
              }
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => [
                    'px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-mango'
                      : 'text-brand-black/70 hover:text-brand-mango',
                  ].join(' ')}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-black/80 hover:text-brand-mango"
              data-cta="header_call"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {OFFICE_PHONE_DISPLAY}
            </a>
            <button
              type="button"
              className="rounded-lg bg-brand-mango px-5 py-2.5 text-sm font-bold text-brand-black transition-all hover:bg-brand-gold"
              data-cta="header_free_consult"
              onClick={() => onOpenLeadModal?.('header_cta')}
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile phone + consult */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-lg border border-brand-black/10 bg-white px-3 py-2 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-black/5"
              aria-label="Call the office"
              data-cta="mobile_header_call"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-brand-mango px-3 py-2 text-sm font-bold text-brand-black transition-colors hover:bg-brand-gold"
              onClick={() => onOpenLeadModal?.('header_cta')}
              data-cta="mobile_header_free_consult"
            >
              Consult
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex items-center justify-center rounded-lg p-2 text-brand-black transition-colors hover:bg-brand-black/5 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={[
            'overflow-hidden transition-all duration-300 lg:hidden',
            open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="border-t border-brand-black/10 pb-4">
            <div className="container flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-mango/20 text-brand-mango'
                        : 'text-brand-black hover:bg-brand-black/5',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-brand-black/10 pt-4">
                <a
                  href={`tel:${OFFICE_PHONE_TEL}`}
                  className="flex items-center gap-2 px-4 text-sm font-medium text-brand-black"
                  data-cta="mobile_menu_call"
                >
                  <Phone className="h-4 w-4 text-brand-mango" />
                  <span className="text-xs opacity-70">Call:</span>
                  {OFFICE_PHONE_DISPLAY}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenLeadModal?.('mobile_menu');
                  }}
                  className="mx-4 rounded-lg bg-brand-mango px-5 py-3 text-center text-sm font-bold text-brand-black"
                  data-cta="mobile_menu_free_consult"
                  aria-label="Open free consultation form"
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
