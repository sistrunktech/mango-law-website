import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { navLinks } from '../data/navigation';
import MangoIcon from './MangoIcon';

const PHONE_NUMBER = '(740) 602-2155';
const PHONE_DIRECT = '(740) 602-2155';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50">
      {/* Top bar - Gold/Mango colored with contact info */}
      <div className="bg-gradient-to-r from-brand-mango via-brand-mangoLight to-brand-mango">
        <div className="container flex items-center justify-between py-2.5">
          {/* Left side - tagline */}
          <div className="hidden items-center gap-2 text-sm font-medium text-brand-black md:flex">
            <Clock className="h-4 w-4" />
            <span>Get Help 24/7 – Call or text anytime:</span>
          </div>
          
          {/* Right side - phone numbers */}
          <div className="flex w-full items-center justify-center gap-6 text-sm font-bold md:w-auto md:justify-end">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
              className="flex items-center gap-2 text-brand-black transition-opacity hover:opacity-70"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs font-medium">Office:</span>
              <span>{PHONE_NUMBER}</span>
            </a>
            <a
              href={`tel:${PHONE_DIRECT.replace(/\D/g, '')}`}
              className="hidden items-center gap-2 text-brand-black transition-opacity hover:opacity-70 sm:flex"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs font-medium">Direct:</span>
              <span>{PHONE_DIRECT}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="bg-brand-black">
        <div className="container flex items-center justify-between py-4">
          {/* Logo - matching actual Mango Law logo style */}
          <Link to="/" className="group flex items-center gap-3">
            {/* Mango icon in gold box like the real logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-mango/20 transition-colors group-hover:bg-brand-mango/30">
              <MangoIcon size="sm" />
            </div>
            {/* Logo text styled like original - Mango in gold, Law in white */}
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-brand-mango">Mango</span>
              <span className="text-2xl font-light tracking-wide text-brand-offWhite">Law</span>
              <span className="ml-1.5 text-[10px] font-medium uppercase tracking-widest text-brand-offWhite/50">LLC</span>
            </div>
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
