import { useEffect, useState } from "react";
import { format } from "date-fns";
import { WiHumidity, WiStrongWind, WiRaindrop } from "react-icons/wi";

const WeeklyForecast = ({ forecastData }) => {
  const [days, setDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  useEffect(() => {
    if (!forecastData?.list) return;

    const groupedByDay = {};

    forecastData.list.forEach((item) => {
      const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");
      if (!groupedByDay[date]) {
        groupedByDay[date] = [];
      }
      groupedByDay[date].push(item);
    });

    const processedDays = Object.entries(groupedByDay)
      .slice(0, 5)
      .map(([date, entries]) => {
        const temps = entries.map((e) => e.main.temp);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);

        const middayEntry = entries[Math.floor(entries.length / 2)];
        const icon = middayEntry.weather[0].icon;
        const description = middayEntry.weather[0].description;
        const wind = middayEntry.wind.speed;
        const humidity = middayEntry.main.humidity;
        const pop = Math.round((middayEntry.pop || 0) * 100);

        return {
          date,
          day: format(new Date(date), "EEEE"),
          icon,
          description,
          minTemp: Math.round(minTemp),
          maxTemp: Math.round(maxTemp),
          wind: Math.round(wind),
          humidity,
          pop,
        };
      });

    setDays(processedDays);
  }, [forecastData]);

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

  if (days.length === 0) return (
    <div className="text-center py-12 animate-fade-in text-gray-600 dark:text-gray-300">
      Loading forecast data...
    </div>
  );

  const selected = days[selectedDayIndex];

  return (
    <div
      key={animateKey}
      className="bg-gradient-to-br from-gray-200 to-blue-200 dark:from-gray-800 dark:to-gray-950 p-6 pt-4 pb-4 rounded-3xl shadow-lg border border-white/10 dark:border-white/5 backdrop-blur-md animate-slide-up"
    >
      <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-2">
        Weekly Forecast
      </h2>

      <div className="flex gap-3 flex-col sm:flex-row">
        {/* Day Selectors */}
        <div className="flex sm:flex-col gap-1 w-full sm:w-2/5">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDayIndex(index)}
              className={`flex items-center gap-4 px-6 py-2 rounded-2xl w-full transition-all text-left shadow-sm border border-white/20 backdrop-blur-md whitespace-nowrap ${
                index === selectedDayIndex
                  ? "bg-white/80 dark:bg-white/10"
                  : "bg-white/40 dark:bg-white/5"
              }`}
            >
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="w-8 h-8"
              />
              <div className="flex justify-between items-center w-full">
                <p className="text-base font-medium text-gray-700 dark:text-gray-200">
                  {index === 0 ? "Today" : day.day}
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {day.maxTemp}° / {day.minTemp}°
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Details */}
        <div className="flex-1 bg-white/50 dark:bg-white/10 p-4 rounded-3xl backdrop-blur-lg shadow-inner min-h-[260px] flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
            {/* Icon & Temps */}
            <div className="flex flex-col items-center text-center gap-2 min-w-[120px]">
              <div className="w-24 h-24">
                <img
                  src={`https://openweathermap.org/img/wn/${selected.icon}@4x.png`}
                  alt={selected.description}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-[130px] h-[48px] flex items-center justify-center">
                <p className="text-xl font-semibold capitalize text-center break-words leading-tight h-full flex items-center justify-center">
                  {selected.description}
                </p>
              </div>
              <p className="text-2xl font-bold min-h-[32px]">
                {selected.maxTemp}°C
              </p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                High {selected.maxTemp}° / Low {selected.minTemp}°
              </p>
            </div>

            {/* Metrics List */}
            <ul className="flex-1 flex flex-col divide-y divide-gray-300/40 dark:divide-white/10 text-sm min-w-[180px] w-full sm:w-auto">
              <li className="flex items-center gap-3 py-2 min-h-[52px]">
                <WiStrongWind className="text-xl text-blue-500 shrink-0" />
                <div>
                  <p className="font-medium">Wind</p>
                  <p>{selected.wind} km/h</p>
                </div>
              </li>
              <li className="flex items-center gap-3 py-2 min-h-[52px]">
                <WiRaindrop className="text-xl text-blue-500 shrink-0" />
                <div>
                  <p className="font-medium">Precipitation</p>
                  <p>{selected.pop}%</p>
                </div>
              </li>
              <li className="flex items-center gap-3 py-2 min-h-[52px]">
                <WiHumidity className="text-xl text-blue-500 shrink-0" />
                <div>
                  <p className="font-medium">Humidity</p>
                  <p>{selected.humidity}%</p>
                </div>
              </li>
              <li className="flex items-center gap-3 py-2 min-h-[52px]">
                <div className="text-xl text-blue-500 shrink-0">📅</div>
                <div>
                  <p className="font-medium">Date</p>
                  <p>{format(new Date(selected.date), "dd MMM yyyy")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;
