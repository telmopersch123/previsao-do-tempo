import FeatherIcon from "feather-icons-react";
import { convertorFahrenheit } from "../Conv";
import "../../App.css";

const DetailsWeather = ({
  wind,
  feels_like,
  temp_max,
  temp_min,
  gust,
  directionWind,
  Celsius,
  weatherData,
}) => {
  const convertToKmh = (ms) => {
    return ms * 3.6;
  };

  const feelsLikeDisplay = Celsius
    ? feels_like
    : convertorFahrenheit(feels_like);

  const temperaturaMax = Celsius ? temp_max : convertorFahrenheit(temp_max);

  const temperaturaMin = Celsius ? temp_min : convertorFahrenheit(temp_min);

  return (
    <div className="div_parag">
      <h1 className="text_div_parag">Clima Agora!</h1>
      <div className="div_parag_filho">
        {feels_like !== undefined ? (
          <p className={feels_like !== undefined ? "" : "dados_ind"}>
            {`Sensação de ${feelsLikeDisplay.toFixed(0)}`}{" "}
            {Celsius ? "°C" : "°F"}
          </p>
        ) : (
          <p>
            Sensação de:
            <span className={feels_like !== undefined ? "" : "dados_ind"}>
              {feels_like !== undefined
                ? feels_like
                : "Indisponivel nessa região"}
            </span>
          </p>
        )}
        {temp_max !== undefined || temp_min !== undefined ? (
          <p
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            className={
              temp_max !== undefined || temp_min !== undefined
                ? ""
                : "dados_ind"
            }
          >
            <p>
              {" "}
              {`Temperatura Máxima de`}{" "}
              <span
                style={{ borderBottom: "2px solid  rgba(255, 102, 102, 0.6)" }}
              >
                {(temperaturaMax + 2).toFixed(0)}
                {Celsius ? "°C" : "°F"}
              </span>{" "}
            </p>
            <p>
              {" "}
              {`Temperatura Minima de`}{" "}
              <span
                style={{ borderBottom: "2px solid rgba(102, 102, 255, 0.6)" }}
              >
                {temperaturaMin.toFixed(0)}
                {Celsius ? "°C" : "°F"}
              </span>{" "}
            </p>
          </p>
        ) : (
          <p>
            Temperatura máxima de:
            <span className={temp_max !== undefined ? "" : "dados_ind"}>
              {temp_max !== undefined ? temp_max : "Indisponivel nessa região"}
            </span>
            Temperatura miníma de:{" "}
            <span className={temp_min !== undefined ? "" : "dados_ind"}>
              {temp_min !== undefined ? temp_min : "Indisponivel nessa região"}
            </span>
          </p>
        )}
        {wind !== undefined ? (
          <p className={wind !== undefined ? "" : "dados_ind"}>
            {`Velocidade do vento: ${convertToKmh(wind).toFixed(0)} km/h`}
          </p>
        ) : (
          <p>
            Rajada de:{" "}
            <span className={wind !== undefined ? "" : "dados_ind"}>
              {wind !== undefined ? wind + "km/h" : "Indisponivel nessa região"}
            </span>
          </p>
        )}
        {gust !== undefined ? (
          <p className={gust !== undefined ? "" : "dados_ind"}>
            {`Rajada de: ${convertToKmh(gust).toFixed(0)} km/h`}
          </p>
        ) : (
          <p>
            Rajada de:{" "}
            <span className={gust !== undefined ? "" : "dados_ind"}>
              {gust !== undefined ? gust + "km/h" : "Indisponivel nessa região"}
            </span>
          </p>
        )}

        {weatherData.main.sea_level !== undefined ? (
          <p
            className={
              weatherData.main.sea_level !== undefined ? "" : "dados_ind"
            }
          >
            {`Pressão atmosférica: ${weatherData.main.sea_level}hPa`}
          </p>
        ) : (
          <p>
            Pressão atmosférica:{" "}
            <span
              className={
                weatherData.main.sea_level !== undefined ? "" : "dados_ind"
              }
            >
              {weatherData.main.sea_level !== undefined
                ? weatherData.main.sea_level
                : "Indisponivel nessa região"}
            </span>
          </p>
        )}

        {weatherData.main.humidity !== undefined ? (
          <p
            className={
              weatherData.main.humidity !== undefined ? "" : "dados_ind"
            }
          >
            {`Umidade: ${weatherData.main.humidity}%`}
          </p>
        ) : (
          <p>
            Umidade:{" "}
            <span
              className={
                weatherData.main.humidity !== undefined ? "" : "dados_ind"
              }
            >
              {weatherData.main.humidity !== undefined
                ? weatherData.main.humidity
                : "Indisponivel nessa região"}
            </span>
          </p>
        )}
        <div
          className={`div_wind ${
            directionWind !== undefined ? "" : "dados_ind"
          }`}
        >
          {(directionWind >= 0 && directionWind <= 20) ||
          (directionWind >= 340 && directionWind <= 360) ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Sul</span>
              <FeatherIcon className="icon_set" icon="arrow-down" />
            </div>
          ) : directionWind >= 20 && directionWind <= 70 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Sudoeste</span>
              <FeatherIcon className="icon_set" icon="arrow-down-left" />
            </div>
          ) : directionWind >= 70 && directionWind <= 110 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Oeste</span>
              <FeatherIcon className="icon_set" icon="arrow-left" />
            </div>
          ) : directionWind >= 110 && directionWind <= 160 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Noroeste</span>
              <FeatherIcon className="icon_set" icon="arrow-up-left" />
            </div>
          ) : directionWind >= 160 && directionWind <= 200 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Norte</span>
              <FeatherIcon className="icon_set" icon="arrow-up" />
            </div>
          ) : directionWind >= 200 && directionWind <= 250 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Nordeste</span>
              <FeatherIcon className="icon_set" icon="arrow-up-right" />
            </div>
          ) : directionWind >= 250 && directionWind <= 290 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para o Leste</span>
              <FeatherIcon className="icon_set" icon="arrow-right" />
            </div>
          ) : directionWind >= 290 && directionWind <= 340 ? (
            <div className="align-text-icon">
              <span>A direção do vento está para Sudeste</span>
              <FeatherIcon className="icon_set" icon="arrow-down-right" />
            </div>
          ) : (
            `Error:404`
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailsWeather;
