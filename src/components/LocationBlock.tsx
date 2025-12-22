import GoogleMap from './GoogleMap';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  mapHeight?: number;
};

export default function LocationBlock({
  eyebrow = 'Location',
  title = 'Delaware, Ohio',
  description = 'Serving Delaware County and nearby courts with local knowledge, motion practice, and courtroom experience.',
  mapHeight,
}: Props) {
  return (
    <section className="container py-12">
      <div className="grid gap-6 rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-goldText">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black">{title}</h2>
          <p className="mt-2 text-sm text-brand-black/70">{description}</p>
          <div className="mt-4 space-y-1 text-sm text-brand-black/80">
            <p>43 S Franklin St</p>
            <p>Delaware, OH 43015</p>
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="underline decoration-brand-black/20 underline-offset-4 hover:decoration-brand-mango"
              data-cta="location_call_office"
              onClick={() => {
                trackCtaClick('location_call_office');
                trackLeadSubmitted('phone', 'location_call_office', { target_number: OFFICE_PHONE_TEL });
              }}
            >
              Phone: {OFFICE_PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div>
          <GoogleMap
            businessName="Mango Law LLC"
            rating={4.9}
            reviewCount={45}
            placeId="0x0:0x5c800d103881fc5c"
            height={mapHeight}
          />
        </div>
      </div>
    </section>
  );
}
