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
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="mx-auto max-w-[680px] rounded-2xl border border-black/10 bg-white shadow-soft-lg">
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-brand-black">Privacy & cookies</div>
              <p className="mt-1 text-sm text-slate-700">
                We use cookies to measure site performance and improve your experience. You can accept all, reject all, or
                choose what’s allowed.
              </p>
            </div>
            <a
              href="/privacy"
              className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-brand-leaf hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
            >
              Privacy Policy
            </a>
          </div>

          {view === 'customize' ? (
            <div className="mt-4 rounded-xl border border-black/10 bg-brand-offWhite p-4">
              <div className="text-sm font-semibold text-brand-black">Customize</div>
              <div className="mt-3 space-y-3">
                <label className="flex cursor-pointer items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-brand-black">Analytics</div>
                    <div className="text-sm text-slate-700">Helps us understand traffic and improve the site.</div>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-brand-leaf"
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
                    <div className="text-sm text-slate-700">Allows ad-related measurement and personalization signals.</div>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-brand-leaf"
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

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            {view !== 'customize' ? (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => setView('customize')}
              >
                Customize
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => setView('collapsed')}
              >
                Back
              </button>
            )}

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
              onClick={() => apply(rejectAllConsent())}
            >
              Reject all
            </button>

            {view === 'customize' ? (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-brand-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-brand-leafDark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => apply(draft)}
              >
                Save choices
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-brand-leaf px-4 py-2 text-sm font-semibold text-white hover:bg-brand-leafDark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/40"
                onClick={() => apply(acceptAllConsent())}
              >
                Accept all
              </button>
            )}
          </div>

          <div className="mt-3 text-xs text-slate-600">
            You can change your choices anytime by clearing your cookies for this site.
          </div>
        </div>
      </div>
    </div>
  );
}

