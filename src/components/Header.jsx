import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import classes from "./Header.module.css";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import { useAppContext } from "../context/AppContext";
import clsx from "clsx";
import DropdownOption from "./DropdownOption";
import { useState } from "react";

const Header = () => {
  const [showingDropdown, setShowingDropdown] = useState(false);

  const { state, toggleUnit } = useAppContext();

  return (
    <>
      <div className={classes.headerContainer}>
        <img className={classes.logo} src={logo}></img>
        <div className={classes.dropdownWrapper}>
          <div className={classes.unitsContainer} onClick={() => setShowingDropdown(!showingDropdown)}>
            <img className={classes.unitsIcon} src={unitsIcon} />
            <p className={classes.unitsText}>Units</p>
            <img className={classes.dropdownIcon} src={dropdownIcon} />
          </div>
          {showingDropdown && (
            <div className={classes.dropdownContainer}>
              <p className={classes.switchText} onClick={toggleUnit}>
                Switch to {state.unit === "metric" ? "Imperial" : "Metric"}
              </p>
              <p className={classes.unitHeading}>Temperature</p>
              <DropdownOption name="Celsius (C)" checked={state.unit === "metric"}></DropdownOption>
              <DropdownOption name="Fahrenheit (F)" checked={state.unit === "imperial"}></DropdownOption>
              <hr className={classes.horizontalLine}></hr>
              <p className={classes.unitHeading}>Wind Speed</p>
              <DropdownOption name="km/h" checked={state.unit === "metric"}></DropdownOption>
              <DropdownOption name="mph" checked={state.unit === "imperial"}></DropdownOption>
              <hr className={classes.horizontalLine}></hr>
              <p className={classes.unitHeading}>Precipitation</p>
              <DropdownOption name="Millimeters (mm)" checked={state.unit === "metric"}></DropdownOption>
              <DropdownOption name="Inches (inch)" checked={state.unit === "imperial"}></DropdownOption>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
