import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { navLinks } from '../data/navigation';

const PHONE_NUMBER = '(740) 602-2155';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Top bar - Fresh green accent */}
      <div className="bg-brand-leaf">
        <div className="container flex items-center justify-between py-2">
          {/* Left side - phone */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            <Phone className="h-4 w-4" />
            <span>{PHONE_NUMBER}</span>
          </a>
          
          {/* Right side - chat button */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white transition-all hover:bg-white/30"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat with us</span>
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="bg-brand-black">
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src="/images/brand/mango-logo-horizontal.svg"
              alt="Mango Law LLC - Criminal & OVI/DUI Defense"
              className="h-12 w-auto transition-opacity hover:opacity-90"
              loading="lazy"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => [
                  'px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-brand-mango'
                    : 'text-brand-offWhite/80 hover:text-brand-mango',
                ].join(' ')}
              >
                {link.label}
              </NavLink>
            ))}
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
            className="inline-flex items-center justify-center rounded-lg p-2 text-brand-offWhite transition-colors hover:bg-brand-offWhite/10 lg:hidden"
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
          <div className="border-t border-brand-offWhite/10 pb-4">
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
                        : 'text-brand-offWhite hover:bg-brand-offWhite/5',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-brand-offWhite/10 pt-4">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 px-4 text-sm font-medium text-brand-offWhite"
                >
                  <Phone className="h-4 w-4 text-brand-mango" />
                  {PHONE_NUMBER}
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
