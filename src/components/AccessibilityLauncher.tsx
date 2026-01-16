'use client';

import { useState, useEffect, useRef } from 'react';
import { Accessibility, X, RotateCcw, Type, Eye, MousePointer, Link, Focus, Brain, Space } from 'lucide-react';
import { useAccessibility, type FontSize } from '../contexts/AccessibilityContext';
import { useFocusTrap } from '../lib/useFocusTrap';

interface AccessibilityLauncherProps {
  bottomOffsetClass?: string;
}

export default function AccessibilityLauncher({ bottomOffsetClass = 'bottom-24 lg:bottom-6' }: AccessibilityLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { preferences, updatePreference, resetPreferences } = useAccessibility();

  const launcherButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen, launcherButtonRef);

  const bottomClass = bottomOffsetClass;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setIsCollapsed(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const timer = window.setTimeout(() => setIsCollapsed(true), 10_000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  const fontSizeOptions: { value: FontSize; label: string; scale: string }[] = [
    { value: 'default', label: 'Default', scale: '100%' },
    { value: 'medium', label: 'Medium', scale: '112%' },
    { value: 'large', label: 'Large', scale: '125%' },
    { value: 'x-large', label: 'X-Large', scale: '150%' },
  ];

  return (
    <>
      <button
        ref={launcherButtonRef}
        onClick={() => setIsOpen(true)}
        aria-label="Open accessibility options (Alt+A)"
        className={[
          'group fixed left-auto right-4 z-50 flex items-center justify-center rounded-full bg-brand-mango shadow-lg transition-all hover:bg-brand-leaf hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-mango/50 sm:right-6',
          bottomClass,
          isCollapsed ? 'h-11 w-11' : 'h-14 w-14 hover:scale-110',
          'lg:left-6 lg:right-auto',
        ].join(' ')}
      >
        <Accessibility
          className={[
            'text-white transition-transform group-hover:rotate-12',
            isCollapsed ? 'h-5 w-5' : 'h-6 w-6',
          ].join(' ')}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-brand-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed bottom-0 left-0 top-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-2xl transition-transform sm:rounded-r-2xl"
            role="dialog"
            aria-label="Accessibility Settings"
            aria-modal="true"
            ref={panelRef}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-black/10 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-mango/10">
                  <Accessibility className="h-5 w-5 text-brand-mangoText" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-black">Accessibility</h2>
                  <p className="text-xs text-brand-black/60">Customize your experience</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-brand-black/60 transition-colors hover:bg-brand-black/5 hover:text-brand-mangoText focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango"
                aria-label="Close accessibility settings"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8 p-6">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Type className="h-5 w-5 text-brand-mangoText" />
                  <h3 className="text-lg font-bold text-brand-black">Text Size</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updatePreference('fontSize', option.value)}
                      className={`rounded-lg border-2 px-4 py-3 text-center transition-all ${
                        preferences.fontSize === option.value
                          ? 'border-brand-mango bg-brand-mango/5 text-brand-mangoText'
                          : 'border-brand-black/10 text-brand-black/70 hover:border-brand-mango/30 hover:bg-brand-black/5'
                      }`}
                    >
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div className="text-xs opacity-70">{option.scale}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="mb-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-brand-mangoText" />
                  <h3 className="text-lg font-bold text-brand-black">Visual Options</h3>
                </div>

                <ToggleOption
                  label="High Contrast Mode"
                  description="Increase color contrast for better visibility"
                  checked={preferences.highContrast}
                  onChange={(checked) => updatePreference('highContrast', checked)}
                />

                <ToggleOption
                  label="Reduce Motion"
                  description="Minimize animations and transitions"
                  checked={preferences.reducedMotion}
                  onChange={(checked) => updatePreference('reducedMotion', checked)}
                />

                <ToggleOption
                  label="Underline Links"
                  description="Always show underlines on links"
                  checked={preferences.underlineLinks}
                  onChange={(checked) => updatePreference('underlineLinks', checked)}
                />
              </div>

              <div className="space-y-4">
                <div className="mb-4 flex items-center gap-2">
                  <Focus className="h-5 w-5 text-brand-mangoText" />
                  <h3 className="text-lg font-bold text-brand-black">Navigation</h3>
                </div>

                <ToggleOption
                  label="Enhanced Focus Indicators"
                  description="Make keyboard focus more visible"
                  checked={preferences.enhancedFocus}
                  onChange={(checked) => updatePreference('enhancedFocus', checked)}
                />

                <ToggleOption
                  label="Large Cursor Highlight"
                  description="Add visual highlight around cursor"
                  checked={preferences.largeCursor}
                  onChange={(checked) => updatePreference('largeCursor', checked)}
                />
              </div>

              <div className="space-y-4">
                <div className="mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-brand-mango" />
                  <h3 className="text-lg font-bold text-brand-black">Reading Support</h3>
                </div>

                <ToggleOption
                  label="Dyslexia-Friendly Font"
                  description="Use OpenDyslexic font for easier reading"
                  checked={preferences.dyslexiaFont}
                  onChange={(checked) => updatePreference('dyslexiaFont', checked)}
                />

                <ToggleOption
                  label="Increased Text Spacing"
                  description="Add extra space between lines and letters"
                  checked={preferences.increasedSpacing}
                  onChange={(checked) => updatePreference('increasedSpacing', checked)}
                />
              </div>

              <div className="border-t border-brand-black/10 pt-6">
                <button
                  onClick={() => {
                    resetPreferences();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-black/10 bg-white px-4 py-3 font-semibold text-brand-black/70 transition-all hover:border-brand-mango hover:bg-brand-mango/5 hover:text-brand-mangoText focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset to Defaults
                </button>
              </div>

              <div className="rounded-lg bg-brand-offWhite p-4 text-sm text-brand-black/70">
                <p className="mb-1 font-semibold text-brand-black">Keyboard Shortcut</p>
                <p>Press <kbd className="rounded bg-white px-2 py-1 font-mono text-xs font-bold">Alt+A</kbd> to toggle this panel</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

interface ToggleOptionProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleOption({ label, description, checked, onChange }: ToggleOptionProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-black/5">
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className="h-6 w-11 rounded-full bg-brand-black/20 transition-colors peer-checked:bg-brand-mango peer-focus-visible:ring-2 peer-focus-visible:ring-brand-mango/50" />
        <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-brand-black">{label}</div>
        <div className="text-sm text-brand-black/60">{description}</div>
      </div>
    </label>
  );
}
