import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';

// Define a type for your data rows
// Use a generic type or interface if the structure varies
type RowObj = {
  [key: string]: any; // Allows for arbitrary keys and values
};

const GenerateColumns = ({ data }: { data: RowObj[] }) => {
  // Ensure data is available before proceeding
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Dynamically generate column definitions using the keys from the first row
  const columns = useMemo(() => {
    const firstRow = data[0];
    const keys = Object.keys(firstRow);
    const columnHelper = createColumnHelper<RowObj>();

    return keys.map((key) =>
      columnHelper.accessor(key, {
        header: () => (
          // Format the header name (e.g., capitalize, replace underscores)
          <div>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
        ),
        cell: (info) => (
          // Use flexRender or just display the value
          <div>{info.getValue()}</div>
        ),
      })
    );
  }, [data]); // Memoize columns based on data reference

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenerateColumns;