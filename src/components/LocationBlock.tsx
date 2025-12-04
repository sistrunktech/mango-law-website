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
            <p>123 Main Street</p>
            <p>Delaware, OH</p>
            <p>Phone: (555) 000-0000</p>
          </div>
        </div>
        <div className="rounded-xl bg-brand-black/5 p-4">
          <p className="text-sm font-semibold text-brand-black">Map placeholder</p>
          <p className="mt-2 text-sm text-brand-black/70">
            Embed your preferred map or static image. Highlight proximity to Delaware County courts.
          </p>
        </div>
      </div>
    </section>
  );
}
