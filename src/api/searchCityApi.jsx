import axios from "axios";

// const API = "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json"
const API = "https://geocoding-api.open-meteo.com/v1/search";

const SearchCity = ({ query }) => {
  return axios.get(API, {
    params: {
      name: query,
      count: 5,
    },
  });
};

export default SearchCity;
