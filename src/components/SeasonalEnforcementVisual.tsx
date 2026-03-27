'use client';

import { useEffect, useState } from 'react';

type SeasonalThemeKey = 'spring' | 'summer' | 'fall' | 'winter';

type SeasonalTheme = {
  badge: string;
  title: string;
  description: string;
  detailLabel: string;
  detailBody: string;
  signalLabels: string[];
  backgroundClass: string;
  leftGlowClass: string;
  rightGlowClass: string;
  accentClass: string;
  pulseClass: string;
  dotClass: string;
};

const themes: Record<SeasonalThemeKey, SeasonalTheme> = {
  spring: {
    badge: 'Spring / St. Patrick’s watch',
    title: 'Downtown traffic, late rides home, and early-season patrol visibility',
    description: 'Spring enforcement tends to cluster around downtown celebrations, daytime drinking, and the first stretch of warm-weather weekends.',
    detailLabel: 'What usually changes',
    detailBody: 'Expect more visible patrol presence near entertainment districts, event corridors, and late-evening traffic as crowds spill out.',
    signalLabels: ['Downtown events', 'Late rides home', 'More visible patrols'],
    backgroundClass: 'from-emerald-950 via-slate-950 to-slate-900',
    leftGlowClass: 'bg-emerald-400/40',
    rightGlowClass: 'bg-brand-mango/35',
    accentClass: 'bg-emerald-300/80',
    pulseClass: 'from-red-400/90 via-white/80 to-blue-400/90',
    dotClass: 'bg-emerald-200/70',
  },
  summer: {
    badge: 'Summer travel watch',
    title: 'Holiday weekends, warm-weather travel, and late-night traffic',
    description: 'Memorial Day, July 4th, and lake-or-festival weekends tend to bring heavier traffic, more stops, and more safety messaging.',
    detailLabel: 'What usually changes',
    detailBody: 'Long travel weekends increase roadside volume, especially around bar districts, event venues, and return-home traffic after dark.',
    signalLabels: ['Festival traffic', 'Weekend travel', 'Late-night stops'],
    backgroundClass: 'from-slate-950 via-sky-950 to-brand-black',
    leftGlowClass: 'bg-sky-400/35',
    rightGlowClass: 'bg-orange-300/35',
    accentClass: 'bg-orange-200/75',
    pulseClass: 'from-red-400/90 via-amber-100/80 to-blue-400/90',
    dotClass: 'bg-amber-100/70',
  },
  fall: {
    badge: 'Fall weekend watch',
    title: 'Game-day traffic, cooler nights, and football-weekend patrols',
    description: 'Labor Day, early football weekends, and cooler late nights create a steady mix of event traffic and visible enforcement.',
    detailLabel: 'What usually changes',
    detailBody: 'The pattern shifts toward stadium traffic, campus-adjacent stops, and holiday-weekend patrols that stay visible after the game or event.',
    signalLabels: ['Game-day traffic', 'Campus corridors', 'Late-night patrols'],
    backgroundClass: 'from-stone-950 via-red-950 to-slate-950',
    leftGlowClass: 'bg-red-500/35',
    rightGlowClass: 'bg-orange-300/35',
    accentClass: 'bg-orange-200/75',
    pulseClass: 'from-red-400/90 via-white/70 to-blue-400/90',
    dotClass: 'bg-orange-100/70',
  },
  winter: {
    badge: 'Holiday season watch',
    title: 'Snowy roads, holiday lights, and winter enforcement visibility',
    description: 'Thanksgiving through New Year’s is usually the strongest sustained enforcement stretch because parties, travel, and weather all change the roadside picture.',
    detailLabel: 'What usually changes',
    detailBody: 'Look for more public messaging, winter-night patrol visibility, and faster escalation when officers think alcohol is part of the stop.',
    signalLabels: ['Holiday parties', 'Winter roads', 'Overtime patrols'],
    backgroundClass: 'from-slate-950 via-indigo-950 to-slate-900',
    leftGlowClass: 'bg-sky-300/35',
    rightGlowClass: 'bg-rose-300/30',
    accentClass: 'bg-white/75',
    pulseClass: 'from-red-400/90 via-white/85 to-blue-400/90',
    dotClass: 'bg-white/80',
  },
};

function getThemeForMonth(month: number): SeasonalThemeKey {
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
}

const particlePositions = [
  'left-[12%] top-[16%]',
  'left-[28%] top-[10%]',
  'left-[46%] top-[18%]',
  'left-[64%] top-[12%]',
  'left-[78%] top-[22%]',
  'left-[18%] top-[34%]',
  'left-[74%] top-[36%]',
  'left-[36%] top-[30%]',
];

export default function SeasonalEnforcementVisual() {
  const [themeKey, setThemeKey] = useState<SeasonalThemeKey>('spring');

  useEffect(() => {
    setThemeKey(getThemeForMonth(new Date().getMonth()));
  }, []);

  const theme = themes[themeKey];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-brand-black/10 bg-slate-950 p-6 text-white shadow-[0_28px_80px_rgba(15,23,42,0.32)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.backgroundClass}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_45%)]" />
      <div className="absolute inset-x-[12%] bottom-0 h-36 rounded-t-[999px] bg-white/6 blur-2xl" />
      <div className={`absolute -left-8 top-8 h-40 w-40 rounded-full blur-3xl ${theme.leftGlowClass}`} />
      <div className={`absolute -right-10 top-16 h-44 w-44 rounded-full blur-3xl ${theme.rightGlowClass}`} />
      <div className="absolute left-[14%] top-[36%] h-24 w-[52%] rotate-[-18deg] rounded-full bg-white/8 blur-3xl" />
      <div className="absolute right-[12%] top-[44%] h-20 w-[42%] rotate-[12deg] rounded-full bg-white/8 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 to-transparent" />

      {particlePositions.map((position, index) => (
        <span
          key={position}
          className={`absolute h-2.5 w-2.5 rounded-full ${theme.dotClass} ${position}`}
          style={{ opacity: 0.45 + index * 0.05 }}
        />
      ))}

      <div className="absolute bottom-8 left-1/2 h-12 w-[82%] -translate-x-1/2 rounded-full bg-black/45 blur-2xl" />
      <div className="absolute bottom-14 left-1/2 h-[2px] w-[56%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="absolute bottom-[84px] left-1/2 flex -translate-x-1/2 gap-4 opacity-65">
        <span className="h-2 w-8 rounded-full bg-amber-100/70" />
        <span className="h-2 w-8 rounded-full bg-amber-100/70" />
        <span className="h-2 w-8 rounded-full bg-amber-100/70" />
      </div>
      <div className="absolute bottom-12 left-1/2 h-16 w-44 -translate-x-1/2 rounded-[28px] border border-white/10 bg-slate-950/80 shadow-[0_20px_40px_rgba(15,23,42,0.45)]">
        <div className="absolute -top-3 left-1/2 h-4 w-24 -translate-x-1/2 overflow-hidden rounded-full bg-white/10 backdrop-blur">
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.pulseClass} blur-[2px]`} />
        </div>
        <div className="absolute inset-x-6 bottom-4 h-3 rounded-full bg-white/12 blur-sm" />
        <div className="absolute inset-x-5 top-5 h-3 rounded-full bg-white/8" />
      </div>
      <div className={`absolute bottom-20 right-10 h-10 w-10 rounded-full blur-xl ${theme.accentClass}`} />

      <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-between">
        <div className="space-y-3">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            Current seasonal focus
          </span>
          <div className="max-w-sm space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">{theme.badge}</p>
            <h3 className="font-display text-2xl font-bold leading-tight text-white">{theme.title}</h3>
            <p className="text-sm leading-relaxed text-white/72">{theme.description}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/65">{theme.detailLabel}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {theme.detailBody}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {theme.signalLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/12 bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
