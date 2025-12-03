import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import classes from "./Home.module.css";
import SearchCity from "../components/SearchCity";
import CurrentWeather from "../components/CurrentWeather";
import DailyForecast from "../components/DailyForecast";
import HourlyForecast from "../components/HourlyForecast";

const Home = () => {
  const { state } = useAppContext();

  return (
    <>
      <div className={classes.weatherDashboardContainer}>
        <Header></Header>
        <p>{state.unit}</p>
        <p className={classes.mainHeading}>How's the sky looking today?</p>
        <SearchCity></SearchCity>
        {(state.displayingWeather || state.loadingWeather) && (
          <div className={classes.weatherWrapper}>
            <CurrentWeather className={classes.current} />
            <DailyForecast className={classes.daily} />
            <HourlyForecast className={classes.hourly} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
