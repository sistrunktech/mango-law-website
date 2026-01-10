'use client';

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
  const primaryColumn = columns[0];
  const secondaryColumns = columns.slice(1);

  return (
    <div className="my-12 overflow-hidden rounded-xl border border-brand-black/10 bg-brand-offWhite shadow-sm">
      {title && (
        <div className="border-b border-brand-black/10 bg-brand-black/5 px-6 py-4">
          <h4 id={captionId} className="font-bold text-brand-black">{title}</h4>
          {description && (
            <p id={descriptionId} className="mt-1 text-sm text-brand-black/60">{description}</p>
          )}
        </div>
      )}
      <div className="md:hidden">
        {rows.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-brand-black/60">
            No penalty data available
          </div>
        ) : (
          <div className="space-y-4 px-6 py-4">
            {rows.map((row, rowIndex) => {
              const rowId = row.offense || `row-${rowIndex}`;
              const primaryValue = primaryColumn ? row[primaryColumn.key] : undefined;
              return (
                <div
                  key={rowId}
                  className="rounded-lg border border-brand-black/10 bg-brand-offWhite p-4 shadow-sm"
                >
                  <div className="text-sm font-semibold text-brand-black">
                    {primaryValue || '\u2014'}
                  </div>
                  {secondaryColumns.length > 0 && (
                    <dl className="mt-3 space-y-2">
                      {secondaryColumns.map((col) => (
                        <div key={col.key} className="space-y-1">
                          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            {col.label}
                          </dt>
                          <dd className="text-sm text-gray-700">
                            {row[col.key] || '\u2014'}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="hidden md:block">
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
              <tr className="border-b border-brand-black/10 bg-brand-offWhite">
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
        <p className="px-6 pb-4 pt-2 text-xs text-gray-500 lg:hidden">
          Scroll horizontally to view all columns.
        </p>
      </div>
    </div>
  );
}
