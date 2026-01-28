'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '../contexts/AuthContext';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';
import { trackPageView } from '@/lib/analytics';

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(document.title || '');
  }, [pathname]);

  return (
    <AuthProvider>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </AuthProvider>
  );
}
