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
 * Features a stylized mango fruit with leaf - using organic mango colors
 */
export default function MangoIcon({ className = '', size = 'md' }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {/* Mango fruit body - gradient from blush to gold */}
      <defs>
        <linearGradient id="mangoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="[stop-color:#C47A69]" />
          <stop offset="40%" className="[stop-color:#E8A33C]" />
          <stop offset="100%" className="[stop-color:#F4B95A]" />
        </linearGradient>
      </defs>
      <ellipse
        cx="20"
        cy="24"
        rx="12"
        ry="14"
        fill="url(#mangoGradient)"
      />
      {/* Highlight/shine */}
      <ellipse
        cx="15"
        cy="20"
        rx="4"
        ry="6"
        className="fill-brand-mangoLight opacity-30"
      />
      {/* Stem */}
      <path
        d="M20 10 L20 5"
        className="stroke-brand-leafDark"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M20 7 Q28 2 33 7 Q28 12 20 7"
        className="fill-brand-leaf"
      />
      {/* Leaf vein */}
      <path
        d="M21 7 Q26 5.5 30 7"
        className="stroke-brand-leafDark"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}

/**
 * Mango icon for dark backgrounds - brighter colors
 */
export function MangoIconLight({ className = '', size = 'md' }: Props) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {/* Mango fruit body - gradient */}
      <defs>
        <linearGradient id="mangoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="[stop-color:#C47A69]" />
          <stop offset="40%" className="[stop-color:#E8A33C]" />
          <stop offset="100%" className="[stop-color:#F4B95A]" />
        </linearGradient>
      </defs>
      <ellipse
        cx="20"
        cy="24"
        rx="12"
        ry="14"
        fill="url(#mangoGradientLight)"
      />
      {/* Highlight/shine */}
      <ellipse
        cx="15"
        cy="20"
        rx="4"
        ry="6"
        className="fill-white opacity-30"
      />
      {/* Stem */}
      <path
        d="M20 10 L20 5"
        className="stroke-brand-leaf"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M20 7 Q28 2 33 7 Q28 12 20 7"
        className="fill-brand-leafLight"
      />
    </svg>
  );
}

/**
 * Simple mango silhouette for subtle decorative use
 */
export function MangoSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="20" cy="28" rx="14" ry="18" fill="currentColor" />
      <path d="M20 10 L20 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 6 Q30 0 36 6 Q30 12 20 6" fill="currentColor" />
    </svg>
  );
}
