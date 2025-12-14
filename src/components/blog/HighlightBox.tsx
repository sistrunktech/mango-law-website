import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface HighlightBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export default function HighlightBox({ children, variant = 'info', title }: HighlightBoxProps) {
  const variants = {
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      textColor: 'text-blue-900',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-brand-leaf/10',
      border: 'border-brand-leaf/30',
      iconBg: 'bg-brand-leaf/20',
      iconColor: 'text-brand-leaf',
      textColor: 'text-brand-forest',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-brand-gold/10',
      border: 'border-brand-gold/30',
      iconBg: 'bg-brand-gold/20',
      iconColor: 'text-brand-goldText',
      textColor: 'text-brand-black',
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
      textColor: 'text-red-900',
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`my-6 rounded-xl border-2 ${config.border} ${config.bg} p-6`}>
      <div className="flex gap-4">
        <div className={`flex-shrink-0 rounded-lg ${config.iconBg} p-2`}>
          <Icon className={`h-6 w-6 ${config.iconColor}`} />
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`mb-2 font-bold ${config.textColor}`}>{title}</h4>
          )}
          <div className={`prose prose-sm ${config.textColor}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
