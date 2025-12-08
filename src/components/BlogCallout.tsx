import { AlertCircle, Lightbulb, AlertTriangle, Info } from 'lucide-react';
import clsx from 'clsx';

type CalloutType = 'warning' | 'tip' | 'important' | 'note';

interface BlogCalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    textColor: 'text-red-800',
  },
  tip: {
    icon: Lightbulb,
    bgColor: 'bg-brand-mango/5',
    borderColor: 'border-brand-mango/30',
    iconColor: 'text-brand-mango',
    titleColor: 'text-brand-black',
    textColor: 'text-brand-black/80',
  },
  important: {
    icon: AlertCircle,
    bgColor: 'bg-brand-leaf/5',
    borderColor: 'border-brand-leaf/30',
    iconColor: 'text-brand-leaf',
    titleColor: 'text-brand-black',
    textColor: 'text-brand-black/80',
  },
  note: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-800',
  },
};

export default function BlogCallout({ type, title, children }: BlogCalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={clsx(
        'my-6 rounded-lg border-l-4 p-4',
        config.bgColor,
        config.borderColor
      )}
    >
      <div className="flex gap-3">
        <Icon className={clsx('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
        <div className="flex-1">
          {title && (
            <h4 className={clsx('font-semibold mb-1', config.titleColor)}>
              {title}
            </h4>
          )}
          <div className={clsx('text-sm leading-relaxed', config.textColor)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
