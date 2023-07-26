import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Filter from "./Filter";
import { blue } from "@mui/material/colors";

export default function Table({ filteredData }) {
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
    {
      field: "country",
      headerName: "Country",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "cases",
      headerName: "Cases",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "deaths",
      headerName: "Deaths",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "totalCases",
      headerName: "Total Cases",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "totalDeaths",
      headerName: "Total Deaths",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "casesOn1000",
      headerName: "Cases on 1000 citizens",
      headerClassName: "table-header",
      flex: 1,
    },
    {
      field: "deathsOn1000",
      headerName: "Deaths on 1000 citizens",
      headerClassName: "table-header",
      flex: 1,
    },
  ];

  return (
    <div style={{ height: "auto", width: "100%" }}>
      {filteredData.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          sx={{
            fontFamily: "Nunito",
            fontSize: "1em",
          }}
        />
      ) : (
        <p>Data not found</p>
      )}
    </div>
  );
}
