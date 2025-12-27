import { ReactNode } from 'react';

interface HighlightBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'tip';
  title?: string;
}

const variantConfig = {
  info: {
    border: 'border-brand-leaf',
    bg: 'bg-brand-offWhite',
    icon: '💡',
    role: 'note' as const,
  },
  warning: {
    border: 'border-brand-mango',
    bg: 'bg-brand-offWhite',
    icon: '⚠️',
    role: 'alert' as const,
  },
  success: {
    border: 'border-brand-leaf',
    bg: 'bg-brand-offWhite',
    icon: '✓',
    role: 'note' as const,
  },
  error: {
    border: 'border-red-500',
    bg: 'bg-brand-offWhite',
    icon: '✕',
    role: 'alert' as const,
  },
  tip: {
    border: 'border-gray-300',
    bg: 'bg-brand-offWhite',
    icon: '→',
    role: 'note' as const,
  },
};

export default function HighlightBox({ children, variant = 'info', title }: HighlightBoxProps) {
  const config = variantConfig[variant];

  return (
    <aside
      role={config.role}
      aria-label={title || `${variant} callout`}
      className={`my-8 rounded-xl border border-brand-black/10 border-l-4 ${config.border} ${config.bg} p-5`}
    >
      {title && (
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-black">
          <span aria-hidden="true">{config.icon}</span>
          {title}
        </p>
      )}
      <div className="text-sm leading-relaxed text-gray-700">
        {children}
      </div>
    </aside>
  );
}
