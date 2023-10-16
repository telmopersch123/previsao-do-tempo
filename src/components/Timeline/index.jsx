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
      const maxBounds = [
        [-90, -180], // Limites máximos do mundo
        [90, 180],
      ];
      // Cria e inicializa um novo mapa na div
      const map = L.map(mapRef.current, {
        maxBounds: maxBounds, // Defina os limites máximos
        maxBoundsViscosity: 1.0, // Isso ajuda a manter o mapa dentro dos limites
      }).setView([lat, lon], 10); // Defina o zoom inicial
      const temperatureLayer = L.tileLayer(
        "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=4d8fb5b93d4af21d66a2948710284366",
        {
          maxZoom: 10,
          minZoom: 3,
          attribution: "OpenWeatherMap",
          zIndex: 1,
        },
      );

      const openStreetMapLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 10,
          minZoom: 3,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      );

      openStreetMapLayer.addTo(map);
      temperatureLayer.addTo(map);
      const temperatureControl = L.control({ position: "bottomleft" });
      temperatureControl.onAdd = function (map) {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML = `
        <div class="scale-details">
          <div class="scale-label">Temperatura °C </div>
          <div class="organized-bar">
            <div class="numbers-bar">
              <p>-40</p>
              <p>-20</p>
              <p>0</p>
              <p>20</p>
              <p>40</p>
            </div>
            <div class="scale-bar">
              <div class="scale-gradient"></div>
            </div>
          </div>
        </div>
      `;
        return div;
      };
      openStreetMapLayer.addTo(map);
      temperatureControl.addTo(map);
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
