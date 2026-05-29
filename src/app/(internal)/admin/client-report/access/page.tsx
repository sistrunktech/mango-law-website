import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo-metadata';

const seo = {
  title: 'Client Report Access | Mango Law LLC',
  noindex: true,
  url: '/admin/client-report/access',
};

export const metadata: Metadata = buildMetadata(seo);

type PageProps = {
  searchParams?: Promise<{ error?: string } | undefined>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className="min-h-screen bg-brand-offWhite flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-black/60">Private</div>
        <h1 className="mt-1 text-xl font-bold text-brand-black">Client report access</h1>
        <div className="mt-2 text-sm text-brand-black/60">
          Enter the password you were provided to view the report.
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error === 'invalid' && 'Incorrect password. Please try again.'}
            {error === 'missing' && 'Password is required.'}
            {error === 'misconfigured' && 'This report is not configured yet. Please contact support.'}
            {!['invalid', 'missing', 'misconfigured'].includes(error) && 'Unable to grant access. Please try again.'}
          </div>
        ) : null}

        <form action="/admin/client-report/auth" method="POST" className="mt-6 space-y-3">
          <label className="block">
            <div className="text-sm font-semibold text-brand-black">Password</div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-brand-black/15 bg-white px-3 py-2 text-sm text-brand-black outline-none focus:border-brand-mango focus:ring-2 focus:ring-brand-mango/20"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-mango px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
          >
            View report
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-brand-black/60">
          <Link href="/" className="underline hover:text-brand-black">
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
