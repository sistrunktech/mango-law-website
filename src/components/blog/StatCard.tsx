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
  const colorClasses = {
    mango: 'from-brand-mango/10 to-brand-mango/5 border-brand-mango/20 text-brand-mangoText',
    gold: 'from-brand-gold/10 to-brand-gold/5 border-brand-gold/30 text-brand-goldText',
    leaf: 'from-brand-leaf/10 to-brand-leaf/5 border-brand-leaf/20 text-brand-leaf',
    forest: 'from-brand-forest/10 to-brand-forest/5 border-brand-forest/20 text-brand-forest',
    red: 'from-red-50 to-red-25 border-red-200 text-red-700',
    blue: 'from-blue-50 to-blue-25 border-blue-200 text-blue-700',
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
    <div className={`rounded-xl border-2 bg-gradient-to-br p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-5xl font-bold mb-2">{value}</div>
          <div className="text-sm font-semibold uppercase tracking-wide opacity-80">{label}</div>
          {description && (
            <p className="mt-2 text-sm opacity-70">{description}</p>
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
