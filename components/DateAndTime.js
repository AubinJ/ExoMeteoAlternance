import { getWeekDay, getTimeImproved, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getTimeImproved(
          weatherData.hourly.time[12],
          weatherData.utc_offset_seconds
        )} ${getAMPM(unitSystem, weatherData.dt, weatherData.timezone)}`}
      </h2>
    </div>
  );
};
