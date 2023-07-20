import "./App.css";
import { useEffect, useState } from "react";
import Table from "./Components/Table";
import PeriodPicker from "./Components/PeriodPicker";
import Filter from "./Components/Filter";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rawData, setRawData] = useState([]);
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

  useEffect(() => {
    fetch("https://opendata.ecdc.europa.eu/covid19/casedistribution/json/")
      .then((res) => res.json())
      .then((data) => {
        setRawData(data.records);
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
              return new Date(date);
            })
          )
        );
        setStartDate(minDate);
        setEndDate(maxDate);
      });
  }, []);

  useEffect(() => {
    setData(getCountryData(startDate, endDate));
  }, [rawData]);

  function getCountryData(from, to) {
    const countryCases = rawData.reduce((result, obj) => {
      const { cases, deaths, popData2019 } = obj;
      const country = obj.countriesAndTerritories.replaceAll("_", " ");
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

  function handleStartDateChange(date) {
    setData(getCountryData(date, endDate));
  }

  function handleEndDateChange(date) {
    setData(getCountryData(startDate, date));
  }

  return (
    <div className="App">
      <PeriodPicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />
      <Filter setFilteredData={setFilteredData} countryData={countryData} />

      <Table
        countryData={countryData}
        startDate={startDate}
        filteredData={filteredData}
      />
    </div>
  );
}

export default App;
