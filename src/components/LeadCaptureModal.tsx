import { useState } from 'react';
import { X, Phone, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';

export type LeadSource =
  | 'emergency_banner'
  | 'checkpoint_card'
  | 'lead_magnet'
  | 'exit_intent'
  | 'hotspot_specific'
  | 'header_cta'
  | 'floating_chooser'
  | 'mobile_menu';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: LeadSource;
  checkpointId?: string;
}

const COUNTIES = ['Delaware', 'Franklin', 'Union', 'Marion', 'Morrow', 'Licking', 'Knox', 'Other'];
const URGENCY_OPTIONS = [
  { value: 'exploring', label: 'Just exploring options' },
  { value: 'soon', label: 'Court date in next 2 weeks' },
  { value: 'urgent', label: 'Court date this week' },
  { value: 'emergency', label: 'Already arrested / need help now' },
];

export default function LeadCaptureModal({ isOpen, onClose, trigger, checkpointId }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    urgency: 'exploring',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\\d\\s\\-\\(\\)]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!supabase) {
      setErrors({ submit: 'Submission unavailable. Please call us directly.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        county: formData.county || null,
        urgency: formData.urgency,
        message: formData.message || null,
        lead_source: trigger,
        checkpoint_id: checkpointId || null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      });

      if (error) throw error;

      trackLeadSubmitted('form', trigger);

      setIsSuccess(true);
    } catch (error) {
      console.error('Failed to submit lead:', error);
      setErrors({ submit: 'Failed to submit. Please call or text us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-brand-black">Thank You!</h3>
            <p className="mb-6 text-brand-black/70">We'll contact you within 24 hours. For immediate assistance:</p>
            <div className="space-y-2">
              <a
                href={`tel:${OFFICE_PHONE_TEL}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-mango px-6 py-3 font-semibold text-brand-black transition-all hover:bg-brand-leaf hover:text-white"
                data-cta="lead_success_call"
                onClick={() => {
                  trackCtaClick('lead_success_call');
                  trackLeadSubmitted('phone', 'lead_success_call', {
                    target_number: OFFICE_PHONE_TEL,
                  });
                }}
              >
                <Phone className="h-5 w-5" />
                Call/Text {OFFICE_PHONE_DISPLAY}
              </a>
            </div>
            <button
              onClick={onClose}
              className="mt-4 block w-full text-sm text-brand-black/60 hover:text-brand-black"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-brand-black/40 transition-colors hover:bg-brand-black/5 hover:text-brand-black"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-2 text-xl font-bold text-brand-black">Free Case Evaluation</h2>
        <p className="mb-6 text-sm text-brand-black/70">Get confidential legal advice from an experienced DUI defense attorney.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-black">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50 ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-brand-black/20'
              }`}
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-black">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50 ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-brand-black/20'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-black">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50 ${
                errors.phone ? 'border-red-300 bg-red-50' : 'border-brand-black/20'
              }`}
              placeholder="(740) 555-1234"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-black">County</label>
            <select
              name="county"
              value={formData.county}
              onChange={handleChange}
              className="w-full rounded-lg border border-brand-black/20 px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50"
            >
              <option value="">Select county...</option>
              {COUNTIES.map((county) => (
                <option key={county} value={county}>{county} County</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-black">How urgent is your situation?</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full rounded-lg border border-brand-black/20 px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50"
            >
              {URGENCY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-brand-black">Message (optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none rounded-lg border border-brand-black/20 px-4 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango/50"
              placeholder="Brief description of your situation..."
            />
          </div>

          {errors.submit && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-brand-mango px-6 py-3 font-semibold text-brand-black transition-all hover:bg-brand-leaf hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              'Get Free Case Review'
            )}
          </button>

          <p className="text-center text-xs text-brand-black/60">Your information is confidential and protected by attorney-client privilege.</p>
        </form>
      </div>
    </div>
  );
}
