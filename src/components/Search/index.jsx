import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
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

  const [estaChovendo, setEstaChovendo] = useState(0);
  const [estaNublado, setEstaNublado] = useState(0);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6e7169fc97f97c75ccd396e1ec444ca0`,
            )
            .then((response) => {
              setEstaNublado(response.data.clouds.all);
              setEstaChovendo(response.data.rain?.["1h"]);
            })
            .catch((error) => {
              console.error("Erro ao obter localização:", error.message);
            });
        },
        (error) => {
          console.error("Erro ao obter localização:", error.message);
        },
      );
    } else {
      console.error("Geolocalização não é suportada neste navegador");
    }
  }, []);
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
        `https://api.openweathermap.org/data/2.5/weather?q=${valorCorrente}&appid=6e7169fc97f97c75ccd396e1ec444ca0&units=metric`,
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

  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const now = new Date();
    const currentHours = now.getHours();
    ~setIsDaytime(currentHours >= 6 && currentHours < 18);
  }, []);
  const [currentPos, setCurrentPos] = useState(0);
  const [cloudPosition, setCloudPosition] = useState(0);
  const [colors, setColors] = useState(0);
  const [windPosition, setWindPosition] = useState(0);
  const [maisPosition, setMaisPosition] = useState(0);
  const [fimdou, setFimdou] = useState(true);
  const [fimdou01, setFimdou01] = useState(true);
  const [index, setIndex] = useState(true);

  const getRandomPosition = useCallback(() => {
    if (fimdou) {
      let positionTop = Math.floor(Math.random() * -20) + 20;
      let positionLeft = Math.floor(Math.random() * 500);

      return { top: positionTop, left: positionLeft };
    } else {
      return Math.floor(Math.random() * -20) + 20;
    }
  }, [fimdou]);
  const getColors = useCallback(() => {
    let shadesOfGray;
    if (estaNublado > 81) {
      shadesOfGray = [
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
      ];
    } else {
      shadesOfGray = [
        "#ffffff",
        "#ffffff",
        "#f0f0f0",
        "#e0e0e0",
        "#d0d0d0",
        "#c0c0c0",
        "#b0b0b0",
        "#a0a0a0",
      ];
    }
    if (fimdou) {
      const randomIndex = Math.floor(Math.random() * shadesOfGray.length);
      return shadesOfGray[randomIndex];
    } else {
      // Retorna uma cor padrão quando fimdou não for verdadeiro
      return Math.floor(Math.random() * shadesOfGray.length);
    }
  }, [fimdou, estaNublado]);

  useEffect(() => {
    function restartAnimation() {
      setCloudPosition(getRandomPosition());
      setColors(getColors());
      setFimdou(true);
    }

    const elementKey = document.querySelector(".cloud");

    if (elementKey) {
      elementKey.addEventListener("animationiteration", restartAnimation);

      return () => {
        setFimdou(false);
        elementKey.removeEventListener("animationiteration", restartAnimation);
      };
    }
  }, [getRandomPosition, fimdou, getColors]);

  const getWindPosition = useCallback(() => {
    return Math.floor(Math.random() * 3500) - 2000;
  }, []);

  useEffect(() => {
    function restartWind() {
      setWindPosition(getWindPosition());
    }

    const elementKeyWind = document.querySelector(".div_filho");

    if (elementKeyWind) {
      elementKeyWind.addEventListener("animationiteration", restartWind);

      return () => {
        elementKeyWind.removeEventListener("animationiteration", restartWind);
      };
    }
  }, [getWindPosition]);

  const getColors01 = useCallback(() => {
    let shadesOfGray;
    if (estaNublado > 81) {
      shadesOfGray = [
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
        "#808080",
      ];
    } else {
      shadesOfGray = [
        "#ffffff",
        "#ffffff",
        "#f0f0f0",
        "#e0e0e0",
        "#d0d0d0",
        "#c0c0c0",
        "#b0b0b0",
        "#a0a0a0",
      ];
    }

    if (fimdou01) {
      const randomIndex = Math.floor(Math.random() * shadesOfGray.length);
      return shadesOfGray[randomIndex];
    } else {
      // Retorna uma cor padrão quando fimdou não for verdadeiro
      return Math.floor(Math.random() * shadesOfGray.length);
    }
  }, [fimdou01, estaNublado]);

  const getPositionMais = useCallback(() => {
    if (fimdou01) {
      let posTop = Math.floor(Math.random() * -150) + 150;
      let posLeft = Math.floor(Math.random() * 600);
      let windTop = Math.floor(Math.random() * 10);
      let camada = Math.floor(Math.random() * 2);
      return { top: posTop, left: posLeft, windTop: windTop, camadaZ: camada };
    } else {
      return {};
    }
  }, [fimdou01]);

  useEffect(() => {
    function restartAnimationMais() {
      setMaisPosition(getPositionMais);
      setFimdou01(true);

      setColors(getColors01());
      setCurrentPos(Math.floor(Math.random() * 3));
    }

    const elementKeyMais = document.querySelector(".div_clouds_mais");

    if (elementKeyMais) {
      elementKeyMais.addEventListener(
        "animationiteration",
        restartAnimationMais,
      );

      return () => {
        setFimdou01(false);
        elementKeyMais.removeEventListener(
          "animationiteration",
          restartAnimationMais,
        );
      };
    }
  }, [getPositionMais, fimdou01, getColors01]);

  const [cached, setCached] = useState(null);
  const [stars, setStars] = useState([]);
  useEffect(() => {
    if (cached === null) {
      const newStars = [];
      for (let i = 0; i < 10; i++) {
        const starsTop = Math.floor(Math.random() * 30);
        const starsLeft = Math.floor(Math.random() * 100);
        const animationDuration = `${Math.floor(Math.random() * 15) + 1}s`;
        newStars.push({ starsTop, starsLeft, animationDuration });
      }
      setCached(0);
      setStars(newStars);
    }
  }, [cached]);
  const cloudsWind = () => {
    if (estaChovendo > 0) {
      const divWind = [];

      for (let i = 0; i < 3; i++) {
        divWind.push(
          <div
            key={i}
            style={{
              top: `${getRandomPosition()}%`,
              left: `${getWindPosition()}%`,
            }}
            className="div_filho"
          ></div>,
        );
      }
      return divWind;
    } else {
      const divWind = [];

      for (let i = 0; i < 20; i++) {
        divWind.push(
          <div
            key={i}
            style={{
              top: `${getRandomPosition()}%`,
              left: `${getWindPosition()}%`,
            }}
            className="div_filho"
          ></div>,
        );
      }
      return divWind;
    }
  };

  const wind = () => {
    const chuva = [];

    for (let i = 0; i < currentPos; i++) {
      let positions = getPositionMais();
      let top = positions.windTop;
      let left = positions.left;
      chuva.push(
        <div
          key={i}
          style={{
            top: `${top}vh`,
            left: `${left}vw`,
          }}
          className="div_avo"
        >
          <div className="div_pai"></div>
          <div>{cloudsWind()}</div>
        </div>,
      );
    }

    return chuva;
  };

  const clouds = () => {
    if (estaChovendo > 0) {
      const chuva = [];

      for (let i = 0; i < 30; i++) {
        let positions = getPositionMais();
        let top = positions.windTop;
        let left = positions.left;
        let camadasZ = positions.camadaZ;
        chuva.push(
          <div
            key={i}
            style={{
              top: `${top}vh`,
              left: `${left}vw`,
              zIndex: `${camadasZ}`,
              position: "absolute",
            }}
            className="div_avo"
          >
            <div className="div_pai"></div>
            <div>{cloudsWind()}</div>
          </div>,
        );
      }

      return chuva;
    } else if (estaChovendo === 0) {
      const divClouds = [];
      for (let i = 0; i < 50; i++) {
        let positions = getRandomPosition();
        let colors = getColors();
        let top = positions.top;
        let left = positions.left;

        divClouds.push(
          <div
            key={i}
            style={{
              backgroundColor: colors,
              top: `${top}vh`,
              left: `${left}vw`,
            }}
            className="cloud"
          ></div>,
        );
      }
      return divClouds;
    }
  };

  const cloudsMais = () => {
    if (estaChovendo > 0) {
      const chuva = [];

      for (let i = 0; i < 30; i++) {
        let positions = getPositionMais();
        let top = positions.windTop;
        let left = positions.left;
        let camadasZ = positions.camadaZ;
        chuva.push(
          <div
            key={i}
            style={{
              top: `${top}vh`,
              left: `${left}vw`,
              zIndex: `${camadasZ}`,
              position: "absolute",
            }}
            className="div_avo"
          >
            <div className="div_pai"></div>
            <div>{cloudsWind()}</div>
          </div>,
        );
      }
      return chuva;
    } else if (estaChovendo === 0) {
      const divClouds = [];
      for (let i = 0; i < 30; i++) {
        let colors = getColors01();
        let positions = getPositionMais();
        let camadasZ = positions.camadaZ;
        let top = positions.top;
        let left = positions.left;
        divClouds.push(
          <div
            key={i}
            style={{
              backgroundColor: colors,
              top: `${top}px`,
              left: `${left}px`,
              zIndex: `${camadasZ}`,
              position: "absolute",
            }}
            className="div_clouds_mais"
          ></div>,
        );
      }
      return divClouds;
    }
  };
  const shineStars = () => {
    if (estaChovendo > 0) {
      return null;
    } else {
      let value;
      if (estaNublado > 80) {
        value = 20;
      } else {
        value = 100;
      }
      return (
        stars.length > 0 &&
        stars.map((position, index) => {
          return (
            <div
              key={index}
              style={{
                top: `${position.starsTop}vh`,
                left: `${position.starsLeft}vw`,
                opacity: `${value}%`,
                animation: `shineStars ${position.animationDuration} infinite alternate`,
              }}
              className="stars"
            ></div>
          );
        })
      );
    }
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
        <CSSTransition
          in={verifClicked}
          timeout={500}
          classNames="modal"
          unmountOnExit
        >
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
        </CSSTransition>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchInput(e);
          }}
        >
          <input
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setInputValue("");
            }}
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

        {/* <div className={`alert_fuso ${searched ? "searched" : ""}`}></div> */}

        <div
          style={{
            display: searched ? `none` : "flex",
            background:
              estaChovendo > 0
                ? "linear-gradient(to bottom, rgba(128, 128, 128, 0.6), rgba(128, 128, 128, 0.4) 50%, rgba(128, 128, 128, 0.24) 75%, transparent 100%)"
                : estaNublado > 80
                  ? "linear-gradient(to bottom, rgba(169, 169, 169, 0.6), rgba(169, 169, 169, 0.4) 50%, rgba(169, 169, 169, 0.24) 75%, transparent 100%)"
                  : "",
          }}
          className={`animation' ${isDaytime ? "manha" : "noite"}`}
        >
          {isDaytime ? (
            <div>
              <div className={`sun ${estaChovendo > 0 ? "chuva" : ""}`}></div>
            </div>
          ) : (
            <div>
              <div className={`moon ${estaChovendo > 0 ? "chuva" : ""}`}></div>
              {shineStars()}
            </div>
          )}
          {cloudsMais()}
          {clouds()}
          {wind()}
        </div>
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
