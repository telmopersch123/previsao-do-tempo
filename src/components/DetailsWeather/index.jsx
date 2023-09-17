import { useState } from "react";

import FeatherIcon from "feather-icons-react";

const DetailsWeather = ({
  temp,
  wind,
  feels_like,
  temp_max,
  temp_min,
  gust,
  directionWind,
}) => {
  const [Celsius, setIsCelsius] = useState(true);

  const temperaturaDisplay = Celsius ? temp : convertorFahrenheit(temp);

  const feelsLikeDisplay = Celsius
    ? feels_like
    : convertorFahrenheit(feels_like);

  const temperaturaMax = Celsius ? temp_max : convertorFahrenheit(temp_max);

  const temperaturaMin = Celsius ? temp_min : convertorFahrenheit(temp_min);

  const convertorFahrenheit = (celsius) => {
    setIsCelsius((prevCelsius) => !prevCelsius);
    return (celsius * 9) / 5 + 32;
  };

  const convertToKmh = (ms) => {
    return ms * 3.6;
  };

  return (
    <div className="div_parag">
      <p className={temp !== undefined ? "" : "dados_ind"}>
        {`Temperatura de ${temperaturaDisplay.toFixed(0)}`}{" "}
        {Celsius ? "°C" : "°F"}
      </p>
      <p className={feels_like !== undefined ? "" : "dados_ind"}>
        {`Sensação de ${feelsLikeDisplay.toFixed(0)}`} {Celsius ? "°C" : "°F"}
      </p>
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
      <p className={wind !== undefined ? "" : "dados_ind"}>
        {`Velocidade do vento: ${convertToKmh(wind).toFixed(0)} km/h`}
      </p>
      <p className={gust !== undefined ? "" : "dados_ind"}>
        {`Rajada de: ${convertToKmh(gust).toFixed(0)} km/h`}
      </p>
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
