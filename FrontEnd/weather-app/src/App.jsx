import React, { useState } from "react";
import CountrySelector from "./components/CountrySelector";
import CitySelector from "./components/CitySelector";
import WeatherDisplay from "./components/WeatherDisplay";
import { fetchWeatherData } from "./services/weatherService";

const WeatherApp = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCity(null);
    setWeather(null);
  };

  const handleCityChange = async (selectedOption) => {
    setSelectedCity(selectedOption);
      setWeather(null);
      setLoading(true);

    try {
      const data = await fetchWeatherData(selectedOption.value);
      setWeather(data);
    } catch (error) {
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}
    >
      <h2>Weather App</h2>
      <CountrySelector onSelect={handleCountryChange} />
      <br />

      {selectedCountry && (
        <CitySelector
          countryCode={selectedCountry.value}
          selectedCity={selectedCity}
          onSelect={handleCityChange}
        />
      )}
      <br />

      {loading ? (
        <p>Loading weather...</p>
      ) : (
        <WeatherDisplay weather={weather} />
      )}
    </div>
  );
};

export default WeatherApp;
