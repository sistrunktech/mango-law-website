import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { megaMenuSections } from '../data/megaMenuData';
import { useEffect, useState, useRef } from 'react';

export default function MegaMenu({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | null>(null);

  const updatePanelPosition = () => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const containerEl = triggerEl.closest('.container') as HTMLElement | null;
    const anchorRect = containerEl?.getBoundingClientRect() ?? triggerRect;

    setPanelPosition({
      top: triggerRect.bottom + 8,
      left: anchorRect.left + anchorRect.width / 2,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePanelPosition();

    const onReposition = () => updatePanelPosition();
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);
    return () => {
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
    updatePanelPosition();
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      updatePanelPosition();
      setTimeout(() => {
        const firstLink = menuRef.current?.querySelector('a');
        firstLink?.focus();
      }, 10);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        ref={triggerRef}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="mega-menu-panel"
        className={[
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
          variant === 'light' ? 'text-brand-black/70' : 'text-brand-offWhite/80',
          variant === 'light' ? 'hover:text-brand-mangoText' : 'hover:text-brand-mango',
        ].join(' ')}
      >
        Practice Areas
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && panelPosition && (
        <div
          ref={menuRef}
          id="mega-menu-panel"
          role="region"
          aria-label="Practice Areas Menu"
          className="fixed z-50 w-[90vw] max-w-5xl -translate-x-1/2"
          style={{
            top: panelPosition.top,
            left: panelPosition.left,
          }}
        >
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
