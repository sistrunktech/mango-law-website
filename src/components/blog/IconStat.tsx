import { LucideIcon } from 'lucide-react';

interface IconStatProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: 'mango' | 'gold' | 'leaf' | 'red' | 'blue';
}

export default function IconStat({ icon: Icon, value, label, color = 'mango' }: IconStatProps) {
  const colorClasses = {
    mango: 'bg-brand-mango/10 text-brand-mangoText',
    gold: 'bg-brand-gold/20 text-brand-goldText',
    leaf: 'bg-brand-leaf/10 text-brand-leaf',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-brand-black/10 bg-white px-4 py-3 shadow-sm">
      <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-black">{value}</div>
        <div className="text-xs font-semibold uppercase tracking-wide text-brand-black/60">{label}</div>
      </div>
    </div>
  );
}
