import { useEffect, useState } from "react";
import moment from "moment";
import Button from "../Button";
import { convertorFahrenheit } from "../conv";
const Timeline = ({ timeUpdate1, sys, weather, name, temp, Celsius }) => {
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
  const handleTemperatureConversion = (newTemperature) => {
    setTemperature(newTemperature);
  };

  // const [temperatureDisplay, setTemperatureDisplay] = useState(
  //   temp !== undefined
  //     ? Celsius
  //       ? temp
  //       : convertorFahrenheit(temp)
  //     : undefined,
  // );
  // // Atualize o valor da temperatura local quando a função onTemperatureConversion for chamada
  // useEffect(() => {
  //   if (temp !== undefined) {
  //     setTemperatureDisplay(Celsius ? temp : convertorFahrenheit(temp));
  //   }
  // }, [Celsius, temp]);

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
