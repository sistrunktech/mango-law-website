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
      <div className="mx-auto max-w-[980px] rounded-2xl border border-white/10 bg-brand-black/90 text-brand-offWhite shadow-soft-lg backdrop-blur">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3 sm:block">
                <div className="text-sm font-semibold text-brand-offWhite">Privacy & cookies</div>
                <a
                  href="/privacy"
                  className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-brand-mango hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                >
                  Privacy Policy
                </a>
              </div>
              <p className="mt-1 text-sm text-brand-offWhite/80">
                We use cookies to measure site performance and improve your experience. Choose what’s allowed.
              </p>
            </div>

          {view === 'customize' ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-brand-offWhite">Customize</div>
              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-brand-offWhite">Analytics</div>
                    <div className="text-sm text-brand-offWhite/75">Helps us understand traffic and improve the site.</div>
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
                    <div className="text-sm font-semibold text-brand-offWhite">Advertising</div>
                    <div className="text-sm text-brand-offWhite/75">Allows ad-related measurement and personalization signals.</div>
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

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              {view !== 'customize' ? (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-offWhite hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                  onClick={() => setView('customize')}
                >
                  Customize
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-offWhite hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                  onClick={() => setView('collapsed')}
                >
                  Back
                </button>
              )}

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-offWhite hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => apply(rejectAllConsent())}
              >
                Reject all
              </button>

              {view === 'customize' ? (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-mango px-4 py-2 text-sm font-semibold text-brand-black hover:bg-brand-mangoLight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                  onClick={() => apply(draft)}
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-mango px-4 py-2 text-sm font-semibold text-brand-black hover:bg-brand-mangoLight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                  onClick={() => apply(acceptAllConsent())}
                >
                  Accept all
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 text-xs text-brand-offWhite/70">
            You can change your choices anytime by clearing cookies for this site.
          </div>
        </div>
      </div>
    </div>
  );
}
