import { DollarSign } from 'lucide-react';

interface CostItem {
  label: string;
  amount: string;
  description?: string;
  isTotal?: boolean;
}

interface CostBreakdownProps {
  title?: string;
  items: CostItem[];
}

export default function CostBreakdown({ title, items }: CostBreakdownProps) {
  return (
    <div className="my-12 overflow-hidden rounded-xl border border-brand-black/10 bg-white shadow-soft">
      {title && (
        <div className="flex items-center gap-3 border-b border-brand-black/10 bg-brand-offWhite px-6 py-4">
          <DollarSign className="h-5 w-5 text-brand-mango" />
          <h4 className="font-bold text-brand-black">{title}</h4>
        </div>
      )}
      <div className="p-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-start justify-between gap-4 ${
                item.isTotal
                  ? 'border-t-2 border-brand-mango/20 pt-4 mt-4'
                  : 'pb-3 border-b border-brand-black/5'
              }`}
            >
              <div className="flex-1">
                <div className={`font-semibold ${item.isTotal ? 'text-lg text-brand-mango' : 'text-brand-black'}`}>
                  {item.label}
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-brand-black/60">{item.description}</p>
                )}
              </div>
              <div className={`whitespace-nowrap font-bold ${item.isTotal ? 'text-2xl text-brand-mango' : 'text-lg text-brand-black'}`}>
                {item.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
