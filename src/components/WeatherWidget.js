import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { stadiums } from "../data/stadiums";
import { dummyWeatherData } from "../data/dummyWeatherData";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const results = await Promise.all(
          stadiums.map(async (stadium) => {
            const response = await fetch(
              `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${stadium.city}`
            );
            const data = await response.json();
            if (response.ok && data.current) {
              return {
                venue: stadium.venue,
                temperature: data.current.temp_c,
                condition: data.current.condition.text,
                icon: data.current.condition.icon,
              };
            }
            throw new Error("Incomplete data received from API");
          })
        );
        setWeatherData(results);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to load live weather data. Showing default data.");
        setWeatherData(dummyWeatherData);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Match Venue Weather
      </h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {weatherData.map((data, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 rounded-lg p-3 sm:p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-sm sm:text-base">{data.venue}</h3>
            <div className="flex items-center mt-2">
              <img
                src={data.icon}
                alt={data.condition}
                className="w-8 h-8 sm:w-10 sm:h-10 mr-2"
              />
              <div>
                <p className="text-sm sm:text-base">{data.temperature}°C</p>
                <p className="text-xs sm:text-sm">{data.condition}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
