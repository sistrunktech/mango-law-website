interface TimelineItem {
  label: string;
  duration: string;
  color?: 'mango' | 'gold' | 'red' | 'blue' | 'leaf';
  width?: string;
}

interface TimelineBarProps {
  title?: string;
  items: TimelineItem[];
}

export default function TimelineBar({ title, items }: TimelineBarProps) {
  const colorClasses = {
    mango: 'bg-brand-mango',
    gold: 'bg-brand-gold',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    leaf: 'bg-brand-leaf',
  };

  return (
    <div className="my-8 rounded-xl border border-brand-black/10 bg-white p-6 shadow-soft">
      {title && (
        <h4 className="mb-6 font-bold text-brand-black">{title}</h4>
      )}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-brand-black">{item.label}</span>
              <span className="font-bold text-brand-mango">{item.duration}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-brand-black/5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${colorClasses[item.color || 'mango']}`}
                style={{ width: item.width || '100%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
