import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setCity(input);

    if (input.length > 1) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (location) => {
    if (!location && city.trim() === "") return;

    if (location) {
      const formatted = `${location.name},${location.country}`;
      onSearch(formatted);
      setCity("");
      setSuggestions([]);
    } else {
      onSearch(city.trim());
      setCity("");
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full max-w-xl relative mx-auto mt-5 ">
      {/* Search Input */}
      <div className="flex items-center rounded-full overflow-hidden 
        bg-white/60 dark:bg-white/10 
        backdrop-blur-md 
        border border-gray-300 dark:border-white/20 
        shadow-md transition
        mr-8">
        
        <input
          type="text"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search city..."
          className="flex-grow px-5 py-3 bg-transparent 
            text-gray-600 dark:text-text-dark 
            placeholder:text-gray-500 dark:placeholder:text-muted-dark 
            focus:outline-none"
        />

        <button
          onClick={() => handleSearch()}
          className="flex items-center gap-2 px-5 py-3 
            text-white bg-accent-light dark:bg-accent-dark 
            hover:opacity-90 transition-colors"
        >
          <FiSearch size={18} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 
          rounded-lg shadow-lg z-50 overflow-hidden">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer 
                hover:bg-gray-100 dark:hover:bg-gray-700 
                text-sm text-gray-800 dark:text-white"
              onClick={() => handleSearch(item)}
            >
              {item.name}, {item.country}
              {item.state ? ` (${item.state})` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
