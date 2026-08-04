'use client';

import { ReactNode, useEffect, useState } from 'react';
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
  const [suppressMobileLaunchers, setSuppressMobileLaunchers] = useState(false);

  const isCheckpoints = pathname.startsWith('/resources/dui-checkpoints');
  const launcherBottomOffsetClass = isCheckpoints
    ? 'bottom-[calc(env(safe-area-inset-bottom)_+_6rem)] lg:bottom-6'
    : 'bottom-[max(1rem,env(safe-area-inset-bottom))] lg:bottom-6';
  const chatChooserBottomOffsetClass = isCheckpoints
    ? 'bottom-[calc(env(safe-area-inset-bottom)_+_9.75rem)] lg:bottom-20'
    : 'bottom-[calc(max(1rem,env(safe-area-inset-bottom))_+_3.75rem)] lg:bottom-20';

  const openLeadModal = (trigger: LeadSource) => {
    setLeadModalTrigger(trigger);
    setIsLeadModalOpen(true);
    trackLeadModalOpen(trigger);
  };

  useEffect(() => {
    const updateLauncherClearance = () =>
      setSuppressMobileLaunchers(
        pathname === '/' && window.innerWidth < 1024 && window.scrollY < 160,
      );
    updateLauncherClearance();
    window.addEventListener('scroll', updateLauncherClearance, { passive: true });
    window.addEventListener('resize', updateLauncherClearance);
    return () => {
      window.removeEventListener('scroll', updateLauncherClearance);
      window.removeEventListener('resize', updateLauncherClearance);
    };
  }, [pathname]);

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
      <ConsentBanner />
      <main id="main-content" className="pb-[env(safe-area-inset-bottom)] lg:pb-0">
        {children}
      </main>
      <Footer />

      <AccessibilityLauncher
        bottomOffsetClass={launcherBottomOffsetClass}
        suppressOnMobile={suppressMobileLaunchers}
      />
      <ChatIntakeLauncher
        onOpenLeadModal={() => openLeadModal('floating_chooser')}
        bottomOffsetClass={launcherBottomOffsetClass}
        chooserBottomOffsetClass={chatChooserBottomOffsetClass}
        suppressOnMobile={suppressMobileLaunchers}
      />

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        trigger={leadModalTrigger}
      />
    </div>
  );
}
