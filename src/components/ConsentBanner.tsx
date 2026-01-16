'use client';

import { useEffect, useMemo, useState } from 'react';
import { acceptAllConsent, getStoredConsent, rejectAllConsent, setConsent, type ConsentStateV2 } from '../lib/consent';

type ViewState = 'collapsed' | 'customize';

function isConsentChosen(consent: ConsentStateV2 | null) {
  return Boolean(consent);
}

export default function ConsentBanner(props: { onVisibilityChange?: (visible: boolean) => void }) {
  const [stored, setStored] = useState<ConsentStateV2 | null>(null);
  const [view, setView] = useState<ViewState>('collapsed');
  const [draft, setDraft] = useState<ConsentStateV2>(rejectAllConsent());

  useEffect(() => {
    const v = getStoredConsent();
    setStored(v);
    setDraft(v ?? rejectAllConsent());
  }, []);

  const visible = useMemo(() => !isConsentChosen(stored), [stored]);

  useEffect(() => {
    props.onVisibilityChange?.(visible);
  }, [props, visible]);

  if (!visible) return null;

  const apply = (next: ConsentStateV2) => {
    setConsent(next);
    setStored(next);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-[980px] rounded-2xl border border-brand-black/10 bg-white text-brand-black shadow-soft">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-leaf">
                Privacy
              </div>
              <a
                href="/privacy"
                className="rounded-md px-2 py-1 text-[11px] font-semibold text-brand-black/70 hover:bg-brand-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
              >
                Privacy Policy
              </a>
            </div>
            <p className="text-xs text-brand-black/70 sm:text-sm">
              We use cookies to measure site performance. Choose what’s allowed.
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
            {view !== 'customize' ? (
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-brand-black/10 bg-white px-3 text-xs font-semibold text-brand-black/70 hover:bg-brand-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => setView('customize')}
              >
                Customize
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-brand-black/10 bg-white px-3 text-xs font-semibold text-brand-black/70 hover:bg-brand-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => setView('collapsed')}
              >
                Back
              </button>
            )}

            <button
              type="button"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-brand-black/10 bg-white px-3 text-xs font-semibold text-brand-black/70 hover:bg-brand-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
              onClick={() => apply(rejectAllConsent())}
            >
              Reject all
            </button>

            {view === 'customize' ? (
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-mango px-3 text-xs font-semibold text-brand-black hover:bg-brand-mangoLight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => apply(draft)}
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-mango px-3 text-xs font-semibold text-brand-black hover:bg-brand-mangoLight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => apply(acceptAllConsent())}
              >
                Accept all
              </button>
            )}
          </div>

          {view === 'customize' ? (
            <div className="mt-4 rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
              <div className="text-sm font-semibold text-brand-black">Customize</div>
              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-brand-black">Analytics</div>
                    <div className="text-xs text-brand-black/60">Helps us understand traffic and improve the site.</div>
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

                <label className="flex cursor-pointer items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-brand-black">Advertising</div>
                    <div className="text-xs text-brand-black/60">
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

          <div className="mt-3 text-[11px] text-brand-black/50">
            You can change choices anytime by clearing cookies for this site.
          </div>
        </div>
      </div>
    </div>
  );
}
