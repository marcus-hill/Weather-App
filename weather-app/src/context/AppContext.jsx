import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import SearchCityApi from "../api/searchCityApi";
import RetrieveWeather from "../api/retrieveWeather";

const AppContext = createContext();

const initialState = {
  unit: "metric",
  cityOptions: [],
  displayingCityOptions: false,
  selectedCity: 0,
  loadingSearch: false,
  loadingWeather: false,
  displayingWeather: false,
  weather: 0,
};

const dispatchOptions = {
  TOGGLE_UNIT: "TOGGLE_UNIT",
  UPDATE_CITY_OPTIONS: "UPDATE_CITY_OPTIONS",
  DISPLAYING_CITY_OPTIONS: "DISPLAYING_CITY_OPTIONS",
  UPDATE_SELECTED_CITY: "UPDATE_SELECTED_CITY",
  UPDATE_LOADING_SEARCH: "UPDATE_LOADING_SEARCH",
  UPDATE_LOADING_WEATHER: "UPDATE_LOADING_WEATHER",
  UPDATE_DISPLAYING_WEATHER: "UPDATE_DISPLAYING_WEATHER",
};

function reducer(state, action) {
  switch (action.type) {
    case dispatchOptions.TOGGLE_UNIT:
      return { ...state, unit: state.unit === "metric" ? "imperial" : "metric" };
    case dispatchOptions.UPDATE_CITY_OPTIONS:
      return { ...state, cityOptions: action.payload };
    case dispatchOptions.DISPLAYING_CITY_OPTIONS:
      return { ...state, displayingCityOptions: action.payload };
    case dispatchOptions.UPDATE_SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    case dispatchOptions.UPDATE_LOADING_SEARCH:
      return { ...state, loadingSearch: action.payload };
    case dispatchOptions.UPDATE_LOADING_WEATHER:
      return { ...state, loadingWeather: action.payload };
    case dispatchOptions.UPDATE_WEATHER:
      return { ...state, weather: action.payload };
    case dispatchOptions.UPDATE_DISPLAYING_WEATHER:
      return { ...state, displayingWeather: action.payload };
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleUnit = () => {
    dispatch({ type: dispatchOptions.TOGGLE_UNIT });
  };

  const updateSelectedCity = useCallback(
    async (city) => {
      dispatch({ type: dispatchOptions.UPDATE_LOADING_WEATHER, payload: true });

      dispatch({ type: dispatchOptions.UPDATE_SELECTED_CITY, payload: city });

      console.log("Update Selected City - App Context");
      console.log(city);

      const weather = await RetrieveWeather({ city: city, metric: state.unit === "metric" });
      console.log(weather.data);

      dispatch({ type: dispatchOptions.UPDATE_WEATHER, payload: weather.data });

      dispatch({ type: dispatchOptions.UPDATE_LOADING_WEATHER, payload: false });

      dispatch({ type: dispatchOptions.UPDATE_DISPLAYING_WEATHER, payload: true });

      console.log("Loading Weather: " + state.loadingWeather);
      console.log("Displaying Weather: " + state.displayingWeather);
    },
    [state]
  );

  const updateDisplayingCityOptions = (displaying) => {
    dispatch({ type: dispatchOptions.DISPLAYING_CITY_OPTIONS, payload: displaying });
  };

  const updateLoadingSearch = (loading) => {
    dispatch({ type: dispatchOptions.UPDATE_LOADING_SEARCH, payload: loading });
  };

  const updateLoadingWeather = (loading) => {
    dispatch({ type: dispatchOptions.UPDATE_LOADING_WEATHER, payload: loading });
  };

  const loadCityOptions = useCallback(
    async (searchTerm) => {
      dispatch({ type: dispatchOptions.UPDATE_LOADING_SEARCH, payload: true });

      const cityOptions = await SearchCityApi({ query: searchTerm });
      // console.log(cityOptions);
      const cities = cityOptions.data.results ? Object.values(cityOptions.data.results) : [];
      // console.log(cities.length);
      dispatch({ type: dispatchOptions.UPDATE_CITY_OPTIONS, payload: cities });
      dispatch({ type: dispatchOptions.DISPLAYING_CITY_OPTIONS, payload: true });
      dispatch({ type: dispatchOptions.UPDATE_LOADING_SEARCH, payload: false });
    },
    [dispatch]
  );

  const contextValue = useMemo(
    () => ({
      state,
      toggleUnit,
      loadCityOptions,
      updateDisplayingCityOptions,
      updateSelectedCity,
    }),
    [state]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
