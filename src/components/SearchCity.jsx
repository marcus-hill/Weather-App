import { useAppContext } from "../context/AppContext";
import classes from "./SearchCity.module.css";
import { useRef } from "react";
import LoadingIcon from "../assets/images/icon-loading.svg";

const SearchCity = () => {
  const { state, loadCityOptions, updateSelectedCity, updateDisplayingCityOptions } = useAppContext();

  const searchCityInputRef = useRef(null);

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchCityInputRef.current.value) {
      loadCityOptions(searchCityInputRef.current.value);
    }
  };

  const selectCity = (city) => {
    console.log("HERE");
    updateSelectedCity(city);
    updateDisplayingCityOptions(false);

    console.log("Updating Selected City");

    // (searchCityInputRef.current.value = city["name"]) + "," + city["admin1"];
  };

  const handleInputClick = () => {
    if (state.cityOptions.length > 0 && !state.loadingSearch) {
      updateDisplayingCityOptions(true);
    }
  };

  return (
    <>
      <div className={classes.searchCityContainer}>
        <label htmlFor="searchCity" class="visually-hidden">
          Search for a place...
        </label>
        <div className={classes.dropdownWrapper}>
          <form onSubmit={submitSearch} className={classes.formWrapper}>
            <input ref={searchCityInputRef} onChange={handleInputClick} onClick={handleInputClick} className={classes.searchCityInput} id="searchCity" type="text" placeholder="Search for a place..." />
            <button type="submit" className={classes.searchCityButton} onClick={submitSearch}>
              Search
            </button>
          </form>

          {(state.displayingCityOptions && state.cityOptions.length > 0) || state.loadingSearch ? (
            <div className={classes.dropdownContainer}>
              {state.loadingSearch ? (
                <div className={classes.searchResultCity}>
                  <img className={classes.loadingIcon} src={LoadingIcon}></img>Loading…
                </div>
              ) : state.cityOptions.length > 0 ? (
                state.cityOptions.map((city) => (
                  <p className={classes.searchResultCity} key={city.id} onClick={() => selectCity(city)}>
                    {city.name}, {city.admin1}
                  </p>
                ))
              ) : (
                <></>
              )}
            </div>
          ) : null}
          {state.displayingCityOptions && !state.loadingSearch && state.cityOptions.length == 0 ? <p className={classes.noResultsFound}>No search result found!</p> : <></>}
        </div>
      </div>
    </>
  );
};

export default SearchCity;
