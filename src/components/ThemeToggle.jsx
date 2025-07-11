import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-20 h-9 flex items-center 
        bg-white/40 dark:bg-white/10 
        border border-gray-300 dark:border-white/20 
        rounded-full p-1 transition-all duration-300 
        shadow-md hover:shadow-lg
        mt-4 mr-2"
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-1 left-1.5 w-7 h-7 rounded-full 
          bg-accent-light dark:bg-accent-dark 
          transform transition-transform duration-300 
          ${theme === "dark" ? "translate-x-9" : ""}`}
      />

      {/* Icons */}
      <div className="flex justify-between w-full px-2 z-10 text-white text-base">
        <FiSun
          className={`${
            theme === "light" ? "text-yellow-400" : "text-yellow-300"
          }`}
          size={18}
        />
        <FiMoon
          className={`${
            theme === "dark" ? "text-indigo-400" : "text-indigo-500"
          }`}
          size={18}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
