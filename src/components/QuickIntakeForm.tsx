'use client';

import { FormEvent, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { trackLeadSubmitted } from '../lib/analytics';
import { formatUsPhone, normalizePhoneDigits, isLikelyValidPhone } from '../lib/phone';
import TurnstileWidget from './TurnstileWidget';
import { TURNSTILE_SITE_KEY } from '../lib/turnstile';
import { CASE_TYPE_OPTIONS, COUNTY_OPTIONS, HOW_FOUND_OPTIONS, URGENCY_OPTIONS } from '../lib/intake';

const inputClasses = [
  'w-full rounded-xl border-2 border-brand-black/10 bg-white px-4 py-3 text-brand-black',
  'placeholder:text-brand-black/40',
  'transition-all duration-200',
  'focus:border-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal/20',
  'hover:border-brand-black/20',
].join(' ');

const labelClasses = 'block text-sm font-semibold text-brand-black';

export default function QuickIntakeForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [phone, setPhone] = useState('');
  const [howFound, setHowFound] = useState('');
  const turnstileSiteKey = TURNSTILE_SITE_KEY;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError('Contact form is not configured yet.');
      return;
    }

    if (turnstileSiteKey && !turnstileToken) {
      setError('Please complete the verification step and try again.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const phoneValue = String(formData.get('phone') || '');

    if (!isLikelyValidPhone(phoneValue)) {
      setError('Please enter a valid phone number.');
      return;
    }

    const payload = {
      name: formData.get('name'),
      email: formData.get('email') || null,
      phone: normalizePhoneDigits(phoneValue),
      message: formData.get('message'),
      case_type: formData.get('case_type') || null,
      county: formData.get('county') || null,
      urgency: formData.get('urgency') || 'exploring',
      how_found: formData.get('how_found') || null,
      how_found_detail: formData.get('how_found_detail') || null,
      honey: formData.get('honey'),
      turnstile_token: turnstileToken,
    };

    if (payload.honey) {
      setError('Unable to submit at this time.');
      return;
    }

    try {
      setStatus('submitting');
      setError(null);
      const { error: fnError } = await supabase.functions.invoke('submit-contact', {
        body: payload,
      });
      if (fnError) {
        let serverMessage: string | undefined;
        try {
          const context = (fnError as any)?.context;
          const response: Response | undefined = context?.clone ? context.clone() : context;
          const json = response ? await response.json().catch(() => null) : null;
          serverMessage = typeof json?.error === 'string' ? json.error : undefined;
        } catch {
          // ignore
        }
        throw new Error(serverMessage || fnError.message);
      }
      trackLeadSubmitted('form', 'quick_intake_submit');
      setStatus('success');
      form.reset();
      setPhone('');
      setHowFound('');
      setShowDetails(false);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to submit. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10">
          <CheckCircle className="h-8 w-8 text-brand-teal" />
        </div>
        <h3 className="text-xl font-bold text-brand-black">Message Sent</h3>
        <p className="mt-2 max-w-sm text-sm text-brand-black/60">
          Nick will review your message and respond within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-brand-teal hover:text-brand-mango"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="rounded-xl border border-brand-leaf/20 bg-brand-leaf/5 p-3">
        <p className="text-sm font-semibold text-brand-forest">Free, confidential consultation</p>
        <p className="mt-0.5 text-xs text-brand-black/60">
          Share only what you're comfortable sharing.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quick_name" className={labelClasses}>
            Your Name <span className="text-brand-mango">*</span>
          </label>
          <input
            id="quick_name"
            name="name"
            required
            className={inputClasses}
            placeholder="Full name"
          />
        </div>
        <div>
          <label htmlFor="quick_phone" className={labelClasses}>
            Phone <span className="text-brand-mango">*</span>
          </label>
          <input
            id="quick_phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(formatUsPhone(e.target.value))}
            className={inputClasses}
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quick_message" className={labelClasses}>
          What happened? <span className="text-brand-mango">*</span>
        </label>
        <textarea
          id="quick_message"
          name="message"
          required
          className={inputClasses}
          rows={3}
          placeholder="Briefly describe your situation (charge, arrest date, court date if known)"
        />
      </div>

      <button
        type="button"
        onClick={() => setShowDetails(!showDetails)}
        className="flex w-full items-center justify-between rounded-lg border border-brand-black/10 bg-brand-offWhite px-4 py-2.5 text-sm font-medium text-brand-black/70 transition-colors hover:bg-brand-black/5"
      >
        <span>{showDetails ? 'Hide additional details' : 'Add more details (optional)'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </button>

      {showDetails && (
        <div className="space-y-4 rounded-xl border border-brand-black/10 bg-brand-offWhite/50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="quick_email" className={labelClasses}>
                Email
              </label>
              <input
                id="quick_email"
                name="email"
                type="email"
                className={inputClasses}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="quick_case_type" className={labelClasses}>
                Type of Case
              </label>
              <select id="quick_case_type" name="case_type" className={inputClasses}>
                <option value="">Select...</option>
                {CASE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quick_county" className={labelClasses}>
                County
              </label>
              <select id="quick_county" name="county" className={inputClasses}>
                <option value="">Select...</option>
                {COUNTY_OPTIONS.map((county) => (
                  <option key={county} value={county}>
                    {county} County
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quick_urgency" className={labelClasses}>
                Urgency
              </label>
              <select id="quick_urgency" name="urgency" className={inputClasses} defaultValue="exploring">
                {URGENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="quick_how_found" className={labelClasses}>
              How did you find us?
            </label>
            <select
              id="quick_how_found"
              name="how_found"
              className={inputClasses}
              value={howFound}
              onChange={(e) => setHowFound(e.target.value)}
            >
              <option value="">Select...</option>
              {HOW_FOUND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {(howFound === 'referral' || howFound === 'other') && (
            <div>
              <label htmlFor="quick_how_found_detail" className={labelClasses}>
                {howFound === 'referral' ? 'Who can we thank?' : 'Tell us more'}
              </label>
              <input
                id="quick_how_found_detail"
                name="how_found_detail"
                className={inputClasses}
                placeholder={howFound === 'referral' ? 'Name of person or business' : 'Quick note'}
              />
            </div>
          )}
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label>
          Do not fill this field
          <input name="honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting' || (turnstileSiteKey ? !turnstileToken : false)}
        className="btn btn-primary w-full py-4 text-base"
        data-cta="quick_intake_submit"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Get Free Case Review
          </>
        )}
      </button>

      <div className="flex flex-col gap-2 border-t border-brand-black/10 pt-3 md:flex-row md:items-end md:justify-between">
        <p className="text-center text-xs text-brand-black/60 md:text-left">
          Submitting this form does not create an attorney-client relationship.
        </p>
        {turnstileSiteKey ? (
          <div className="flex flex-col items-center gap-1 md:items-end">
            <TurnstileWidget
              siteKey={turnstileSiteKey}
              onToken={setTurnstileToken}
              theme="light"
              size="compact"
              className="turnstile-widget origin-top-right scale-[0.9]"
            />
            <p className="text-[10px] font-medium leading-tight text-brand-black/50">
              Protected by Cloudflare Turnstile
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
