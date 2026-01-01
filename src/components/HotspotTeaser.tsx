'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function HotspotTeaser() {
  const [isExpanded, setIsExpanded] = useState(true);

  const hotspots = [
    'Cleveland: Downtown corridors, Detroit Ave, I-90/I-71 interchanges',
    'Columbus: High Street, Short North, OSU area, I-70/I-71 exits',
    'Cincinnati: Downtown, Over-the-Rhine, I-75/I-71 near river',
    'Akron/Canton: Downtown areas, I-77 interchanges',
    'Toledo: Downtown, midtown corridors, I-75 and US-23',
    'Dayton: Third Street, Main Street, US-35 corridors',
    'Youngstown: Entertainment districts, SR-7 corridors',
    'Suburban corridors: Entertainment-to-residential connecting roads'
  ];

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-brand-mango/20 bg-gradient-to-br from-brand-mango/5 to-brand-leaf/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-brand-mango/10"
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-mango" />
          <h3 className="text-base font-bold text-brand-black">
            Where OVI Checkpoints Most Often Appear
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-brand-mango" />
        ) : (
          <ChevronDown className="h-5 w-5 text-brand-mango" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-brand-mango/20 p-4">
          <p className="mb-4 text-sm text-brand-black/80">
            Law enforcement strategically places checkpoints in high-traffic areas, entertainment districts, and major corridors. Here are Ohio's most common checkpoint locations:
          </p>
          <div className="mb-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-brand-black/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mango" />
                <span className="leading-relaxed">{hotspot}</span>
              </div>
            ))}
          </div>
          <Link
            href="/blog/ohio-dui-checkpoint-hotspots"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-mango px-4 py-2 text-sm font-semibold text-brand-black transition-all hover:bg-brand-leaf hover:text-white hover:shadow-md"
          >
            Read the Full Hotspot Guide
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
