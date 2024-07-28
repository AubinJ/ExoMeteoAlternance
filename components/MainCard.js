import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

const weatherIcons = {
  0: '☀️', // Clear sky
  1: '🌤️', // Mainly clear
  2: '⛅', // Partly cloudy
  3: '☁️', // Overcast
  45: '🌫️', // Fog
  48: '🌫️', // Depositing rime fog
  51: '🌦️', // Drizzle: Light
  53: '🌧️', // Drizzle: Moderate
  55: '🌧️', // Drizzle: Dense intensity
  56: '🌦️', // Freezing Drizzle: Light
  57: '🌧️', // Freezing Drizzle: Dense intensity
  61: '🌦️', // Rain: Slight
  63: '🌧️', // Rain: Moderate
  65: '🌧️', // Rain: Heavy intensity
  66: '🌨️', // Freezing Rain: Light
  67: '🌨️', // Freezing Rain: Heavy intensity
  71: '🌨️', // Snow fall: Slight
  73: '❄️', // Snow fall: Moderate
  75: '❄️', // Snow fall: Heavy intensity
  77: '🌨️', // Snow grains
  80: '🌦️', // Rain showers: Slight
  81: '🌧️', // Rain showers: Moderate
  82: '🌧️', // Rain showers: Violent
  85: '🌨️', // Snow showers slight
  86: '❄️', // Snow showers heavy
  95: '⛈️', // Thunderstorm: Slight or moderate
  96: '⛈️', // Thunderstorm with slight hail
  99: '⛈️', // Thunderstorm with heavy hail
};

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  unitSystem,
  weatherData,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <div id="weather-container">
        <div id="weather-icon">{weatherIcons[iconName]}</div>
      </div>
      <h1 className={styles.temperature}>
        {unitSystem == "metric"
          ? Math.round(weatherData.current.temperature_2m)
          : Math.round(ctoF(weatherData.current.temperature_2m))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
      <p>
        Feels like{" "}
        {unitSystem == "metric"
          ? Math.round(weatherData.current.apparent_temperature)
          : Math.round(ctoF(weatherData.current.apparent_temperature))}
        °{unitSystem == "metric" ? "C" : "F"}
      </p>
    </div>
  );
};
