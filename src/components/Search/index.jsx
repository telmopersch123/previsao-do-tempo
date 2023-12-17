import React, { useState } from "react";
import axios from "axios";

import WeahterIcon from "../WeatherIcon";
import Button from "../Button";
import Timeline from "../Timeline";
import DetailsWeather from "../DetailsWeather";
import Forecast from "../forecast";
import Graphic from "../Graphic";
import Alert from "../Alert";
import regiao from "../../icones/paises.png";
function Search({ props }) {
  const [verifClicked, setVerifiClicked] = useState(false);
  const [verifValue, setVerifValue] = useState(null);

  const [searched, setSearched] = useState(false);
  const [Celsius, setIsCelsius] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [timeUpdate1, setTimeUpdate1] = useState(null);
  const [backgroundClass, setBackGroundClass] = useState("");
  const [cloudsData, setCloudsData] = useState(null);
  const [rainData, setRainData] = useState(null);
  const [snowData, setSnowData] = useState(null);
  const [unixSunrise, setUnixSunrise] = useState(null);
  const [unixSunset, setUnixSunset] = useState(null);
  const [convertedDateTime, setConvertedDateTime] = useState(null);
  const [currentTimeUpdate, setCurrentTimeUpdate] = useState(null);
  const [valorCorrente, setValorCorrente] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [dailyData, setDailyData] = useState([]);
  const [daily, setDaily] = useState([]);
  const [newMomentDay, setNewMomentDay] = useState([]);
  const [capitalizedValue, setCapitalizedValue] = useState("");
  const idDoComponente = "forecast";
  const idDoComponente0 = "wind";
  const apiKey = "H6TZ60LH2XNH";

  const handleVerifValueChange = () => {
    setVerifValue(false);
  };
  const handleVerifChangeFromForecast = (verifValue) => {
    setVerifValue(verifValue);
  };

  const handleTemperatureConversion = (newTemperature, newCelsius) => {
    setTemperature(newTemperature);
    setIsCelsius(newCelsius);
  };

  const handleDailyDataChange = (newDailyData, newMoment_day, newDaily) => {
    setDailyData(newDailyData);
    setNewMomentDay(newMoment_day);
    setDaily(newDaily);
  };

  const [inputValue, setInputValue] = useState("");
  function changePlaceholderColor(isHovered) {
    const input = document.querySelector(".inputCidade");
    input.style.color = isHovered;
  }

  const searchInput = (e) => {
    const valorCorrente = document.querySelector(".inputCidade").value;
    const inputValueMinusc = valorCorrente.toLowerCase();
    const capitalizedString =
      inputValueMinusc.charAt(0).toUpperCase() + inputValueMinusc.slice(1);

    e.preventDefault();

    setValorCorrente(valorCorrente);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${valorCorrente}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`,
      )
      .then((Responsed) => {
        const { sys } = Responsed.data;
        if (sys.country !== undefined) {
          const { lon, lat } = Responsed.data.coord;
          setLat(lat);
          setLon(lon);
          axios
            .get(
              `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`,
            )
            .then((response) => {
              if (Responsed.data.sys.country !== undefined) {
                const weatherData = Responsed.data;
                const cloudsData = weatherData.clouds;
                const rainData = weatherData.rain;
                const snowData = weatherData.snow;
                const { formatted } = response.data;
                const unixSunriseValue = weatherData.sys.sunrise;
                const unixSunsetValue = weatherData.sys.sunset;
                const convertedDateTimeValue = new Date().getTime() / 1000;
                setCapitalizedValue(capitalizedString);
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

                setSearched(true);
                setInputValue("");
              } // Clear the input value after the search
            });
        } else {
          alert("Valor inserido é um continente ou um nome inválido");
        }
      })
      .catch((error) => {
        alert(
          "Ops, Algo deu errado! Atualize a Página Por Favor!",
          error.message,
        );
      });
  };

  const hlandeVerifiOpen = () => {
    setVerifiClicked(true);
  };
  const hlandeVerifiClose = () => {
    setVerifiClicked(false);
  };

  return (
    <div className={`searchWr ${searched ? "searched" : ""}`}>
      <div className={`Search ${searched ? "searched" : ""}`}>
        <h2
          onClick={() => {
            hlandeVerifiOpen();
          }}
          className={`title_master ${searched ? "searched" : ""}`}
        >
          {searched
            ? `Previsões para ${capitalizedValue}`
            : "Escreva abaixo o nome da Cidade!"}
        </h2>
        {verifClicked && (
          <div className="overlay" onClick={hlandeVerifiClose}></div>
        )}
        {verifClicked && (
          <div className="modal_regiao">
            <span className="close_regiao" onClick={hlandeVerifiClose}>
              &times;
            </span>
            <p className="title_regiao">Região Pesquisada</p>
            <img className="foto_regiao" src={regiao} alt="regiao?" />
            <p className="text_regiao">
              Todas as regiões pesquisadas, tanto cidades quanto estados ou
              paises podem possuir também cidades, estados ou paises diferentes
              com o mesmo nome em diferentes locais! Utilize o mapa para se
              localizar, e caso não achou a sua cidade, perdoa-nos, a API que
              foi utilizada é um serviço gratuito, graças a isso existe
              limitações, então caso não achou, tente usar cidades mais proxima
              da sua, ou o site da{" "}
              <a
                href="https://openweathermap.org"
                rel="noreferrer"
                target="_blank"
              >
                OpenWeaterMaps
              </a>
            </p>
          </div>
        )}
        <form onSubmit={(e) => searchInput(e)}>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setInputValue("")}
            placeholder={
              searched ? `Pesquisar por mais!` : "Digite o nome da cidade aqui!"
            }
            className={`inputCidade ${searched ? "searched" : ""}`}
            name="searchInp"
            type="text"
            value={inputValue}
            autoComplete="off"
            onMouseOver={() => changePlaceholderColor(true)}
            onMouseOut={() => changePlaceholderColor(false)}
          />
          <input
            className="input_Pesquisar"
            type="submit"
            value="Pesquisar por cidade!"
            style={{ display: searched ? `none` : "flex" }}
          />
        </form>
        <div className={`alert_fuso ${searched ? "searched" : ""}`}></div>
      </div>

      {weatherData ? (
        <div className="objects">
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

          <Alert idProp={idDoComponente} daily={daily} />

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
            weatherData={weatherData}
            feels_like={weatherData.main.feels_like}
            temp_max={weatherData.main.temp_max}
            temp_min={weatherData.main.temp_min}
            wind={weatherData.wind.speed}
            gust={weatherData.wind.gust}
            directionWind={weatherData.wind.deg}
          />
          <Forecast
            idWind={idDoComponente0}
            idProp={idDoComponente}
            valorCorrente={valorCorrente}
            lat={lat}
            lon={lon}
            Celsius={Celsius}
            dailyData={dailyData}
            daily={daily}
            newMomentDay={newMomentDay}
            onDailyDataChange={handleDailyDataChange}
            onNewMomentDayChange={(newMomentDay) =>
              setNewMomentDay(newMomentDay)
            }
            onDaily={(newDaily) => setDaily(newDaily)}
            onVerifChange={handleVerifChangeFromForecast}
          />
          <Graphic
            idWind={idDoComponente0}
            dailyData={dailyData}
            newMomentDay={newMomentDay}
            Celsius={Celsius}
            verifValue={verifValue}
            onVerifValueChange={handleVerifValueChange}
          />
        </div>
      ) : (
        <>
          <div></div>
        </>
      )}
    </div>
  );
}
export default Search;
