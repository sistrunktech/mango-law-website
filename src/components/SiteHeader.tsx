'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { navLinks, type NavLink } from '../data/navigation';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from '../lib/contactInfo';
import type { LeadSource } from './LeadCaptureModal';

interface SiteHeaderProps {
  onOpenLeadModal?: (trigger: LeadSource) => void;
}

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

function isLinkActive(pathname: string, link: NavLink) {
  return (
    pathname === link.href ||
    pathname.startsWith(`${link.href}/`) ||
    link.children.some(
      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`),
    )
  );
}

function DesktopDropdown({
  link,
  isOpen,
  isActive,
  onToggle,
  onClose,
}: {
  link: NavLink;
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="relative"
    >
      <div
        className={joinClasses(
          'flex items-center rounded-full border px-1 py-1 transition-all',
          isActive || isOpen
            ? 'border-brand-mango/25 bg-brand-mango/8 shadow-sm'
            : 'border-transparent hover:border-brand-black/10 hover:bg-white',
        )}
      >
        <Link
          href={link.href}
          className={joinClasses(
            'rounded-full px-3 py-2 text-sm font-semibold transition-colors',
            isActive || isOpen
              ? 'text-brand-mangoText'
              : 'text-brand-black/75 hover:text-brand-mangoText',
          )}
          onClick={onClose}
        >
          {link.label}
        </Link>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label={`${isOpen ? 'Close' : 'Open'} ${link.label} menu`}
          onClick={onToggle}
          className={joinClasses(
            'rounded-full p-2 transition-colors',
            isActive || isOpen
              ? 'text-brand-mangoText hover:bg-brand-mango/12'
              : 'text-brand-black/55 hover:bg-brand-black/5 hover:text-brand-mangoText',
          )}
        >
          <ChevronDown className={joinClasses('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : '')} />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 mt-3 w-[23rem] overflow-hidden rounded-[1.5rem] border border-brand-black/10 bg-white shadow-[0_24px_80px_rgba(16,24,20,0.16)]"
          role="menu"
          aria-label={`${link.label} menu`}
        >
          <div className="border-b border-brand-black/8 bg-brand-offWhite/70 px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-goldText">
              {link.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-black/65">{link.summary}</p>
            <Link
              href={link.href}
              className="mt-3 inline-flex text-sm font-semibold text-brand-mangoText transition-colors hover:text-brand-leaf"
              onClick={onClose}
            >
              View overview
            </Link>
          </div>

          <div className="space-y-1 p-3">
            {link.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block rounded-2xl px-4 py-3 transition-colors hover:bg-brand-mango/8"
              >
                <div className="text-sm font-semibold text-brand-black">{child.label}</div>
                <div className="mt-1 text-xs leading-relaxed text-brand-black/60">{child.description}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader({ onOpenLeadModal }: SiteHeaderProps) {
  const pathname = usePathname() ?? '';
  const shellRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(navLinks[0]?.label ?? null);
  const [isScrolled, setIsScrolled] = useState(false);

  const logoFallbackSrc = '/images/brand/mango-logo-primary-fullcolor-tagline-480w.png';

  const activeLabels = useMemo(
    () => navLinks.filter((link) => isLinkActive(pathname, link)).map((link) => link.label),
    [pathname],
  );

  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const nextY = window.scrollY;
        setIsScrolled((current) => (current ? nextY > 10 : nextY > 28));
        setDesktopMenu(null);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) {
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <header
      ref={shellRef}
      className={joinClasses(
        'sticky top-0 z-50 border-b border-brand-black/10 bg-brand-offWhite/95 backdrop-blur',
        isScrolled ? 'shadow-sm' : '',
      )}
      role="banner"
    >
      <div className="container">
        <div className={joinClasses('flex items-center justify-between gap-3 transition-all', isScrolled ? 'py-3' : 'py-4')}>
          <Link href="/" className="group flex items-center gap-3" onClick={() => setDesktopMenu(null)}>
            <Image
              src={logoFallbackSrc}
              alt="Mango Law LLC - Criminal & OVI/DUI Defense"
              width={1704}
              height={555}
              sizes="(min-width: 1024px) 240px, 170px"
              priority
              className={joinClasses('h-8 w-auto transition-all group-hover:opacity-90 lg:h-12', isScrolled ? 'lg:h-10' : '')}
            />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = activeLabels.includes(link.label);
              const isOpen = desktopMenu === link.label;

              return (
                <DesktopDropdown
                  key={link.label}
                  link={link}
                  isActive={isActive}
                  isOpen={isOpen}
                  onToggle={() => setDesktopMenu((current) => (current === link.label ? null : link.label))}
                  onClose={() => setDesktopMenu(null)}
                />
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full border border-brand-leaf/25 bg-white px-4 py-2.5 text-sm font-semibold text-brand-forest transition-all hover:border-brand-leaf hover:bg-brand-leaf hover:text-white"
              data-cta="header_call"
              onClick={() => {
                trackCtaClick('header_call');
                trackLeadSubmitted('phone', 'header_call', {
                  target_number: PRIMARY_PHONE_TEL,
                });
              }}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {PRIMARY_PHONE_DISPLAY}
            </a>
            <button
              type="button"
              className="rounded-full bg-brand-mango px-5 py-2.5 text-sm font-bold text-brand-black shadow-sm transition-all hover:bg-brand-gold hover:shadow-md"
              data-cta="header_free_consult"
              onClick={() => {
                trackCtaClick('header_free_consult');
                onOpenLeadModal?.('header_cta');
              }}
            >
              Free Case Review
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full border border-brand-leaf/25 bg-white p-2.5 text-brand-forest transition-colors hover:border-brand-leaf hover:bg-brand-leaf hover:text-white"
              aria-label="Call Mango Law"
              data-cta="mobile_header_call"
              onClick={() => {
                trackCtaClick('mobile_header_call');
                trackLeadSubmitted('phone', 'mobile_header_call', {
                  target_number: PRIMARY_PHONE_TEL,
                });
              }}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex items-center justify-center rounded-full border border-brand-black/10 bg-white p-2.5 text-brand-black transition-colors hover:bg-brand-black/5"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-brand-black/8 lg:hidden">
          <div className="container space-y-3 py-4">
            {navLinks.map((link) => {
              const isActive = activeLabels.includes(link.label);
              const isOpen = mobileSection === link.label;

              return (
                <div key={link.label} className="rounded-[1.25rem] border border-brand-black/10 bg-white shadow-soft">
                  <div className="flex items-center justify-between gap-3 px-4 py-4">
                    <div className="min-w-0">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={joinClasses('text-sm font-semibold', isActive ? 'text-brand-mangoText' : 'text-brand-black')}
                      >
                        {link.label}
                      </Link>
                      <p className="mt-1 text-xs leading-relaxed text-brand-black/60">{link.summary}</p>
                    </div>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? 'Close' : 'Open'} ${link.label} section`}
                      onClick={() => setMobileSection((current) => (current === link.label ? null : link.label))}
                      className="rounded-full p-2 text-brand-black/60 transition-colors hover:bg-brand-black/5 hover:text-brand-mangoText"
                    >
                      <ChevronDown className={joinClasses('h-4 w-4 transition-transform', isOpen ? 'rotate-180' : '')} />
                    </button>
                  </div>

                  {isOpen && (
                    <div className="space-y-1 border-t border-brand-black/8 px-3 py-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-2xl px-3 py-3 transition-colors hover:bg-brand-mango/8"
                        >
                          <div className="text-sm font-semibold text-brand-black">{child.label}</div>
                          <div className="mt-1 text-xs leading-relaxed text-brand-black/60">{child.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="grid gap-3 pt-2">
              <button
                type="button"
                className="w-full rounded-full bg-brand-mango px-5 py-3 text-sm font-bold text-brand-black shadow-sm transition-colors hover:bg-brand-gold"
                onClick={() => {
                  setMobileOpen(false);
                  trackCtaClick('mobile_header_free_consult');
                  onOpenLeadModal?.('header_cta');
                }}
                data-cta="mobile_header_free_consult"
              >
                Start Free Case Review
              </button>
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-leaf/25 bg-white px-5 py-3 text-sm font-semibold text-brand-forest transition-colors hover:border-brand-leaf hover:bg-brand-leaf hover:text-white"
                data-cta="mobile_header_call_secondary"
                onClick={() => {
                  trackCtaClick('mobile_header_call_secondary');
                  trackLeadSubmitted('phone', 'mobile_header_call_secondary', {
                    target_number: PRIMARY_PHONE_TEL,
                  });
                }}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call/Text {PRIMARY_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
