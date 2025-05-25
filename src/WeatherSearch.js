import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherSearch(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [isWeatherReady, setIsWeatherReady] = useState(false);
  const [weather, setWeather] = useState({});

  function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) hours = `0${hours}`;
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = `0${minutes}`;
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function displayWeather(response) {
    setIsWeatherReady(true);
    setWeather({
      city: response.data.name, // ✅ Add this line
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }
}
function handleSubmit(event) {
  event.preventDefault();
  search();
}

useEffect(() => {
  function search() {
    let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  search();
}, []);

function updateCity(event) {
  setCity(event.target.value);
}

let form = (
  <form onSubmit={handleSubmit} className="search-form" id="search-form">
    <input
      type="search"
      placeholder="Enter a city"
      required
      className="search-form-input"
      onChange={updateCity}
    />
    <input type="submit" value="Search" className="search-form-button" />
  </form>
);

if (isWeatherReady) {
  return (
    <div className="weather-app-data">
      <h1>{weather.city}</h1>
      <div className="weather-app-date">{formatDate(weather.date)}</div>
      <div className="weather-app-temperature">
        <div className="weather-app-value">
          {Math.round(weather.temperature)}
        </div>
        <div className="weather-app-unit">°C</div>
      </div>
      {form}
      <ul>
        <li>Temperature: {Math.round(weather.temperature)}°C</li>
        <li>Description: {weather.description}</li>
        <li>Humidity: {weather.humidity}%</li>
        <li>Wind: {Math.round(weather.wind)}km/h</li>
        <li>Feels like: {Math.round(weather.feels_like)}°C</li>
        <li>
          <img src={weather.icon} alt={weather.description} />
        </li>
      </ul>
    </div>
  );
} else {
  return form;
}
