import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  nofollow?: boolean;
}

export default function ExternalLink({ href, children, className = '', nofollow = true }: ExternalLinkProps) {
  const rel = `noopener noreferrer${nofollow ? ' nofollow' : ''}`;

  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      className={`inline-flex items-center gap-1 text-brand-mango underline hover:text-brand-leaf ${className}`}
    >
      {children}
      <ExternalLinkIcon className="h-3 w-3" />
    </a>
  );
}
