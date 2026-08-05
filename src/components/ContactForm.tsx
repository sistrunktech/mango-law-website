'use client';

import { FormEvent, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, Phone } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { trackFallbackPhoneLead, trackLeadSubmitted } from '../lib/analytics';
import { normalizePhoneDigits } from '../lib/phone';
import TurnstileWidget from './TurnstileWidget';
import { TURNSTILE_SITE_KEY } from '../lib/turnstile';
import { CASE_TYPE_OPTIONS, COUNTY_OPTIONS, HOW_FOUND_OPTIONS, URGENCY_OPTIONS } from '../lib/intake';
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import LeadBackendFallback, {
  LeadBackendChecking,
  useLeadBackendAvailability,
} from './LeadBackendFallback';

interface ContactFormProps {
  variant?: 'default' | 'compact';
}

export default function ContactForm({ variant = 'default' }: ContactFormProps) {
  const isCompact = variant === 'compact';
  const inputClasses = [
    'mt-2 w-full rounded-xl border-2 border-brand-black/10 bg-white text-brand-black',
    isCompact ? 'px-3 py-2.5 text-sm' : 'px-4 py-3',
    'placeholder:text-brand-black/40',
    'transition-all duration-200',
    'focus:border-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal/20',
    'hover:border-brand-black/20',
  ].join(' ');
  const labelClasses = isCompact
    ? 'block text-xs font-semibold text-brand-black'
    : 'block text-sm font-semibold text-brand-black';

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [howFound, setHowFound] = useState('');
  const turnstileSiteKey = TURNSTILE_SITE_KEY;
  const backendAvailability = useLeadBackendAvailability();

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
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') ? normalizePhoneDigits(String(formData.get('phone'))) : null,
      message: formData.get('message'),
      case_type: formData.get('case_type'),
      county: formData.get('county'),
      urgency: formData.get('urgency'),
      how_found: formData.get('how_found'),
      how_found_detail: formData.get('how_found_detail'),
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
      trackLeadSubmitted('form', 'contact_form_submit');
      setStatus('success');
      form.reset();
      setHowFound('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to submit. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10">
          <CheckCircle className="h-8 w-8 text-brand-teal" />
        </div>
        <h3 className="text-xl font-bold text-brand-black">Message Sent</h3>
        <p className="mt-2 max-w-sm text-sm text-brand-black/60">
          Thank you for reaching out. We'll review your message and respond within one business day.
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

  if (backendAvailability === 'checking') {
    return <LeadBackendChecking />;
  }

  if (backendAvailability === 'unavailable') {
    return <LeadBackendFallback />;
  }

  return (
    <form className={isCompact ? 'space-y-4' : 'space-y-5'} onSubmit={handleSubmit}>
      <div className={`rounded-xl border border-brand-black/10 bg-white/70 ${isCompact ? 'p-3' : 'p-4'}`}>
        <p className={`font-semibold text-brand-black ${isCompact ? 'text-xs' : 'text-sm'}`}>
          Free case review. No obligation.
        </p>
        <p className={`mt-1 text-brand-black/60 ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
          Share basic facts, deadlines, and contact info. Save full evidence and sensitive details until asked.
        </p>
      </div>

      <fieldset className={`border border-brand-black/10 bg-white shadow-sm ${isCompact ? 'rounded-xl p-4' : 'rounded-2xl p-5'}`}>
        <legend className={`px-2 font-bold uppercase text-brand-goldText ${isCompact ? 'text-[10px] tracking-[0.16em]' : 'text-xs tracking-[0.18em]'}`}>
          Your Info
        </legend>
        <div className={`mt-3 grid ${isCompact ? 'gap-4' : 'gap-5 sm:grid-cols-2'}`}>
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name <span className="text-brand-mango">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              className={inputClasses}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-brand-mango">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClasses}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={inputClasses}
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={`border border-brand-black/10 bg-white shadow-sm ${isCompact ? 'rounded-xl p-4' : 'rounded-2xl p-5'}`}>
        <legend className={`px-2 font-bold uppercase text-brand-goldText ${isCompact ? 'text-[10px] tracking-[0.16em]' : 'text-xs tracking-[0.18em]'}`}>
          Your Situation
        </legend>
        <div className="mt-3">
          <div className={`grid ${isCompact ? 'gap-4' : 'gap-5 sm:grid-cols-2'}`}>
            <div>
              <label htmlFor="case_type" className={labelClasses}>
                What do you need help with? <span className="text-brand-mango">*</span>
              </label>
              <select id="case_type" name="case_type" required className={inputClasses}>
                <option value="">Select an option</option>
                {CASE_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="urgency" className={labelClasses}>
                How urgent is your situation?
              </label>
              <select id="urgency" name="urgency" className={inputClasses} defaultValue="exploring">
                {URGENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="county" className={labelClasses}>
                County (optional)
              </label>
              <select id="county" name="county" className={inputClasses} defaultValue="">
                <option value="">Select county...</option>
                {COUNTY_OPTIONS.map((county) => (
                  <option key={county} value={county}>
                    {county} County
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="message" className={labelClasses}>
            How can we help? <span className="text-brand-mango">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            className={inputClasses}
            rows={4}
            placeholder="Briefly describe the issue, court date or hearing date, county, and any urgent restriction like bond, license suspension, no-contact, or a protection order."
          />

          <div className={`mt-4 grid ${isCompact ? 'gap-4' : 'gap-5 sm:grid-cols-2'}`}>
            <div>
              <label htmlFor="how_found" className={labelClasses}>
                How did you find Nick/Mango Law? <span className="font-normal text-brand-black/45">(optional)</span>
              </label>
              <select
                id="how_found"
                name="how_found"
                className={inputClasses}
                value={howFound}
                onChange={(e) => setHowFound(e.target.value)}
              >
                <option value="">Select an option</option>
                {HOW_FOUND_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {(howFound === 'referral' || howFound === 'other') ? (
              <div>
                <label htmlFor="how_found_detail" className={labelClasses}>
                  {howFound === 'referral' ? 'Who can we thank?' : 'Quick note'} <span className="font-normal text-brand-black/45">(optional)</span>
                </label>
                <input
                  id="how_found_detail"
                  name="how_found_detail"
                  className={inputClasses}
                  placeholder={howFound === 'referral' ? 'Name of the person or business' : 'Tell us a little more'}
                />
              </div>
            ) : null}
          </div>
        </div>
      </fieldset>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Do not fill this field
          <input name="honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`btn btn-primary w-full ${isCompact ? 'py-3 text-sm' : 'py-4 text-base'}`}
        data-cta="contact_form_submit"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>

      {turnstileSiteKey && !turnstileToken ? (
        <div className="rounded-xl border border-brand-black/10 bg-white px-4 py-3 text-sm text-brand-black/70">
          <p>
            Verification may take a moment. If the form does not send, call or text the primary line instead.
          </p>
          <a
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="mt-2 inline-flex items-center gap-2 font-semibold text-brand-mangoText hover:text-brand-leaf"
            onClick={() =>
              trackFallbackPhoneLead('contact_form_turnstile_fallback_call', {
                target_number: PRIMARY_PHONE_TEL,
              })
            }
          >
            <Phone className="h-4 w-4" />
            Call/Text {PRIMARY_PHONE_DISPLAY}
          </a>
        </div>
      ) : null}

      <div className="mt-3 flex flex-col gap-2 border-t border-brand-black/10 pt-3 md:flex-row md:items-end md:justify-between">
        <p className={`text-center text-brand-black/60 md:text-left ${isCompact ? 'text-[11px]' : 'text-xs'}`}>
          Submitting this form does not create an attorney-client relationship. Please send basic facts and deadlines only;
          do not upload or paste full evidence until asked.
        </p>
        {turnstileSiteKey ? (
          <div className="flex flex-col items-center gap-1 md:items-end">
            <TurnstileWidget
              siteKey={turnstileSiteKey}
              onToken={setTurnstileToken}
              theme="light"
              size="compact"
              className={`turnstile-widget origin-top-right ${isCompact ? 'scale-[0.85]' : 'scale-[0.9]'}`}
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
