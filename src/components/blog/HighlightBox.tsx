import { ReactNode } from 'react';

interface HighlightBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error' | 'tip';
  title?: string;
}

const variantConfig = {
  info: {
    border: 'border-brand-leaf',
    bg: 'bg-brand-leaf/5',
    icon: '💡',
    role: 'note' as const,
  },
  warning: {
    border: 'border-brand-mango',
    bg: 'bg-brand-mango/5',
    icon: '⚠️',
    role: 'alert' as const,
  },
  success: {
    border: 'border-brand-leaf',
    bg: 'bg-brand-leaf/5',
    icon: '✓',
    role: 'note' as const,
  },
  error: {
    border: 'border-red-500',
    bg: 'bg-red-50',
    icon: '✕',
    role: 'alert' as const,
  },
  tip: {
    border: 'border-gray-300',
    bg: 'bg-gray-50',
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
      className={`my-8 rounded-r-lg border-l-4 ${config.border} ${config.bg} py-4 pl-6`}
    >
      {title && (
        <p className="mb-2 flex items-center gap-2 font-semibold text-brand-black">
          <span aria-hidden="true">{config.icon}</span>
          {title}
        </p>
      )}
      <div className="text-base leading-relaxed text-gray-700">
        {children}
      </div>
    </aside>
  );
}
