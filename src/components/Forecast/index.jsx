import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./index.css";
import temperAlta from "../../icones/temperatura-alta.png";
import temperBaixa from "../../icones/temperatura-baixa.png";
import iconeManha from "../../icones/sol_manha.gif";
import iconeTarde from "../../icones/sol_tarde.gif";
import iconeLua from "../../icones/lua_noite.gif";

const Forecast = ({ lat, lon, Celsius }) => {
  const [morningData, setMorningData] = useState(null);
  const [afternoonData, setAfternoonData] = useState(null);
  const [nightData, setNightData] = useState(null);
  const [dailyData, setDailyForecast] = useState([]);

  useEffect(() => {
    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=DkVHKM1ZxZiYcXd2P1F7xG5WTIh2m3ZK`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const dailyData = response.data;
        if (dailyData && Array.isArray(dailyData)) {
          if (dailyData) {
            setDailyForecast(dailyData);
          }
          const filteredForecast = dailyData.data.reduce((result, item) => {
            const date = moment(item.dt_txt).format("YYYY-MM-DD");
            const dailyData = response.data;

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
            } else if (moment(item.dt_txt).format("HH:mm") === "15:00") {
              result[date].afternoon.push(item);
            } else if (moment(item.dt_txt).format("HH:mm") === "21:00") {
              result[date].night.push(item);
            }
            return result;
          }, {});
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de previsão:", error);
      });
  }, [lat, lon]);

  const textos = ["Manhã", "Tarde", "Noite"];
  const [cliques, setCliques] = useState(0);
  let dados_manha = { display: "block" };
  let dados_tarde = { display: "none" };
  let dados_noite = { display: "none" };

  const trocarTexto = () => {
    setCliques((cliques + 1) % textos.length);
  };

  const obterIconeAtual = () => {
    switch (textos[cliques]) {
      case "Manhã":
        dados_manha = { display: "block" };
        dados_tarde = { display: "none" };
        dados_noite = { display: "none" };
        return iconeManha;
      case "Tarde":
        dados_manha = { display: "none" };
        dados_tarde = { display: "block" };
        dados_noite = { display: "none" };
        return iconeTarde;
      case "Noite":
        dados_manha = { display: "none" };
        dados_tarde = { display: "none" };
        dados_noite = { display: "block" };
        return iconeLua;
      default:
        dados_manha = { display: "block" };
        dados_tarde = { display: "none" };
        dados_noite = { display: "none" };
        return iconeManha;
    }
  };

  const botaoStyle = {
    background: `url(${obterIconeAtual()}) center/cover no-repeat`,
  };

  function getTemperature(temperature, isCelsius) {
    return (
      isCelsius ? temperature - 273.15 : (temperature - 273.15) * (9 / 5) + 32
    ).toFixed(0);
  }

  return (
    <div className="forecast">
      <div className="cont_title_prev">
        <div className="div_fore_title_weather">
          <div className="div_botao_fore_troc">
            <button
              onClick={trocarTexto}
              className="botao_fore_troc"
              type="button"
              style={botaoStyle}
            ></button>
          </div>
          <p className="title_weather_fore">{textos[cliques]}</p>
        </div>
        <h2 className="title_prev">Previsão para cinco dias</h2>
      </div>
      <div className="separator-day">
        <div key={1} className="forecast-day">
          <div className="data_div_forecast zoom-animate">
            {moment(new Date())
              .format("DD/MM/YY")
              .split("/")
              .map((segment, i) => (
                <p key={i} className="data_forecast">
                  {segment}
                </p>
              ))}
          </div>
          <div className="Morning_forecast" style={dados_manha}>
            {morningData && (
              <div className="temp_forecast">
                <p className="temp_forecast_max">
                  <img
                    className="icone_temp"
                    src={temperAlta}
                    alt="Temperatura Alta"
                  />
                  {`${getTemperature(morningData.max, Celsius)}°${
                    Celsius ? "C" : "F"
                  }`}
                </p>
                <p className="temp_forecast_min">
                  <img
                    className="icone_temp"
                    src={temperBaixa}
                    alt="Temperatura Baixa"
                  />
                  {`${getTemperature(morningData.min, Celsius)}°${
                    Celsius ? "C" : "F"
                  }`}
                </p>
              </div>
            )}
          </div>
          <div className="Afternoon_forecast" style={dados_tarde}>
            {afternoonData && (
              <div className="temp_forecast">
                <p className="temp_forecast_max">
                  <img
                    className="icone_temp"
                    src={temperAlta}
                    alt="Temperatura Alta"
                  />
                  {`${getTemperature(afternoonData.max, Celsius)}°${
                    Celsius ? "C" : "F"
                  }`}
                </p>
                <p className="temp_forecast_min">
                  <img
                    className="icone_temp"
                    src={temperBaixa}
                    alt="Temperatura Baixa"
                  />
                  {`${getTemperature(afternoonData.min, Celsius)}°${
                    Celsius ? "C" : "F"
                  }`}
                </p>
              </div>
            )}
          </div>
          <div className="Night_forecast" style={dados_noite}>
            {nightData && (
              <div className="temp_forecast">
                <p className="temp_forecast_max">
                  <img
                    className="icone_temp"
                    src={temperAlta}
                    alt="Temperatura Alta"
                  />
                  {`${getTemperature(nightData.max, Celsius)}°${
                    Celsius ? "C" : "F"
                  }`}
                </p>
                <p className="temp_forecast_min">
                  <img
                    className="icone_temp"
                    src={temperBaixa}
                    alt="Temperatura Baixa"
                  />
                  {`${getTemperature(nightData.min, Celsius)}°${
                    Celsius ? "C" : "F"
                  }`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
