interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: 'mango' | 'gold' | 'leaf' | 'red' | 'blue';
  showValue?: boolean;
  description?: string;
}

export default function ProgressBar({
  label,
  percentage,
  color = 'mango',
  showValue = true,
  description
}: ProgressBarProps) {
  const colorClasses = {
    mango: 'bg-brand-mango',
    gold: 'bg-brand-mango',
    leaf: 'bg-brand-leaf',
    red: 'bg-red-500',
    blue: 'bg-brand-leaf',
  };

  return (
    <div className="my-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-brand-black/70">{label}</span>
        {showValue && (
          <span className="text-sm font-bold text-brand-mango">{percentage}%</span>
        )}
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-brand-black/10">
        <div
          className={`h-full rounded-full transition-all duration-700 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {description && (
        <p className="mt-2 text-sm text-brand-black/60">{description}</p>
      )}
    </div>
  );
}
