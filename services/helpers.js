import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
  isoStringToLocalTime,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = function (unitSystem, currentTime, timezone) {
  return unitSystem == "metric"
    ? unixToLocalTime(currentTime, timezone)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezone));
}

export const getTimeImproved = function (weatherDataHourly, timezone) {
  return isoStringToLocalTime(weatherDataHourly, timezone)
}
export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date((weatherData.hourly.time[11])).getUTCDay()
  ];
};
