import { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaSun, FaMoon, FaWind } from "react-icons/fa";

const CurrentWeatherCard = ({ weatherData }) => {
  const [animateKey, setAnimateKey] = useState(0);

  // Trigger re-animation on theme change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setAnimateKey((prev) => prev + 1);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!weatherData) return null;

  const { main, weather, name, sys, dt, wind } = weatherData;

  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const formattedDate = format(new Date(dt * 1000), "dd MMM, yyyy");
  const dayName = format(new Date(dt * 1000), "EEEE");

  const sunrise = format(new Date(sys.sunrise * 1000), "h:mm a");
  const sunset = format(new Date(sys.sunset * 1000), "h:mm a");

  return (
    <div
      key={animateKey}
      className="relative bg-gradient-to-br from-gray-200 to-blue-200 dark:from-gray-800 dark:to-gray-950 shadow-lg rounded-3xl p-8 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 items-center animate-slide-up"
    >
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-4">
        {/* Location */}
        <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-accent-light text-white font-medium shadow w-fit">
          <FaMapMarkerAlt className="text-xs" />
          {name}, {sys?.country}
        </div>

        {/* Day + Date */}
        <div>
          <h3 className="text-2xl font-bold">{dayName}</h3>
          <p className="text-muted-light dark:text-muted-dark text-sm">
            {formattedDate}
          </p>
        </div>

        {/* Sunrise, Sunset, Wind */}
        <div className="flex flex-col text-xs text-muted-light dark:text-muted-dark gap-1">
          <div className="flex items-center gap-2">
            <FaSun className="text-yellow-400" />
            Sunrise: {sunrise}
          </div>
          <div className="flex items-center gap-2">
            <FaMoon className="text-indigo-400" />
            Sunset: {sunset}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-light dark:text-muted-dark">
            <FaWind className="text-cyan-400" />
            Wind: {Math.round(wind.speed)} m/s
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center justify-center gap-2 mt-6">
        <p className="text-5xl font-bold">{Math.round(main.temp)}°C</p>
        <p className="text-sm text-muted-light dark:text-muted-dark">
          High: {Math.round(main.temp_max)}° | Low: {Math.round(main.temp_min)}°
        </p>
        <p className="text-sm text-muted-light dark:text-muted-dark">
          Feels like {Math.round(main.feels_like)}°C
        </p>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm">
          <img
            src={iconUrl}
            alt={weather[0].description}
            className="w-24 h-24 md:w-22 md:h-22"
          />
        </div>
        <p className="text-xl font-semibold capitalize">{weather[0].main}</p>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
