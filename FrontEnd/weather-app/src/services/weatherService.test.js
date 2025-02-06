import { fetchWeatherData } from "./weatherService";
import axios from "axios";

jest.mock("axios");

describe("Weather Service", () => {
  it("should fetch weather data successfully", async () => {
    const mockWeatherData = {
      name: "London",
      main: { temp: 20 },
      weather: [{ description: "Clear sky" }],
    };
    axios.get.mockResolvedValue({ date: mockWeatherData });

    const result = await fetchWeatherData("London");
    expect(result).toEqual(mockWeatherData);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("London"));
  });

  it("should throw an error when API call fails", async () => {
    axios.get.mockRejectedValue(new Error("API error"));

    await expect(fetchWeatherData("InvalidCity")).rejects.toThrow("API error");
  });
});
