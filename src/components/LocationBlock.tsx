import GoogleMap from './GoogleMap';

export default function LocationBlock() {
  return (
    <section className="container py-12">
      <div className="grid gap-6 rounded-2xl border border-brand-black/10 bg-white p-6 shadow-sm md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Location</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-black">Delaware, Ohio</h2>
          <p className="mt-2 text-sm text-brand-black/70">
            Serving Delaware County and nearby courts with local knowledge, motion practice, and courtroom experience.
          </p>
          <div className="mt-4 space-y-1 text-sm text-brand-black/80">
            <p>43 S Franklin St</p>
            <p>Delaware, OH 43015</p>
            <p>Phone: (740) 602-2155</p>
          </div>
        </div>
        <div>
          <GoogleMap
            businessName="Mango Law LLC"
            rating={4.9}
            reviewCount={45}
            placeId="0x0:0x5c800d103881fc5c"
          />
        </div>
      </div>
    </section>
  );
}
