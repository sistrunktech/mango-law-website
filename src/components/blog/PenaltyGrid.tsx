import { useId } from 'react';

interface PenaltyRow {
  offense?: string;
  jail?: string;
  fine?: string;
  license?: string;
  other?: string;
  [key: string]: string | undefined;
}

interface PenaltyGridProps {
  title?: string;
  columns: Array<{ key: string; label: string }>;
  rows: PenaltyRow[];
  description?: string;
}

export default function PenaltyGrid({ title, columns, rows, description }: PenaltyGridProps) {
  const tableId = useId();
  const captionId = `${tableId}-caption`;
  const descriptionId = `${tableId}-description`;

  return (
    <div className="my-12 overflow-hidden rounded-xl border border-brand-black/10 bg-white shadow-soft">
      {title && (
        <div className="border-b border-brand-black/10 bg-brand-black/5 px-6 py-4">
          <h4 id={captionId} className="font-bold text-brand-black">{title}</h4>
          {description && (
            <p id={descriptionId} className="mt-1 text-sm text-brand-black/60">{description}</p>
          )}
        </div>
      )}
      <div className="overflow-x-auto" role="region" aria-labelledby={title ? captionId : undefined}>
        <table
          className="w-full"
          role="table"
          aria-labelledby={title ? captionId : undefined}
          aria-describedby={description ? descriptionId : undefined}
        >
          {!title && (
            <caption className="sr-only">Penalty information table</caption>
          )}
          <thead>
            <tr className="border-b-2 border-brand-black/10 bg-brand-offWhite">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  id={`${tableId}-header-${col.key}`}
                  className="px-4 py-3 text-left text-sm font-bold uppercase tracking-wide text-brand-black"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-brand-black/60">
                  No penalty data available
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => {
                const rowId = row.offense || `row-${rowIndex}`;
                return (
                  <tr
                    key={rowId}
                    className="border-b border-brand-black/5 transition-colors hover:bg-brand-mango/5"
                  >
                    {columns.map((col, colIndex) => {
                      const isFirstColumn = colIndex === 0;
                      const cellValue = row[col.key];

                      if (isFirstColumn) {
                        return (
                          <th
                            key={col.key}
                            scope="row"
                            id={`${tableId}-row-${rowIndex}`}
                            headers={`${tableId}-header-${col.key}`}
                            className="px-4 py-4 text-left text-sm font-semibold text-brand-black"
                          >
                            {cellValue}
                          </th>
                        );
                      }

                      return (
                        <td
                          key={col.key}
                          headers={`${tableId}-header-${col.key} ${tableId}-row-${rowIndex}`}
                          className="px-4 py-4 text-sm text-brand-black"
                        >
                          {cellValue || '\u2014'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
