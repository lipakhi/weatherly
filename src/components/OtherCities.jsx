import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const cities = ["New York", "London", "Tokyo", "Mumbai"];

const OtherCities = () => {
  const [cityData, setCityData] = useState([]);
  const [animateKey, setAnimateKey] = useState(0);

  // Re-trigger animation on theme change
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

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) return null;

            const json = await res.json();

            return {
              name: json.name,
              country: json.sys.country,
              temp: Math.round(json.main.temp),
              high: Math.round(json.main.temp_max),
              low: Math.round(json.main.temp_min),
              icon: json.weather[0].icon,
              description: json.weather[0].description,
            };
          })
        );

        const filtered = results.filter(Boolean);
        setCityData(filtered);
      } catch (error) {
        console.error("Error fetching city weather:", error);
      }
    };

    fetchCityWeather();
  }, []);

  return (
    <div
      key={animateKey}
      className="bg-gradient-to-br from-gray-200 to-blue-200 dark:from-gray-800 dark:to-gray-950 shadow-lg p-4 rounded-3xl shadow-xl border border-white/10 dark:border-white/5 backdrop-blur-md animate-fade-in"
    >
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-xl text-center font-bold text-gray-900 dark:text-white">
          Other Major Cities
        </h2>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-2">
        {cityData.map((city, index) => (
          <div
            key={index}
            className="relative m-1 group rounded-2xl p-3 text-left shadow border border-white/20 dark:border-white/10 opacity-0 animate-slide-up"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: "forwards",
            }}
          >
            {/* Background with backdrop blur - separate div */}
            <div className="absolute inset-0 bg-white/30 dark:bg-white/10 backdrop-blur-lg rounded-2xl group-hover:bg-white/40 dark:group-hover:bg-white/20 transition-colors duration-300" />
            
            {/* Content container with transform */}
            <div className="relative flex items-center justify-between transform transition duration-300 group-hover:scale-[1.01]">
              {/* Left: Temp + City Info */}
              <div className="flex flex-col items-start gap-1.5">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {city.temp}°
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {city.name}, {city.country}
                </p>
                <p className="text-xs capitalize text-muted-light dark:text-muted-dark">
                  {city.description}
                </p>
              </div>

              {/* Right: Icon + High/Low */}
              <div className="flex flex-col items-center">
                <div className="bg-white/20 dark:bg-white/10 p-1 rounded-full">
                  <img
                    src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                    alt="weather icon"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-xs pt-2 text-muted-light dark:text-muted-dark">
                  H{city.high}° L{city.low}°
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCities;