import React from "react";

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;
  return (
    <div>
      <h3>Weather in {weather.data.title}</h3>
      <h4>Time {weather.data.currentDateTime}</h4>
      <p>
        Location: {weather.data.coord.lat},{weather.data.coord.lon}
      </p>
      <p>
        Wind: {weather.data.wind.deg}, {weather.data.wind.speed}m/s
      </p>
      <p>Visibility: {weather.data.visibility}</p>
      <p>Sky conditions: {weather.data.weather.description}</p>

      <p>Temperature °C: {weather.data.temperatureC}°C</p>
      <p>Temperature °F: {weather.data.temperatureF}°F</p>

      <p>
        Dew Point: {weather.data.temperatureMinC}°C/
        {weather.data.temperatureMaxC}°C
      </p>
      <p>Relative Humidity: {weather.data.main.humidity}%</p>
      <p>Pressure: {weather.data.main.pressure}</p>
    </div>
  );
};

export default WeatherDisplay;
