import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: 'neutral' | 'mango' | 'leaf' | 'red';
  description?: string;
  trend?: ReactNode;
}

export default function StatCard({
  value,
  label,
  icon: Icon,
  color = 'neutral',
  description,
  trend
}: StatCardProps) {
  const borderColorClasses = {
    neutral: 'border-l-gray-300',
    mango: 'border-l-brand-mango',
    leaf: 'border-l-brand-leaf',
    red: 'border-l-red-400',
  };

  const iconColorClasses = {
    neutral: 'bg-gray-100 text-gray-600',
    mango: 'bg-brand-mango/10 text-brand-mangoText',
    leaf: 'bg-brand-leaf/10 text-brand-leaf',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className={`rounded-xl border border-brand-black/10 border-l-4 ${borderColorClasses[color]} bg-brand-offWhite p-5 shadow-sm`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 text-3xl font-bold leading-snug text-brand-black">{value}</div>
          <div className="text-xs font-semibold uppercase tracking-wide text-brand-black/60">{label}</div>
          {description && (
            <p className="mt-2 max-w-[20rem] text-sm leading-snug text-brand-black/70">{description}</p>
          )}
          {trend && (
            <div className="mt-3">{trend}</div>
          )}
        </div>
        {Icon && (
          <div className={`rounded-lg p-2.5 ${iconColorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
