import Link from 'next/link';

export type DefenseGuideLink = {
  title: string;
  description: string;
  href: string;
};

type Props = {
  title?: string;
  description?: string;
  links: DefenseGuideLink[];
};

export default function RelatedDefenseGuides({
  title = 'Related defense guides',
  description = 'Use these pages for deeper legal and process context.',
  links,
}: Props) {
  return (
    <section className="section bg-brand-offWhite">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="font-display text-display-sm md:text-display-md mb-3">{title}</h2>
          <p className="text-lg text-brand-black/60 max-w-3xl mx-auto">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {links.map((item) => (
            <div key={item.href} className="rounded-2xl border border-brand-black/10 bg-white p-6">
              <h3 className="text-xl font-bold text-brand-black">{item.title}</h3>
              <p className="mt-2 text-brand-black/70">{item.description}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex text-sm font-semibold text-brand-mango hover:text-brand-leaf"
              >
                Explore guide
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
