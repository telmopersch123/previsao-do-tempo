import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { convertorFahrenheit } from "../Conv";
import "./index.css";
import temperAlta from "../../icones/temperatura-alta.png";
import temperBaixa from "../../icones/temperatura-baixa.png";
import iconeManha from "../../icones/sol_manha.gif";
import iconeTarde from "../../icones/sol_tarde.gif";
import iconeLua from "../../icones/lua_noite.gif";
const Forecast = ({
  lat,
  lon,
  Celsius,
  onDailyDataChange,
  onNewMomentDayChange,
}) => {
  const [dailyForecast, setDailyForecast] = useState([]);
  const [dailyData00, setDailyData] = useState([]);
  const [newMomentDay, setNewMomentDay] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=944362047ea30b04b99466aff4f5887e`,
      )
      .then((response) => {
        if (Array.isArray(response.data.list)) {
          const dailyData = response.data.list;
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
            }
            if (moment(item.dt_txt).format("HH:mm") === "12:00") {
              result[date].afternoon.push(item);
            }
            if (moment(item.dt_txt).format("HH:mm") === "18:00") {
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
              forecastSlice = dailyForecastArray.slice(0, 6);
          }
          setDailyForecast(forecastSlice);
          onDailyDataChange(forecastSlice);
          setDailyData(dailyData);
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
  return (
    <div className="forecast">
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
        <p className="title_weather_fore">{textos[cliques]}</p>
      </div>
      <h2 className="title_prev">Previsão do tempo!</h2>
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
