import "./App.css";
import WeatherSearch from "./WeatherSearch";

function App() {
  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <WeatherSearch defaultCity="New York" />
      <footer>
        This project was coded by
        <a href="https://github.com/Jalayana" target="_blank" rel="noreferrer">
          Jalayana Miller
        </a>
        , is open-sourced on
        <a
          href="https://github.com/Jalayana/new-weather-app"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        and hosted on Netlify
      </footer>
    </div>
  );
}
export default App;
