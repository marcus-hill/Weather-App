import axios from "axios";

// const API = "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json"
const API = "https://ipapi.co/json/";

const RetrieveIpDetails = () => {
  return axios.get(API);
};

export default RetrieveIpDetails;
