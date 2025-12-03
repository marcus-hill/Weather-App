import axios from "axios";

// const API = "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json"
const API = "https://api.open-meteo.com/v1/forecast";

const RetrieveWeather = ({ city, metric }) => {
  return axios.get(API, {
    params: {
      latitude: city["latitude"],
      longitude: city["longitude"],
      hourly: "temperature_2m,weather_code",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      current: "apparent_temperature,temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m",
      temperature_unit: metric ? "celsius" : "fahrenheit",
      wind_speed_unit: metric ? "kmh" : "mph",
      precipitation_unit: metric ? "mm" : "inch",
      forecast_days: 7,
    },
  });
};

export default RetrieveWeather;
