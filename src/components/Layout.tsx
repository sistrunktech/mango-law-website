import { ReactNode, useState } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import ChatIntakeLauncher from './ChatIntakeLauncher';
import AccessibilityLauncher from './AccessibilityLauncher';
import ScrollToTop from './ScrollToTop';
import LeadCaptureModal, { type LeadSource } from './LeadCaptureModal';

export default function Layout({ children }: { children: ReactNode }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalTrigger, setLeadModalTrigger] = useState<LeadSource>('header_cta');

  const openLeadModal = (trigger: LeadSource) => {
    setLeadModalTrigger(trigger);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-offWhite text-brand-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-brand-mango focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-leaf"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <SiteHeader onOpenLeadModal={openLeadModal} />
      <main id="main-content" className="pb-[env(safe-area-inset-bottom)] lg:pb-0">
        {children}
      </main>
      <Footer />

      <AccessibilityLauncher />
      <ChatIntakeLauncher />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger={leadModalTrigger}
      />
    </div>
  );
}
