import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../../lib/contactInfo';

export default function StickyConsultCTA() {
  return (
    <aside className="sticky top-24" aria-labelledby="sidebar-cta-heading">
      <div className="rounded-lg bg-brand-black p-8 text-white">
        <h2 id="sidebar-cta-heading" className="mb-2 text-lg font-semibold">
          Facing OVI charges?
        </h2>
        <p className="mb-6 text-sm text-gray-400">
          Get a free, confidential case review from an experienced Ohio defense attorney.
        </p>
        <a
          href={`tel:${OFFICE_PHONE_TEL}`}
          className="mb-3 flex items-center justify-center gap-2 rounded bg-brand-mango px-6 py-3 font-semibold text-brand-black transition hover:bg-brand-mango/90 focus:outline-none focus:ring-2 focus:ring-brand-mango focus:ring-offset-2 focus:ring-offset-brand-black"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>{OFFICE_PHONE_DISPLAY}</span>
        </a>
        <Link
          to="/contact"
          className="block rounded border border-white/20 px-6 py-3 text-center text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-black"
        >
          Request Free Consultation
        </Link>
      </div>
    </aside>
  );
}
