import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({ href, children, className = '' }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-brand-mango underline hover:text-brand-leaf ${className}`}
    >
      {children}
      <ExternalLinkIcon className="h-3 w-3" />
    </a>
  );
}
