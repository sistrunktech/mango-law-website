import { Link } from 'react-router-dom';
import { Phone, Clock, FileText, AlertCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';

export default function BondJailInfoPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal Resources"
        title="Bond and Jail Information"
        description="Understanding the bond process and what to expect if you or a loved one is in custody in Delaware County, Ohio."
        compact
        alignLeft
        showQuickActions={false}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 rounded-xl border-2 border-brand-mango/20 bg-brand-mango/5 p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-brand-mango" />
                <div>
                  <h2 className="mb-2 font-display text-lg font-bold text-brand-black">
                    Need Immediate Help?
                  </h2>
                  <p className="mb-4 text-brand-black/70">
                    If you or a loved one has been arrested in Delaware County, time is critical.
                    Contact our office for guidance on the bond process.
                  </p>
                  <a
                    href={`tel:${OFFICE_PHONE_TEL}`}
                    className="btn btn-primary inline-flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call {OFFICE_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="mb-12 rounded-xl border border-brand-black/10 bg-brand-offWhite p-8 text-center">
                <Clock className="mx-auto mb-4 h-12 w-12 text-brand-leaf" />
                <h2 className="mb-2 font-display text-xl font-bold text-brand-black">
                  Detailed Content Coming Soon
                </h2>
                <p className="mb-6 text-brand-black/70">
                  We are preparing comprehensive information about the bond process in Delaware County,
                  including bond types, posting procedures, and what to expect at the jail.
                </p>
                <p className="text-sm text-brand-black/60">
                  In the meantime, please contact our office directly for assistance with bond matters.
                </p>
              </div>

              <h2 className="flex items-center gap-3 text-brand-black">
                <FileText className="h-6 w-6 text-brand-leaf" />
                Topics We Will Cover
              </h2>
              <ul className="text-brand-black/80">
                <li>Types of bond in Ohio (cash, surety, recognizance, 10% bond)</li>
                <li>Delaware County Jail contact information and visiting hours</li>
                <li>How bond amounts are determined</li>
                <li>Working with a bondsman vs. posting cash</li>
                <li>Bond conditions and what violations mean</li>
                <li>Motion for bond reduction</li>
                <li>What happens at the arraignment hearing</li>
              </ul>
            </div>

            <div className="mt-12 rounded-xl bg-brand-forest p-8 text-center">
              <h3 className="mb-4 font-display text-xl font-bold text-white">
                Questions About Bond?
              </h3>
              <p className="mb-6 text-brand-offWhite/80">
                Every case is different. Get answers specific to your situation.
              </p>
              <Link to="/contact" className="btn btn-primary">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
