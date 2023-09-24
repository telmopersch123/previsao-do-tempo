import { useEffect, useState } from "react";
import moment from "moment";
import Button from "../Button";
import { convertorFahrenheit } from "../Conv";

const Timeline = ({ timeUpdate1, sys, weather, name, temp, Celsius }) => {
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

  return (
    <div className="itens_prim">
      {temp !== undefined ? (
        <p className={temp !== undefined ? "" : "dados_ind"}>
          {`Temperatura de ${temperatureDisplay.toFixed(0)}`}{" "}
          {Celsius ? "°C" : "°F"}
        </p>
      ) : (
        <p>
          <span className={temp !== undefined ? "" : "dados_ind"}>
            {temp !== undefined
              ? temp + "km/h"
              : "Temperatura Indisponivel nessa região"}
          </span>
        </p>
      )}
      <p>{formattedTime}</p>
      <p>{sys}</p>
      <p>{name}</p>
      <p>{weather}</p>
    </div>
  );
};

export default Timeline;
