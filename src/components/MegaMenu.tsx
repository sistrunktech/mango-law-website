import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { megaMenuSections } from '../data/megaMenuData';
import { useState, useRef } from 'react';

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-brand-offWhite/80 transition-colors hover:text-brand-mango"
      >
        Practice Areas
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-screen max-w-6xl -translate-x-1/4">
          <div className="rounded-2xl border border-brand-offWhite/10 bg-brand-black/95 p-8 shadow-2xl backdrop-blur-sm">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Practice Areas */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  {megaMenuSections.practiceAreas.title}
                </h3>
                <div className="space-y-1">
                  {megaMenuSections.practiceAreas.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-mango/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
                        <item.icon className="h-5 w-5 text-brand-mango" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-brand-offWhite transition-colors group-hover:text-brand-mango">
                          {item.title}
                        </div>
                        <div className="text-xs text-brand-offWhite/60">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  {megaMenuSections.resources.title}
                </h3>
                <div className="space-y-1">
                  {megaMenuSections.resources.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-mango/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
                        <item.icon className="h-5 w-5 text-brand-mango" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-brand-offWhite transition-colors group-hover:text-brand-mango">
                          {item.title}
                        </div>
                        <div className="text-xs text-brand-offWhite/60">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  {megaMenuSections.locations.title}
                </h3>
                <div className="space-y-1">
                  {megaMenuSections.locations.items.slice(0, 4).map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-mango/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
                        <item.icon className="h-5 w-5 text-brand-mango" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-brand-offWhite transition-colors group-hover:text-brand-mango">
                          {item.title}
                        </div>
                        <div className="text-xs text-brand-offWhite/60">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View All Locations */}
                <div className="mt-3">
                  <Link
                    to="/locations"
                    className="block text-center text-sm font-semibold text-brand-mango transition-colors hover:text-brand-gold"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Service Areas →
                  </Link>
                </div>

                {/* CTA */}
                <div className="mt-6 rounded-lg bg-brand-mango/10 p-4">
                  <p className="text-sm font-semibold text-brand-offWhite">Need immediate help?</p>
                  <p className="mt-1 text-xs text-brand-offWhite/70">Get a free consultation today</p>
                  <Link
                    to="/contact"
                    className="mt-3 inline-block rounded-lg bg-brand-mango px-4 py-2 text-sm font-bold text-brand-black transition-all hover:bg-brand-gold"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
