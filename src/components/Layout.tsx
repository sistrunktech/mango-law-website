import { ReactNode, useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import ChatIntakeLauncher from './ChatIntakeLauncher';
import AccessibilityLauncher from './AccessibilityLauncher';
import ScrollToTop from './ScrollToTop';
import LeadCaptureModal from './LeadCaptureModal';
import { MessageCircle, Phone } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-offWhite text-brand-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-brand-mango focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-leaf"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <SiteHeader />
      <main id="main-content" className="pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
        {children}
      </main>
      <Footer />

      {/* Mobile bottom CTA bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-brand-black/10 bg-white/95 backdrop-blur lg:hidden">
        <div className="container flex items-center justify-between gap-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
          <a
            href="tel:7404176191"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-gold hover:text-brand-black"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-mango px-4 py-3 text-sm font-bold text-brand-black shadow-sm transition-colors hover:bg-brand-gold"
          >
            <MessageCircle className="h-4 w-4" />
            Free Consult
          </button>
        </div>
      </div>

      <AccessibilityLauncher />
      <ChatIntakeLauncher />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger="mobile_bottom_bar"
      />
    </div>
  );
}
