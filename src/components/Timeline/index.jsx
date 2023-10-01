import { useState, useRef, useEffect } from "react";
import moment from "moment";
import Button from "../Button";
import { convertorFahrenheit } from "../Conv";
import "./index.css";
//Mapas//
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const updateFormattedTime = (time) =>
    moment(time, "DD-MM-YYYY HH:mm:ss").format("HH:mm:ss");
  const [formattedTime, setFormattedTime] = useState(
    updateFormattedTime(timeUpdate1),
  );
  useEffect(() => {
    if (timeUpdate1) {
      setFormattedTime(updateFormattedTime(timeUpdate1));
    }
  }, [timeUpdate1]);

  useEffect(() => {
    if (timeUpdate1) {
      setFormattedTime(updateFormattedTime(timeUpdate1));
    }
  }, [timeUpdate1]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedTime((prevTime) =>
        moment(prevTime, "HH:mm:ss").add(1, "seconds").format("HH:mm:ss"),
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (temp !== undefined) {
      setTemperatureDisplay(Celsius ? temp : convertorFahrenheit(temp));
    }
  }, [Celsius, temp]);
  const [temperatureDisplay, setTemperatureDisplay] = useState(temp);
  const z = 10;
  const x = 40.71286;
  const y = -74.006;
  const mapContainer = useRef(null);
  const apiKey = `944362047ea30b04b99466aff4f5887e`;
  let map = useRef(null);
  useEffect(() => {
    if (mapContainer.current) {
      map.current = new Map({
        target: mapContainer.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: `https://tile.openweathermap.org/map/temp_new/${z}/${x}/${y}.png?appid=${apiKey}`,
            }),
          }),
        ],
        view: new View({
          center: [x, y],
          zoom: z,
        }),
      });
    }
  }, [apiKey]);
  return (
    <div className="itens_prim">
      <div ref={mapContainer} className="map-container"></div>

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
