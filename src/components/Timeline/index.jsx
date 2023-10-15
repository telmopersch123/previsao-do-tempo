import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { convertorFahrenheit } from "../Conv";
import "./index.css";

//Mapas//
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Timeline = ({
  timeUpdate1,
  sys,
  weather,
  name,
  temp,
  Celsius,
  lat,
  lon,
}) => {
  const updateFormattedTime = (time) =>
    moment(time, "DD-MM-YYYY HH:mm:ss").format("HH:mm");

  const [formattedTime, setFormattedTime] = useState(
    updateFormattedTime(timeUpdate1),
  );
  useEffect(() => {
    if (timeUpdate1) {
      setFormattedTime(updateFormattedTime(timeUpdate1));
    }
  }, [timeUpdate1]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime((prevTime) =>
        moment(prevTime, "HH:mm").add(1, "minutes").format("HH:mm"),
      );
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (temp !== undefined) {
      setTemperatureDisplay(Celsius ? temp : convertorFahrenheit(temp));
    }
  }, [Celsius, temp]);

  const [temperatureDisplay, setTemperatureDisplay] = useState(temp);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Verifica se o mapa já foi inicializado
    if (mapRef.current) {
      // Destrói a instância do mapa existente
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      // Cria e inicializa um novo mapa na div
      const map = L.map(mapRef.current).setView([lat, lon], 10);

      const temperatureLayer = L.tileLayer(
        "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=4d8fb5b93d4af21d66a2948710284366",
        {
          attribution: "OpenWeatherMap",
          zIndex: 1,
        },
      );

      const openStreetMapLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      );

      openStreetMapLayer.addTo(map);
      temperatureLayer.addTo(map);

      mapInstance.current = map;
    }
  }, [lat, lon]);

  return (
    <div className="itens_prim">
      <div
        ref={mapRef}
        id="map"
        style={{ width: "800px", height: "600px" }}
      ></div>
      <p className={temp !== undefined ? "" : "dados_ind"}>
        {temp !== undefined ? (
          `Temperatura de ${temperatureDisplay.toFixed(0)} ${
            Celsius ? "°C" : "°F"
          }`
        ) : (
          <span>
            {temp !== undefined
              ? `${temp} km/h`
              : "Temperatura Indisponível nessa região"}
          </span>
        )}
      </p>

      <p>{formattedTime}</p>
      <p>{sys}</p>
      <p>{name}</p>
      <p>{weather}</p>
    </div>
  );
};

export default Timeline;
