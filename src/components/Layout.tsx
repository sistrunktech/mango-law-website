import { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import ChatIntakeLauncher from './ChatIntakeLauncher';
import AccessibilityLauncher from './AccessibilityLauncher';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }: { children: ReactNode }) {
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
      <main id="main-content">{children}</main>
      <Footer />
      <AccessibilityLauncher />
      <ChatIntakeLauncher />
    </div>
  );
}
