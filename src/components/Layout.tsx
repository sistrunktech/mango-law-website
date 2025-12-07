import { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import Footer from './Footer';
import ChatIntakeLauncher from './ChatIntakeLauncher';
import ScrollToTop from './ScrollToTop';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-offWhite text-brand-black">
      <ScrollToTop />
      <SiteHeader />
      <main>{children}</main>
      <Footer />
      <ChatIntakeLauncher />
    </div>
  );
}
