'use client';

import { useEffect, useMemo, useState } from 'react';
import { acceptAllConsent, getStoredConsent, rejectAllConsent, setConsent, type ConsentStateV2 } from '../lib/consent';

type ViewState = 'collapsed' | 'customize';

function isConsentChosen(consent: ConsentStateV2 | null) {
  return Boolean(consent);
}

export default function ConsentBanner(props: { onVisibilityChange?: (visible: boolean) => void }) {
  const [isReady, setIsReady] = useState(false);
  const [stored, setStored] = useState<ConsentStateV2 | null>(null);
  const [view, setView] = useState<ViewState>('collapsed');
  const [draft, setDraft] = useState<ConsentStateV2>(rejectAllConsent());

  useEffect(() => {
    const v = getStoredConsent();
    setStored(v);
    setDraft(v ?? rejectAllConsent());
    setIsReady(true);
  }, []);

  const visible = useMemo(() => isReady && !isConsentChosen(stored), [isReady, stored]);

  useEffect(() => {
    props.onVisibilityChange?.(visible);
  }, [props, visible]);

  if (!visible) return null;

  const apply = (next: ConsentStateV2) => {
    setConsent(next);
    setStored(next);
  };

  const buttonBase =
    'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40';
  const buttonSecondary = `${buttonBase} border border-brand-black/10 bg-white text-brand-black/80 hover:bg-brand-black/5`;
  const buttonPrimary = `${buttonBase} bg-brand-mango text-brand-black hover:bg-brand-mangoLight`;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-[980px] overflow-hidden rounded-2xl border border-brand-black/10 bg-white text-brand-black shadow-soft">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="rounded-full bg-brand-offWhite px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-leaf">
                  Privacy
                </div>
                <a
                  href="/privacy"
                  className="rounded-md px-2 py-1 text-[12px] font-semibold text-brand-black/70 hover:bg-brand-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                >
                  Privacy Policy
                </a>
              </div>
              <p className="mt-2 max-w-[70ch] text-sm leading-snug text-brand-black/75">
                We use cookies to measure site performance and improve your experience. Choose what’s allowed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
              {view !== 'customize' ? (
                <button type="button" className={buttonSecondary} onClick={() => setView('customize')}>
                  Customize
                </button>
              ) : (
                <button type="button" className={buttonSecondary} onClick={() => setView('collapsed')}>
                  Back
                </button>
              )}

              <button type="button" className={buttonSecondary} onClick={() => apply(rejectAllConsent())}>
                Reject all
              </button>

              {view === 'customize' ? (
                <button
                  type="button"
                  className={`${buttonPrimary} col-span-2 sm:col-auto`}
                  onClick={() => apply(draft)}
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  className={`${buttonPrimary} col-span-2 sm:col-auto`}
                  onClick={() => apply(acceptAllConsent())}
                >
                  Accept all
                </button>
              )}
            </div>
          </div>

          {view === 'customize' ? (
            <div className="mt-4 rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-brand-black">Cookie preferences</div>
                <div className="text-[12px] font-semibold text-brand-black/60">Optional</div>
              </div>
              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-white/60 p-3">
                  <div>
                    <div className="text-sm font-semibold text-brand-black">Analytics</div>
                    <div className="text-xs leading-snug text-brand-black/60">
                      Helps us understand traffic and improve the site.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-brand-mango"
                    checked={draft.analytics_storage === 'granted'}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        analytics_storage: e.target.checked ? 'granted' : 'denied',
                      }))
                    }
                  />
                </label>

                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg bg-white/60 p-3">
                  <div>
                    <div className="text-sm font-semibold text-brand-black">Advertising</div>
                    <div className="text-xs leading-snug text-brand-black/60">
                      Allows ad-related measurement and personalization signals.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-brand-mango"
                    checked={draft.ad_storage === 'granted'}
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      setDraft((prev) => ({
                        ...prev,
                        ad_storage: enabled ? 'granted' : 'denied',
                        ad_user_data: enabled ? 'granted' : 'denied',
                        ad_personalization: enabled ? 'granted' : 'denied',
                      }));
                    }}
                  />
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-3 text-[11px] leading-snug text-brand-black/50">
            You can change choices anytime by clearing cookies for this site.
          </div>
        </div>
      </div>
    </div>
  );
}
