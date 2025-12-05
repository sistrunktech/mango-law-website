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
 * Elegant stylized mango with gold gradient and highlight curve
 */
export default function MangoIcon({ className = '', size = 'md' }: Props) {
  // Unique ID for this instance to avoid gradient conflicts
  const id = Math.random().toString(36).substr(2, 9);
  
  return (
    <svg
      viewBox="0 0 40 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Rich gold gradient for mango body */}
        <linearGradient id={`mangoGold-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#E8C060"/>
          <stop offset="25%" stopColor="#D4A84B"/>
          <stop offset="60%" stopColor="#C49A3D"/>
          <stop offset="100%" stopColor="#A8863A"/>
        </linearGradient>
        {/* Highlight gradient */}
        <linearGradient id={`highlight-${id}`} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F5E0A0" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#D4A84B" stopOpacity="0"/>
        </linearGradient>
        {/* Leaf gradient */}
        <linearGradient id={`leaf-${id}`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#C9A043"/>
          <stop offset="100%" stopColor="#D4A84B"/>
        </linearGradient>
      </defs>
      
      {/* Mango body - elegant teardrop shape */}
      <path 
        d="M20 8 C12 8, 5 18, 5 30 C5 40, 11 48, 20 48 C29 48, 35 40, 35 30 C35 18, 28 8, 20 8 Z" 
        fill={`url(#mangoGold-${id})`}
      />
      
      {/* Inner highlight curve */}
      <path 
        d="M14 14 C10 20, 8 28, 10 40" 
        stroke={`url(#highlight-${id})`}
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Stem */}
      <path 
        d="M20 8 L20 3" 
        stroke="#B8923A" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      
      {/* Leaf */}
      <path 
        d="M20 5 C24 2, 30 2, 34 4 C30 7, 24 6, 20 5 Z" 
        fill={`url(#leaf-${id})`}
      />
    </svg>
  );
}

/**
 * Mango icon for dark backgrounds - brighter colors
 */
export function MangoIconLight({ className = '', size = 'md' }: Props) {
  const id = Math.random().toString(36).substr(2, 9);
  
  return (
    <svg
      viewBox="0 0 40 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`mangoGoldLight-${id}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#F0D070"/>
          <stop offset="25%" stopColor="#E8C060"/>
          <stop offset="60%" stopColor="#D4A84B"/>
          <stop offset="100%" stopColor="#C49A3D"/>
        </linearGradient>
        <linearGradient id={`highlightLight-${id}`} x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#F0D070" stopOpacity="0"/>
        </linearGradient>
      </defs>
      
      {/* Mango body */}
      <path 
        d="M20 8 C12 8, 5 18, 5 30 C5 40, 11 48, 20 48 C29 48, 35 40, 35 30 C35 18, 28 8, 20 8 Z" 
        fill={`url(#mangoGoldLight-${id})`}
      />
      
      {/* Highlight curve */}
      <path 
        d="M14 14 C10 20, 8 28, 10 40" 
        stroke={`url(#highlightLight-${id})`}
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Stem */}
      <path d="M20 8 L20 3" stroke="#D4A84B" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Leaf */}
      <path d="M20 5 C24 2, 30 2, 34 4 C30 7, 24 6, 20 5 Z" fill="#D4A84B"/>
    </svg>
  );
}

/**
 * Simple mango silhouette for subtle decorative use
 * Elegant teardrop shape matching the brand
 */
export function MangoSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Mango body - teardrop */}
      <path 
        d="M20 8 C12 8, 5 18, 5 30 C5 40, 11 48, 20 48 C29 48, 35 40, 35 30 C35 18, 28 8, 20 8 Z" 
        fill="currentColor"
      />
      {/* Stem */}
      <path d="M20 8 L20 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* Leaf */}
      <path d="M20 4 C25 1, 32 1, 36 4 C32 7, 25 6, 20 4 Z" fill="currentColor"/>
    </svg>
  );
}
