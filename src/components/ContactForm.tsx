import { FormEvent, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      setError('Contact form is not configured yet.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      how_heard: formData.get('how_heard'),
      honey: formData.get('honey'),
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
        throw fnError;
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to submit. Please try again.');
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-brand-black">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border-brand-black/10 bg-white text-brand-black"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-brand-black">Email</label>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border-brand-black/10 bg-white text-brand-black"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-brand-black">Phone</label>
          <input
            name="phone"
            className="mt-1 w-full rounded-lg border-brand-black/10 bg-white text-brand-black"
            placeholder="(000) 000-0000"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-brand-black">How did you hear about us?</label>
          <input
            name="how_heard"
            className="mt-1 w-full rounded-lg border-brand-black/10 bg-white text-brand-black"
            placeholder="Referral, search, etc."
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-brand-black">How can we help?</label>
        <textarea
          name="message"
          required
          className="mt-1 w-full rounded-lg border-brand-black/10 bg-white text-brand-black"
          rows={4}
          placeholder="Share brief details about the situation."
        />
      </div>
      <div className="hidden">
        <label>
          Do not fill this field
          <input name="honey" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center rounded-full bg-brand-black px-5 py-3 text-sm font-semibold text-brand-offWhite transition hover:bg-brand-gold hover:text-brand-black disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit'}
        </button>
        {status === 'success' && <p className="text-sm text-brand-teal">Thanks—your message was sent.</p>}
        {error && <p className="text-sm text-brand-mango">Error: {error}</p>}
      </div>
    </form>
  );
}
