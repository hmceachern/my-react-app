import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';



const SpellList = () => {
  const [excelData, setExcelData] = useState(null);
  const [formattedHeader, setFormattedHeader] = useState(null);
  const filePath = '/spell_full.xlsx'; // Reference the file in the public directory
  
  useEffect(() => {
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
        const dataAsJson = XLSX.utils.sheet_to_json(sheet);

        setExcelData(dataAsJson);
      } catch (error) {
        console.error("Error fetching or parsing the Excel file:", error);
      }
    };

    fetchExcel();
    
  }, [])

  return (
    <div>
      <h1>Excel Data from Asset File</h1>
      {excelData ? (
          <table className='spellTable'>
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
                              <td key={cellIndex}>{String(cell)}</td>
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
};

export default SpellList;