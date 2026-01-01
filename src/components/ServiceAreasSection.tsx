import Link from 'next/link';
import { MapPin } from 'lucide-react';

interface ServiceAreasSectionProps {
  practiceArea: string;
}

export default function ServiceAreasSection({ practiceArea }: ServiceAreasSectionProps) {
  const locations = [
    { name: 'Delaware', slug: 'delaware' },
    { name: 'Columbus', slug: 'columbus' },
    { name: 'Dublin', slug: 'dublin' },
    { name: 'Westerville', slug: 'westerville' },
    { name: 'Marysville', slug: 'marysville' },
    { name: 'Gahanna', slug: 'gahanna' },
    { name: 'Grove City', slug: 'grove-city' },
    { name: 'Reynoldsburg', slug: 'reynoldsburg' },
    { name: 'Upper Arlington', slug: 'upper-arlington' },
    { name: 'Hilliard', slug: 'hilliard' },
  ];

  return (
    <section className="container py-12">
      <div className="rounded-2xl border border-brand-black/10 bg-gradient-to-br from-brand-offWhite/50 to-white p-8 md:p-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-mango">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-black md:text-3xl">
              Serving {practiceArea} Clients Across Central Ohio
            </h2>
            <p className="mt-3 text-brand-black/80 leading-relaxed">
              We serve {practiceArea.toLowerCase()} clients in{' '}
              {locations.slice(0, -1).map((loc, i) => (
                <span key={loc.slug}>
                  <Link
                    href={`/locations#${loc.slug}`}
                    className="font-medium text-brand-forest underline decoration-brand-mango/30 transition-colors hover:text-brand-mango hover:decoration-brand-mango"
                  >
                    {loc.name}
                  </Link>
                  {i < locations.length - 2 ? ', ' : ' '}
                </span>
              ))}
              and{' '}
              <Link
                href={`/locations#${locations[locations.length - 1].slug}`}
                className="font-medium text-brand-forest underline decoration-brand-mango/30 transition-colors hover:text-brand-mango hover:decoration-brand-mango"
              >
                {locations[locations.length - 1].name}
              </Link>
              , as well as throughout{' '}
              <Link
                href="/locations#delaware-county"
                className="font-medium text-brand-forest underline decoration-brand-mango/30 transition-colors hover:text-brand-mango hover:decoration-brand-mango"
              >
                Delaware County
              </Link>{' '}
              and{' '}
              <Link
                href="/locations#franklin-county"
                className="font-medium text-brand-forest underline decoration-brand-mango/30 transition-colors hover:text-brand-mango hover:decoration-brand-mango"
              >
                Franklin County
              </Link>
              .
            </p>
            <div className="mt-6">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-6 py-3 font-bold text-brand-black transition-all hover:bg-brand-gold"
              >
                <MapPin className="h-5 w-5" />
                View All Service Areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
