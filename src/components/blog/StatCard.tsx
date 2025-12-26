import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: 'mango' | 'gold' | 'leaf' | 'forest' | 'red' | 'blue';
  description?: string;
  trend?: ReactNode;
}

export default function StatCard({
  value,
  label,
  icon: Icon,
  color = 'mango',
  description,
  trend
}: StatCardProps) {
  const borderColorClasses = {
    mango: 'border-l-brand-mango',
    gold: 'border-l-brand-gold',
    leaf: 'border-l-brand-leaf',
    forest: 'border-l-brand-forest',
    red: 'border-l-red-500',
    blue: 'border-l-blue-500',
  };

  const iconColorClasses = {
    mango: 'bg-brand-mango/10 text-brand-mangoText',
    gold: 'bg-brand-gold/20 text-brand-goldText',
    leaf: 'bg-brand-leaf/10 text-brand-leaf',
    forest: 'bg-brand-forest/10 text-brand-forest',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className={`rounded-xl border border-brand-black/10 border-l-4 ${borderColorClasses[color]} bg-white p-6 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-5xl font-bold text-brand-black mb-2">{value}</div>
          <div className="text-sm font-semibold uppercase tracking-wide text-brand-black/60">{label}</div>
          {description && (
            <p className="mt-2 text-sm text-brand-black/70">{description}</p>
          )}
          {trend && (
            <div className="mt-3">{trend}</div>
          )}
        </div>
        {Icon && (
          <div className={`rounded-lg p-3 ${iconColorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
