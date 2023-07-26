import { useState, useEffect } from "react";

export default function Filter({ setFilteredData, countryData }) {
  const [countryFilter, setCountryFilter] = useState("");
  const [criteriaFilter, setCriteria] = useState("");
  const [criteriaFrom, setCriteriaFrom] = useState("");
  const [criteriaTo, setCriteriaTo] = useState("");

  useEffect(() => {
    let filteredData = countryData;

    if (countryFilter) {
      console.log("countryFilter");
      filteredData = filteredData.filter((countryData) =>
        countryData.country.toLowerCase().match(countryFilter)
      );
    }
    if ((criteriaFilter && criteriaFrom) || criteriaTo) {
      filteredData = filteredData.filter((countryData) => {
        // console.log(
        //   "cases",
        //   countryData.casesOn1000,
        //   "criteriaFrom",
        //   criteriaFrom,
        //   Number(countryData.casesOn1000) >= Number(criteriaFrom)
        // );
        switch (criteriaFilter) {
          case "cases":
            return criteriaTo
              ? countryData.cases >= criteriaFrom &&
                  countryData.cases <= criteriaTo
              : countryData.cases >= criteriaFrom;
          case "deaths":
            return criteriaTo
              ? countryData.deaths >= criteriaFrom &&
                  countryData.deaths <= criteriaTo
              : countryData.deaths >= criteriaFrom;
          case "totalCases":
            return criteriaTo
              ? countryData.totalCases >= criteriaFrom &&
                  countryData.totalCases <= criteriaTo
              : countryData.totalCases >= criteriaFrom;
          case "totalDeaths":
            return criteriaTo
              ? countryData.totalDeaths >= criteriaFrom &&
                  countryData.totalDeaths <= criteriaTo
              : countryData.totalDeaths >= criteriaFrom;
          case "casesOn1000":
            return criteriaTo
              ? countryData.casesOn1000 >= criteriaFrom &&
                  countryData.casesOn1000 <= criteriaTo
              : Number(countryData.casesOn1000) >= criteriaFrom;
          case "deathsOn1000":
            return criteriaTo
              ? countryData.deathsOn1000 >= criteriaFrom &&
                  countryData.deathsOn1000 <= criteriaTo
              : countryData.deathsOn1000 >= criteriaFrom;
          default:
            return countryData;
        }
      });
    }
    setFilteredData(filteredData);
  }, [
    countryFilter,
    criteriaFilter,
    criteriaFrom,
    criteriaTo,
    countryData,
    setFilteredData,
  ]);

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const handleCriteriaFromChange = (event) => {
    setCriteriaFrom(event.target.value);
  };

  const handleCriteriaToChange = (event) => {
    setCriteriaTo(event.target.value);
  };

  function clearFilters() {
    setCountryFilter("");
    setCriteria("");
    setCriteriaFrom("");
    setCriteriaTo("");
  }

  return (
    <div className="filters">
      <input
        type="text"
        value={countryFilter}
        onChange={handleCountryFilterChange}
        placeholder="Search by country"
      />
      <div className="criteria-filter">
        <select onChange={handleCriteriaChange}>
          <option value="cases">Cases</option>
          <option value="deaths">Deaths</option>
          <option value="totalCases">Total Cases</option>
          <option value="totalDeaths">Total Deaths</option>
          <option value="casesOn1000">Cases on 1000 of citizens</option>
          <option value="deathsOn1000">Deaths on 1000 of citizens</option>
        </select>

        <input
          className="input-short"
          type="text"
          value={criteriaFrom}
          onChange={handleCriteriaFromChange}
          placeholder="from"
        />

        <input
          className="input-short"
          type="text"
          value={criteriaTo}
          onChange={handleCriteriaToChange}
          placeholder="to"
        />
      </div>
      <button onClick={clearFilters}>Clear filters</button>
    </div>
  );
}
