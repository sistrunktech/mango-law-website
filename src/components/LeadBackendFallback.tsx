'use client';

import { useEffect, useState } from 'react';
import { Loader2, Phone } from 'lucide-react';
import { checkLeadBackendAvailability } from '../lib/supabaseClient';
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import { trackFallbackPhoneLead } from '../lib/analytics';

export type LeadBackendAvailability = 'checking' | 'available' | 'unavailable';

let availabilityPromise: Promise<LeadBackendAvailability> | null = null;
let availableUntil = 0;
const AVAILABILITY_CACHE_MS = 30_000;

function resolveLeadBackendAvailability(): Promise<LeadBackendAvailability> {
  if (Date.now() < availableUntil) return Promise.resolve('available');

  if (!availabilityPromise) {
    availabilityPromise = (async () => {
      const firstPass = await checkLeadBackendAvailability();
      const available = firstPass || (await checkLeadBackendAvailability());
      if (available) availableUntil = Date.now() + AVAILABILITY_CACHE_MS;
      return available ? 'available' : 'unavailable';
    })().finally(() => {
      availabilityPromise = null;
    });
  }

  return availabilityPromise;
}

export function useLeadBackendAvailability(): LeadBackendAvailability {
  const [availability, setAvailability] = useState<LeadBackendAvailability>('checking');

  useEffect(() => {
    let active = true;
    let retryTimer: number | undefined;
    let hasRetried = false;

    const checkAvailability = () => {
      void resolveLeadBackendAvailability().then((result) => {
        if (!active) return;
        setAvailability(result);
        if (result === 'unavailable' && !hasRetried) {
          hasRetried = true;
          retryTimer = window.setTimeout(checkAvailability, 5_000);
        }
      });
    };

    checkAvailability();
    window.addEventListener('online', checkAvailability);

    return () => {
      active = false;
      if (retryTimer) window.clearTimeout(retryTimer);
      window.removeEventListener('online', checkAvailability);
    };
  }, []);

  return availability;
}

export function LeadBackendChecking() {
  return (
    <div
      className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-brand-black/10 bg-brand-offWhite px-6 text-center"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-6 w-6 animate-spin text-brand-mangoText" />
      <p className="mt-3 text-sm font-semibold text-brand-black">Checking secure online intake...</p>
    </div>
  );
}

export default function LeadBackendFallback() {
  return (
    <section
      className="rounded-2xl border border-brand-leaf/20 bg-brand-offWhite p-6 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-leaf/10">
        <Phone className="h-6 w-6 text-brand-forest" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-brand-black">Call or text Mango Law</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-brand-black/70">
        Online messages are temporarily unavailable. For timely assistance, use the primary office line.
      </p>
      <a
        href={`tel:${PRIMARY_PHONE_TEL}`}
        className="btn btn-primary mt-5 inline-flex w-full items-center justify-center gap-2 py-3"
        data-cta="lead_backend_fallback_call"
        onClick={() =>
          trackFallbackPhoneLead('lead_backend_fallback_call', {
            target_number: PRIMARY_PHONE_TEL,
          })
        }
      >
        <Phone className="h-4 w-4" />
        Call/Text {PRIMARY_PHONE_DISPLAY}
      </a>
      <p className="mt-4 text-xs leading-5 text-brand-black/55">
        Calling or texting does not create an attorney-client relationship. Share basic facts and deadlines only.
      </p>
    </section>
  );
}
