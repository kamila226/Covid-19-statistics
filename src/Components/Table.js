import { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Filter from "./Filter";

export default function Table() {
  const [countryData, setData] = useState([
    {
      country: "",
      cases: "",
      deaths: "",
      totalCases: "",
      totalDeaths: "",
      casesOn1000: "",
      deathsOn1000: "",
    },
  ]);
  const [filteredData, setFilteredData] = useState([
    {
      country: "",
      cases: "",
      deaths: "",
      totalCases: "",
      totalDeaths: "",
      casesOn1000: "",
      deathsOn1000: "",
    },
  ]);

  useEffect(() => {
    fetch("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/")
      .then((res) => res.json())
      .then((data) => {
        const maxDate = new Date(
          Math.max(
            ...data.records.map((obj) => {
              const { day, month, year } = obj;
              const date = new Date(`${year}-${month}-${day}`);
              return new Date(date);
            })
          )
        );
        const minDate = new Date(
          Math.min(
            ...data.records.map((obj) => {
              const { day, month, year } = obj;
              const date = new Date(`${year}-${month}-${day}`);
              // console.log(new Date(obj.dateRep));
              return new Date(date);
            })
          )
        );
        setData(getCountryData(data.records, minDate, maxDate));
      });
  }, []);

  useEffect(() => {
    setFilteredData(countryData);
  }, [countryData]);

  function getCountryData(objects, from, to) {
    const countryCases = objects.reduce((result, obj) => {
      const { cases, deaths, popData2019 } = obj;
      const country = obj.countriesAndTerritories.replace("_", " ");
      const { day, month, year } = obj;
      const date = new Date(`${year}-${month}-${day}`);

      if (!result[country]) {
        result[country] = {
          country,
          cases: 0,
          deaths: 0,
          totalCases: 0,
          totalDeaths: 0,
          population: popData2019,
        };
      }

      if (date >= from && date <= to) {
        result[country].cases += cases;
        result[country].deaths += deaths;
      }

      result[country].totalCases += cases;
      result[country].totalDeaths += deaths;
      return result;
    }, {});

    return Object.entries(countryCases).map((country) => {
      const { totalCases, totalDeaths, population } = country[1];
      return {
        ...country[1],
        casesOn1000: ((totalCases * 1000) / population).toFixed(2),
        deathsOn1000: ((totalDeaths * 1000) / population).toFixed(2),
      };
    });
  }

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

  return (
    <div style={{ height: "auto", width: "100%" }}>
      <Filter setFilteredData={setFilteredData} countryData={countryData} />
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
      />
    </div>
  );
}
