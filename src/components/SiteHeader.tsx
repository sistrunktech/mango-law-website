'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPinned } from 'lucide-react';
import { navLinks } from '../data/navigation';
import MegaMenu from './MegaMenu';
import { OFFICE_PHONE_DISPLAY, OFFICE_PHONE_TEL } from '../lib/contactInfo';
import { trackCtaClick, trackLeadSubmitted } from '../lib/analytics';
import type { LeadSource } from './LeadCaptureModal';

interface SiteHeaderProps {
  onOpenLeadModal?: (trigger: LeadSource) => void;
}

export default function SiteHeader({ onOpenLeadModal }: SiteHeaderProps) {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDuiMapBanner, setShowDuiMapBanner] = useState(false);
  const logoFallbackSrc = '/images/brand/mango-logo-primary-fullcolor-tagline-480w.png';
  const duiMapHref = '/resources/dui-checkpoints';
  const duiMapBannerStorageKey = 'mango_dui_map_banner_dismissed_v1';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(duiMapBannerStorageKey);
      setShowDuiMapBanner(!dismissed);
    } catch {
      setShowDuiMapBanner(true);
    }
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-all',
        isScrolled
          ? [
              'lg:border-b lg:shadow-sm lg:backdrop-blur-sm',
              'lg:bg-white/95 lg:border-brand-black/10',
            ].join(' ')
          : '',
      ].join(' ')}
      role="banner"
    >
      {!isScrolled && (
        <div className="hidden border-b border-brand-black/10 bg-brand-leaf text-white lg:block">
          <div className="container flex flex-wrap items-center gap-3 py-1.5">
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/95 transition-opacity hover:opacity-90"
              data-cta="header_topbar_call"
              onClick={() => {
                trackCtaClick('header_topbar_call');
                trackLeadSubmitted('phone', 'header_topbar_call', {
                  target_number: OFFICE_PHONE_TEL,
                });
              }}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Call/Text Nick {OFFICE_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}

      {!isScrolled && showDuiMapBanner && (
        <div className="border-b border-brand-black/10 bg-brand-leaf/90 text-white lg:hidden">
          <div className="container flex items-center justify-between gap-2 py-1">
            <Link
              href={duiMapHref}
              className="flex min-w-0 items-center gap-1.5 text-xs font-semibold"
              data-cta="mobile_dui_map_banner"
              onClick={() => trackCtaClick('mobile_dui_map_banner')}
            >
              <MapPinned className="h-3.5 w-3.5 shrink-0 text-brand-mango" aria-hidden="true" />
              <span className="truncate">Live DUI Checkpoint Map</span>
              <span className="shrink-0 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-white">
                View
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Dismiss DUI checkpoint map banner"
              onClick={() => {
                setShowDuiMapBanner(false);
                try {
                  window.localStorage.setItem(duiMapBannerStorageKey, '1');
                } catch {
                  // ignore
                }
              }}
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      {/* Main navigation bar */}
      <div className="bg-brand-offWhite border-b border-brand-black/10">
        <div
          className={`container flex items-center justify-between py-3 transition-all ${isScrolled ? 'lg:py-2' : 'lg:py-3'}`}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src={logoFallbackSrc}
              alt="Mango Law LLC - Criminal & OVI/DUI Defense"
              width={1704}
              height={555}
              sizes="(min-width: 1024px) 220px, 170px"
              priority
              className={[
                'h-8 w-auto transition-all hover:opacity-90 lg:h-12',
                isScrolled ? 'lg:h-10' : '',
              ].join(' ')}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              if (link.label === 'Practice Areas') {
                return <MegaMenu key="practice-areas-mega" variant="light" />;
              }
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    'px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-brand-mangoText'
                      : 'text-brand-black/70 hover:text-brand-mangoText',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-leaf bg-brand-leaf/10 px-4 py-2.5 text-sm font-bold text-brand-forest transition-all hover:bg-brand-leaf hover:text-white"
              data-cta="header_call"
              onClick={() => {
                trackCtaClick('header_call');
                trackLeadSubmitted('phone', 'header_call', {
                  target_number: OFFICE_PHONE_TEL,
                });
              }}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <button
              type="button"
              className="rounded-lg bg-brand-mango px-5 py-2.5 text-sm font-bold text-brand-black shadow-sm transition-all hover:bg-brand-gold hover:shadow-md"
              data-cta="header_free_consult"
              onClick={() => {
                trackCtaClick('header_free_consult');
                onOpenLeadModal?.('header_cta');
              }}
            >
              Free Case Review
            </button>
          </div>

          {/* Mobile menu button (center) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex items-center justify-center rounded-lg p-2 text-brand-black transition-colors hover:bg-brand-black/5 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile phone + consult (right) */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${OFFICE_PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-lg border-2 border-brand-leaf bg-brand-leaf/10 p-2 text-brand-forest transition-all hover:bg-brand-leaf hover:text-white"
              aria-label="Call Now"
              data-cta="mobile_header_call"
              onClick={() => {
                trackCtaClick('mobile_header_call');
                trackLeadSubmitted('phone', 'mobile_header_call', {
                  target_number: OFFICE_PHONE_TEL,
                });
              }}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-brand-mango px-3 py-2 text-sm font-bold text-brand-black transition-colors hover:bg-brand-gold"
              onClick={() => {
                trackCtaClick('mobile_header_free_consult');
                onOpenLeadModal?.('header_cta');
              }}
              data-cta="mobile_header_free_consult"
            >
              Free Review
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={[
            'overflow-hidden transition-all duration-300 lg:hidden',
            open ? 'max-h-[650px] opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="border-t border-brand-black/10 pb-4">
            <div className="container flex flex-col gap-1 pt-2">
              <Link
                href={duiMapHref}
                onClick={() => {
                  setOpen(false);
                  trackCtaClick('mobile_menu_dui_checkpoints');
                }}
                className="mb-2 rounded-xl border border-brand-mango/30 bg-brand-mango/10 px-4 py-3 transition-colors hover:bg-brand-mango/20"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-mango text-brand-black">
                    <MapPinned className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-bold text-brand-black">DUI Checkpoint Map</span>
                      <span className="shrink-0 rounded-full bg-brand-black/5 px-2 py-0.5 text-xs font-semibold text-brand-black/70">
                        Live
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-brand-black/70">
                      Ohio checkpoint locations + hotspots
                    </div>
                  </div>
                </div>
              </Link>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={[
                      'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-brand-mango/20 text-brand-mangoText'
                        : 'text-brand-black hover:bg-brand-black/5',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex flex-col gap-3 border-t border-brand-black/10 pt-4">
                <a
                  href={`tel:${OFFICE_PHONE_TEL}`}
                  className="flex items-center gap-2 px-4 text-sm font-medium text-brand-black"
                  data-cta="mobile_menu_call"
                  onClick={() => {
                    trackCtaClick('mobile_menu_call');
                    trackLeadSubmitted('phone', 'mobile_menu_call', {
                      target_number: OFFICE_PHONE_TEL,
                    });
                  }}
                >
	                  <Phone className="h-4 w-4 text-brand-mangoText" />
	                  <span className="text-xs opacity-70">Call/Text Nick direct:</span>
	                  {OFFICE_PHONE_DISPLAY}
	                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    trackCtaClick('mobile_menu_free_consult');
                    onOpenLeadModal?.('mobile_menu');
                  }}
                  className="mx-4 rounded-lg bg-brand-mango px-5 py-3 text-center text-sm font-bold text-brand-black"
                  data-cta="mobile_menu_free_consult"
                  aria-label="Open free case review form"
                >
                  Free Case Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
