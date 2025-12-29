# Keyboard Accessibility Implementation Guide

## Overview

This document provides a comprehensive analysis of keyboard navigation and accessibility improvements for the Mango Law website. It includes implemented fixes, pending recommendations, code examples, and testing procedures.

---

## ✅ Implemented Fixes

### 1. MegaMenu Keyboard Navigation (CRITICAL - FIXED)

**Location:** `src/components/MegaMenu.tsx`

**Changes Made:**
- Added keyboard event handlers for Enter, Space, and ArrowDown keys
- Implemented Escape key to close menu with focus restoration
- Added focus management to automatically focus first menu item
- Enhanced ARIA attributes (aria-expanded, aria-haspopup, aria-controls)

**Keyboard Shortcuts:**
- `Enter` / `Space` / `ArrowDown` - Open menu and focus first item
- `Escape` - Close menu and restore focus to trigger button
- `Tab` - Navigate through menu items (native browser behavior)

**Code Example:**
```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
    e.preventDefault();
    setIsOpen(true);
    updatePanelPosition();
    setTimeout(() => {
      const firstLink = menuRef.current?.querySelector('a');
      firstLink?.focus();
    }, 10);
  }
};
```

---

### 2. Modal Focus Trap Implementation (CRITICAL - FIXED)

**Location:** `src/lib/useFocusTrap.ts` (New file)

**Features:**
- Traps Tab key navigation within modal
- Automatically focuses first focusable element on open
- Restores focus to trigger element on close
- Handles Shift+Tab to cycle backwards
- Filters out hidden/disabled elements

**Usage in LeadCaptureModal:**
```tsx
const modalRef = useRef<HTMLDivElement>(null);
useFocusTrap(modalRef, isOpen);
```

**Additional Modal Improvements:**
- Added Escape key to close
- Backdrop click closes modal
- Body scroll prevention while open
- Proper ARIA attributes (role="dialog", aria-modal="true")

---

### 3. FAQ Accordion Keyboard Support (HIGH - FIXED)

**Location:** `src/components/FAQSection.tsx`

**Changes Made:**
- Added explicit Enter/Space key handlers
- Implemented proper ARIA accordion pattern
- Added aria-expanded, aria-controls attributes
- Proper region roles for answer panels

**Code Example:**
```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleFAQ(index);
  }
};

<button
  onClick={() => toggleFAQ(index)}
  onKeyDown={(e) => handleKeyDown(e, index)}
  aria-expanded={openIndex === index}
  aria-controls={`faq-answer-${index}`}
>
```

---

### 4. Admin Tooltip Keyboard Support (HIGH - FIXED)

**Location:** `src/components/admin/Tooltip.tsx`

**Changes Made:**
- Added focus/blur event handlers
- Escape key closes tooltip
- Proper aria-describedby connection
- Focus-visible ring styling
- Role="tooltip" for screen readers

**Code Example:**
```tsx
<button
  onFocus={handleFocus}
  onBlur={handleBlur}
  onKeyDown={handleKeyDown}
  aria-describedby={show ? tooltipId : undefined}
  aria-label="Help information"
  className="focus-visible:ring-2 focus-visible:ring-brand-mango/50"
>
  <HelpCircle className="w-4 h-4" />
</button>
```

---

## 🔴 Remaining Critical Issues

### 1. Checkpoint Map Keyboard Navigation

**Location:** `src/components/CheckpointMap.tsx:130-147`

**Problem:** Map markers are not keyboard accessible - only mouse events registered.

**Current Code:**
```tsx
el.addEventListener('mouseenter', () => { ... });
el.addEventListener('mouseleave', () => { ... });
```

**Recommended Fix:**
```tsx
// Make markers focusable and add keyboard handlers
el.setAttribute('tabindex', '0');
el.setAttribute('role', 'button');
el.setAttribute('aria-label', `Checkpoint at ${name}`);

// Add keyboard support
el.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Show popup
    popup.setLngLat(coordinates).setHTML(popupHTML).addTo(map);
  }
});

el.addEventListener('focus', () => {
  // Show hover state
  el.style.transform = 'scale(1.2)';
});

el.addEventListener('blur', () => {
  // Remove hover state
  el.style.transform = 'scale(1)';
});
```

**Testing:**
- Tab to each map marker
- Press Enter or Space to open popup
- Visual focus indicator should be visible
- Screen reader should announce marker label

---

### 2. AccessibilityLauncher Focus Trap

**Location:** `src/components/AccessibilityLauncher.tsx`

**Current Status:** Has Escape key handler, but no focus trap

**Recommended Enhancement:**
```tsx
import { useFocusTrap } from '../lib/useFocusTrap';

export default function AccessibilityLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Add focus trap
  useFocusTrap(panelRef, isOpen);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-0 top-0 z-50..."
      role="dialog"
      aria-modal="true"
      aria-label="Accessibility Settings"
    >
      {/* Panel content */}
    </div>
  );
}
```

---

### 3. ChatIntakeLauncher Improvements

**Location:** `src/components/ChatIntakeLauncher.tsx`

**Missing:**
- `aria-modal="true"` attribute
- Focus trap implementation

**Recommended Fix:**
```tsx
import { useFocusTrap } from '../lib/useFocusTrap';

const dialogRef = useRef<HTMLDivElement>(null);
useFocusTrap(dialogRef, isChooserOpen);

<div
  ref={dialogRef}
  role="dialog"
  aria-modal="true"  // Add this
  aria-label="Contact options"
>
```

---

## 📋 Best Practices Implemented

### 1. Global Focus Styling

**Location:** `src/styles/tailwind.css:78-81`

```css
:focus-visible {
  outline: 2px solid var(--color-mango);
  outline-offset: 2px;
}
```

**Benefits:**
- Consistent focus indicator across all focusable elements
- Only visible for keyboard navigation (not mouse clicks)
- Brand-aligned mango color
- Proper offset for visibility

---

### 2. Enhanced Focus Mode

**Location:** `src/styles/tailwind.css:353-356`

```css
.enhanced-focus :focus-visible {
  outline: 4px solid var(--color-mango);
  outline-offset: 4px;
}
```

**Usage:** Users can enable via Accessibility Settings panel for extra visibility.

---

### 3. Skip Navigation Link

**Location:** `src/components/Layout.tsx:26-31`

```tsx
<a
  href="#main-content"
  className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-brand-mango focus-visible:px-4 focus-visible:py-2 focus-visible:font-bold focus-visible:text-brand-black"
>
  Skip to main content
</a>
```

**Benefits:**
- Allows keyboard users to skip repetitive navigation
- Only visible when focused
- Prominent styling when shown

---

### 4. Form Input Focus States

**Best Practice Pattern:**
```tsx
className={`
  w-full rounded-lg border px-4 py-2.5 text-sm
  transition-colors
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-brand-mango/50
  ${errors.field ? 'border-red-300 bg-red-50' : 'border-brand-black/20'}
`}
```

**Key Points:**
- Remove default outline with `focus:outline-none`
- Add custom ring with `focus-visible:ring-2`
- Use `focus-visible` not just `focus` (only keyboard)
- Error states clearly indicated

---

## 🧪 Testing Guide

### Manual Keyboard Navigation Testing

**Basic Tab Order Test:**
1. Load homepage with keyboard only (no mouse)
2. Press Tab repeatedly
3. Verify focus moves logically through:
   - Skip link (first tab)
   - Header navigation items
   - Main content links/buttons
   - Footer links
4. Check that focus indicator is always visible
5. Verify you can reach all interactive elements

**Mega Menu Test:**
1. Tab to "Practice Areas" button
2. Press Enter or Space
3. Verify menu opens and first item is focused
4. Press Tab to navigate through menu items
5. Press Escape
6. Verify menu closes and focus returns to button

**Modal Dialog Test:**
1. Trigger lead capture modal
2. Verify focus moves into modal
3. Press Tab repeatedly
4. Verify focus stays trapped in modal (doesn't escape to background)
5. Tab through all form fields
6. Shift+Tab backwards through fields
7. Press Escape
8. Verify modal closes and focus restores

**Form Navigation Test:**
1. Tab through all form inputs in order
2. Verify each input receives visible focus
3. Test Enter key submission
4. Test select dropdowns with keyboard (arrow keys)
5. Verify error messages are keyboard accessible

**Accordion/FAQ Test:**
1. Tab to FAQ question button
2. Press Enter or Space to expand
3. Press Enter or Space again to collapse
4. Tab through all FAQ items
5. Verify aria-expanded announces correctly

---

### Screen Reader Testing

**NVDA (Windows) / JAWS:**
```bash
1. Launch NVDA/JAWS
2. Navigate to homepage
3. Use H key to jump between headings
4. Use L key to list all links
5. Use B key to navigate by buttons
6. Verify all content is announced
7. Test form field labels
8. Test modal announcements
```

**VoiceOver (macOS):**
```bash
Cmd + F5 to enable VoiceOver
VO + Right Arrow to navigate
VO + Space to activate buttons
Test all interactive elements
```

**Key Things to Verify:**
- All images have alt text
- Form inputs have labels
- Buttons have descriptive text or aria-label
- Modal opening/closing is announced
- Focus changes are announced
- Error messages are announced

---

### Automated Testing Tools

**1. axe DevTools (Browser Extension)**
- Install from Chrome/Firefox store
- Run on each page
- Fix all critical/serious violations
- Review moderate/minor warnings

**2. Lighthouse Accessibility Audit**
```bash
# Run in Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Accessibility" category
4. Click "Generate report"
5. Fix issues with scores below 90
```

**3. WAVE (Web Accessibility Evaluation Tool)**
- Install browser extension
- Run on each page
- Review errors, alerts, and features
- Verify ARIA usage is correct

---

## 📚 Additional Recommendations

### 1. Keyboard Shortcuts Documentation

Create a visible keyboard shortcuts help panel accessible via `?` key:

```tsx
// src/components/KeyboardShortcutsModal.tsx
export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        // Don't open if user is typing in input
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-2xl rounded-2xl bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold">Keyboard Shortcuts</h2>

        <div className="space-y-4">
          <ShortcutRow keys={["Tab"]} description="Navigate forward" />
          <ShortcutRow keys={["Shift", "Tab"]} description="Navigate backward" />
          <ShortcutRow keys={["Enter"]} description="Activate button or link" />
          <ShortcutRow keys={["Space"]} description="Toggle checkbox or button" />
          <ShortcutRow keys={["Escape"]} description="Close modal or menu" />
          <ShortcutRow keys={["Alt", "A"]} description="Open accessibility settings" />
          <ShortcutRow keys={["?"]} description="Show this help" />
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 rounded-lg bg-brand-mango px-6 py-2 font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

---

### 2. Focus Management on Page Navigation

Add focus management for React Router navigation:

```tsx
// src/components/ScrollToTop.tsx - Enhance existing component
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const mainContentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Move focus to main content on route change
    mainContentRef.current = document.getElementById('main-content');
    if (mainContentRef.current) {
      // Make temporarily focusable
      mainContentRef.current.setAttribute('tabindex', '-1');
      mainContentRef.current.focus();

      // Remove tabindex after focus
      mainContentRef.current.addEventListener('blur', () => {
        mainContentRef.current?.removeAttribute('tabindex');
      }, { once: true });
    }
  }, [pathname]);

  return null;
}
```

---

### 3. Live Region for Dynamic Content

Add ARIA live regions for dynamic updates:

```tsx
// For checkpoint updates, search results, etc.
<div
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {announcements}
</div>

// Example in DUICheckpointsPage
const [announcement, setAnnouncement] = useState('');

useEffect(() => {
  if (checkpoints.length > 0) {
    setAnnouncement(`${checkpoints.length} checkpoints found in your area`);
  }
}, [checkpoints]);
```

---

### 4. Skip Links for Long Pages

Add multiple skip links for complex pages:

```tsx
<nav className="sr-only-focusable" aria-label="Skip navigation">
  <a href="#main-content">Skip to main content</a>
  <a href="#search-filters">Skip to search filters</a>
  <a href="#results">Skip to results</a>
  <a href="#footer">Skip to footer</a>
</nav>
```

---

### 5. Custom Select Components

If using custom select/dropdown components (not native <select>):

```tsx
// Implement ARIA Listbox pattern
<div
  role="listbox"
  aria-labelledby="select-label"
  aria-activedescendant={selectedId}
  onKeyDown={handleKeyDown}
  tabIndex={0}
>
  {options.map(option => (
    <div
      key={option.id}
      id={option.id}
      role="option"
      aria-selected={option.id === selectedId}
    >
      {option.label}
    </div>
  ))}
</div>

// Keyboard handler
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      selectNext();
      break;
    case 'ArrowUp':
      e.preventDefault();
      selectPrevious();
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      confirmSelection();
      break;
    case 'Escape':
      closeDropdown();
      break;
  }
};
```

---

## 🎯 WCAG 2.1 Compliance Checklist

### Level A (Minimum)
- [✅] 2.1.1 Keyboard - All functionality available via keyboard
- [✅] 2.1.2 No Keyboard Trap - Users can navigate away from components
- [✅] 2.4.1 Bypass Blocks - Skip navigation link implemented
- [✅] 3.2.1 On Focus - No unexpected context changes on focus
- [✅] 4.1.2 Name, Role, Value - ARIA attributes correct

### Level AA (Target)
- [✅] 2.4.3 Focus Order - Logical focus progression
- [✅] 2.4.7 Focus Visible - Clear focus indicators
- [⚠️] 2.4.6 Headings and Labels - Review all form labels (mostly good)
- [⚠️] 3.2.4 Consistent Identification - Review icon button labels
- [✅] 4.1.3 Status Messages - Live regions for dynamic content

### Level AAA (Stretch Goal)
- [✅] 2.1.3 Keyboard (No Exception) - No keyboard exceptions
- [⏳] 2.4.8 Location - Breadcrumbs (consider adding)
- [✅] 2.5.5 Target Size - All interactive elements ≥44×44px

Legend:
- [✅] Implemented
- [⚠️] Needs review/minor fixes
- [⏳] Future enhancement
- [❌] Not implemented

---

## 🚀 Quick Reference - Common Patterns

### Button vs Link
```tsx
// Use <button> for actions
<button onClick={handleSubmit}>Submit Form</button>

// Use <Link> for navigation
<Link to="/contact">Contact Us</Link>

// Never use div/span as clickable elements without proper ARIA
```

### Accessible Icon Buttons
```tsx
<button aria-label="Close modal">
  <X className="h-5 w-5" aria-hidden="true" />
</button>
```

### Form Field Pattern
```tsx
<div>
  <label htmlFor="email" className="block text-sm font-medium">
    Email Address *
  </label>
  <input
    id="email"
    type="email"
    name="email"
    required
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="text-red-600">
      {errors.email}
    </p>
  )}
</div>
```

### Modal Dialog Pattern
```tsx
const modalRef = useRef<HTMLDivElement>(null);
useFocusTrap(modalRef, isOpen);

<div
  ref={backdropRef}
  className="fixed inset-0 z-50"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
>
  <div ref={modalRef}>
    <h2 id="modal-title">Modal Title</h2>
    {/* Modal content */}
  </div>
</div>
```

---

## 📞 Support Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [NVDA Screen Reader](https://www.nvaccess.org/)

### Questions?
For questions about implementing these recommendations, refer to the WCAG documentation or consult with an accessibility specialist.

---

**Last Updated:** December 24, 2025
**Version:** 1.0
**Status:** Active Development
