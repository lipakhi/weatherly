import { useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import WeeklyForecast from "../components/WeeklyForecast";
import OtherCities from "../components/OtherCities";
import useWeather from "../hooks/useWeather";

const Dashboard = () => {
  const { weatherData, forecastData, fetchWeather, loading, error } =
    useWeather();

  useEffect(() => {
    fetchWeather("Bhubaneswar");
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center transition-all duration-500 relative bg-[url('/light-bg.jpg')] dark:bg-[url('/dark-bg.jpg')]">
      <div className="absolute inset-0 bg-white/40 dark:bg-black/60 z-0" />
      <div className="px-4 md:px-4 py-1 max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 z-10 mt-4 ml-2">Weather Dashboard</h1>
          <SearchBar onSearch={fetchWeather} />
          <ThemeToggle />
        </div>

        {/* Loading & Error */}
        {loading && <p className="text-center text-muted-light">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Main Grid Layout - 4:3 ratio */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
          {/* Left Section - 4/7 */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <CurrentWeatherCard weatherData={weatherData} />
            <WeeklyForecast forecastData={forecastData} />
          </div>

          {/* Right Section - 3/7 */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <HourlyForecast forecastData={forecastData} />
            <OtherCities />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
