import { useState } from "react";
import Button from "../Button";
import FeatherIcon from "feather-icons-react";
import { convertorFahrenheit } from "../conv";

const DetailsWeather = ({
  wind,
  feels_like,
  temp_max,
  temp_min,
  gust,
  directionWind,
  Celsius,
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
      {feels_like !== undefined ? (
        <p className={feels_like !== undefined ? "" : "dados_ind"}>
          {`Sensação de ${feelsLikeDisplay.toFixed(0)}`} {Celsius ? "°C" : "°F"}
        </p>
      ) : (
        <p>
          Sensação de: |
          <span className={feels_like !== undefined ? "" : "dados_ind"}>
            {feels_like !== undefined
              ? feels_like + "km/h"
              : "Indisponivel nessa região"}
          </span>
        </p>
      )}

      {temp_max !== undefined || temp_min !== undefined ? (
        <p
          className={
            temp_max !== undefined || temp_min !== undefined ? "" : "dados_ind"
          }
        >
          {`Temperatura máxima de ${temperaturaMax.toFixed(0)}`}{" "}
          {Celsius ? "°C" : "°F"} |{" "}
          {`Temperatura minima de ${temperaturaMin.toFixed(0)}`}{" "}
          {Celsius ? "°C" : "°F"}
        </p>
      ) : (
        <p>
          Temperatura máxima de: |
          <span className={temp_max !== undefined ? "" : "dados_ind"}>
            {temp_max !== undefined
              ? temp_max + "km/h"
              : "Indisponivel nessa região"}
          </span>
          Temperatura miníma de:{" "}
          <span className={temp_min !== undefined ? "" : "dados_ind"}>
            {temp_min !== undefined
              ? temp_min + "km/h"
              : "Indisponivel nessa região"}
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

      <p className={directionWind !== undefined ? "" : "dados_ind"}>
        {(directionWind >= 0 && directionWind <= 20) ||
        (directionWind >= 340 && directionWind <= 360) ? (
          `direção do vento Indo Sul`
        ) : directionWind >= 20 && directionWind <= 70 ? (
          `direção do vento:  ↙ Indo Sudoeste`
        ) : directionWind >= 70 && directionWind <= 110 ? (
          `direção do vento: ← Indo Oeste`
        ) : directionWind >= 110 && directionWind <= 160 ? (
          `direção do vento: ↖ Indo Noroeste`
        ) : directionWind >= 160 && directionWind <= 200 ? (
          `direção do vento: ↑ Indo Norte`
        ) : directionWind >= 200 && directionWind <= 250 ? (
          `direção do vento: ↗ Indo Nordeste`
        ) : directionWind >= 250 && directionWind <= 290 ? (
          `direção do vento: → Indo Leste`
        ) : directionWind >= 290 && directionWind <= 340 ? (
          <div className="align-text-icon">
            <span>A direção do vento está para Sudeste</span>
            <FeatherIcon icon="arrow-down-right" />
          </div>
        ) : (
          `FDS`
        )}
      </p>
    </div>
  );
};
export default DetailsWeather;
