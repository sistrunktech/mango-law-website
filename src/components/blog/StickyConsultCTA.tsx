import { List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFICE_PHONE_DISPLAY } from '../../lib/contactInfo';

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
    <aside className="space-y-6" aria-labelledby="sidebar-cta-heading">
      {tocItems && tocItems.length > 0 && (
        <nav className="rounded-lg border border-brand-black/10 bg-brand-offWhite p-5" aria-label="Table of contents">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-brand-black">
            <List className="h-4 w-4 text-brand-leaf" />
            In this article
          </h3>
          <ul className="max-h-56 space-y-1.5 overflow-y-auto pr-2">
            {tocItems.slice(0, 8).map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left text-sm transition-colors hover:text-brand-leaf ${
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

      <div className="rounded-lg border border-brand-black/10 border-l-4 border-brand-mango bg-brand-offWhite p-6 text-brand-black">
        <h2 id="sidebar-cta-heading" className="mb-2 text-base font-semibold">
          Facing OVI charges?
        </h2>
        <p className="mb-4 text-sm text-brand-black/70">
          Get a free case review from an experienced Ohio defense attorney. Call/text {OFFICE_PHONE_DISPLAY} if timing is urgent.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded bg-brand-mango px-4 py-2 text-xs font-semibold text-brand-black transition hover:bg-brand-mango/90 focus:outline-none focus:ring-2 focus:ring-brand-mango/40"
        >
          Request Free Consultation
        </Link>
      </div>
    </aside>
  );
}
