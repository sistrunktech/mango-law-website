import { Link } from 'react-router-dom';
import { Phone, FileText, AlertCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';

export default function BondJailInfoPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal Resources"
        title="Bond & Jail Information in Delaware County, Ohio"
        description="A practical guide to bail, bond types, and how to post bond in Delaware County if you or a loved one is in custody."
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
              <div className="mb-8 rounded-xl border border-brand-black/10 bg-brand-offWhite p-6">
                <p className="m-0 text-sm text-brand-black/70">
                  <strong>Legal disclaimer:</strong> This resource is for general education only and
                  is not legal advice. Bond and release procedures can change. Always confirm details
                  with the court and consult an attorney about your specific situation.
                </p>
              </div>

              <p>
                Delaware County citizens regularly ask what happens if someone is arrested for an OVI
                or another criminal charge. This guide answers two key questions: how a judge decides
                whether to release someone on bail and how to post bond to secure a loved one’s release.
              </p>

              <h2>Bail vs. bond</h2>

              <p>
                <strong>Bail</strong> is the set of release conditions ordered by the court. Bail can
                include money or collateral, but it can also include non-financial conditions (for
                example: no-contact orders, reporting requirements, or electronic monitoring).
              </p>

              <p>
                A <strong>bond</strong> is the form used to satisfy the bail order (for example:
                recognizance, a cash/deposit bond, or a surety bond through a bondsman).
              </p>

              <h2>Common bond types in Ohio</h2>

              <h3>Recognizance bond (O.R./ROR)</h3>
              <p>
                Often the preferred option for lower-risk cases. No money is required; the person is
                released based on a promise to appear (plus any conditions ordered by the judge).
              </p>

              <h3>Cash / deposit (“10%”) bond</h3>
              <p>
                Some courts allow a deposit bond commonly described as “10%.” You pay a deposit to the
                clerk under the judge’s bond order. Whether any amount is refunded and whether costs or
                fees are deducted depends on court orders and local practice.
              </p>

              <h3>Surety bond (bail bondsman)</h3>
              <p>
                A surety bond is posted through a licensed bonding company. The bondsman typically
                charges a non-refundable fee. If the defendant fails to appear, the court can order
                forfeiture of the bond.
              </p>

              <h2>How to post bond in Delaware County</h2>

              <div className="not-prose my-6 rounded-xl border border-brand-mango/25 bg-brand-mango/5 p-5">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-mangoText" />
                  <div className="text-sm text-brand-black/80">
                    <div className="font-semibold text-brand-black">
                      Key local rule of thumb
                    </div>
                    <p className="mt-2">
                      The Delaware County Sheriff’s Office notes that if you wish to pay bond, it is
                      done at the Municipal Court building (not at the jail). Release processing can
                      take time after the court clerks decisions and the jail receives the paperwork.
                    </p>
                    <p className="mt-2">
                      Source:{' '}
                      <a
                        href="https://sheriff.co.delaware.oh.us/inmates/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-mangoText underline-offset-2 hover:text-brand-leaf hover:underline"
                      >
                        Delaware County Sheriff’s Office — Inmates
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <p>
                <strong>Delaware County Municipal Court</strong>: 70 N. Union St., Delaware, OH 43015
              </p>

              <h2>Step-by-step: posting bond for a loved one</h2>
              <ol>
                <li>
                  <strong>Confirm the bond amount and type.</strong> Use the case number (if available)
                  and call the clerk to confirm the amount and what kind of bond is required.
                </li>
                <li>
                  <strong>Decide how to pay.</strong> Depending on the order, you may be able to post a
                  cash/deposit bond or you may need a surety agent.
                </li>
                <li>
                  <strong>Pay bond at the Municipal Court.</strong> Bring valid ID and confirm accepted
                  payment methods and hours before you go.
                </li>
                <li>
                  <strong>Wait for release processing.</strong> Timing varies and can take hours after
                  the jail receives the court’s paperwork.
                </li>
              </ol>

              <h2>Important local contact information</h2>
              <ul>
                <li>
                  <strong>Delaware County Municipal Court Clerk</strong> — 70 N. Union St., Delaware, OH 43015 •{' '}
                  <a href="tel:7402031550" className="font-semibold text-brand-mangoText hover:text-brand-leaf">
                    (740) 203-1550
                  </a>
                </li>
                <li>
                  <strong>Delaware County Sheriff’s Office Jail</strong> — 844 U.S. Rt. 42 N., Delaware, OH 43015 •{' '}
                  <a href="tel:7408332840" className="font-semibold text-brand-mangoText hover:text-brand-leaf">
                    (740) 833-2840
                  </a>
                </li>
              </ul>

              <h2>Additional notes</h2>
              <ul>
                <li>Costs are not refunded when using a surety bond (bondsman fee).</li>
                <li>A recognizance bond saves money but depends on the judge’s assessment of risk.</li>
                <li>Courts may impose release conditions (no-contact, monitoring, travel limits).</li>
              </ul>

              <h2>Sources</h2>
              <ul>
                <li>
                  <a
                    href="https://www.supremecourt.ohio.gov/docs/LegalResources/Rules/criminal/criminalprocedure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ohio Crim.R. 46 (Bail) — Supreme Court of Ohio
                  </a>
                </li>
                <li>
                  <a
                    href="https://codes.ohio.gov/ohio-constitution/section-1.9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ohio Constitution, Article I, Section 9 (Bail)
                  </a>
                </li>
                <li>
                  <a
                    href="https://sheriff.co.delaware.oh.us/inmates/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Delaware County Sheriff’s Office — Inmates
                  </a>
                </li>
                <li>
                  <a
                    href="https://connect.municipalcourt.org/AWC/court/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Delaware County Municipal Court — Online Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://clerkofcourts.co.delaware.oh.us/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Delaware County Clerk of Courts
                  </a>
                </li>
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
