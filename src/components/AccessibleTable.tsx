'use client';

import { useState, useCallback, useMemo, useId } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  width?: string;
}

interface AccessibleTableProps<T> {
  data: T[];
  columns: Column<T>[];
  caption: string;
  captionClassName?: string;
  showCaption?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  rowKeyField?: keyof T;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  variant?: 'light' | 'dark';
  stickyHeader?: boolean;
}

function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export default function AccessibleTable<T extends object>({
  data,
  columns,
  caption,
  captionClassName = '',
  showCaption = true,
  emptyMessage = 'No data available',
  onRowClick,
  rowKeyField,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName,
  variant = 'light',
  stickyHeader = false,
}: AccessibleTableProps<T>) {
  const tableId = useId();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  const handleSort = useCallback((columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  }, [sortColumn, sortDirection]);

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortColumn);
      const bValue = getNestedValue(b, sortColumn);

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const handleKeyDown = useCallback((
    e: React.KeyboardEvent,
    rowIndex: number,
    colIndex: number
  ) => {
    const totalRows = sortedData.length;
    const totalCols = columns.length;

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        if (colIndex < totalCols - 1) {
          setFocusedCell({ row: rowIndex, col: colIndex + 1 });
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (colIndex > 0) {
          setFocusedCell({ row: rowIndex, col: colIndex - 1 });
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (rowIndex < totalRows - 1) {
          setFocusedCell({ row: rowIndex + 1, col: colIndex });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (rowIndex > 0) {
          setFocusedCell({ row: rowIndex - 1, col: colIndex });
        } else if (rowIndex === 0) {
          const headerButton = document.querySelector(
            `#${CSS.escape(tableId)} thead th:nth-child(${colIndex + 1}) button`
          ) as HTMLButtonElement | null;
          headerButton?.focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        if (e.ctrlKey) {
          setFocusedCell({ row: 0, col: 0 });
        } else {
          setFocusedCell({ row: rowIndex, col: 0 });
        }
        break;
      case 'End':
        e.preventDefault();
        if (e.ctrlKey) {
          setFocusedCell({ row: totalRows - 1, col: totalCols - 1 });
        } else {
          setFocusedCell({ row: rowIndex, col: totalCols - 1 });
        }
        break;
      case 'Enter':
      case ' ':
        if (onRowClick) {
          e.preventDefault();
          onRowClick(sortedData[rowIndex], rowIndex);
        }
        break;
    }
  }, [sortedData, columns, tableId, onRowClick]);

  const handleHeaderKeyDown = useCallback((
    e: React.KeyboardEvent,
    colIndex: number,
    column: Column<T>
  ) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (sortedData.length > 0) {
          setFocusedCell({ row: 0, col: colIndex });
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (colIndex < columns.length - 1) {
          const nextHeaderButton = document.querySelector(
            `#${CSS.escape(tableId)} thead th:nth-child(${colIndex + 2}) button, #${CSS.escape(tableId)} thead th:nth-child(${colIndex + 2})`
          ) as HTMLElement | null;
          nextHeaderButton?.focus();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (colIndex > 0) {
          const prevHeaderButton = document.querySelector(
            `#${CSS.escape(tableId)} thead th:nth-child(${colIndex}) button, #${CSS.escape(tableId)} thead th:nth-child(${colIndex})`
          ) as HTMLElement | null;
          prevHeaderButton?.focus();
        }
        break;
      case 'Enter':
      case ' ':
        if (column.sortable) {
          e.preventDefault();
          handleSort(String(column.key));
        }
        break;
    }
  }, [sortedData, columns, tableId, handleSort]);

  const getSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 opacity-50" aria-hidden="true" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4" aria-hidden="true" />;
    }
    return <ChevronDown className="w-4 h-4" aria-hidden="true" />;
  };

  const getAriaSort = (columnKey: string): 'ascending' | 'descending' | 'none' | undefined => {
    if (sortColumn !== columnKey) return 'none';
    if (sortDirection === 'asc') return 'ascending';
    if (sortDirection === 'desc') return 'descending';
    return 'none';
  };

  const baseStyles = variant === 'dark'
    ? {
        table: 'bg-[#2F5F4F] text-white',
        header: 'bg-[#1B4332] text-slate-300',
        row: 'hover:bg-[#1B4332]/50 border-white/10',
        cell: 'text-slate-300',
      }
    : {
        table: 'bg-white text-brand-black',
        header: 'bg-gradient-to-r from-brand-mango/5 to-brand-gold/5 text-brand-black',
        row: 'hover:bg-brand-mango/5 border-brand-black/5',
        cell: 'text-brand-black',
      };

  return (
    <div className="overflow-x-auto" role="region" aria-labelledby={`${tableId}-caption`}>
      <table
        id={tableId}
        className={`w-full border-collapse ${baseStyles.table} ${className}`}
        role="grid"
        aria-rowcount={sortedData.length + 1}
        aria-colcount={columns.length}
      >
        <caption
          id={`${tableId}-caption`}
          className={showCaption ? `px-4 py-3 text-left font-bold ${captionClassName}` : 'sr-only'}
        >
          {caption}
          {sortColumn && sortDirection && (
            <span className="sr-only">
              {`, sorted by ${columns.find(c => String(c.key) === sortColumn)?.label || sortColumn} ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
            </span>
          )}
        </caption>
        <thead className={`${stickyHeader ? 'sticky top-0 z-10' : ''} ${baseStyles.header} ${headerClassName}`}>
          <tr role="row" aria-rowindex={1}>
            {columns.map((column, colIndex) => (
              <th
                key={String(column.key)}
                scope="col"
                role="columnheader"
                aria-colindex={colIndex + 1}
                aria-sort={column.sortable ? getAriaSort(String(column.key)) : undefined}
                className={`px-4 py-3 text-left text-sm font-bold uppercase tracking-wide ${column.headerClassName || ''}`}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.sortable ? (
                  <button
                    type="button"
                    onClick={() => handleSort(String(column.key))}
                    onKeyDown={(e) => handleHeaderKeyDown(e, colIndex, column)}
                    className="flex items-center gap-2 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mango rounded px-1 -mx-1"
                    aria-label={`Sort by ${column.label}${sortColumn === String(column.key) ? (sortDirection === 'asc' ? ', currently sorted ascending' : ', currently sorted descending') : ''}`}
                  >
                    <span>{column.label}</span>
                    {getSortIcon(String(column.key))}
                  </button>
                ) : (
                  <span
                    tabIndex={-1}
                    onKeyDown={(e) => handleHeaderKeyDown(e, colIndex, column)}
                  >
                    {column.label}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${baseStyles.row.split(' ')[1]} ${bodyClassName}`}>
          {sortedData.length === 0 ? (
            <tr role="row">
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm opacity-60"
                role="gridcell"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const rowKey = rowKeyField ? String(row[rowKeyField as keyof T]) : rowIndex;
              const rowClasses = typeof rowClassName === 'function'
                ? rowClassName(row, rowIndex)
                : rowClassName || '';

              return (
                <tr
                  key={rowKey}
                  role="row"
                  aria-rowindex={rowIndex + 2}
                  className={`transition ${baseStyles.row.split(' ')[0]} ${rowClasses}`}
                  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  style={onRowClick ? { cursor: 'pointer' } : undefined}
                >
                  {columns.map((column, colIndex) => {
                    const isFocused = focusedCell?.row === rowIndex && focusedCell?.col === colIndex;
                    const cellValue = getNestedValue(row, String(column.key));

                    return (
                      <td
                        key={String(column.key)}
                        role="gridcell"
                        aria-colindex={colIndex + 1}
                        tabIndex={isFocused ? 0 : -1}
                        onFocus={() => setFocusedCell({ row: rowIndex, col: colIndex })}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                        className={`px-4 py-4 text-sm ${baseStyles.cell} ${column.cellClassName || ''} ${isFocused ? 'outline-none ring-2 ring-brand-mango ring-inset' : ''}`}
                      >
                        {column.render
                          ? column.render(cellValue, row, rowIndex)
                          : cellValue != null ? String(cellValue) : ''}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {sortColumn && sortDirection && (
          `Table sorted by ${columns.find(c => String(c.key) === sortColumn)?.label || sortColumn}, ${sortDirection === 'asc' ? 'ascending' : 'descending'}`
        )}
      </div>
    </div>
  );
}
