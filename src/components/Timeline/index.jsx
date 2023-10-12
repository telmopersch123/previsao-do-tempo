import React, { useState, useEffect } from "react";
import {
  interaction,
  layer,
  custom,
  control, //name spaces
  Interactions,
  Overlays,
  Controls, //group
  Map,
  Layers,
  Overlay,
  Util, //objects
} from "react-openlayers";
import { fromLonLat } from "ol/proj";

import moment from "moment";
import Button from "../Button";
import { convertorFahrenheit } from "../Conv";
import "./index.css";
//Mapas//

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

  const [mapCenter, setMapCenter] = useState(fromLonLat([lon, lat]));
  const [zoomCenter, setZoomCenter] = useState();
  const [mapKey, setMapKey] = useState(Math.random());
  useEffect(() => {
    setMapCenter(fromLonLat([lon, lat]));
    setZoomCenter(10);
    setMapKey(Math.random());
  }, [lon, lat]);

  return (
    <div className="itens_prim">
      <div className="Map">
        <Map
          key={mapKey}
          view={{
            center: mapCenter, // Verifique se lon e lat estão corretos
            zoom: zoomCenter, // Ajuste o nível de zoom conforme necessário
          }}
        >
          <interaction.DragPan />
          <Layers>
            <layer.Tile />
          </Layers>
        </Map>
      </div>

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
