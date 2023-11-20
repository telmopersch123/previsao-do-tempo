import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import WeahterIcon from "../WeatherIcon";
import Button from "../Button";
import Timeline from "../Timeline";
import DetailsWeather from "../DetailsWeather";
import Forecast from "../forecast";
import Graphic from "../Graphic";

function Search({ props }) {
  const [Celsius, setIsCelsius] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [timeUpdate1, setTimeUpdate1] = useState(null);
  const [backgroundClass, setBackGroundClass] = useState("");
  const [classes, setClasses] = useState("");
  const [cloudsData, setCloudsData] = useState(null);
  const [rainData, setRainData] = useState(null);
  const [snowData, setSnowData] = useState(null);
  const [unixSunrise, setUnixSunrise] = useState(null);
  const [unixSunset, setUnixSunset] = useState(null);
  const [convertedDateTime, setConvertedDateTime] = useState(null);
  const [currentTimeUpdate, setCurrentTimeUpdate] = useState(null);
  const apiKey = "H6TZ60LH2XNH";
  const [valorCorrente, setValorCorrente] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [dailyData, setDailyData] = useState([]);
  const [newMomentDay, setNewMomentDay] = useState([]);
  const handleTemperatureConversion = (newTemperature, newCelsius) => {
    setTemperature(newTemperature);
    setIsCelsius(newCelsius);
  };

  const handleDailyDataChange = (newDailyData, newMoment_day) => {
    setDailyData(newDailyData);
    setNewMomentDay(newMoment_day);
  };
  const searchInput = (e) => {
    const valorCorrente = document.querySelector(".inputCidade").value;

    e.preventDefault();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${valorCorrente}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;
    const coords = `https://nominatim.openstreetmap.org/search?q=${valorCorrente}&format=json`;
    setValorCorrente(valorCorrente);

    axios
      .all([axios.get(url), axios.get(coords)])
      .then(
        axios.spread((weatherResponse, coordsResponse) => {
          const { sys } = weatherResponse.data;

          if (sys.country !== undefined) {
            const { lat, lon } = coordsResponse.data[0];
            setLat(lat);
            setLon(lon);
            axios
              .get(
                `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`,
              )
              .then((response) => {
                const weatherData = weatherResponse.data;
                const cloudsData = weatherData.clouds;
                const rainData = weatherData.rain;
                const snowData = weatherData.snow;
                const { formatted } = response.data;
                const unixSunriseValue = weatherData.sys.sunrise;
                const unixSunsetValue = weatherData.sys.sunset;
                const convertedDateTimeValue = new Date().getTime() / 1000;

                setTemperature(weatherData.main.temp);
                setTimeUpdate1(formatted);
                setCurrentTimeUpdate(formatted);

                setWeatherData(weatherData);
                setCloudsData(cloudsData);
                setRainData(rainData);
                setSnowData(snowData);

                setUnixSunrise(unixSunriseValue);
                setUnixSunset(unixSunsetValue);
                setConvertedDateTime(convertedDateTimeValue);
              });
          } else {
            alert("Valor inserido é um continente ou um nome inválido");
          }
        }),
      )
      .catch((error) => {
        alert(
          "Ops, Algo deu errado! Atualize a Página Por Favor!",
          error.message,
        );
      });
  };

  return (
    <div className="searchWr">
      <div className="Search">
        <h2 id="titulo-header">Escreva em baixo o nome da Cidade!</h2>
        <form onSubmit={(e) => searchInput(e)}>
          <input
            placeholder="Digite o nome da cidade"
            className="inputCidade"
            name="searchInp"
            type="text"
          />
          <input
            id="inputPesquisar"
            type="submit"
            value="Pesquisar por cidade!"
          />
        </form>
        <p className="alert_fuso">
          Algumas regiões possuem fuso horarios diferentes! Assim como o nascer
          do sol e o por do sol!
        </p>
      </div>
      {weatherData ? (
        <div className={`objects ${backgroundClass}`}>
          <div className="align-items">
            <WeahterIcon
              weather={weatherData.weather[0]}
              timeUpdate1={timeUpdate1}
              setClasses={setBackGroundClass}
              cloudsData={cloudsData}
              rainData={rainData}
              snowData={snowData}
              unixSunrise={unixSunrise}
              unixSunset={unixSunset}
              convertedDateTime={convertedDateTime}
              currentTimeUpdate={currentTimeUpdate}
            />

            <Button
              Celsius={Celsius}
              onTemperatureConversion={handleTemperatureConversion}
            />
          </div>
          <Timeline
            Celsius={Celsius}
            timeUpdate1={timeUpdate1}
            sys={weatherData.sys.country}
            name={weatherData.name}
            weather={weatherData.weather[0].description}
            temp={weatherData.main.temp}
            lat={lat}
            lon={lon}
          />
          <DetailsWeather
            Celsius={Celsius}
            feels_like={weatherData.main.feels_like}
            temp_max={weatherData.main.temp_max}
            temp_min={weatherData.main.temp_min}
            wind={weatherData.wind.speed}
            gust={weatherData.wind.gust}
            directionWind={weatherData.wind.deg}
          />
          <Forecast
            valorCorrente={valorCorrente}
            lat={lat}
            lon={lon}
            Celsius={Celsius}
            dailyData={dailyData}
            newMomentDay={newMomentDay}
            onDailyDataChange={handleDailyDataChange}
            onNewMomentDayChange={(newMomentDay) =>
              setNewMomentDay(newMomentDay)
            }
          />
          <Graphic
            dailyData={dailyData}
            newMomentDay={newMomentDay}
            Celsius={Celsius}
          />
        </div>
      ) : (
        <>
          <div>Pesquise por algo acima...</div>
        </>
      )}
    </div>
  );
}

export default Search;
