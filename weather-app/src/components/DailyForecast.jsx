import classes from "./DailyForecast.module.css";
import { useAppContext } from "../context/AppContext";
import ReturnWeatherCodeImage from "../api/returnWeatherCodeImage";
import { useMemo } from "react";
import clsx from "clsx";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DailyForecast = ({ className }) => {
  const { state } = useAppContext();

  const dailyWeather = useMemo(() => {
    const output = [[], [], [], [], [], [], []];

    for (let i = 0; i <= 6; i++) {
      if (state.displayingWeather) {
        output.push(
          <div key={i} className={classes.forecastDay}>
            <p className={classes.forecastDayOfWeek}>{daysOfWeek[new Date(state.weather.daily.time[i]).getDay()].toString().substring(0, 3)}</p>
            <img className={classes.forecastIcon} src={ReturnWeatherCodeImage({ code: state.weather.daily.weather_code[i] })} alt="" />
            <div className={classes.forecastTemperatures}>
              <p className={classes.forecastTemperature}>{state.weather.daily.temperature_2m_min[i].toFixed(0)}°</p>
              <p className={classes.forecastTemperature}>{state.weather.daily.temperature_2m_max[i].toFixed(0)}°</p>
            </div>
          </div>
        );
      } else {
        output.push(<div key={i} className={classes.forecastDay}></div>);
      }
    }

    return output;
  }, [state.weather]);

  if (state.displayingWeather && !state.loadingWeather) {
    console.log(state.weather.daily.weather_code.length);
  }

  return (
    <div className={clsx(className, classes.dailyForecastWrapper)}>
      <p className={classes.dailyForecastTitle}>Daily forecast</p>
      <div className={classes.forecastContainer}>{dailyWeather}</div>
    </div>
  );
};

export default DailyForecast;
