import { CheckCircle } from 'lucide-react';

interface KeyTakeawaysProps {
  items: string[];
}

export default function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <div className="my-8 rounded-xl border-2 border-brand-mango/20 bg-brand-mango/5 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-brand-black">
        <CheckCircle className="h-6 w-6 text-brand-mango" />
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-mango" />
            <span className="text-brand-black/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
