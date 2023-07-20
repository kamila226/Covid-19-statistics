import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Filter from "./Filter";

export default function Table({ countryData, startDate, filteredData }) {
  // console.log(filteredData);

  const rows: GridRowsProp = filteredData.map((obj, i) => {
    return {
      id: i,
      country: obj.country,
      cases: obj.cases,
      deaths: obj.deaths,
      totalCases: obj.totalCases,
      totalDeaths: obj.totalDeaths,
      casesOn1000: obj.casesOn1000,
      deathsOn1000: obj.deathsOn1000,
    };
  });

  const columns: GridColDef[] = [
    { field: "country", headerName: "Country", width: 150 },
    { field: "cases", headerName: "Cases", width: 150 },
    { field: "deaths", headerName: "Deaths", width: 150 },
    { field: "totalCases", headerName: "Total Cases", width: 150 },
    { field: "totalDeaths", headerName: "Total Deaths", width: 150 },
    { field: "casesOn1000", headerName: "Cases on 1000 citizens", width: 150 },
    {
      field: "deathsOn1000",
      headerName: "Deaths on 1000 citizens",
      width: 150,
    },
  ];

  // console.log(filteredData);

  return (
    <div style={{ height: "auto", width: "100%" }}>
      {filteredData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
        />
      ) : (
        <p>Nekas netika atrasts</p>
      )}
    </div>
  );
}
