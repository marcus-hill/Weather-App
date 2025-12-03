import classes from "./HourlyForecast.module.css";
import { useAppContext } from "../context/AppContext";
import { useState, useMemo } from "react";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import ReturnWeatherCodeImage from "../api/returnWeatherCodeImage";
import clsx from "clsx";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const HourlyForecast = ({ className }) => {
  const { state } = useAppContext();

  const [selectedDay, setSelectedDay] = useState(0);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hourlyForecast = useMemo(() => {
    const output = {};

    if (!state.displayingWeather || state.loadingWeather) {
      return output;
    }

    // if (!state.displayingWeather || state.loadingWeather) {
    //   for (let i = 0; i <= 6; i++) {
    //     output.push(<div className={classes.forecastContainer}></div>);
    //   }
    //   return output;
    // }

    const now = new Date();

    const startOfThisHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0).getTime();

    function isThisHourOrFuture(timestamp) {
      return timestamp >= startOfThisHour;
    }

    for (const time in state.weather.hourly.time) {
      const dateObject = new Date(state.weather.hourly.time[time]);

      const dateFormatted = dateObject.toISOString().split("T")[0];
      if (!output[dateFormatted]) {
        console.log("PUSHING");
        output[dateFormatted] = [];
      }

      if (isThisHourOrFuture(dateObject.getTime())) {
        console.log("HERE");
        output[dateFormatted].push(time);

        console.log(output[dateFormatted] + "-----!!!");
      }
    }

    setSelectedDay(Object.keys(output)[0]);

    console.log("Selected Day: " + selectedDay);

    return output;
  }, [state.displayingWeather]);

  const hourlyForecastDay = useMemo(() => {
    const output = [];

    if (!state.displayingWeather || state.loadingWeather) {
      for (let i = 0; i <= 6; i++) {
        output.push(<div key={i} className={classes.forecastContainer}></div>);
      }
      return output;
    }

    console.log("Selected Day: " + selectedDay);

    const limit = Math.min(8, hourlyForecast[selectedDay].length);

    for (let i = 0; i < limit; i++) {
      const timeStampNumber = hourlyForecast[selectedDay][i];

      output.push(
        <div key={i} className={classes.forecastContainer}>
          <div className={classes.weatherAndTimeContainer}>
            <img className={classes.weatherIcon} src={ReturnWeatherCodeImage({ code: state.weather.hourly.weather_code[i] })} />
            <p className={classes.time}>{new Date(state.weather.hourly.time[timeStampNumber]).toLocaleTimeString([], { hour: "numeric", hour12: true })}</p>
          </div>
          <p className={classes.temperature}>{state.weather.hourly.temperature_2m[timeStampNumber].toFixed(0)}°</p>
        </div>
      );
      console.log("Date: " + timeStampNumber);
      console.log("Weather: " + state.weather.hourly.temperature_2m[timeStampNumber]);
    }

    return output;
  }, [selectedDay]);

  return (
    <div className={clsx(className, classes.hourlyForecastContainer)}>
      <div className={classes.hourlyForecastWrapper}>
        <div className={classes.topSection}>
          <p className={classes.hourlyForecastTitle}>Hourly forecast</p>
          <div className={classes.dropdownWrapper}>
            <button className={classes.dropdownButton}>
              {state.displayingWeather ? (
                <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {daysOfWeek[new Date(selectedDay).getDay()]} <img className={classes.dropdownIcon} src={dropdownIcon}></img>
                </div>
              ) : (
                <div className={classes.loadingIconContainer}>
                  <hr className={classes.loadingHr}></hr>
                  <img className={classes.dropdownIcon} src={dropdownIcon}></img>
                </div>
              )}
            </button>
            {dropdownOpen && (
              <div className={classes.dropdownContainer}>
                {Object.entries(hourlyForecast).map(([date, times]) => {
                  const day = new Date(date);
                  return (
                    <div
                      key={day}
                      onClick={() => {
                        setSelectedDay(date);
                        setDropdownOpen(false);
                      }}
                      className={classes.dropdownOption}
                    >
                      {daysOfWeek[day.getDay()]}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className={classes.hourlySection}>{hourlyForecastDay}</div>
      </div>
    </div>
  );
};

export default HourlyForecast;
