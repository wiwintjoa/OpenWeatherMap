import axios from "axios";

const OPENWEATHER_API_URI = "https://localhost:44351/v1/OpenWeather";

// Function to fetch weather data from API
export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_API_URI}?city=${city}`);

    return response.data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    throw error;
  }
};
