import { FormEvent, useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { trackLeadSubmitted } from '../lib/analytics';
import { normalizePhoneDigits } from '../lib/phone';
import TurnstileWidget from './TurnstileWidget';

const inputClasses = [
  'mt-2 w-full rounded-xl border-2 border-brand-black/10 bg-white px-4 py-3 text-brand-black',
  'placeholder:text-brand-black/40',
  'transition-all duration-200',
  'focus:border-brand-teal focus-visible:ring-2 focus-visible:ring-brand-teal/20',
  'hover:border-brand-black/20',
].join(' ');

const labelClasses = 'block text-sm font-semibold text-brand-black';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileSiteKey = (import.meta as any).env?.VITE_TURNSTILE_SITE_KEY as string | undefined;

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
      how_heard: formData.get('how_heard'),
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

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="rounded-xl border border-brand-black/10 bg-white/70 p-4">
        <p className="text-sm font-semibold text-brand-black">Free, confidential consultation. No obligation.</p>
        <p className="mt-1 text-xs text-brand-black/60">
          Share only what you’re comfortable sharing — we’ll respond promptly with next steps.
        </p>
      </div>

      <fieldset className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm">
        <legend className="px-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-goldText">Your Info</legend>
        <div className="mt-3 grid gap-5 sm:grid-cols-2">
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
          <div>
            <label htmlFor="how_heard" className={labelClasses}>
              How did you find us?
            </label>
            <select
              id="how_heard"
              name="how_heard"
              className={inputClasses}
            >
              <option value="">Select an option</option>
              <option value="google">Google Search</option>
              <option value="referral">Referral</option>
              <option value="social">Social Media</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm">
        <legend className="px-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-goldText">Your Situation</legend>
        <div className="mt-3">
          <label htmlFor="message" className={labelClasses}>
            How can we help? <span className="text-brand-mango">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            className={inputClasses}
            rows={4}
            placeholder="Briefly describe your situation and any upcoming court dates."
          />
          <p className="mt-2 text-xs text-brand-black/60">
            Your information is confidential and protected by attorney-client privilege.
          </p>
        </div>
      </fieldset>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label>
          Do not fill this field
          <input name="honey" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileSiteKey ? (
        <div className="rounded-xl border border-brand-black/10 bg-white p-4">
          <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
        </div>
      ) : null}

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
        className="btn btn-primary w-full py-4 text-base"
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
    </form>
  );
}
