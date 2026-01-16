'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { AccessibilityProvider } from '../contexts/AccessibilityContext';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </AuthProvider>
  );
}
