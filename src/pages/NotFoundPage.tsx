import { Link } from 'react-router-dom';
import { Home, Search, Phone, ArrowLeft } from 'lucide-react';
import MangoIcon from '../components/MangoIcon';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import { SEO } from '../lib/seo';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2F5F4F] to-[#1B4332] flex items-center justify-center px-4 py-12">
      <SEO title="404 - Page Not Found | Mango Law LLC" noindex={true} />
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <MangoIcon className="w-32 h-32 text-[#E8A33C] animate-pulse" />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#E8A33C]/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#E8A33C]/30 rounded-full blur-xl"></div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            This Page Got Lost in the Orchard
          </h2>
          <p className="text-xl text-slate-200 mb-2">
            We searched high and low, but couldn't find what you're looking for.
          </p>
          <p className="text-lg text-slate-300">
            The page may have been moved, deleted, or never existed.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            Let's Get You Back on Track
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Link
              to="/"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>

            <Link
              to="/contact"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition border border-white/20"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </div>

          <div className="text-left space-y-3">
            <p className="text-sm font-semibold text-[#E8A33C] mb-3">Quick Links:</p>
            <div className="grid sm:grid-cols-2 gap-2">
              <Link
                to="/ovi-dui-defense-delaware-oh"
                className="text-slate-200 hover:text-[#E8A33C] transition text-sm flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                OVI/DUI Defense
              </Link>
              <Link
                to="/criminal-defense-delaware-oh"
                className="text-slate-200 hover:text-[#E8A33C] transition text-sm flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                Criminal Defense
              </Link>
              <Link
                to="/drug-crime-lawyer-delaware-oh"
                className="text-slate-200 hover:text-[#E8A33C] transition text-sm flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                Drug Crimes
              </Link>
              <Link
                to="/personal-injury-lawyer-delaware-oh"
                className="text-slate-200 hover:text-[#E8A33C] transition text-sm flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                Personal Injury
              </Link>
              <Link
                to="/blog"
                className="text-slate-200 hover:text-[#E8A33C] transition text-sm flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                Legal Blog
              </Link>
              <Link
                to="/about"
                className="text-slate-200 hover:text-[#E8A33C] transition text-sm flex items-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                About Us
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
          <Search className="w-4 h-4" />
          <p>
            Need immediate help? Call the office at{' '}
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="text-[#E8A33C] hover:text-[#FFB84D] font-semibold"
              data-cta="not_found_call_office"
              onClick={() => {
                trackCtaClick('not_found_call_office');
                trackLeadSubmitted('phone', 'not_found_call_office', {
                  target_number: OFFICE_PHONE_TEL,
                });
              }}
            >
              {OFFICE_PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
