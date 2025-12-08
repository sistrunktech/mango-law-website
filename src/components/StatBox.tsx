interface StatBoxProps {
  stat: string;
  description: string;
  color?: 'mango' | 'leaf' | 'black';
}

export default function StatBox({ stat, description, color = 'mango' }: StatBoxProps) {
  const colorClasses = {
    mango: 'bg-brand-mango/10 text-brand-mango border-brand-mango/20',
    leaf: 'bg-brand-leaf/10 text-brand-leaf border-brand-leaf/20',
    black: 'bg-brand-black/5 text-brand-black border-brand-black/20',
  };

  return (
    <div className={`my-6 rounded-xl border-2 p-6 text-center ${colorClasses[color]}`}>
      <div className="text-4xl font-bold">{stat}</div>
      <div className="mt-2 text-sm font-medium text-brand-black/70">{description}</div>
    </div>
  );
}
