'use client';

import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import ChatIntakeLauncher from './ChatIntakeLauncher';
import AccessibilityLauncher from './AccessibilityLauncher';
import ScrollToTop from './ScrollToTop';
import LeadCaptureModal, { type LeadSource } from './LeadCaptureModal';
import { trackLeadModalOpen } from '../lib/analytics';
import ConsentBanner from './ConsentBanner';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalTrigger, setLeadModalTrigger] = useState<LeadSource>('header_cta');
  const [isConsentBannerVisible, setIsConsentBannerVisible] = useState(false);

  const isCheckpoints = pathname.startsWith('/resources/dui-checkpoints');
  const chatBottomOffsetClass = (() => {
    if (isCheckpoints) return isConsentBannerVisible ? 'bottom-36 lg:bottom-6' : 'bottom-24 lg:bottom-6';
    return isConsentBannerVisible ? 'bottom-28 lg:bottom-6' : 'bottom-6';
  })();
  const chatChooserBottomOffsetClass = (() => {
    if (isCheckpoints) return isConsentBannerVisible ? 'bottom-52 lg:bottom-20' : 'bottom-40 lg:bottom-20';
    return isConsentBannerVisible ? 'bottom-44 lg:bottom-20' : 'bottom-20';
  })();
  const accessibilityBottomOffsetClass = (() => {
    if (isCheckpoints) return isConsentBannerVisible ? 'bottom-52 lg:bottom-6' : 'bottom-44 lg:bottom-6';
    return isConsentBannerVisible ? 'bottom-40 lg:bottom-6' : 'bottom-24 lg:bottom-6';
  })();

  const openLeadModal = (trigger: LeadSource) => {
    setLeadModalTrigger(trigger);
    setIsLeadModalOpen(true);
    trackLeadModalOpen(trigger);
  };

  return (
    <div className="min-h-screen bg-brand-offWhite text-brand-black">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded focus-visible:bg-brand-mango focus-visible:px-4 focus-visible:py-2 focus-visible:text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-leaf"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <SiteHeader onOpenLeadModal={openLeadModal} />
      <main id="main-content" className="pb-[env(safe-area-inset-bottom)] lg:pb-0">
        {children}
      </main>
      <Footer />

      <ConsentBanner onVisibilityChange={setIsConsentBannerVisible} />

      <AccessibilityLauncher bottomOffsetClass={accessibilityBottomOffsetClass} />
      <ChatIntakeLauncher
        onOpenLeadModal={() => openLeadModal('floating_chooser')}
        bottomOffsetClass={chatBottomOffsetClass}
        chooserBottomOffsetClass={chatChooserBottomOffsetClass}
      />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger={leadModalTrigger}
      />
    </div>
  );
}
