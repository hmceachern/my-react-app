import React, { useState, useEffect, useMemo } from 'react';
import filterTable from './TableFilter';
import * as XLSX from 'xlsx';
import spellListJson from '../assets/spellList.json'
import Navigation from './Navigate';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';


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
    
  }, [])

  // const data = useMemo(() => excelData, []);
  // const columns = useMemo(() => GenerateColumns(excelData), [excelData]);

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });


  return (
    <div>
      <Navigation />
      <h1>Pathfinder Spells</h1>
      <input type="text" id="filterInput" placeholder="Search for names or countries.."></input> <button type="submit" onClick={filterTable}>Search</button> <span id="searchLoading" hidden={true}>Loading...</span>
      {excelData ? (
          <table id='spellTable' className='spellTable'>
              <thead>
                  <tr>
                      {Object.keys(excelData[0]).map((key) => (
                          <th key={key}>{key.replace('_', ' ')}</th>
                      ))}
                  </tr>
              </thead>
              <tbody>
                  {excelData.map((row, index) => (
                      <tr key={index}>
                          {Object.values(row).map((cell, cellIndex) => (
                              <td key={cellIndex}><div className="cell-content">{String(cell)}</div></td>
                          ))}
                      </tr>
                  ))}
              </tbody>
          </table>
      ) : (
          <p>Loading data...</p>
      )}
    </div>
  )
  // return (
  //   <div className="p-2">
  //     <table>
  //       <thead>
  //         {table.getHeaderGroups().map((headerGroup) => (
  //           <tr key={headerGroup.id}>
  //             {headerGroup.headers.map((header) => (
  //               <th key={header.id}>
  //                 {header.isPlaceholder
  //                   ? null
  //                   : flexRender(
  //                       header.column.columnDef.header,
  //                       header.getContext(),
  //                     )}
  //               </th>
  //             ))}
  //           </tr>
  //         ))}
  //       </thead>
  //       <tbody>
  //         {table.getRowModel().rows.map((row) => (
  //           <tr key={row.id}>
  //             {row.getVisibleCells().map((cell) => (
  //               <td key={cell.id}>
  //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //               </td>
  //             ))}
  //           </tr>
  //         ))}
  //       </tbody>
  //       <tfoot>
  //         {table.getFooterGroups().map((footerGroup) => (
  //           <tr key={footerGroup.id}>
  //             {footerGroup.headers.map((header) => (
  //               <th key={header.id}>
  //                 {header.isPlaceholder
  //                   ? null
  //                   : flexRender(
  //                       header.column.columnDef.footer,
  //                       header.getContext(),
  //                     )}
  //               </th>
  //             ))}
  //           </tr>
  //         ))}
  //       </tfoot>
  //     </table>
  //     <div className="h-4" />
  //     <button onClick={() => rerender()} className="border p-2">
  //       Rerender
  //     </button>
  //   </div>
  // )
};

export default SpellList;