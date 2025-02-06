import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const COUNTRY_API_URI = "https://localhost:44351/v1/Countries";

const CountrySelector = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(COUNTRY_API_URI).then((response) => {
      const countryOptions = response.data.map((country) => ({
        label: country.name,
        value: country.code,
      }));
      setCountries(countryOptions);
    });
  }, []);

  return (
    <Select
      options={countries}
      onChange={onSelect}
      placeholder="Select a country"
    />
  );
};

export default CountrySelector;
