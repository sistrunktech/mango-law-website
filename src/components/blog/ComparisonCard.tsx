import { ArrowRight } from 'lucide-react';

interface ComparisonItem {
  label: string;
  value: string;
  description?: string;
}

interface ComparisonCardProps {
  title?: string;
  leftItem: ComparisonItem;
  rightItem: ComparisonItem;
  leftColor?: 'mango' | 'gold' | 'leaf' | 'red' | 'blue';
  rightColor?: 'mango' | 'gold' | 'leaf' | 'red' | 'blue';
}

export default function ComparisonCard({
  title,
  leftItem,
  rightItem,
  leftColor = 'leaf',
  rightColor = 'red',
}: ComparisonCardProps) {
  const colorClasses = {
    mango: 'bg-brand-mango/10 border-brand-mango/20 text-brand-mango',
    gold: 'bg-brand-gold/20 border-brand-gold/30 text-brand-gold',
    leaf: 'bg-brand-leaf/10 border-brand-leaf/20 text-brand-leaf',
    red: 'bg-red-50 border-red-200 text-red-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-brand-black/10 bg-white shadow-soft">
      {title && (
        <div className="border-b border-brand-black/10 bg-brand-black/5 px-6 py-4">
          <h4 className="font-bold text-brand-black">{title}</h4>
        </div>
      )}
      <div className="grid gap-4 p-6 md:grid-cols-2 md:gap-6">
        <div className={`rounded-lg border-2 p-5 ${colorClasses[leftColor]}`}>
          <div className="mb-2 text-xs font-bold uppercase tracking-wide opacity-70">
            {leftItem.label}
          </div>
          <div className="mb-2 text-3xl font-bold">{leftItem.value}</div>
          {leftItem.description && (
            <p className="text-sm opacity-80">{leftItem.description}</p>
          )}
        </div>

        <div className="hidden items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2">
          <ArrowRight className="h-6 w-6 text-brand-black/20" />
        </div>

        <div className={`rounded-lg border-2 p-5 ${colorClasses[rightColor]}`}>
          <div className="mb-2 text-xs font-bold uppercase tracking-wide opacity-70">
            {rightItem.label}
          </div>
          <div className="mb-2 text-3xl font-bold">{rightItem.value}</div>
          {rightItem.description && (
            <p className="text-sm opacity-80">{rightItem.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
