import { useEffect, useState } from "react";
import moment from "moment";
import Button from "../Button";

const Timeline = ({
  timeUpdate1,
  sys,
  weather,
  name,
  temp,
  Celsius,
  convertorFahrenheit,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState(
    moment(timeUpdate1, "DD-MM-YYYY HH:mm:ss").format("HH:mm:ss"),
  );

  useEffect(() => {
    setFormattedTime(
      moment(timeUpdate1, "DD-MM-YYYY HH:mm:ss").format("HH:mm:ss"),
    );
  }, [timeUpdate1]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      const newFormattedTime = moment(formattedTime, "HH:mm:ss")
        .add(1, "seconds")
        .format("HH:mm:ss");
      setFormattedTime(newFormattedTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [formattedTime]);

  const temperaturaDisplay = Celsius ? temp : convertorFahrenheit(temp);

  return (
    <div className="itens_prim">
      {temp !== undefined ? (
        <p className={temp !== undefined ? "" : "dados_ind"}>
          {`Temperatura de ${temperaturaDisplay.toFixed(0)}`}{" "}
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
