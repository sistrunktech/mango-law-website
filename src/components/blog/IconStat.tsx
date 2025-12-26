import { LucideIcon } from 'lucide-react';

interface IconStatProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: 'neutral' | 'mango' | 'leaf' | 'red';
}

export default function IconStat({ icon: Icon, value, label, color = 'neutral' }: IconStatProps) {
  const colorClasses = {
    neutral: 'bg-gray-100 text-gray-600',
    mango: 'bg-brand-mango/10 text-brand-mangoText',
    leaf: 'bg-brand-leaf/10 text-brand-leaf',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-brand-black/10 bg-white px-5 py-4 shadow-sm">
      <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-black">{value}</div>
        <div className="max-w-[12rem] text-xs font-semibold uppercase tracking-wide text-brand-black/60">{label}</div>
      </div>
    </div>
  );
}
