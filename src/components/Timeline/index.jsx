import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { convertorFahrenheit } from "../Conv";
import "./index.css";
import ReactDOM from "react-dom";
//Mapas//
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const scaleDetailsMap = {
  temp: (
    <div className="scale-details">
      <div className="scale-label">Temperatura °C</div>
      <div className="organized-bar">
        <div className="numbers-bar">
          <p>-40</p>
          <p>-20</p>
          <p>0</p>
          <p>20</p>
          <p>40</p>
        </div>
        <div className="scale-bar">
          <div className="scale-gradient"></div>
        </div>
      </div>
    </div>
  ),
  pressure: (
    <div className="scale-details">
      <div className="scale-label">Pressão, hPa</div>
      <div className="organized-bar">
        <div className="numbers-bar pressao-numbers">
          <p>950</p>
          <p>980</p>
          <p>1010</p>
          <p>1040</p>
          <p>1070</p>
        </div>
        <div className="scale-bar">
          <div className="scale-gradient-pressure"></div>
        </div>
      </div>
    </div>
  ),
  wind: (
    <div className="scale-details">
      <div className="scale-label">Velocidade do vento, m/s</div>
      <div className="organized-bar">
        <div className="numbers-bar wind-speed-numbers">
          <p>0</p>
          <p>2</p>
          <p>3</p>
          <p>6</p>
          <p>12</p>
          <p>25</p>
          <p>50</p>
          <p>100</p>
        </div>
        <div className="scale-bar">
          <div className="scale-gradient-wind"></div>
        </div>
      </div>
    </div>
  ),
  clouds: (
    <div className="scale-details">
      <div className="scale-label">Nuvens, %</div>
      <div className="organized-bar">
        <div className="numbers-bar">
          <p>0</p>
          <p>25</p>
          <p>50</p>
          <p>75</p>
          <p>100</p>
        </div>
        <div className="scale-bar">
          <div className="scale-gradient-clouds"></div>
        </div>
      </div>
    </div>
  ),
  precipitation: (
    <div className="scale-details">
      <div className="scale-label">Precipitação, mm/h</div>
      <div className="organized-bar">
        <div className="numbers-bar precipitation-numbers">
          <p>0</p>
          <p>0.5</p>
          <p>1</p>
          <p>2</p>
          <p>4</p>
          <p>6</p>
          <p>7</p>
          <p>10</p>
          <p>12</p>
          <p>14</p>
          <p>16</p>
          <p>24</p>
          <p>32</p>
          <p>60</p>
        </div>
        <div className="scale-bar precipitation-bars">
          <div className="scale-gradient-precipitation"></div>
        </div>
      </div>
    </div>
  ),
};

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
  const ScaleDetails = ({ mapLayer }) => {
    // Use a variável scaleDetailsMap definida no escopo mais amplo
    return <div className="info legend">{scaleDetailsMap[mapLayer]}</div>;
  };

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

  const [mapLayer, setMapLayer] = useState("temp"); // Inicialmente, exibe a camada de temperatura
  const [temperatureDisplay, setTemperatureDisplay] = useState(temp);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  //Inicialmente, exibe os detalhes de temperatura
  const [scaleDetailsContent, setScaleDetailsContent] = useState(
    scaleDetailsMap["temp"],
  );
  const [currentSituation, setCurrentSituation] = useState("temp"); // Comece com "temp" como padrão
  const [showLayerButtons, setShowLayerButtons] = useState(false);
  const toggleLayerButtons = () => {
    setShowLayerButtons(!showLayerButtons);
  };
  const changeMapLayer = (newLayer) => {
    setMapLayer(newLayer);
    setScaleDetailsContent(scaleDetailsMap[newLayer]);
    setCurrentSituation(newLayer);
  };
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
      const weatherLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/${mapLayer}_new/{z}/{x}/{y}.png?appid=4d8fb5b93d4af21d66a2948710284366`,
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
      weatherLayer.addTo(map);
      const temperatureControl = L.control({ position: "bottomleft" });
      temperatureControl.onAdd = function (map) {
        const scaleDetails = <ScaleDetails mapLayer={mapLayer} />;
        const div = L.DomUtil.create("div", "custom-legend");
        ReactDOM.createRoot(div).render(scaleDetails);
        return div;
      };
      openStreetMapLayer.addTo(map);
      temperatureControl.addTo(map);
      mapInstance.current = map;
    }
  }, [lat, lon, mapLayer, scaleDetailsContent]);

  return (
    <div className="itens_prim">
      <div
        ref={mapRef}
        id="map"
        className={`map-container ${currentSituation}`}
      >
        <div className="map-layer-buttons">
          <button
            className="layer-escolher"
            style={{
              borderRadius: showLayerButtons ? "10px 10px 0 0" : "10px",
            }}
            onClick={toggleLayerButtons}
          >
            Escolher Camada
          </button>
          {showLayerButtons && ( // Renderizar os botões de layer se showLayerButtons for verdadeiro
            <>
              <div className="layers-escolha">
                <button
                  onClick={() => changeMapLayer("temp")}
                  className={mapLayer === "temp" ? "active" : ""}
                >
                  Temperature
                </button>
                <button
                  onClick={() => changeMapLayer("pressure")}
                  className={mapLayer === "pressure" ? "active" : ""}
                >
                  Pressure
                </button>
                <button
                  onClick={() => changeMapLayer("wind")}
                  className={mapLayer === "wind" ? "active" : ""}
                >
                  Wind Speed
                </button>
                <button
                  onClick={() => changeMapLayer("clouds")}
                  className={mapLayer === "clouds" ? "active" : ""}
                >
                  Clouds
                </button>
                <button
                  onClick={() => changeMapLayer("precipitation")}
                  className={mapLayer === "precipitation" ? "active" : ""}
                >
                  Precipitation
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="Paragrafos">
        <p className={`dados_def${temp !== undefined ? " dados_ind" : ""}`}>
          {temp !== undefined ? (
            `${temperatureDisplay.toFixed(0)} ${Celsius ? "°C" : "°F"}`
          ) : (
            <span>
              {temp !== undefined
                ? `${temp} km/h`
                : "Temperatura Indisponível nessa região"}
            </span>
          )}
        </p>

        <p className="time_class">{formattedTime}</p>
        <p>{sys}</p>
        <p>{weather}</p>
      </div>
    </div>
  );
};

export default Timeline;
