'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FooterAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function FooterAccordion({ title, children, defaultOpen = false }: FooterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-footer-panel`;

  return (
    <div className="border-b border-brand-offWhite/10 lg:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left lg:hidden"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="eyebrow text-brand-gold">{title}</span>
        <ChevronDown
          className={`h-5 w-5 text-brand-gold transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <h4 className="eyebrow hidden text-brand-gold lg:block">{title}</h4>
      <div className="hidden lg:mt-5 lg:block">
        {children}
      </div>
      {isOpen && (
        <div id={contentId} className="overflow-hidden pb-4 lg:hidden">
          {children}
        </div>
      )}
    </div>
  );
}
