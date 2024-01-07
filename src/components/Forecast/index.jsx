import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import moment from "moment";
import { convertorFahrenheit } from "../Conv";
import "./index.css";

import temperAlta from "../../icones/temperatura-alta.png";
import temperBaixa from "../../icones/temperatura-baixa.png";
import iconeManha from "../../icones/sol_manha.gif";
import iconeTarde from "../../icones/sol_tarde.gif";
import iconeLua from "../../icones/lua_noite.gif";
import AlertaChuva from "../AlertaChuva";
import i18n from 'i18next';
import solMaEfeito from "../../icones/sol_manha.gif";
import solTarEfeito from "../../icones/sol_tarde.gif";
import luaEfeito from "../../icones/lua_noite.gif";
import relogioEfeito from "../../icones/espere.gif";
const Forecast = ({
  lat,
  lon,
  Celsius,
  onDailyDataChange,
  onNewMomentDayChange,
  onVerifChange,
  onDaily,
  idProp,
  idWind,
}) => {
  const [daily, setDaily] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [dailyData00, setDailyData] = useState([]);
  const [newMomentDay, setNewMomentDay] = useState([]);
  const [modalVerif, setModalVerif] = useState(false);

  const handleVerifChange = (verifValue) => {
    onVerifChange(verifValue);
  };

  const translateWeatherDescription = (description) => {
    return fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
        description
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        const translatedDescription = data[0][0][0];
        return translatedDescription;
      })
      .catch((error) => {
        console.error('Erro ao traduzir:', error);
        return description; // Retorna a descrição original em caso de erro
      });
  };

  const WeatherDescription = ({ description }) => {
    const [translatedDescription, setTranslatedDescription] = useState(null);

    useEffect(() => {
      // Verifica se a descrição já está traduzida no cache local
      const cachedTranslation = localStorage.getItem(description);

      if (cachedTranslation) {
        setTranslatedDescription(cachedTranslation);
      } else {
        // Se não estiver no cache, realiza a tradução
        fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
            description
          )}`
        )
          .then((response) => response.json())
          .then((data) => {
            const translatedDescription = data[0][0][0];
            setTranslatedDescription(translatedDescription);

            // Armazena a tradução no cache local
            localStorage.setItem(description, translatedDescription);
          })
          .catch((error) => {
            console.error('Erro ao traduzir:', error);
            setTranslatedDescription(description); // Retorna a descrição original em caso de erro
          });
      }
    }, [description]);

    if (translatedDescription === null) {
      // Aguarde até que a tradução esteja concluída
      return null;
    }
    let icone;
    let period;
    if(newMomentDay === "noite"){
      period = "n"
    }else{
      period = "d"
    }
    if (
      description === "thunderstorm with light rain" ||
      description === "thunderstorm with rain" ||
      description === "thunderstorm with heavy rain" ||
      description === "light thunderstorm" ||
      description === "thunderstorm" ||
      description === "heavy thunderstorm" ||
      description === "ragged thunderstorm" ||
      description === "thunderstorm with light drizzle" ||
      description === "thunderstorm with drizzle" ||
      description === "thunderstorm with heavy drizzle"
    ) {
      icone = "https://openweathermap.org/img/wn/11d@2x.png"
    }else if (
    description === "light intensity drizzle" ||
    description === "drizzle" ||
    description === "heavy intensity drizzle" ||
    description === "light intensity drizzle rain" ||
    description === "drizzle rain" ||
    description === "heavy intensity drizzle rain" ||
    description === "shower rain and drizzle" ||
    description === "heavy shower rain and drizzle" ||
    description === "shower drizzle" ||
    description === "light intensity shower rain" ||
    description === "shower rain" ||
    description === "heavy intensity shower rain" ||
    description === "ragged shower rain"
    ) {
      icone = "https://openweathermap.org/img/wn/09d@2x.png"

    } else if (
      description === "mist" ||
      description === "smoke" ||
      description === "haze" ||
      description === "sand/dust whirls" ||
      description === "fog" ||
      description === "sand" ||
      description === "dust" ||
      description === "volcanic ash" ||
      description === "squalls" ||
      description === "tornado"
    ) {
      icone = "https://openweathermap.org/img/wn/50d@2x.png"
    } else if (
      description === "light snow" ||
      description === "snow" ||
      description === "heavy snow" ||
      description === "sleet" ||
      description === "light shower sleet" ||
      description === "shower sleet" ||
      description === "light rain and snow" ||
      description === "rain and snow" ||
      description === "light shower snow" ||
      description === "shower snow" ||
      description === "heavy shower snow" ||
      description === "freezing rain"
    ) {
      icone = "https://openweathermap.org/img/wn/13d@2x.png"
    } else if (  description === "light rain" ||
    description === "moderate rain" ||
    description === "heavy intensity rain" ||
    description === "very heavy rain" ||
    description === "extreme rain"){
      icone = `https://openweathermap.org/img/wn/10${period}@2x.png`
    } else if (description === "clear sky"){
      icone = `https://openweathermap.org/img/wn/01${period}@2x.png`
    } else if(description === "few clouds"){
      icone = `https://openweathermap.org/img/wn/02${period}@2x.png`
    } else if(description === "scattered clouds"){
      icone = "https://openweathermap.org/img/wn/03d@2x.png"
    }else if(description === "broken clouds" || description === "broken clouds" || description === "overcast clouds"){
      icone = "https://openweathermap.org/img/wn/04d@2x.png"
    }

    return (
      <p className="humidade_prev">
        <img
          className="icone_prox"
          src={icone}
          alt="Velocidade do vento"
        />
        {translatedDescription}
      </p>
    );
  };
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=944362047ea30b04b99466aff4f5887e`,
      )
      .then((response) => {
        if (Array.isArray(response.data.list)) {
          const dailyData = response.data.list;
          const daily = response.data.list;
          setDaily(daily);
          setDailyData(response.data.list);
          const filteredForecast = dailyData.reduce((result, item) => {
            const date = moment(item.dt_txt).format("YYYY-MM-DD");
            if (!result[date]) {
              result[date] = {
                date,
                morning: [],
                afternoon: [],
                night: [],
              };
            }
            if (moment(item.dt_txt).format("HH:mm") === "09:00") {
              result[date].morning.push(item);
            } else if (moment(item.dt_txt).format("HH:mm") === "12:00") {
              result[date].afternoon.push(item);
            } else if (moment(item.dt_txt).format("HH:mm") === "21:00") {
              result[date].night.push(item);
            }
            return result;
          }, {});
          const dailyForecastArray = Object.values(filteredForecast);
          const currentTime = moment().format("HH:mm");
          const isDaytime = moment(currentTime, "HH:mm").isBetween(
            moment("07:00", "HH:mm"),
            moment("17:00", "HH:mm"),
            undefined,
            "(]",
          );
          let forecastSlice;

          if (isDaytime === true) {
            forecastSlice = dailyForecastArray.slice(1, 6);
          } else {
            if (isDaytime === false)
              forecastSlice = dailyForecastArray.slice(0, 5);
          }

          setDailyForecast(forecastSlice);
          onDailyDataChange(forecastSlice);
          onNewMomentDayChange(newMomentDay);
          setDailyData(dailyData);
          onDaily(daily);
        } else {
          alert("Ops!, algo deu errado!");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de previsão:", error);
      });
  }, [lat, lon]);
  const textos = ["Manhã", "Tarde", "Noite"];
  const [cliques, setCliques] = useState(0);
  let dados_manha = null;
  let dados_tarde = null;
  let dados_noite = null;
  let fundoManha = null;
  let fundoTarde = null;
  let fundoNoite = null;
  let fundoGroundManha = null;
  let fundoGroundTarde = null;
  let fundoGroundNoite = null;
  const trocarTexto = () => {
    setCliques((cliques + 1) % textos.length);
  };
  useEffect(() => {
    switch (textos[cliques]) {
      case "Manhã":
        setNewMomentDay("manha");
        break;
      case "Tarde":
        setNewMomentDay("tarde");
        break;
      case "Noite":
        setNewMomentDay("noite");
        break;
      default:
        break;
    }
    onNewMomentDayChange(newMomentDay);
  }, [cliques, textos]);

  const mudarFundo = () => {
    switch (textos[cliques]) {
      case "Manhã":
        dados_manha = { display: "flex" };
        dados_tarde = { display: "none" };
        dados_noite = { display: "none" };
        fundoManha = {
          display: "flex",
          backgroundImage:
            "radial-gradient(circle, #ffff7d 0%, #ffffe0 54%, #ffff9f 100%)",
          backgroundSize: "200% 200%",
        };
        fundoGroundManha = {
          background: "#FFD75030",
        };
        return iconeManha;
      case "Tarde":
        dados_manha = { display: "none" };
        dados_tarde = { display: "flex" };
        dados_noite = { display: "none" };
        fundoTarde = {
          display: "flex",
          backgroundImage:
            "radial-gradient(circle, #e89763 0%, #ffae79 54%, #ba6837 100%)",
          backgroundSize: "200% 200%",
        };
        fundoGroundTarde = {
          background: "#FFA50050",
        };
        return iconeTarde;

      case "Noite":
        dados_manha = { display: "none" };
        dados_tarde = { display: "none" };
        dados_noite = { display: "flex" };
        fundoNoite = {
          display: "flex",
          backgroundImage:
            "radial-gradient(circle, #47487a 0%, #5d5c90 54%, #17487a 100%)",
          backgroundSize: "200% 200%",
        };
        fundoGroundNoite = {
          background: "#00003350",
        };
        return iconeLua;
      default:
        return;
    }
  };

  const botaoStyle = {
    background: `url(${mudarFundo()}) center/cover no-repeat`,
  };

  function getTemperature(temperature, isCelsius) {
    return (
      isCelsius
        ? temperature - 273.15
        : convertorFahrenheit(temperature - 273.15)
    ).toFixed(0);
  }
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    // Limpa o evento de redimensionamento ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const divBotaoStyle = {
    ...fundoGroundManha,
    ...fundoGroundTarde,
    ...fundoGroundNoite,
  };
  const handleVerifOpen = () => {
    setModalVerif(true);
  };
  const handleVerifClose = () => {
    setModalVerif(false);
  };
  return (
    <div id={idProp} className="forecast">
      <div className="div_fore_title_weather">
        <div className="div_botao_fore_troc_extern">
          <div
            style={Object.assign(
              {},
              {
                background: isSmallScreen
                  ? divBotaoStyle.background
                  : "#717171",
              },
            )}
            className="div_botao_fore_troc"
          >
            <button
              onClick={trocarTexto}
              className="botao_fore_troc"
              type="button"
              style={botaoStyle}
            ></button>
          </div>
        </div>
        <p onClick={handleVerifOpen} className="title_weather_fore">
          {textos[cliques]}
        </p>
      </div>
      {modalVerif && <div onClick={handleVerifClose} className="overlay"></div>}
      <CSSTransition
        in={modalVerif}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal">
          <div className="alert_avo">
            <span onClick={handleVerifClose} className="close">
              &times;
            </span>
            <p className="alert_text0">Periodo Do Dia!</p>
            <div className="icones_container">
              <img
                className="icones_period relogio"
                alt="icone de relogio"
                src={relogioEfeito}
              ></img>
              <img className="icones_period solManha" src={solMaEfeito}></img>
              <img className="icones_period solTarde" src={solTarEfeito}></img>
              <img className="icones_period lua" src={luaEfeito}></img>
            </div>
            <div
              style={{ marginLeft: "10px", marginRight: "10px" }}
              className="alert_text1"
            >
              <p>
                Cada ícone representa o período que esta a temperatura da
                previsão do tempo, veja as temperaturas para até cinco dias de
                cada período da região pesquisada!
              </p>
            </div>
          </div>
        </div>
      </CSSTransition>

      <div className="organized_chuvas">
        <h2 className="title_prev">Previsão do tempo!</h2>
        <AlertaChuva
          idWind={idWind}
          daily={daily}
          onVerifChange={handleVerifChange}
        />
      </div>
      <div className="separator-day">
        {dailyForecast.slice(0, 6).map((day, index) => (
          <div
            key={index}
            className="forecast-day"
            style={Object.assign({}, fundoManha, fundoNoite, fundoTarde)}
          >
            <div className="data_div_forecast zoom-animate">
              {moment(day.date)
                .format("DD/MM/YY")
                .split("/")
                .map((segment, i) => (
                  <p key={i} className="data_forecast">
                    {segment}
                  </p>
                ))}
              {""}
            </div>
            <div className="Morning_forecast" style={dados_manha}>
              {Array.isArray(day.morning) && day.morning.length > 0 ? (
                day.morning.map((item, i) => (
                  <div key={i} className="temp_forecast">
                    <p className="temp_forecast_max">
                      <img
                        className="icone_temp"
                        src={temperAlta}
                        alt="Temperatura Alta"
                      />
                      {getTemperature(item.main.temp_max, Celsius)}°
                      {Celsius ? "C" : "F"}
                    </p>
                    <p className="temp_forecast_min">
                      <img
                        className="icone_temp"
                        src={temperBaixa}
                        alt="Temperatura Baixa"
                      />
                      {getTemperature(item.main.temp_min - 2, Celsius)}°
                      {Celsius ? "C" : "F"}
                    </p>

                    <div className="componentes_prev">
                    <p className="humidade_prev">
                      <img
                        className="icone_prox humi"
                        src={"https://cdn-icons-png.flaticon.com/512/2828/2828802.png"}
                        alt="Velocidade do vento"
                      />
                      {item.main.humidity}% de humidade
                    </p>
                     <WeatherDescription description={item.weather[0].description} />
                    <p className="humidade_prev">
                      <img
                        className="icone_prox sensasao"
                        src={"https://cdn-icons-png.flaticon.com/512/3653/3653255.png"}
                        alt="Velocidade do vento"
                      />

                       Sensação de {getTemperature(item.main.feels_like, Celsius)}°
                       {Celsius ? " Celsius" : " Fahrenheit"}
                    </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#8B0000" }} className="temp_forecast_max">
                  Valores Indisponíveis
                </p>
              )}
            </div>

            <div className="Afternoon_forecast" style={dados_tarde}>
              {Array.isArray(day.afternoon) && day.afternoon.length > 0 ? (
                day.afternoon.map((item, i) => (
                  <div key={i} className="temp_forecast">
                    <p className="temp_forecast_max">
                      <img
                        className="icone_temp"
                        src={temperAlta}
                        alt="Temperatura Alta"
                      />
                      {getTemperature(item.main.temp_max, Celsius)}°
                      {Celsius ? "C" : "F"}
                    </p>
                    <p className="temp_forecast_min">
                      <img
                        className="icone_temp"
                        src={temperBaixa}
                        alt="Temperatura Baixa"
                      />
                      {getTemperature(item.main.temp_min - 5, Celsius)}°
                      {Celsius ? "C" : "F"}
                    </p>
                    <div className="componentes_prev">
                    <p className="humidade_prev">
                      <img
                        className="icone_prox humi"
                        src={"https://cdn-icons-png.flaticon.com/512/2828/2828802.png"}
                        alt="Velocidade do vento"
                      />
                      {item.main.humidity}% de humidade
                    </p>
                     <WeatherDescription description={item.weather[0].description} />
                    <p className="humidade_prev">
                      <img
                        className="icone_prox sensasao"
                        src={"https://cdn-icons-png.flaticon.com/512/3653/3653255.png"}
                        alt="Velocidade do vento"
                      />

                       Sensação de {getTemperature(item.main.feels_like, Celsius)}°
                       {Celsius ? " Celsius" : " Fahrenheit"}
                    </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#8B0000" }} className="temp_forecast_max">
                  Valores Indisponíveis
                </p>
              )}
            </div>

            <div className="Night_forecast" style={dados_noite}>
              {Array.isArray(day.night) && day.night.length > 0 ? (
                day.night.map((item, i) => (
                  <div key={i} className="temp_forecast">
                    <p className="temp_forecast_max">
                      <img
                        className="icone_temp"
                        src={temperAlta}
                        alt="Temperatura Alta"
                      />
                      {getTemperature(item.main.temp_max, Celsius)}°
                      {Celsius ? "C" : "F"}
                    </p>
                    <p className="temp_forecast_min">
                      <img
                        className="icone_temp"
                        src={temperBaixa}
                        alt="Temperatura Baixa"
                      />
                      {getTemperature(item.main.temp_min - 5, Celsius)}°
                      {Celsius ? "C" : "F"}
                    </p>
                    <div className="componentes_prev">
                    <p className="humidade_prev">
                      <img
                        className="icone_prox humi"
                        src={"https://cdn-icons-png.flaticon.com/512/2828/2828802.png"}
                        alt="Velocidade do vento"
                      />
                      {item.main.humidity}% de humidade
                    </p>
                     <WeatherDescription description={item.weather[0].description} />
                    <p className="humidade_prev">
                      <img
                        className="icone_prox sensasao"
                        src={"https://cdn-icons-png.flaticon.com/512/3653/3653255.png"}
                        alt="Velocidade do vento"
                      />

                       Sensação de {getTemperature(item.main.feels_like, Celsius)}°
                       {Celsius ? " Celsius" : " Fahrenheit"}
                    </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#8B0000" }} className="temp_forecast_max">
                  Valores Indisponíveis
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
