import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { buildMetadata } from '@/lib/seo-metadata';
import { isValidClientReportCookieValue } from './_lib/auth';

const seo = {
  title: 'Client Report | Mango Law LLC',
  noindex: true,
  url: '/admin/client-report',
};

export const metadata: Metadata = buildMetadata(seo);

const COOKIE_NAME = 'client_report_access';

export default async function Page() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value;
  if (!isValidClientReportCookieValue(cookieValue)) {
    redirect('/admin/client-report/access');
  }

  return (
    <div className="min-h-screen bg-brand-offWhite">
      <header className="border-b border-brand-black/10 bg-white">
        <div className="container py-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-black/60">
                Private Report
              </div>
              <h1 className="mt-1 text-2xl font-bold text-brand-black">SEO & Site Updates — December & January</h1>
              <div className="mt-1 text-sm text-brand-black/60">Prepared for Mango Law LLC</div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/client-report/logout"
                className="rounded-lg border border-brand-black/15 bg-white px-4 py-2 text-sm font-semibold text-brand-black hover:bg-brand-offWhite"
              >
                Log out
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">Executive summary</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brand-black/80">
              <p>
                In December and January we focused on improving crawlability, controlling what gets indexed, strengthening internal
                linking, and tightening operational tooling for content and lead intake.
              </p>
              <p>
                Where possible, metrics should be sourced from platform exports (GSC/Ahrefs/BrightLocal). Any metrics listed below
                are only included if they were clearly readable at the time of drafting.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">December — work completed</h2>
            <div className="mt-4 space-y-5 text-sm leading-6 text-brand-black/80">
              <div>
                <div className="font-semibold text-brand-black">Technical SEO / Tracking</div>
                <div className="mt-1">
                  Implemented Search Intelligence tracking (keyword inventory + daily rank history) and expanded service-area metadata
                  to support regional SEO coverage.
                </div>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Content & internal linking support</div>
                <div className="mt-1">
                  Continued building topic clusters and governance around blog content so updates remain consistent, traceable, and
                  SEO-aligned.
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">January — work completed</h2>
            <div className="mt-4 space-y-5 text-sm leading-6 text-brand-black/80">
              <div>
                <div className="font-semibold text-brand-black">Crawlability & indexing control</div>
                <div className="mt-1">
                  Migrated to Next.js App Router (SSR/SSG) and served <span className="font-semibold">sitemap.xml</span> and{' '}
                  <span className="font-semibold">robots.txt</span> as first-class routes. This helps search engines access page
                  content and metadata reliably.
                </div>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Blog scheduling / publish gating</div>
                <div className="mt-1">
                  Added publish-date gating so future/scheduled blog posts are hidden from public pages and excluded from the sitemap.
                  Added an authenticated admin preview route for draft/scheduled posts.
                </div>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Internal linking improvements</div>
                <div className="mt-1">
                  Added sitewide footer links to pages/posts flagged for low internal link coverage to strengthen topical clusters and
                  reduce orphan risk.
                </div>
              </div>
              <div>
                <div className="font-semibold text-brand-black">Lead intake & response reliability (operational)</div>
                <div className="mt-1">
                  Ensured all lead entrypoints send internal notifications and prospect confirmations, with notification recipients
                  configurable via environment variables (TO/CC/BCC).
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">SEO inventory — key pages (titles)</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brand-black/80">
              <p>
                This section lists representative public URLs and their page titles so indexing coverage can be checked in Search
                Console and third-party crawlers without ambiguity.
              </p>
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4 font-mono text-xs text-brand-black">
                / — Criminal Defense &amp; OVI Attorney Delaware, OH
                <br />
                /about — About Dominic Mango | Criminal Defense Attorney Delaware, OH
                <br />
                /contact — Contact Mango Law LLC | Delaware, OH Criminal Defense Attorney
                <br />
                /practice-areas — Criminal Defense Practice Areas | Mango Law LLC
                <br />
                /reviews — Client Reviews | Mango Law LLC
                <br />
                /glossary — Ohio Revised Code Glossary | Criminal &amp; Traffic Law Terms
                <br />
                /blog — Mango Law Blog | Legal Insights &amp; Ohio Criminal Defense Updates
                <br />
                /ovi-dui-defense-delaware-oh — OVI/DUI Defense Lawyer Delaware, OH | Mango Law LLC
                <br />
                /criminal-defense-delaware-oh — Criminal Defense Attorney Delaware, OH | Mango Law LLC
                <br />
                /drug-crime-lawyer-delaware-oh — Drug Crime Lawyer Delaware, OH | Mango Law LLC
                <br />
                /protection-order-lawyer-delaware-oh — Protection Order Lawyer Delaware, OH | Mango Law LLC
                <br />
                /sex-crime-defense-lawyer-delaware-oh — Sex Crime Defense Lawyer Delaware, OH | Mango Law LLC
                <br />
                /white-collar-crimes-attorney-delaware-oh — White Collar Crimes Attorney Delaware, OH | Mango Law LLC
                <br />
                /personal-injury-lawyer-delaware-oh — Personal Injury Lawyer Delaware, OH | Mango Law LLC
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">Content pipeline — upcoming / scheduled / in draft</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brand-black/80">
              <p>
                The following posts have been drafted and scheduled, but may not yet be publicly visible depending on their publish
                date and status. These are intentionally excluded from public routes and <span className="font-semibold">sitemap.xml</span>{' '}
                until they are publishable.
              </p>
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4 text-sm text-brand-black">
                <div className="font-semibold">Scheduled / upcoming</div>
                <div className="mt-2 space-y-2">
                  <div>
                    <div className="font-semibold">Your First OVI Court Date in Delaware County, Ohio: What Happens and How to Prepare</div>
                    <div className="text-xs text-brand-black/60">Planned publish date: 2026-01-27</div>
                  </div>
                  <div>
                    <div className="font-semibold">No-Contact Orders vs Civil Protection Orders in Ohio: What’s the Difference?</div>
                    <div className="text-xs text-brand-black/60">Planned publish date: 2026-01-29</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      Charged With Drug Possession in Ohio? What to Do Next and What the State Must Prove
                    </div>
                    <div className="text-xs text-brand-black/60">Planned publish date: 2026-02-03</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      Ohio OVI Driving Privileges and ALS: How License Suspensions Work and What Options You May Have
                    </div>
                    <div className="text-xs text-brand-black/60">Planned publish date: 2026-02-05</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">Google Search Console — indexing & verification</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brand-black/80">
              <p>
                We used Google Search Console to check page indexing status and validate fixes using the URL Inspection tool (including
                "Test Live URL") and manual requests (where available).
              </p>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-brand-black">Index coverage review:</span> checked current indexed URL count and
                  reviewed reasons for non-indexed pages.
                </div>
                <div>
                  <span className="font-semibold text-brand-black">URL Inspection + live testing:</span> inspected representative key
                  routes and verified Google can fetch the live HTML.
                </div>
                <div>
                  <span className="font-semibold text-brand-black">Manual actions:</span> submitted fix validation requests and manual
                  indexing requests where Search Console provided the option.
                </div>
              </div>
              <p>
                As of late January, Search Console is still reporting roughly <span className="font-semibold">6 indexed URLs</span>,
                which appears low relative to the number of public pages available on the site. Next step is to continue monitoring the
                Pages report, sitemap processing, and URL inspection results to identify the limiting factor (discovery, crawl, or
                indexing).
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">Local SEO — citations (BrightLocal)</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-brand-black/80">
              <p>
                BrightLocal citation campaign is in progress. The screenshot provided showed a set of citation submission status counts
                as:
              </p>
              <div className="rounded-xl border border-brand-black/10 bg-brand-offWhite p-4 font-mono text-xs text-brand-black">
                15, 0, 1, 3, 4, 7, 3, 1
              </div>
              <p>
                The status labels themselves were not legible in the screenshot, so this report intentionally does not assign labels
                to those numbers.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-black/10 bg-white p-6">
            <h2 className="text-lg font-bold text-brand-black">Next steps (recommended)</h2>
            <div className="mt-4 space-y-2 text-sm leading-6 text-brand-black/80">
              <div>
                <span className="font-semibold text-brand-black">Search Console:</span> confirm sitemap submission status, rich results
                coverage, and indexing/coverage trends.
              </div>
              <div>
                <span className="font-semibold text-brand-black">Ahrefs:</span> export month-over-month metrics (DR, referring domains,
                organic keywords) for a precise KPI section.
              </div>
              <div>
                <span className="font-semibold text-brand-black">BrightLocal:</span> export/zoom citation status labels and include live
                citation URLs as they publish.
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
