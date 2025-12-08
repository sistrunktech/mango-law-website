import { FileText } from 'lucide-react';

interface ExampleBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function ExampleBox({ title = 'Example', children }: ExampleBoxProps) {
  return (
    <div className="my-6 rounded-lg border border-brand-leaf/30 bg-brand-leaf/5 p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-leaf">
        <FileText className="h-4 w-4" />
        {title}
      </div>
      <div className="text-sm leading-relaxed text-brand-black/80">{children}</div>
    </div>
  );
}
