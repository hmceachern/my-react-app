import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import filterTable from './TableFilter';
import * as XLSX from 'xlsx';
import spellListJson from '../assets/spellList.json'
import Navigation from './Navigate';
import GenerateColumns from './GenerateColumns.tsx';
import { Link } from 'react-router-dom';
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getPaginationRowModel, getSortedRowModel} from '@tanstack/react-table';


const SpellList = () => {
  const [excelData, setExcelData] = useState(null);
  const filePath = '/spell_full.xlsx'; // Reference the file in the public directory
  
  useEffect(() => {
    document.title = "Pathfinder Spell List";
    if (spellListJson != null)
    {
      try{
        setExcelData(spellListJson);
        console.log(spellListJson);
      }
      catch(err){
        console.error('unable to set data from json file');
      }
      
    }
    else
    {
      // converts excel file from d20PFSRD to json data, delete current json file to update
      const fetchExcel = async () => {
        try {
          // 1. Fetch the file from the public path
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          // 2. Read the file as an ArrayBuffer
          const fileBuffer = await response.arrayBuffer();

          // 3. Parse the ArrayBuffer using the xlsx library
          const workbook = XLSX.read(fileBuffer, { type: 'array' });
          
          // 4. Get the data from the first worksheet
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const dataAsJson = XLSX.utils.sheet_to_json(sheet, 
            {defval: "N/A",}
          );

          setExcelData(dataAsJson);

          console.log(dataAsJson);
        } catch (error) {
          console.error("Error fetching or parsing the Excel file:", error);
        }
      };

      fetchExcel();
    }
    
  }, [excelData])

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  })

  const data = useMemo(() => excelData, [excelData]);
  const columns = useMemo(() => GenerateColumns(excelData), [excelData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
  });

  return (
    <div>
      <Navigation />
      <h1>Pathfinder Spells</h1>
      <input type="text" id="filterInput" placeholder="Search for spells..."></input> <button type="submit" onClick={filterTable}>Search</button> <span id="searchLoading" hidden={true}>Loading...</span>
      {table && data && columns ? (
        <div>
          <table id='spellTable' className='spellTable'>
              <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th key={header.id} colSpan={header.colSpan}>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none'
                                  : '',
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {{
                                asc: ' 🔼',
                                desc: ' 🔽',
                              }[header.column.getIsSorted()] ?? null}
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter column={header.column} table={table} />
                                </div>
                              ) : null}
                            </div>
                          </th>
                        )
                      })}
                    </tr>
                  ))}
              </thead>
              <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} id={cell.id}>
                          <div className="cell-content">
                            {cell.column.columnDef.accessorKey == "name" ? <Link to={`/spell/${cell.getValue()}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Link> : flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
            {table.getRowCount().toLocaleString()} Rows
          </div>
          </div>
      ) : (
          <p>Loading data...</p>
      )}
    </div>
  )
};

function Filter({
  column,
  table,
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <input
        type="number"
        value={(columnFilterValue)?.[0] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue)?.[1] ?? ''}
        onChange={(e) =>
          column.setFilterValue((old) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      className="w-36 border shadow rounded"
      onChange={(e) => column.setFilterValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '')}
    />
  )
};

export default SpellList;