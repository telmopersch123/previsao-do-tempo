import React, { useState, useEffect } from "react";
import axios from "axios";
import solLimpo from "../../icones/sol.gif";
import luaLimpa from "../../icones/lua.gif";
import chuva from "../../icones/chuva.gif";
import chuvaForte from "../../icones/trovoada.gif";
import nublado from "../../icones/nublado.gif";
import neve from "../../icones/neve-unscreen.gif";

function WeatherIcon({
  weather,
  timeUpdate1,
  setClasses,
  cloudsData,
  rainData,
  snowData,
  unixSunrise,
  unixSunset,
  convertedDateTime,
  myFunction,
  Celsius,
}) {
  const sunriseTime = unixSunrise * 1000;
  const sunsetTime = unixSunset * 1000;
  const currentTime = convertedDateTime * 1000;

  let iconNeve = null;
  let iconSrcTemp = null;
  let iconSrc = null;
  let descriptionText = null;
  let descriptionTextPrim = null;
  let descriptionTextSnow = null;
  let backgroundClass = "";

  if (
    weather.icon === "01d" ||
    (weather.icon === "01n" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    weather.icon === "02d" ||
    (weather.icon === "02n" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.icon === "04d" && weather.description != "overcast clouds") ||
    (weather.icon === "04n" &&
      weather.description != "overcast clouds" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    weather.icon === "03d" ||
    (weather.icon === "03n" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime)
  ) {
    iconSrc = solLimpo;
    switch (weather.description) {
      case "few clouds":
        descriptionTextPrim = <p>Limpo com poucas nuvens!</p>;
        break;
      case "broken clouds":
        descriptionTextPrim = <p>Limpo com nuvens quebradas!</p>;
        //backgroundClass = "nuvensquebradas_dia";
        break;
      case "scattered clouds":
        descriptionTextPrim = <p>Limpo com nuvens dispersas!</p>;
        break;
      case "clear sky":
        descriptionTextPrim = <p>Céu Limpo!</p>;
        break;
    }
  } else if (
    weather.icon === "01d" ||
    weather.icon === "01n" ||
    weather.icon === "02d" ||
    weather.icon === "02n" ||
    weather.icon === "03d" ||
    weather.icon === "03n" ||
    (weather.icon === "04d" && weather.description != "overcast clouds") ||
    (weather.icon === "04n" && weather.description != "overcast clouds")
  ) {
    iconSrc = luaLimpa;
    switch (weather.description) {
      case "few clouds":
        descriptionTextPrim = <p>Limpo com poucas nuvens!</p>;
        break;
      case "broken clouds":
        descriptionTextPrim = <p>Limpo com nuvens quebradas!</p>;
        //backgroundClass = "nuvensquebradas_noite";
        break;
      case "scattered clouds":
        descriptionTextPrim = <p>Limpo com nuvens dispersas!</p>;
        // backgroundClass = "nuvendispersas_noite";
        break;
      case "clear sky":
        descriptionTextPrim = <p>Céu Limpo!</p>;
        break;
    }
  } else if (
    weather.description === "heavy intensity shower rain" ||
    weather.description === "heavy intensity rain" ||
    weather.description === "very heavy rain" ||
    (weather.description === "extreme rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime)
  ) {
    iconSrc = solLimpo;
    iconSrcTemp = chuvaForte;
    descriptionText = (
      <p>
        <span className="Title_Icon">Chuva Forte!</span>
        {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
      </p>
    );
  } else if (
    weather.description === "heavy intensity shower rain" ||
    weather.description === "heavy intensity rain" ||
    weather.description === "very heavy rain" ||
    weather.description === "extreme rain"
  ) {
    iconSrc = luaLimpa;
    iconSrcTemp = chuvaForte;
    descriptionText = (
      <p>
        <span className="Title_Icon">Chuva Forte!</span>
        {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
      </p>
    );
  } else if (
    (weather.description === "light intensity drizzle" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "shower rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "light rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "moderate rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "freezing rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "light intensity shower rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "heavy intensity shower rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "ragged shower rain" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime)
  ) {
    iconSrc = solLimpo;
    iconSrcTemp = chuva;
    if (weather.description === "light intensity drizzle") {
      descriptionText = <p>{`Chuviscos de Chuva!`}</p>;
    } else {
      descriptionText = (
        <p>
          <span className="Title_Icon">Chuva!</span>
          {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
        </p>
      );
    }
  } else if (
    weather.description === "light intensity drizzle" ||
    weather.description === "shower rain" ||
    weather.description === "light rain" ||
    weather.description === "moderate rain" ||
    weather.description === "light intensity drizzle" ||
    weather.description === "shower rain" ||
    weather.description === "light rain" ||
    weather.description === "moderate rain" ||
    weather.description === "ragged shower rain" ||
    weather.description === "light intensity shower rain" ||
    weather.description === "freezing rain"
  ) {
    iconSrc = luaLimpa;
    iconSrcTemp = chuva;
    if (weather.description === "light intensity drizzle") {
      descriptionText = <p>{`Chuviscos de Chuva!`}</p>;
    } else {
      descriptionText = (
        <p>
          {" "}
          <span className="Title_Icon">Chuva!</span>
          {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
        </p>
      );
    }
  } else if (
    (weather.icon === "50d" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.icon === "50n" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.icon === "04d" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime) ||
    (weather.description === "overcast clouds" &&
      currentTime >= sunriseTime &&
      currentTime < sunsetTime)
  ) {
    iconSrc = solLimpo;
    iconSrcTemp = nublado;
    if (weather.description === "smoke") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Fumaçado!</span>
          {` com ${cloudsData.all}% de nebulosidade`}
        </p>
      );
    } else if (weather.description === "mist") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Névoa!</span>
          {` com ${cloudsData.all}% de nebulosidade`}
        </p>
      );
    } else if (weather.description === "sand") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Névoa!</span>
          {` com ${cloudsData.all}% de Areia pelo Ar!`}
        </p>
      );
    } else if (weather.description === "tornado") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Névoa!</span>
          {` com ${cloudsData.all}% de de invisibilidade causado por um Tornado!`}
        </p>
      );
    } else {
      descriptionText = (
        <p>
          <span className="Title_Icon">Nublado!</span>
          {` com ${cloudsData.all}% de nebulosidade`}
        </p>
      );
    }
  } else if (
    weather.icon === "04n" ||
    weather.icon === "50d" ||
    weather.icon === "50n"
  ) {
    iconSrc = luaLimpa;
    iconSrcTemp = nublado;

    if (weather.description === "smoke") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Fumaçado!</span>
          {` com ${cloudsData.all}% de nebulosidade`}
        </p>
      );
    } else if (weather.description === "mist") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Névoa!</span>
          {` com ${cloudsData.all}% de nebulosidade`}
        </p>
      );
    } else if (weather.description === "sand") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Névoa!</span>
          {` com ${cloudsData.all}% de Areia pelo Ar!`}
        </p>
      );
    } else if (weather.description === "tornado") {
      descriptionText = (
        <p>
          <span className="Title_Icon">Névoa!</span>
          {` com ${cloudsData.all}% de de invisibilidade causado por um Tornado!`}
        </p>
      );
    } else {
      descriptionText = (
        <p>
          <span className="Title_Icon">Nublado!</span>
          {` com ${cloudsData.all}% de nebulosidade`}
        </p>
      );
    }
  }
  if (
    snowData !== undefined &&
    currentTime >= sunriseTime &&
    currentTime < sunsetTime
  ) {
    iconSrc = solLimpo;
    iconNeve = neve;
    descriptionTextSnow = (
      <p>
        <span className="Title_Icon">Nevando!</span>
        {` nessa região com ${snowData["1h"]}mm de volume de neve`}
      </p>
    );
  } else if (snowData !== undefined) {
    iconSrc = luaLimpa;
    iconNeve = neve;
    descriptionTextSnow = (
      <p>
        <span className="Title_Icon">Nevando!</span>
        {` nessa região com ${snowData["1h"]}mm de volume de neve`}
      </p>
    );
  }

  useEffect(() => {
    setClasses(backgroundClass);
  }, [backgroundClass, setClasses]);

  return (
    <div className="icon_temp">
      {iconSrc && (
        <div
          style={{ width: "auto", marginBottom: "10px" }}
          className={`icon-wrapper icon2 ${
            iconSrc.includes(solLimpo) &&
            currentTime >= sunriseTime &&
            currentTime < sunsetTime
              ? "day"
              : "night"
          }`}
        >
          <img className={`icones`} src={iconSrc} alt={weather.description} />
          {descriptionTextPrim && (
            <div className="description-textPrim">{descriptionTextPrim}</div>
          )}
        </div>
      )}
      {iconSrcTemp && (
        <div className="icon-wrapper icon2">
          <img className="icones" src={iconSrcTemp} alt={weather.description} />
          {descriptionText && (
            <div className="description-text">{descriptionText}</div>
          )}
        </div>
      )}
      {iconNeve && (
        <div className="icon-wrapper icon3">
          <img className="icones" src={iconNeve} alt={weather.description} />
          {descriptionTextSnow && (
            <div className="description-text">{descriptionTextSnow}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherIcon;
