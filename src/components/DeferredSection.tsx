'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

type DeferredSectionProps = {
  children: ReactNode;
  className?: string;
  /**
   * Helps avoid layout shift when content mounts.
   * Provide a conservative estimate; this section is intended for below-the-fold content.
   */
  minHeight?: number;
  /**
   * How early to start loading before entering viewport.
   * Examples: '200px', '400px'
   */
  rootMargin?: string;
};

export default function DeferredSection({
  children,
  className,
  minHeight,
  rootMargin = '300px',
}: DeferredSectionProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;
    const node = wrapperRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { root: null, rootMargin, threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div ref={wrapperRef} className={className} style={minHeight ? { minHeight } : undefined}>
      {isVisible ? children : null}
    </div>
  );
}

