import { useEffect, RefObject } from 'react';

export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
  restoreFocusRef?: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement;

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const getFocusableElements = () => {
      return Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((el) => {
        return (
          el.offsetParent !== null &&
          !el.hasAttribute('aria-hidden') &&
          !el.closest('[aria-hidden="true"]')
        );
      });
    };

    const focusFirstElement = () => {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    };

    setTimeout(focusFirstElement, 10);

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    };

    container.addEventListener('keydown', handleTab);

    const restoreFocusElement = restoreFocusRef?.current;
    return () => {
      container.removeEventListener('keydown', handleTab);

      const elementToRestore = restoreFocusElement || previouslyFocused;
      if (elementToRestore && elementToRestore.focus) {
        elementToRestore.focus();
      }
    };
  }, [isActive, containerRef, restoreFocusRef]);
}
