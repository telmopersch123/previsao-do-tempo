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

const Forecast = ({ lat, lon, Celsius }) => {
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=944362047ea30b04b99466aff4f5887e`,
      )
      .then((response) => {
        if (Array.isArray(response.data.list)) {
          const dailyData = response.data.list;
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
            if (moment(item.dt_txt).format("HH:mm") === "21:00") {
              result[date].night.push(item);
            }

            return result;
          }, {});

          const dailyForecastArray = Object.values(filteredForecast);

          setDailyForecast(dailyForecastArray);
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
  const trocarTexto = () => {
    setCliques((cliques + 1) % textos.length);
  };

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
  6;
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
        {dailyForecast.slice(0, 5).map((day, index) => (
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
            </div>

            <div className="Morning_forecast" style={dados_manha}>
              {day.morning.map((item, i) => (
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
                    {getTemperature(item.main.temp_min - 3, Celsius)}°
                    {Celsius ? "C" : "F"}
                  </p>
                </div>
              ))}
            </div>

            <div className="Afternoon_forecast" style={dados_tarde}>
              {day.afternoon.map((item, i) => (
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
                    {getTemperature(item.main.temp_min - 10, Celsius)}°
                    {Celsius ? "C" : "F"}
                  </p>
                </div>
              ))}
            </div>

            <div className="Night_forecast" style={dados_noite}>
              {day.night.map((item, i) => (
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
