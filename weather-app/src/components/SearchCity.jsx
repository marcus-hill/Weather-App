import { useAppContext } from "../context/AppContext";
import classes from "./SearchCity.module.css";
import { useRef } from "react";

const SearchCity = () => {
  const { state, loadCityOptions, updateSelectedCity } = useAppContext();

  const searchCityInputRef = useRef(null);

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchCityInputRef.current.value) {
      loadCityOptions(searchCityInputRef.current.value);
    }
  };

  const selectCity = (id) => {
    console.log(id + " selected");
    updateSelectedCity(id);
  };

  return (
    <>
      <div className={classes.searchCityContainer}>
        <label htmlFor="searchCity" class="visually-hidden">
          Search for a place...
        </label>
        <div className={classes.dropdownWrapper}>
          <form onSubmit={submitSearch}>
            <input ref={searchCityInputRef} className={classes.searchCityInput} id="searchCity" type="text" placeholder="Search for a place..." />
            <button type="submit" className={classes.searchCityButton} onClick={submitSearch}>
              Search
            </button>
          </form>

          {state.displayingCityOptions ? (
            state.cityOptions.length > 0 ? (
              <div className={classes.dropdownContainer}>
                {state.cityOptions.map((city) => (
                  <p className={classes.searchResultCity} key={city.id} onClick={() => selectCity(city.id)}>
                    {city.name}, {city.admin1}
                  </p>
                ))}
              </div>
            ) : (
              <p className={classes.noResultsFound}>No search result found!</p>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchCity;
