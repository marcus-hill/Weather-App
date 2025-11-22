import { useAppContext } from "../context/AppContext";
import Header from "../components/Header";
import classes from "./Home.module.css";
import SearchCity from "../components/SearchCity";

const Home = () => {
  const { state } = useAppContext();
  return (
    <>
      <div className={classes.weatherDashboardContainer}>
        <Header></Header>
        <p>{state.unit}</p>
        <p className={classes.mainHeading}>How's the sky looking today?</p>
        <SearchCity></SearchCity>
      </div>
    </>
  );
};

export default Home;
