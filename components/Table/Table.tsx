'use client';

import React, { memo } from 'react';
import './Table.scss';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

function TableInner<T extends Record<string, unknown>>({ columns, data, emptyMessage = 'Nenhum dado encontrado' }: TableProps<T>) {
  const safeData = data ?? [];
  const safeCols = columns ?? [];

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {safeCols.map((col) => (
              <th key={String(col?.key)} className="data-table__th">
                {col?.header ?? ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeData.length === 0 ? (
            <tr>
              <td colSpan={safeCols.length} className="data-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            safeData.map((row, idx) => (
              <tr key={idx} className="data-table__row">
                {safeCols.map((col) => (
                  <td key={String(col?.key)} className="data-table__td" data-label={col?.header}>
                    {col?.render
                      ? col.render(row?.[col.key], row)
                      : String(row?.[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const Table = memo(TableInner) as typeof TableInner;
export default Table;
