'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontSize = 'default' | 'medium' | 'large' | 'x-large';

export interface AccessibilityPreferences {
  fontSize: FontSize;
  highContrast: boolean;
  reducedMotion: boolean;
  underlineLinks: boolean;
  enhancedFocus: boolean;
  dyslexiaFont: boolean;
  increasedSpacing: boolean;
  largeCursor: boolean;
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => void;
  resetPreferences: () => void;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 'default',
  highContrast: false,
  reducedMotion: false,
  underlineLinks: false,
  enhancedFocus: false,
  dyslexiaFont: false,
  increasedSpacing: false,
  largeCursor: false,
};

const STORAGE_KEY = 'mango-law-a11y-preferences';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    if (typeof window === 'undefined') {
      return defaultPreferences;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...defaultPreferences, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load accessibility preferences:', error);
    }
    return defaultPreferences;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !preferences.reducedMotion) {
      setPreferences((prev) => ({ ...prev, reducedMotion: true }));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save accessibility preferences:', error);
    }

    applyPreferences(preferences);
  }, [preferences]);

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}

function applyPreferences(preferences: AccessibilityPreferences) {
  const root = document.documentElement;

  root.setAttribute('data-font-size', preferences.fontSize);
  root.setAttribute('data-high-contrast', String(preferences.highContrast));
  root.setAttribute('data-reduced-motion', String(preferences.reducedMotion));
  root.setAttribute('data-underline-links', String(preferences.underlineLinks));
  root.setAttribute('data-enhanced-focus', String(preferences.enhancedFocus));
  root.setAttribute('data-dyslexia-font', String(preferences.dyslexiaFont));
  root.setAttribute('data-increased-spacing', String(preferences.increasedSpacing));
  root.setAttribute('data-large-cursor', String(preferences.largeCursor));

  if (preferences.highContrast) {
    root.classList.add('high-contrast-mode');
  } else {
    root.classList.remove('high-contrast-mode');
  }

  if (preferences.reducedMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }

  if (preferences.underlineLinks) {
    root.classList.add('underline-links');
  } else {
    root.classList.remove('underline-links');
  }

  if (preferences.enhancedFocus) {
    root.classList.add('enhanced-focus');
  } else {
    root.classList.remove('enhanced-focus');
  }

  if (preferences.dyslexiaFont) {
    root.classList.add('dyslexia-font');
  } else {
    root.classList.remove('dyslexia-font');
  }

  if (preferences.increasedSpacing) {
    root.classList.add('increased-spacing');
  } else {
    root.classList.remove('increased-spacing');
  }

  if (preferences.largeCursor) {
    root.classList.add('large-cursor');
  } else {
    root.classList.remove('large-cursor');
  }
}
