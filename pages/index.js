import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {

  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    loadWeatherData().finally(() => {

    });
  }, []);

  const loadWeatherData = async () => {
    let tempcity;
    try {
      const response = await fetch('./api/cityInfo');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      const cityData = data.results[0];
      setCity(cityData);
      tempcity = cityData;
      
    }
    catch (error) {
      console.error('Error fetching weather data:', error);
    }

    const resultWeather = await fetch('/api/cityWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: tempcity.latitude,
        longitude: tempcity.longitude,
        timezone: tempcity.timezone,
        country: tempcity.country,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((r) => {
        return r
      });

    setWeatherData(resultWeather)

  }


  const changeSystem = () =>
    unitSystem === "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={city.name}
        country={city.country}
        description={""}
        iconName={weatherData.current.weather_code}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        {/* <MetricsBox weatherData={weatherData} unitSystem={unitSystem} /> */}
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;