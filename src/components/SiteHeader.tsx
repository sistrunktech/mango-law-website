import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { navLinks } from '../data/navigation';
import MegaMenu from './MegaMenu';

const OFFICE_PHONE = '(740) 417-6191';
const CELL_PHONE = '(740) 602-2155';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const logoSrc = isHome
    ? '/images/brand/mango-logo-tagline-cropped.png'
    : '/images/brand/mango-logo-white-cropped.png';

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
              'lg:shadow-lg lg:backdrop-blur-sm',
              isHome ? 'lg:bg-white/95' : 'lg:bg-brand-black/95',
            ].join(' ')
          : '',
      ].join(' ')}
      role="banner"
    >
      {/* Top bar - Forest green accent */}
      <div className="bg-brand-leaf">
        <div
          className={`container flex items-center justify-between py-2 transition-all ${isScrolled ? 'lg:py-1' : ''}`}
        >
          {/* Phone numbers */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${OFFICE_PHONE.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xs:inline text-xs opacity-80">Office:</span>
              <span>{OFFICE_PHONE}</span>
            </a>
            <div className="h-4 w-px bg-white/30 hidden sm:block" />
            <a
              href={`tel:${CELL_PHONE.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden xs:inline text-xs opacity-80">Direct:</span>
              <span>{CELL_PHONE}</span>
            </a>
          </div>

          {/* Right side - chat button */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white transition-all hover:bg-white/30"
            aria-label="Open chat"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Chat with us</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={[
          isHome ? 'bg-brand-offWhite' : 'bg-brand-black',
          isHome ? 'border-b border-brand-black/10' : '',
        ].join(' ')}
      >
        <div
          className={`container flex items-center justify-between py-4 transition-all ${isScrolled ? 'lg:py-2' : ''}`}
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Mango Law LLC - Criminal & OVI/DUI Defense"
              className={`h-14 w-auto transition-all hover:opacity-90 ${isScrolled ? 'lg:h-12' : ''}`}
              loading="lazy"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if (link.label === 'Practice Areas') {
                return <MegaMenu key="practice-areas-mega" variant={isHome ? 'light' : 'dark'} />;
              }
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => [
                    'px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-mango'
                      : isHome
                        ? 'text-brand-black/70 hover:text-brand-mango'
                        : 'text-brand-offWhite/80 hover:text-brand-mango',
                  ].join(' ')}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              to="/contact"
              className="rounded-lg bg-brand-mango px-5 py-2.5 text-sm font-bold text-brand-black transition-all hover:bg-brand-gold"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={[
              'inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden',
              isHome
                ? 'text-brand-black hover:bg-brand-black/5'
                : 'text-brand-offWhite hover:bg-brand-offWhite/10',
            ].join(' ')}
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
          <div className={`${isHome ? 'border-t border-brand-black/10' : 'border-t border-brand-offWhite/10'} pb-4`}>
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
                        : isHome
                          ? 'text-brand-black hover:bg-brand-black/5'
                          : 'text-brand-offWhite hover:bg-brand-offWhite/5',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className={`mt-4 flex flex-col gap-3 ${isHome ? 'border-t border-brand-black/10' : 'border-t border-brand-offWhite/10'} pt-4`}>
                <a
                  href={`tel:${OFFICE_PHONE.replace(/\D/g, '')}`}
                  className={`flex items-center gap-2 px-4 text-sm font-medium ${isHome ? 'text-brand-black' : 'text-brand-offWhite'}`}
                >
                  <Phone className="h-4 w-4 text-brand-mango" />
                  <span className="text-xs opacity-70">Office:</span>
                  {OFFICE_PHONE}
                </a>
                <a
                  href={`tel:${CELL_PHONE.replace(/\D/g, '')}`}
                  className={`flex items-center gap-2 px-4 text-sm font-medium ${isHome ? 'text-brand-black' : 'text-brand-offWhite'}`}
                >
                  <Phone className="h-4 w-4 text-brand-mango" />
                  <span className="text-xs opacity-70">Direct:</span>
                  {CELL_PHONE}
                </a>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mx-4 rounded-lg bg-brand-mango px-5 py-3 text-center text-sm font-bold text-brand-black"
                >
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
