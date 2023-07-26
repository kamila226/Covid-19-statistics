import { useState, useEffect } from "react";

export default function Filter({ setFilteredRawData, rawData }) {
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    let filteredData = rawData;
    if (countryFilter) {
      filteredData = filteredData.filter((obj) => {
        const country = obj.countriesAndTerritories;
        return country === countryFilter;
      });
    }
    console.log(filteredData);
    setFilteredRawData(filteredData);
  }, [countryFilter, rawData, setFilteredRawData]);

  const countriesSet = new Set();
  rawData.forEach((countryObj) => {
    countriesSet.add(countryObj.countriesAndTerritories);
  });

  const countriesArray = Array.from(countriesSet);

  const countriesElements = countriesArray.map((countryName, i) => {
    const country = countryName.replaceAll("_", " ");
    return (
      <option key={i} value={countryName}>
        {country}
      </option>
    );
  });

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  function clearFilters() {
    setCountryFilter("");
  }

  return (
    <div className="filters">
      <div>
        <select onChange={handleCountryFilterChange}>
          <option value="">Select Country</option>
          {countriesElements}
        </select>
      </div>
      <button onClick={clearFilters}>Clear filters</button>
    </div>
  );
}
