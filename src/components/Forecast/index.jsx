import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { convertorFahrenheit } from "../Conv";
import "./index.css";
import temperAlta from "../../icones/temperatura-alta.png";
import temperBaixa from "../../icones/temperatura-baixa.png";
const Forecast = ({ lat, lon, Celsius }) => {
  const apiKey = "7273310237e2d7aafdbb11f14ddd01f9";
  const [dailyForecast, setDailyForecast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      )
      .then((response) => {
        // Filtrar os dados de previsão para até 5 dias
        const filteredForecast = response.data.list.reduce((result, item) => {
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
          } else if (moment(item.dt_txt).format("HH:mm") === "15:00") {
            result[date].afternoon.push(item);
          } else if (moment(item.dt_txt).format("HH:mm") === "21:00") {
            result[date].night.push(item);
          }
          return result;
        }, {});

        const dailyForecastArray = Object.values(filteredForecast);

        setDailyForecast(dailyForecastArray);
        // if (morningData.length > 0) {
        //  setForecast(morningData[0]);
        // }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de previsão:", error);
      });
  }, [lat, lon]);

  return (
    <div className="forecast">
      <div className="cont_title_prev">
        <h2 className="title_prev">Previsão para cinco dias</h2>
      </div>
      <div className="separator-day">
        {dailyForecast.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-day">
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
            <div className="Morning_forecast">
              <p className="title_morning">Manhã</p>
              {day.morning.map((item, i) => (
                <div key={i} className="temp_forecast">
                  <p className="temp_forecast_max">
                    <img
                      className="icone_temp"
                      src={temperAlta}
                      alt="Temperatura Alta"
                    />
                    {(Celsius
                      ? item.main.temp_max - 273.15
                      : convertorFahrenheit(item.main.temp_max - 273.15)
                    ).toFixed(0)}
                    °{Celsius ? "C" : "F"}
                  </p>
                  <p className="temp_forecast_min">
                    <img
                      className="icone_temp"
                      src={temperBaixa}
                      alt="Temperatura Baixa"
                    />
                    {(Celsius
                      ? item.main.temp_min - 273.15
                      : convertorFahrenheit(item.main.temp_min - 273.15)
                    ).toFixed(0)}
                    °{Celsius ? "C" : "F"}
                  </p>
                </div>
              ))}
            </div>

            <div className="Afternoon_forecast">
              <p className="title_afternoon">Tarde</p>
              {day.afternoon.map((item, i) => (
                <div key={i} className="temp_forecast">
                  <p className="temp_forecast_max">
                    <img
                      className="icone_temp"
                      src={temperAlta}
                      alt="Temperatura Alta"
                    />
                    {(Celsius
                      ? item.main.temp_max - 273.15
                      : convertorFahrenheit(item.main.temp_max - 273.15)
                    ).toFixed(0)}
                    °{Celsius ? "C" : "F"}
                  </p>
                  <p className="temp_forecast_min">
                    <img
                      className="icone_temp"
                      src={temperBaixa}
                      alt="Temperatura Baixa"
                    />
                    {(Celsius
                      ? item.main.temp_min - 273.15
                      : convertorFahrenheit(item.main.temp_min - 273.15)
                    ).toFixed(0)}
                    °{Celsius ? "C" : "F"}
                  </p>
                </div>
              ))}
            </div>

            <div className="Night_forecast">
              <p className="title_night">Noite</p>
              {day.night.map((item, i) => (
                <div key={i} className="temp_forecast">
                  <p className="temp_forecast_max">
                    <img
                      className="icone_temp"
                      src={temperAlta}
                      alt="Temperatura Alta"
                    />
                    {(Celsius
                      ? item.main.temp_max - 273.15
                      : convertorFahrenheit(item.main.temp_max - 273.15)
                    ).toFixed(0)}
                    °{Celsius ? "C" : "F"}
                  </p>
                  <p className="temp_forecast_min">
                    <img
                      className="icone_temp"
                      src={temperBaixa}
                      alt="Temperatura Baixa"
                    />
                    {(Celsius
                      ? item.main.temp_min - 273.15
                      : convertorFahrenheit(item.main.temp_min - 273.15)
                    ).toFixed(0)}
                    °{Celsius ? "C" : "F"}
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
