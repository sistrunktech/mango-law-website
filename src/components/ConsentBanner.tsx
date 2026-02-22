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
    'inline-flex h-9 items-center justify-center rounded-md px-3 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40';
  const buttonSecondary = `${buttonBase} border border-brand-black/15 bg-white text-brand-black/80 hover:bg-brand-black/5`;
  const buttonPrimary = `${buttonBase} bg-brand-mango text-brand-black hover:bg-brand-mangoLight`;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 sm:px-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-[860px] overflow-hidden rounded-xl border border-brand-black/10 bg-white text-brand-black shadow-soft">
        <div className="p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black/70">
                  Privacy preferences
                </p>
                <a
                  href="/privacy"
                  className="rounded-md px-2 py-1 text-[11px] font-semibold text-brand-black/65 hover:bg-brand-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                >
                  Privacy Policy
                </a>
              </div>
              <p className="mt-1 max-w-[64ch] text-xs leading-relaxed text-brand-black/75 sm:text-sm">
                We use cookies to measure site performance and improve your experience. Choose what’s allowed.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
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
                  className={buttonPrimary}
                  onClick={() => apply(draft)}
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  className={buttonPrimary}
                  onClick={() => apply(acceptAllConsent())}
                >
                  Accept all
                </button>
              )}
            </div>
          </div>

          {view === 'customize' ? (
            <div className="mt-3 rounded-lg border border-brand-black/10 bg-brand-offWhite p-3">
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-black/70">Cookie preferences</div>
                <div className="text-[11px] font-semibold text-brand-black/55">Optional</div>
              </div>
              <div className="mt-2 space-y-2">
                <label className="flex cursor-pointer items-start justify-between gap-3 rounded-md bg-white/70 p-2.5">
                  <div>
                    <div className="text-xs font-semibold text-brand-black">Analytics</div>
                    <div className="text-[11px] leading-snug text-brand-black/60">
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

                <label className="flex cursor-pointer items-start justify-between gap-3 rounded-md bg-white/70 p-2.5">
                  <div>
                    <div className="text-xs font-semibold text-brand-black">Advertising</div>
                    <div className="text-[11px] leading-snug text-brand-black/60">
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

          <div className="mt-2 text-[10px] leading-snug text-brand-black/50">
            You can change choices anytime by clearing cookies for this site.
          </div>
        </div>
      </div>
    </div>
  );
}
