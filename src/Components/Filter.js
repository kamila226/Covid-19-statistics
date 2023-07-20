import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
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
        switch (criteriaFilter) {
          case "cases":
            console.log(criteriaFilter);
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
              : countryData.casesOn1000 >= criteriaFrom;
          case "deathsOn1000":
            return criteriaTo
              ? countryData.deathsOn1000 >= criteriaFrom &&
                  countryData.deathsOn1000 <= criteriaTo
              : countryData.deathsOn1000 >= criteriaFrom;
        }
      });
    }
    setFilteredData(filteredData);
  }, [countryFilter, criteriaFilter, criteriaFrom, criteriaTo, countryData]);

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
    <div>
      <TextField
        label="Search by country"
        value={countryFilter}
        onChange={handleCountryFilterChange}
      />

      <FormControl>
        <InputLabel>Choose criteria</InputLabel>
        <Select value={criteriaFilter} onChange={handleCriteriaChange}>
          <MenuItem value="cases">Cases</MenuItem>
          <MenuItem value="deaths">Deaths</MenuItem>
          <MenuItem value="totalCases">Total Cases</MenuItem>
          <MenuItem value="totalDeaths">Total Deaths</MenuItem>
          <MenuItem value="casesOn1000">Cases on 1000 of citizens</MenuItem>
          <MenuItem value="deathsOn1000">Deaths on 1000 of citizens</MenuItem>
        </Select>
        <TextField
          label="from"
          value={criteriaFrom}
          onChange={handleCriteriaFromChange}
        />
        <TextField
          label="to"
          value={criteriaTo}
          onChange={handleCriteriaToChange}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
}
