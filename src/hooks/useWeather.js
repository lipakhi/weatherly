import { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!currentRes.ok) throw new Error("City not found");

      const currentData = await currentRes.json();
      setWeatherData(currentData);

      // Fetch forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastRes.ok) throw new Error("Could not fetch forecast");

      const forecastJson = await forecastRes.json();
      setForecastData(forecastJson);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
  };
};

export default useWeather;
