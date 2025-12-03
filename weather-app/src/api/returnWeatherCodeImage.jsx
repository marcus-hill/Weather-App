import IconDrizzle from "../assets/images/icon-drizzle.webp";
import IconFog from "../assets/images/icon-fog.webp";
import IconOvercast from "../assets/images/icon-overcast.webp";
import IconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import IconRain from "../assets/images/icon-rain.webp";
import IconSnow from "../assets/images/icon-snow.webp";
import IconSunny from "../assets/images/icon-sunny.webp";
import IconStorm from "../assets/images/icon-storm.webp";

const weatherMap = {
  IconSunny: [0],
  IconPartlyCloudy: [1, 2],
  IconOvercast: [3],
  IconFog: [45, 48],
  IconRain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  IconSnow: [71, 73, 75, 77, 85, 86],
  IconStorm: [95, 96, 99],
};

const icons = {
  IconSunny: IconSunny,
  IconPartlyCloudy: IconPartlyCloudy,
  IconOvercast: IconOvercast,
  IconFog: IconFog,
  IconRain: IconRain,
  IconSnow: IconSnow,
  IconStorm: IconStorm,
};

const ReturnWeatherCodeImage = ({ code }) => {
  console.log("HERE: " + code);
  for (const category in weatherMap) {
    if (weatherMap[category].includes(code)) {
      console.log("CATEGORY:");
      console.log(icons[category]);
      const icon = icons[category];
      return icons[category];
    }
  }
};

export default ReturnWeatherCodeImage;
