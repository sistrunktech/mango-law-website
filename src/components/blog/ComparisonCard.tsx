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
    mango: 'border-l-brand-mango text-brand-black',
    gold: 'border-l-brand-mango text-brand-black',
    leaf: 'border-l-brand-leaf text-brand-black',
    red: 'border-l-red-400 text-brand-black',
    blue: 'border-l-brand-leaf text-brand-black',
  };

  return (
    <div className="my-12 overflow-hidden rounded-xl border border-brand-black/10 bg-brand-offWhite shadow-sm">
      {title && (
        <div className="border-b border-brand-black/10 bg-brand-offWhite px-6 py-4">
          <h4 className="font-bold text-brand-black">{title}</h4>
        </div>
      )}
      <div className="grid gap-4 p-6 md:grid-cols-2 md:gap-6">
        <div className={`rounded-lg border border-brand-black/10 border-l-4 bg-brand-offWhite p-5 ${colorClasses[leftColor]}`}>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-brand-black/60">
            {leftItem.label}
          </div>
          <div className="mb-2 text-2xl font-bold">{leftItem.value}</div>
          {leftItem.description && (
            <p className="text-sm text-brand-black/70">{leftItem.description}</p>
          )}
        </div>

        <div className="hidden items-center justify-center md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2">
          <ArrowRight className="h-6 w-6 text-brand-black/20" />
        </div>

        <div className={`rounded-lg border border-brand-black/10 border-l-4 bg-brand-offWhite p-5 ${colorClasses[rightColor]}`}>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-brand-black/60">
            {rightItem.label}
          </div>
          <div className="mb-2 text-2xl font-bold">{rightItem.value}</div>
          {rightItem.description && (
            <p className="text-sm text-brand-black/70">{rightItem.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
