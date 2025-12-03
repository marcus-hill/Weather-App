import { useAppContext } from "../context/AppContext";
import classes from "./CurrentWeather.module.css";
import ReturnWeatherCodeImage from "../api/returnWeatherCodeImage";
import LoadingIcon from "../assets/images/icon-loading.svg";
import clsx from "clsx";

const CurrentWeather = ({ className }) => {
  const { state } = useAppContext();

  const getFormattedDate = (date) => {
    const newDate = new Date(date);

    const formattedDate = Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(newDate);

    return formattedDate;
  };

  return (
    <div className={clsx(classes.currentWeatherWrapper, className)}>
      {state.displayingWeather && !state.loadingWeather ? (
        <div className={classes.topCurrentWrapper}>
          <p className={classes.currentCityTitle}>
            {state.selectedCity.name}, {state.selectedCity.country}
          </p>
          <p className={classes.currentDate}>{getFormattedDate(state.weather.current.time)}</p>
          <div className={classes.currentWeatherInformationWrapper}>
            <img className={classes.currentWeatherIcon} src={ReturnWeatherCodeImage({ code: state.weather.current.weather_code })} />
            <div className={classes.currentWeatherTemperature}>{state.displayingWeather && !state.loadingWeather ? state.weather.current.temperature_2m.toFixed(0) + "°" : <hr className={classes.loadingBar}></hr>}</div>
          </div>
        </div>
      ) : (
        <div className={classes.loadingWeatherWrapper}>
          <img className={classes.loadingIcon} src={LoadingIcon} alt="" />
          <p className={classes.loadingText}>Loading...</p>
        </div>
      )}

      <div className={classes.statisticsCurrentWrapper}>
        <div className={classes.currentStatistic}>
          <p className={classes.currentStatisticTitle}>Feels Like</p>
          <div className={classes.currentStatisticText}>{state.displayingWeather && !state.loadingWeather ? state.weather.current.apparent_temperature.toFixed(0) + "°" : <hr className={classes.loadingBar}></hr>}</div>
        </div>
        <div className={classes.currentStatistic}>
          <p className={classes.currentStatisticTitle}>Humidity</p>
          <div className={classes.currentStatisticText}>{state.displayingWeather && !state.loadingWeather ? state.weather.current.relative_humidity_2m.toFixed(0) + state.weather.current_units.relative_humidity_2m : <hr className={classes.loadingBar}></hr>}</div>
        </div>
        <div className={classes.currentStatistic}>
          <p className={classes.currentStatisticTitle}>Wind</p> <div className={classes.currentStatisticText}>{state.displayingWeather && !state.loadingWeather ? state.weather.current.wind_speed_10m.toFixed(0) + state.weather.current_units.wind_speed_10m : <hr className={classes.loadingBar}></hr>}</div>
        </div>
        <div className={classes.currentStatistic}>
          <p className={classes.currentStatisticTitle}>Precipitation</p> <div className={classes.currentStatisticText}>{state.displayingWeather && !state.loadingWeather ? state.weather.current.precipitation.toFixed(0) + state.weather.current_units.precipitation : <hr className={classes.loadingBar}></hr>}</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
