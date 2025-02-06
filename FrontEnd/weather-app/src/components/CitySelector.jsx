import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const CitySelector = ({ countryCode, selectedCity, onSelect }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (countryCode) {
      let cityUri = `https://localhost:44351/v1/Cities?countryCode=${countryCode}`;

      axios.get(cityUri).then((response) => {
        const cityOptions = response.data.map((city) => ({
          label: city.name,
          value: city.code,
        }));

        setCities(cityOptions);
      });
    }
  }, [countryCode]);

  return (
    <Select
      options={cities}
      value={selectedCity}
      onChange={onSelect}
      placeholder="Select a city"
    />
  );
};

export default CitySelector;
