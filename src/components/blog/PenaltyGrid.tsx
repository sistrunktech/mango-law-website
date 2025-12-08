interface PenaltyRow {
  offense: string;
  jail?: string;
  fine?: string;
  license?: string;
  other?: string;
}

interface PenaltyGridProps {
  title?: string;
  columns: Array<{ key: keyof PenaltyRow; label: string }>;
  rows: PenaltyRow[];
}

export default function PenaltyGrid({ title, columns, rows }: PenaltyGridProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-brand-black/10 bg-white shadow-soft">
      {title && (
        <div className="border-b border-brand-black/10 bg-brand-black/5 px-6 py-4">
          <h4 className="font-bold text-brand-black">{title}</h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-brand-mango/20 bg-gradient-to-r from-brand-mango/5 to-brand-gold/5">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-brand-black">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-brand-black/5 transition-colors hover:bg-brand-mango/5"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-4 text-sm text-brand-black">
                    {col.key === 'offense' ? (
                      <span className="font-semibold">{row[col.key]}</span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
