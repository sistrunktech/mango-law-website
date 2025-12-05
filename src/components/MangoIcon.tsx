type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

/**
 * Mango icon based on the Mango Law LLC logo
 * Uses the generated SVG asset from the brand kit
 */
export default function MangoIcon({ className = '', size = 'md' }: Props) {
  return (
    <img
      src="/images/brand/generated/mango-icon-original.svg"
      alt=""
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Mango icon for dark backgrounds - uses white variant
 */
export function MangoIconLight({ className = '', size = 'md' }: Props) {
  return (
    <img
      src="/images/brand/generated/mango-icon-white.svg"
      alt=""
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Simple mango silhouette for subtle decorative use
 * Uses the black variant for easy color customization
 */
export function MangoSilhouette({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/brand/generated/mango-icon-black.svg"
      alt=""
      className={className}
      aria-hidden="true"
    />
  );
}
