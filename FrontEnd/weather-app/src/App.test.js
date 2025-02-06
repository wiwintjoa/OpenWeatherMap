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

    const countryDropdown = screen.getByPlaceholderText("select a country");
    fireEvent.change(countryDropdown, { target: { value: "Jakarta" } });

    const cityDropdown = screen.getByPlaceholderText("Select a city");
    fireEvent.change(cityDropdown, { target: { value: "Jakarta" } });

    await waitFor(() => {
      expect(screen.getByText("Weather in Jakarta")).toBeInTheDocument();
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
