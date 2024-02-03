import { useState } from "react";
import "./App.css";
import "./styles.css";

function App() {
  const url = "https://api.weatherapi.com/v1/current.json";
  const key = "be34fa65cb6c4b3b9e7153223232510";
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (e) => setValue(e.target.value);
  const handleClick = async () => {
    try {
      const response = await fetch(`${url}?key=${key}&q=${value}&aqi=no`);
      const jsonData = await response.json();
      const { current, location } = jsonData;
      console.log(location);
      const weatherData = [
        { title: "Temperature", value: `${current.temp_c}\u00B0C` },
        { title: "Humidity", value: `${current.humidity}%` },
        {
          title: "Condition",
          value: current.condition ? current.condition.text : "Unknown",
        },
        { title: "Wind Speed", value: `${current.wind_kph} kph` },
      ];
      setData(weatherData);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          value={value}
          placeholder="Enter city name"
          onChange={handleChange}
          className="input"
        ></input>
        <button onClick={handleClick} className="button">
          Search
        </button>
      </div>

      {value !== "" && data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div className="display">
          {data.map((card, index) => (
            <div key={index} className="weather-cardss">
              <h4>{card.title}</h4>
              <div>{card.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
