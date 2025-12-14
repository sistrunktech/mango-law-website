import { MapPin, Building2, Map } from 'lucide-react';
import type { ServiceArea } from '../data/serviceAreas';

interface LocationCardProps {
  location: ServiceArea;
}

export default function LocationCard({ location }: LocationCardProps) {
  const getIcon = () => {
    switch (location.type) {
      case 'city':
        return Building2;
      case 'county':
        return Map;
      case 'township':
        return MapPin;
      default:
        return MapPin;
    }
  };

  const Icon = getIcon();

  const getTypeLabel = () => {
    switch (location.type) {
      case 'city':
        return 'City';
      case 'county':
        return 'County';
      case 'township':
        return 'Township';
      default:
        return '';
    }
  };

  return (
    <div
      id={location.slug}
      className="scroll-mt-24 rounded-xl border border-brand-black/10 bg-white p-6 shadow-sm transition-all hover:border-brand-mango/30 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-mango/10">
          <Icon className="h-6 w-6 text-brand-mangoText" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-brand-black">{location.name}</h3>
            <span className="rounded-full bg-brand-gold/10 px-2 py-0.5 text-xs font-semibold text-brand-goldText">
              {getTypeLabel()}
            </span>
          </div>
          {location.county && (
            <p className="mt-1 text-sm text-brand-black/60">{location.county}</p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-brand-black/80">{location.description}</p>
        </div>
      </div>
    </div>
  );
}
