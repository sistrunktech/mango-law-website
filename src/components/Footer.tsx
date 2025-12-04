import { Link } from 'react-router-dom';
import { navLinks, practiceAreaLinks } from '../data/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-brand-black/10 bg-brand-black text-brand-offWhite">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Mango Law LLC</h3>
          <p className="text-sm text-brand-offWhite/80">
            Criminal defense for Delaware, Ohio. Clear guidance, assertive advocacy, and steady communication.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Navigation</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-offWhite/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-brand-mango">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Practice Areas</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-offWhite/80">
            {practiceAreaLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-brand-mango">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-brand-offWhite/80">
          <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-gold">Contact</h4>
          <p>Delaware, Ohio</p>
          <p>Phone: (555) 000-0000</p>
          <p>Email: info@mangolaw.com</p>
        </div>
      </div>
      <div className="border-t border-brand-offWhite/10 py-4">
        <div className="container flex flex-col items-start justify-between gap-2 text-xs text-brand-offWhite/60 sm:flex-row">
          <span>© {new Date().getFullYear()} Mango Law LLC. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-brand-mango">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-brand-mango">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
