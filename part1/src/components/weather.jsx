import { useState, useEffect } from "react";
import axios from "axios";

const Weather = (props) => {
  const { city } = props;
  const [Weather, setWeather] = useState([]);

  useEffect(() => {
    const params = {
      access_key: import.meta.env.VITE_WEATHER_API_KEY,
      query: `${city}`,
      units: "m",
    };

    axios.get("http://api.weather.com/current", { params }).then((response) => {
      console.log(response.data.current);
      setWeather(response.data.current);
    });
  }, [city]);

  if (Weather.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Weather in {city}</h2>
      <p>temperature {Weather.temperature} degrees celsius</p>
      <img src={Weather.weather_icons[0]} alt="weather icon" />
      <p>wind {Weather.wind_speed} m/s</p>
    </>
  );
};
export default Weather;
