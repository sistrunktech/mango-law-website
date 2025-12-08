import { List } from 'lucide-react';
import { useState } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="my-8 rounded-xl border-2 border-brand-black/10 bg-white p-6 shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-4 flex w-full items-center justify-between text-left"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-brand-black">
          <List className="h-5 w-5 text-brand-mango" />
          Table of Contents
        </h3>
        <span className="text-brand-black/40">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <nav className="space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left text-sm transition-colors hover:text-brand-mango ${
                item.level === 2 ? 'font-medium text-brand-black' : 'pl-4 text-brand-black/70'
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
