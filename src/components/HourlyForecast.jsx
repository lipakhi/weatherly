import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { WiStrongWind, WiRaindrop } from "react-icons/wi";
import { useEffect, useState } from "react";

const ForecastCard = ({ forecastData }) => {
  const [chartKey, setChartKey] = useState(0);
  const [axisColor, setAxisColor] = useState("#64748B"); // light default
  const [gridColor, setGridColor] = useState("rgba(100, 116, 139, 0.2)"); // light default

  useEffect(() => {
    const updateColors = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setAxisColor(isDark ? "#94A3B8" : "#64748B"); // muted-dark / muted-light
      setGridColor(isDark ? "rgba(255,255,255,0.1)" : "rgba(100, 116, 139, 0.2)");
      setChartKey((prev) => prev + 1);
    };

    updateColors(); // Initial call

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!forecastData || !forecastData.list) return null;

  const hourly = forecastData.list.slice(0, 6); // Next 12 hours

  const data = hourly.map((item) => ({
    time: format(new Date(item.dt * 1000), "haaa"),
    temp: Math.round(item.main.temp),
    pop: Math.round((item.pop || 0) * 100),
    wind: Math.round(item.wind.speed),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { temp, pop, wind } = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg text-sm text-gray-800 dark:text-white min-w-[150px]">
          <p className="font-semibold">{label}</p>
          <div className="mt-1">
            🌡️ Temp: <span className="font-medium">{temp}°C</span>
          </div>
          <div>
            <WiRaindrop className="inline text-blue-500" /> Precipitation:{" "}
            <span className="font-medium">{pop}%</span>
          </div>
          <div>
            <WiStrongWind className="inline text-gray-500" /> Wind:{" "}
            <span className="font-medium">{wind} km/h</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-200 to-blue-200 dark:from-gray-800 dark:to-gray-950 shadow-lg rounded-3xl p-4 flex flex-col gap-6 transition-colors duration-500 animate-fade-in">
      {/* Title Section */}
      <div className="relative">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Hourly Temperature Chart
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Next 12 hours
          </p>
        </div>
        <div className="absolute top-0 left-4 h-10 w-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Line Chart */}
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            key={chartKey}
            data={data}
            margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="time" stroke={axisColor} fontSize={12} />
            <YAxis
              domain={[
                Math.min(...data.map((d) => d.temp)) - 2,
                Math.max(...data.map((d) => d.temp)) + 2,
              ]}
              stroke={axisColor}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastCard;
