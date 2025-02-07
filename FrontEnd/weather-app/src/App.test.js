import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherApp from "./App";
import { fetchWeatherData } from "./services/weatherService";

jest.mock("./services/weatherService", () => ({
  fetchWeatherData: jest.fn(),
}));

jest.mock("./components/CountrySelector", () => (props) => (
  <select
    data-testid="country-selector"
    onChange={(e) => props.onSelect({ value: e.target.value })}
  >
    <option value="">Select a country</option>
    <option value="US">United States</option>
  </select>
));

jest.mock("./components/CitySelector", () => (props) => (
  <select
    data-testid="city-selector"
    onChange={(e) => props.onSelect({ value: e.target.value })}
  >
    <option value="">Select a city</option>
    <option value="New York">New York</option>
  </select>
));

jest.mock(
  "./components/WeatherDisplay",
  () =>
    ({ weather }) =>
      weather ? (
        <div data-testid="weather-display">{`Temp: ${weather.temp}°C, Condition: ${weather.condition}`}</div>
      ) : null
);

test("fetches and displays weather data when a city is selected", async () => {
  fetchWeatherData.mockResolvedValue({
    temp: 25,
    condition: "Sunny",
  });

  render(<WeatherApp />);

  fireEvent.change(screen.getByTestId("country-selector"), {
    target: { value: "US" },
  });

  expect(screen.getByTestId("city-selector")).toBeInTheDocument();

  fireEvent.change(screen.getByTestId("city-selector"), {
    target: { value: "New York" },
  });

  expect(screen.getByText("Loading weather...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByTestId("weather-display")).toHaveTextContent(
      "Temp: 25°C, Condition: Sunny"
    );
  });

  expect(fetchWeatherData).toHaveBeenCalledWith("New York");
});
