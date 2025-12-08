import { Quote } from 'lucide-react';

interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
}

export default function PullQuote({ children, author }: PullQuoteProps) {
  return (
    <div className="my-8 border-l-4 border-brand-mango bg-gray-50 py-6 pl-6 pr-4">
      <Quote className="mb-3 h-8 w-8 text-brand-mango/40" />
      <blockquote className="text-xl font-medium italic leading-relaxed text-brand-black">
        {children}
      </blockquote>
      {author && (
        <cite className="mt-3 block text-sm font-semibold not-italic text-brand-black/60">
          — {author}
        </cite>
      )}
    </div>
  );
}
