import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import WeahterIcon from "../WeatherIcon";
import Button from "../Button";
import Timeline from "../Timeline";
import DetailsWeather from "../DetailsWeather";
import Forecast from "../Forecast";
import Graphic from "../Graphic";
import Alert from "../Alert";
import Flag from "../Flag";
import regiao from "../../icones/paises.png";
import Imagens from "../Imagens";

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
  const [searchResults, setSearchResults] = useState([]);
  const [estaChovendo, setEstaChovendo] = useState(0);
  const [estaNublado, setEstaNublado] = useState(0);
  const [resultado, setResultado] = useState([]);
  const [existing, setExisting] = useState([]);
  const [verifing, setVerifing] = useState(false);
  const [stringBack, setStringBack] = useState("");

  useEffect(() => {
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

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
              setEstaNublado(response.data.clouds?.all ?? 0);
              setEstaChovendo(response.data.rain?.["1h"] ?? 0);
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
  }, [estaChovendo, estaNublado]);
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

  const handleImagenControl = (newImagen) => {
    setStringBack(newImagen);
  };

  const [inputValue, setInputValue] = useState("");
  function changePlaceholderColor(isHovered) {
    const input = document.querySelector(".inputCidade");
    input.style.color = isHovered;
  }

  const debouncedSearch = useRef(
    debounce((value) => {
      if (!inputValue.trim()) {
        setSearchResults([]);
      }
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=6e7169fc97f97c75ccd396e1ec444ca0`,
        )
        .then((response) => {
          const locations = response.data;
          setExisting(response.data);

          const filteredLocations = locations.reduce((acc, location) => {
            if (!acc[location.state]) {
              acc[location.state] = location;
            }
            return acc;
          }, {});

          const filteredResults = Object.values(filteredLocations);
          setSearchResults(filteredResults);
        })
        .catch((error) => {
          console.error("Erro ao buscar localização:", error.message);
        });
    }, 300),
  ).current;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const value = e.target.value;
    debouncedSearch(value);
    setValorCorrente(value);
    debouncedSearch(value);
    // Other logic related to input change if needed
  };
  let verificando = false;
  const handleResultClick = async (e, location) => {
    if (location && location.lat !== undefined && location.lon !== undefined) {
      verificando = true;
      setVerifing(true);
      setResultado(location);
      searchInput(e, location);
      setSearchResults([]);
    } else {
      console.error("localização indefinida");
    }
  };

  const handleInputBlur = () => {
    // Quando o foco é perdido, se o valor do input for vazio, limpe os resultados
    if (!inputValue.trim()) {
      setSearchResults([]);
    }
  };

  let apiUrl;
  const [erro, setErro] = useState(false);
  const handleError = (mensagem) => (
    <>
      <div className="casca-error" onClick={() => setErro(false)}></div>
      <div className="alert_error">
        <div className="title_error">
          <span className="closebtn" onClick={() => setErro(false)}>
            &times;
          </span>
          <svg
            className="svg_error"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1m-1 13h2V6.5h-2zm2.004 1.5H11v2.004h2.004z"
            ></path>
          </svg>
          <p className="algo_ops">Ops, algo deu errado!</p>
        </div>
        <p className="parag_error">{mensagem}</p>
      </div>
    </>
  );

  const Strong = ({ children }) => {
    return <strong>{children}</strong>;
  };
  const searchInput = (e, location) => {
    const valorCorrente = document.querySelector(".inputCidade").value;
    const inputValueMinusc = valorCorrente.toLowerCase();
    const capitalizedString =
      inputValueMinusc.charAt(0).toUpperCase() + inputValueMinusc.slice(1);
    e.preventDefault();

    if (verificando === false) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${valorCorrente}&appid=6e7169fc97f97c75ccd396e1ec444ca0&units=metric`;
    } else if (verificando === true) {
      const lat = location.lat;
      const lon = location.lon;
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6e7169fc97f97c75ccd396e1ec444ca0&units=metric`;
    }

    axios
      .get(apiUrl)
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
                window.history.replaceState(
                  {},
                  document.title,
                  window.location.pathname,
                );
                setSearchResults([]);
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
                if (verificando === false) {
                  setVerifing(false);
                }
                verificando = false;
              }
            });
        } else {
          setErro(
            handleError("Valor inserido é um continente ou um nome inválido!"),
          );
        }
      })
      .catch((error) => {
        setErro(
          handleError(
            <span>
              Possivelmente o lugar digitado não existe, talvez o resultado
              esteja na barra de pesquisa, verifique-a ou &nbsp;
              <Strong>(Atualize a Página Por Favor!)</Strong>
            </span>,
          ),
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
    if (estaNublado > 80) {
      return "#808080"; // Retorna a cor fixa para nuvens quando está nublado
    }

    let shadesOfGray = [
      "#ffffff",
      "#f0f0f0",
      "#e0e0e0",
      "#d0d0d0",
      "#c0c0c0",
      "#b0b0b0",
      "#a0a0a0",
    ];
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
      setCurrentPos(Math.floor(Math.random() * 4));
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
    if (estaNublado > 80) {
      return "#808080";
    }

    let shadesOfGray = [
      "#ffffff",
      "#f0f0f0",
      "#e0e0e0",
      "#d0d0d0",
      "#c0c0c0",
      "#b0b0b0",
      "#a0a0a0",
    ];

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
    if (estaChovendo >= 0.5) {
      const divWind = [];

      for (let i = 0; i < 10; i++) {
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
    } else if (estaChovendo < 0.5) {
      const divWind = [];

      for (let i = 0; i < 15; i++) {
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
      let positions = getRandomPosition();
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
    if (estaChovendo >= 0.5) {
      const chuva = [];

      for (let i = 0; i < 50; i++) {
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
    } else if (estaChovendo < 0.5) {
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
    if (estaChovendo > 0.5) {
      <div></div>;
    } else if (estaChovendo <= 0.5) {
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
    if (estaChovendo > 0.5) {
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
        {erro}

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
            <div>
              <img className="foto_regiao" src={regiao} alt="regiao?" />
            </div>

            <p className="text_regiao">
              Todas as regiões pesquisadas, tanto cidades quanto estados ou
              Países podem possuir também cidades, estados ou países diferentes
              com o mesmo nome em diferentes locais! Utilize o mapa para se
              localizar, e caso não achou a sua cidade, perdoa-nos, a API que
              foi utilizada é um serviço gratuito, graças a isso existe
              limitações, então caso não achou, tente usar cidades mais próximas
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
          className={`formulario ${searched ? "searched" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            if (searched === true) {
              searchInput(e);
            }
          }}
        >
          <h2
            onClick={searched ? hlandeVerifiOpen : () => {}}
            className={`title_master ${searched ? "searched" : ""}`}
          >
            {searched
              ? `Previsões para ${
                  verifing === false ? capitalizedValue : resultado.name
                }`
              : "Escreva abaixo o nome da Cidade!"}
            <p
              className="era_essa"
              style={{ display: searched ? "block" : "none" }}
            >
              era essa a região que você queria?
            </p>
          </h2>
          <input
            onChange={handleInputChange}
            onBlur={handleInputBlur}
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
          {searchResults.length > 0 ? (
            <div className="rodape_input">
              <div className="rodape_input_den">
                {searchResults.map((location, index) => (
                  <div
                    onClick={async (e) => await handleResultClick(e, location)}
                    className="cidades_pesq"
                    key={index}
                  >
                    <p>{location.name}</p> |{" "}
                    <div className="bandeiras_rodape">
                      {<Flag sysFlag={location.country} />}
                    </div>
                    <p>{location.state}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : inputValue !== "" && existing.length === 0 ? (
            <div className="rodape_input">
              <div className="rodape_input_den rodape_found">
                <svg
                  className="svg_not_found"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="50px"
                  viewBox="0 0 40 40"
                >
                  <path
                    fill="currentColor"
                    d="M20.001 2.683C10.452 2.683 2.684 10.451 2.684 20s7.769 17.317 17.317 17.317S37.316 29.548 37.316 20S29.549 2.683 20.001 2.683m0 33.134c-8.722 0-15.817-7.096-15.817-15.817S11.279 4.183 20.001 4.183c8.721 0 15.815 7.096 15.815 15.817s-7.094 15.817-15.815 15.817"
                  ></path>
                  <circle
                    cx="15.431"
                    cy="16.424"
                    r="1.044"
                    fill="currentColor"
                  ></circle>
                  <circle
                    cx="24.569"
                    cy="16.424"
                    r="1.044"
                    fill="currentColor"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M24.828 25.312h-9.656a.75.75 0 0 0 0 1.5h9.656a.75.75 0 0 0 0-1.5"
                  ></path>
                </svg>
                <p className="p_found">Cidade não encontrada!</p>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <button
            className="input_Pesquisar"
            type="button" // Defina o tipo como 'button' para evitar a submissão automática
            onClick={(e) => {
              e.preventDefault();
              searchInput(e);
            }}
            style={{
              display: searched ? "none" : "flex",
            }}
          >
            Pesquisar por cidade!
          </button>
        </form>

        {/* <div className={`alert_fuso ${searched ? "searched" : ""}`}></div> */}

        <div
          style={{
            display: searched ? `none` : "flex",
            background:
              estaChovendo >= 0.5
                ? "linear-gradient(to bottom, rgba(128, 128, 128, 0.6), rgba(128, 128, 128, 0.4) 50%, rgba(128, 128, 128, 0.24) 75%, transparent 100%)"
                : estaNublado > 80
                ? "linear-gradient(to bottom, rgba(169, 169, 169, 0.6), rgba(169, 169, 169, 0.4) 50%, rgba(169, 169, 169, 0.24) 75%, transparent 100%)"
                : "",
          }}
          className={`animation' ${isDaytime ? "manha" : "noite"}`}
        >
          {isDaytime ? (
            <div>
              <div className={`sun ${estaChovendo > 0.5 ? "chuva" : ""}`}></div>
            </div>
          ) : (
            <div>
              <div
                className={`moon ${estaChovendo > 0.5 ? "chuva" : ""}`}
              ></div>
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
          <Imagens stringBack={stringBack} />
          <div className="align-items">
            <div className="prox_div">
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
                handleImagenControl={handleImagenControl}
              />
            </div>
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
