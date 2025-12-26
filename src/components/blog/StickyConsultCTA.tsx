import { Phone, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../../lib/contactInfo';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface StickyConsultCTAProps {
  tocItems?: TOCItem[];
}

export default function StickyConsultCTA({ tocItems }: StickyConsultCTAProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <aside className="sticky top-24 space-y-6" aria-labelledby="sidebar-cta-heading">
      {tocItems && tocItems.length > 0 && (
        <nav className="rounded-lg border border-brand-black/10 bg-white p-5" aria-label="Table of contents">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-black">
            <List className="h-4 w-4 text-brand-mango" />
            In this article
          </h3>
          <ul className="space-y-1.5">
            {tocItems.slice(0, 8).map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left text-sm transition-colors hover:text-brand-mango ${
                    item.level === 2 ? 'font-medium text-brand-black/80' : 'pl-3 text-brand-black/60'
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="rounded-lg bg-brand-black p-6 text-white">
        <h2 id="sidebar-cta-heading" className="mb-2 text-base font-semibold">
          Facing OVI charges?
        </h2>
        <p className="mb-5 text-sm text-gray-400">
          Get a free case review from an experienced Ohio defense attorney.
        </p>
        <a
          href={`tel:${OFFICE_PHONE_TEL}`}
          className="mb-3 flex items-center justify-center gap-2 rounded bg-brand-mango px-5 py-2.5 text-sm font-semibold text-brand-black transition hover:bg-brand-mango/90 focus:outline-none focus:ring-2 focus:ring-brand-mango focus:ring-offset-2 focus:ring-offset-brand-black"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>{OFFICE_PHONE_DISPLAY}</span>
        </a>
        <Link
          to="/contact"
          className="block rounded border border-white/20 px-5 py-2.5 text-center text-sm text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-black"
        >
          Request Free Consultation
        </Link>
      </div>
    </aside>
  );
}
