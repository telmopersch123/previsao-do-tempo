import axios from "axios";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import relogioEfeito from "../../icones/espere.gif";
import { default as iconeLua, default as luaEfeito } from "../../icones/lua_noite.gif";
import seta from "../../icones/seta-para-a-direita.png";
import { default as iconeManha, default as solMaEfeito } from "../../icones/sol_manha.gif";
import { default as iconeTarde, default as solTarEfeito } from "../../icones/sol_tarde.gif";
import temperAlta from "../../icones/temperatura-alta.png";
import temperBaixa from "../../icones/temperatura-baixa.png";
import AlertaChuva from "../AlertaChuva";
import { convertorFahrenheit } from "../Conv";
import Snowflakes from "./Snow";
import "./index.css";
const Forecast = ({
  lat,
  lon,
  Celsius,
  onDailyDataChange,
  onNewMomentDayChange,
  onVerifChange,
  idProp,
  idWind,
  onAlertTemp,
}) => {
  const transitionRef = useRef(null);
  const [daily, setDaily] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [dailyData00, setDailyData] = useState([]);
  const [newMomentDay, setNewMomentDay] = useState([]);
  const [modalVerif, setModalVerif] = useState(false);

  const textos = useMemo(() => ["Manhã", "Tarde", "Noite"], []);
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
  }, [cliques, textos, newMomentDay, onNewMomentDayChange]);
  const handleVerifChange = (verifValue) => {
    onVerifChange(verifValue);
  };

  const WeatherDescription = ({ description }) => {
    const [translatedDescription, setTranslatedDescription] = useState(false);

    let visibleWe = false;
    let visibleSn = false;
    let icone = "";
    let period = newMomentDay === "noite" ? "n" : "d";
    useEffect(() => {
     
      const cachedTranslation = localStorage.getItem(description);

      if (cachedTranslation && cachedTranslation !== translatedDescription) {
        setTranslatedDescription(cachedTranslation);
      } else {
       
        fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
            description,
          )}`,
        )
          .then((response) => response.json())
          .then((data) => {
            const newTranslatedDescription = data[0][0][0];
      
            if (newTranslatedDescription !== translatedDescription) {
              setTranslatedDescription(newTranslatedDescription);
       
              localStorage.setItem(description, newTranslatedDescription);
            }
          })
          .catch((error) => {
            console.error("Erro ao traduzir:", error);
            setTranslatedDescription(description);
          });
      }
    }, [description, translatedDescription]);

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
      visibleSn = false;
      visibleWe = true;
      icone = "https://openweathermap.org/img/wn/11d@2x.png";
    } else if (
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
      visibleSn = false;
      visibleWe = true;
      icone = "https://openweathermap.org/img/wn/09d@2x.png";
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
      visibleSn = false;
      visibleWe = false;
      icone = "https://openweathermap.org/img/wn/50d@2x.png";
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
      visibleSn = true;
      visibleWe = false;
      icone = "https://openweathermap.org/img/wn/13d@2x.png";
    } else if (
      description === "light rain" ||
      description === "moderate rain" ||
      description === "heavy intensity rain" ||
      description === "very heavy rain" ||
      description === "extreme rain"
    ) {
      visibleSn = false;
      visibleWe = true;
      icone = `https://openweathermap.org/img/wn/10${period}@2x.png`;
    } else if (description === "clear sky") {
      visibleWe = false;
      visibleSn = false;
      icone = `https://openweathermap.org/img/wn/01${period}@2x.png`;
    } else if (description === "few clouds") {
      visibleWe = false;
      visibleSn = false;
      icone = `https://openweathermap.org/img/wn/02${period}@2x.png`;
    } else if (description === "scattered clouds") {
      visibleWe = false;
      visibleSn = false;
      icone = "https://openweathermap.org/img/wn/03d@2x.png";
    } else if (
      description === "broken clouds" ||
      description === "broken clouds" ||
      description === "overcast clouds"
    ) {
      visibleWe = false;
      visibleSn = false;
      icone = "https://openweathermap.org/img/wn/04d@2x.png";
    }

    return (
      <div className="div_weather">
        <p className="humidade_prev">
          <img className="icone_prox" src={icone} alt="Velocidade do vento" />
          {translatedDescription}
        </p>
        <div
          className="weather_prev"
          style={{ display: visibleWe ? "block" : "none" }}
        >
          {[...Array(50)].map((_, index) => (
            <div
              key={index}
              style={{ left: calcularValorDinamico() }}
              className="rain_prev"
            ></div>
          ))}
        </div>

        <Snowflakes
          calcularValorDinamico={calcularValorDinamico}
          visibleSn={visibleSn}
        />
      </div>
    );
  };
  const [tamanhoTela, setTamanhoTela] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setTamanhoTela(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const calcularValorDinamico = () => {
    if (tamanhoTela >= 1200) {
      return `${Math.random() * 300}px`;
    } else {
      return `${Math.random() * (20 + 80)}vw`;
    }
  };

  const [dailyForecastArray, setDailyForecastArray] = useState([]);
  const forecastSliceRef = useRef();
  let currentHoutd = new Date().getHours();
 
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
          onAlertTemp(response.data.list);
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
          setDailyForecastArray(Object.values(filteredForecast));
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de previsão:", error);
      });
   
  }, [lat, lon, currentHoutd, onAlertTemp]);

  useEffect(() => {
    let novoForecastSlice;

    if (currentHoutd >= 6 && currentHoutd < 17) {
      if (newMomentDay == "manha" || newMomentDay == "noite") {
        novoForecastSlice = dailyForecastArray.slice(0, 5);
        }   if (newMomentDay == "tarde") {
           novoForecastSlice = dailyForecastArray.slice(1, 6);
        } 
    } else {
       novoForecastSlice = dailyForecastArray.slice(0, 5);
    }
    if (!arraysSaoIguais(novoForecastSlice, forecastSliceRef.current)) {
      forecastSliceRef.current = novoForecastSlice;
      setDailyForecast(novoForecastSlice);
      onDailyDataChange(novoForecastSlice);
    }
  }, [dailyForecastArray, newMomentDay, currentHoutd, onDailyDataChange]);

  function arraysSaoIguais(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

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
          background: "#47487a90",
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevDay = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 - 2 ? dailyForecast.length + 1 : prevIndex - 2,
    );
  };
  const handleNextDay = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dailyForecast.length + 1 ? 0 - 2 : prevIndex + 2,
    );
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };
  let startX = false;
  let isDragging = false;
  const carrosselRef = useRef(null);

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX;
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.pageX - startX;
    carrosselRef.current.style.transform = `translateX(${deltaX}px)`;
  };

  const handleMouseUp = (e) => {
    isDragging = false;
    const deltaX = e.pageX - startX;

   
    const threshold = 50;

    if (deltaX > threshold) {
     
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 - 2 ? dailyForecast.length + 1 : prevIndex - 2,
      );
      carrosselRef.current.style.transform = "translateX(0)";
    } else if (deltaX < -threshold) {
     
      setCurrentIndex((prevIndex) =>
        prevIndex === dailyForecast.length + 1 ? 0 - 2 : prevIndex + 2,
      );
      carrosselRef.current.style.transform = "translateX(0)";
    } else {
     
      carrosselRef.current.style.transform = "translateX(0)";
    }
  };

  const handleTouchStart = (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].pageX - startX;
    carrosselRef.current.style.transform = `translateX(${deltaX}px)`;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;

    isDragging = false;
    const deltaX = e.changedTouches[0].pageX - startX;


    const threshold = 50;

    if (deltaX > threshold) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 - 2 ? dailyForecast.length + 1 : prevIndex - 2,
      );
      carrosselRef.current.style.transform = "translateX(0)";
    } else if (deltaX < -threshold) {
      setCurrentIndex((prevIndex) =>
        prevIndex === dailyForecast.length + 1 ? 0 - 2 : prevIndex + 2,
      );
      carrosselRef.current.style.transform = "translateX(0)";
    } else {
      carrosselRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <div id={idProp} className="forecast">
      {modalVerif && <div onClick={handleVerifClose} className="overlay"></div>}

      <CSSTransition
        nodeRef={transitionRef}
        in={modalVerif}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div ref={transitionRef} className="modal">
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
      <div className="forecast_filho">
        <div className="div_fore_title_weather">
          <div className="div_botao_fore_troc_extern">
            <div
              onClick={trocarTexto}
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

        <div className="organized_chuvas">
          <h2 className="title_prev">Previsão do tempo!</h2>
          <AlertaChuva
            idWind={idWind}
            daily={daily}
            onVerifChange={handleVerifChange}
          />
        </div>

        <div className="div_forecast">
          <div className="Div_seta_extern">
            <div className="Div_seta">
              <div>
                <div>
                  <img
                    className="seta prox"
                    onDragStart={handleDragStart}
                    src={seta}
                    alt="proximo"
                    onClick={handleNextDay}
                  />
                </div>
                <div>
                  <img
                    className="seta ant"
                    onDragStart={handleDragStart}
                    src={seta}
                    alt="anterior"
                    onClick={handlePrevDay}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ cursor: "grab" }}
            onDragStart={handleDragStart}
            className="separator-day"
          >
            <div
              ref={carrosselRef}
              className="carrosel"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {Array.isArray(dailyForecast) &&
                dailyForecast.length >= 0 &&
                dailyForecast.map((day, index) => (
                  <div
                    key={index}
                    className="forecast-day"
                    style={{
                      transform: `translateX(${(index - currentIndex) * 100}%)`,
                      transition: "transform 0.5s ease-in-out",
                      ...fundoManha, 
                      ...fundoNoite,
                      ...fundoTarde,
                    }}
                  >
                    <div
                      className={`${
                        textos[cliques] === "Tarde"
                          ? "Pixel_tarde all"
                          : "" || textos[cliques] === "Noite"
                          ? "Pixel_noite all"
                          : "" || textos[cliques] === "Manhã"
                          ? "Pixel_manha all"
                          : ""
                      }`}
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
                    </div>

                    <div className="Morning_forecast fore" style={dados_manha}>
                      {Array.isArray(day.morning) && day.morning.length > 0 ? (
                        day.morning.map((item, i) => (
                          <div key={i} className="temp_forecast">
                            
                            <div className="temp_forecast_true">
                                 
                              {item.main.temp_max !== undefined ? (
                              <p className="temp_forecast_max">
                                
                                <img
                                  className="icone_temp"
                                  src={temperAlta}
                                  alt="Temperatura Alta"
                                />
                            

                                {getTemperature(item.main.temp_max, Celsius)}°
                                {Celsius ? "C" : "F"}

                             
                              </p>
                              ) : (
                               <p className="temp_forecast_max">Sem Dados</p>
                              )}
                                {item.main.temp_min !== undefined ? (
                              <p className="temp_forecast_min">
                                <img
                                  className="icone_temp"
                                  src={temperBaixa}
                                  alt="Temperatura Baixa"
                                />
                                {getTemperature(
                                  item.main.temp_min - 2 ,
                                  Celsius,
                                )}
                                °{Celsius ? "C" : "F"}
                                  </p>
                              ) : (
                               <p className="temp_forecast_min">Sem Dados</p>
                              )}
                                
                            </div>
                            <div className="componentes_prev">
                              {item.main.humidity !== undefined ? (
                                <p className="humidade_prev">
                                <img
                                  className="icone_prox humi"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/2828/2828802.png"
                                  }
                                  alt="Velocidade do vento"
                                />
                                <span>{item.main.humidity}% de umidade</span>
                              </p>
                              ) : (
                                  <p className="humidade_prev">
                                       <img
                                  className="icone_prox humi"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/2828/2828802.png"
                                  }
                                  alt="Velocidade do vento"
                                />
                                    <span>Sem Dados</span>
                                  </p>
                              )}
                            

                              {item.weather[0].description !== undefined ? (
                                  <WeatherDescription
                                description={item.weather[0].description}
                              />
                              ): (
                                  <p className="humidade_prev">Sem dados</p>
                              )}
                            
                              {item.main.feels_like !== undefined ? (
                              <p className="humidade_prev">
                                <img
                                  className="icone_prox sensasao"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/3653/3653255.png"
                                  }
                                  alt="Velocidade do vento"
                                />

                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span> Sensação de </span>
                                  <span>
                                    {getTemperature(
                                      item.main.feels_like,
                                      Celsius,
                                    )}
                                    ° Graus {Celsius ? "Celsius" : "Fahrenheit"}
                                  </span>
                                </span>
                              </p>
                              ) : (
                                <p className="humidade_prev">
                                <img
                                  className="icone_prox sensasao"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/3653/3653255.png"
                                  }
                                  alt="Velocidade do vento"
                                    />
                                    <span>Sem Dados</span>
                                    </p>
                              )}
                             
                            </div>
                          </div>
                        ))
                      ) : (
                        <p
                          style={{ color: "#8B0000" }}
                          className="temp_forecast_max"
                        >
                          Valores Indisponíveis
                        </p>
                      )}
                    </div>

                    <div
                      className="Afternoon_forecast fore"
                      style={dados_tarde}
                    >
                      {Array.isArray(day.afternoon) &&
                      day.afternoon.length > 0 ? (
                        day.afternoon.map((item, i) => (
                          <div key={i} className="temp_forecast">
                            <div className="temp_forecast_true">


                              {item.main.temp_max !== undefined ? (
                              <p className="temp_forecast_max">
                                
                                <img
                                  className="icone_temp"
                                  src={temperAlta}
                                  alt="Temperatura Alta"
                                />
                            

                                {getTemperature(item.main.temp_max, Celsius)}°
                                {Celsius ? "C" : "F"}

                             
                              </p>
                              ) : (
                               <p className="temp_forecast_max">Sem Dados</p>
                              )}



                               {item.main.temp_min !== undefined ? (
                              <p className="temp_forecast_min">
                                <img
                                  className="icone_temp"
                                  src={temperBaixa}
                                  alt="Temperatura Baixa"
                                />
                                {getTemperature(
                                  item.main.temp_min - 2 ,
                                  Celsius,
                                )}
                                °{Celsius ? "C" : "F"}
                                  </p>
                              ) : (
                               <p className="temp_forecast_min">Sem Dados</p>
                              )}            
                            </div>



                            <div className="componentes_prev">
                              {item.main.humidity !== undefined ? (
                                <p className="humidade_prev">
                                <img
                                  className="icone_prox humi"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/2828/2828802.png"
                                  }
                                  alt="Velocidade do vento"
                                />
                                <span>{item.main.humidity}% de umidade</span>
                              </p>
                              ) : (
                                  <p className="humidade_prev">
                                       <img
                                  className="icone_prox humi"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/2828/2828802.png"
                                  }
                                  alt="Velocidade do vento"
                                />
                                    <span>Sem Dados</span>
                                  </p>
                              )}


                              {item.weather[0].description !== undefined ? (
                                  <WeatherDescription
                                description={item.weather[0].description}
                              />
                              ): (
                                  <p className="humidade_prev">Sem dados</p>
                              )}



                               {item.main.feels_like !== undefined ? (
                              <p className="humidade_prev">
                                <img
                                  className="icone_prox sensasao"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/3653/3653255.png"
                                  }
                                  alt="Velocidade do vento"
                                />

                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span> Sensação de </span>
                                  <span>
                                    {getTemperature(
                                      item.main.feels_like,
                                      Celsius,
                                    )}
                                    ° Graus {Celsius ? "Celsius" : "Fahrenheit"}
                                  </span>
                                </span>
                              </p>
                              ) : (
                                <p className="humidade_prev">
                                <img
                                  className="icone_prox sensasao"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/3653/3653255.png"
                                  }
                                  alt="Velocidade do vento"
                                    />
                                    <span>Sem Dados</span>
                                    </p>
                              )}


                            </div>
                          </div>
                        ))
                      ) : (
                        <p
                          style={{ color: "#8B0000" }}
                          className="temp_forecast_max"
                        >
                          Valores Indisponíveis
                        </p>
                      )}
                    </div>

                    <div className="Night_forecast fore" style={dados_noite}>
                      {Array.isArray(day.night) && day.night.length > 0 ? (
                        day.night.map((item, i) => (
                          <div key={i} className="temp_forecast">
                            <div className="temp_forecast_true">
                             {item.main.temp_max !== undefined ? (
                              <p className="temp_forecast_max">
                                
                                <img
                                  className="icone_temp"
                                  src={temperAlta}
                                  alt="Temperatura Alta"
                                />
                            

                                {getTemperature(item.main.temp_max, Celsius)}°
                                {Celsius ? "C" : "F"}

                             
                              </p>
                              ) : (
                               <p className="temp_forecast_max">Sem Dados</p>
                              )}
                              {item.main.temp_min !== undefined ? (
                              <p className="temp_forecast_min">
                                <img
                                  className="icone_temp"
                                  src={temperBaixa}
                                  alt="Temperatura Baixa"
                                />
                                {getTemperature(
                                  item.main.temp_min - 2 ,
                                  Celsius,
                                )}
                                °{Celsius ? "C" : "F"}
                                  </p>
                              ) : (
                               <p className="temp_forecast_min">Sem Dados</p>
                              )}      
                            </div>
                            <div className="componentes_prev">
                               {item.main.humidity !== undefined ? (
                                <p className="humidade_prev">
                                <img
                                  className="icone_prox humi"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/2828/2828802.png"
                                  }
                                  alt="Velocidade do vento"
                                />
                                <span>{item.main.humidity}% de umidade</span>
                              </p>
                              ) : (
                                  <p className="humidade_prev">
                                       <img
                                  className="icone_prox humi"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/2828/2828802.png"
                                  }
                                  alt="Velocidade do vento"
                                />
                                    <span>Sem Dados</span>
                                  </p>
                              )}
                             {item.weather[0].description !== undefined ? (
                                  <WeatherDescription
                                description={item.weather[0].description}
                              />
                              ): (
                                  <p className="humidade_prev">Sem dados</p>
                              )}
                              {item.main.feels_like !== undefined ? (
                              <p className="humidade_prev">
                                <img
                                  className="icone_prox sensasao"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/3653/3653255.png"
                                  }
                                  alt="Velocidade do vento"
                                />

                                <span
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <span> Sensação de </span>
                                  <span>
                                    {getTemperature(
                                      item.main.feels_like,
                                      Celsius,
                                    )}
                                    ° Graus {Celsius ? "Celsius" : "Fahrenheit"}
                                  </span>
                                </span>
                              </p>
                              ) : (
                                <p className="humidade_prev">
                                <img
                                  className="icone_prox sensasao"
                                  src={
                                    "https://cdn-icons-png.flaticon.com/512/3653/3653255.png"
                                  }
                                  alt="Velocidade do vento"
                                    />
                                    <span>Sem Dados</span>
                                    </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p
                          style={{ color: "#8B0000" }}
                          className="temp_forecast_max"
                        >
                          Valores Indisponíveis
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
