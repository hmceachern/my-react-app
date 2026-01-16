import React from "react";
import * as XLSX from 'xlsx';

export const ParseExcel = () =>
{
    const handleFile = async(e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data, {sheetRows: 5});
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "N/A",
        })
        console.log(jsonData)
    }


    return (
    <div>
        <Navigation />
        <h1>Parse Excel</h1>
        <input type="file" onChange={(e) => handleFile(e)} />
    </div>
    )
};