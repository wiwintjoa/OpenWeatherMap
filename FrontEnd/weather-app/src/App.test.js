import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import WeatherApp from "./App";
import { fetchWeatherData } from "./services/weatherService";

jest.mock("./services/weatherService");

describe("WeatherApp Integration Test", () => {
  it("should display weather data when city is selected", async () => {
    const mockWeatherData = {
      name: "Jakarta",
      main: { temp: 27 },
      weather: [{ description: "Cloudy" }],
    };

    fetchWeatherData.mockResolvedValue(mockWeatherData);

    render(<WeatherApp />);

    // Select country (mocked)
    const countryDropdown = screen.getByPlaceholderText("Select a country");
    fireEvent.change(countryDropdown, { target: { value: "Jakarta" } });

    // Select city (mocked)
    const cityDropdown = screen.getByPlaceholderText("Select a city");
    fireEvent.change(cityDropdown, { target: { value: "Jakarta" } });

    await waitFor(() => {
      expect(screen.getByText("Weather in Jakarta")).toBeInTheDocument();
      expect(screen.getByText("Temperature: 22°C")).toBeInTheDocument();
      expect(screen.getByText("Condition: Sunny")).toBeInTheDocument();
    });
  });

  it("should display loading while fetching data", async () => {
    fetchWeatherData.mockResolvedValue({
      name: "Berlin",
      main: { temp: 18 },
      weather: [{ description: "Cloudy" }],
    });

    render(<WeatherApp />);

    const cityDropdown = screen.getByPlaceholderText("Select a city");
    fireEvent.change(cityDropdown, { target: { value: "Berlin" } });

    expect(screen.getByText("Loading weather...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading weather...")).not.toBeInTheDocument();
    });
  });

  it("should handle API error gracefully", async () => {
    fetchWeatherData.mockRejectedValue(new Error("API Error"));

    render(<WeatherApp />);

    const cityDropdown = screen.getByPlaceholderText("Select a city");
    fireEvent.change(cityDropdown, { target: { value: "UnknownCity" } });

    await waitFor(() => {
      expect(screen.queryByText("Weather in")).not.toBeInTheDocument();
    });
  });
});
