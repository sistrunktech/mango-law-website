import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../data/navigation';

const linkBase =
  'px-3 py-2 text-sm font-semibold transition-colors border-b-2 border-transparent hover:text-brand-mango';

const activeClass = 'text-brand-mango border-brand-mango';

function MobileMenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className="inline-flex items-center justify-center rounded-md border border-brand-black/10 px-3 py-2 text-sm font-semibold text-brand-black hover:bg-brand-black/5 lg:hidden"
    >
      {open ? 'Close' : 'Menu'}
    </button>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-brand-black/5 bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="text-lg font-bold tracking-tight text-brand-black">
          Mango Law
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => [linkBase, isActive ? activeClass : ''].join(' ')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black shadow-sm transition hover:bg-brand-mango lg:inline-flex"
          >
            Schedule a consult
          </Link>
          <MobileMenuButton open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-black/5 bg-white lg:hidden">
          <div className="container flex flex-col py-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  ['px-3 py-2 text-sm font-semibold', isActive ? 'text-brand-mango' : 'text-brand-black'].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-max rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-black"
            >
              Schedule a consult
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
