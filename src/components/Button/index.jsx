import * as React from "react";
import { convertorFahrenheit } from "../Conv";
import celsius from "../../icones/celsius.png";
import fahrenheit from "../../icones/fahrenheit.png";
import Tooltip from "@mui/material/Tooltip";

const Button = ({ temp, onTemperatureConversion, Celsius }) => {
  const myFunction = () => {
    const newCelsius = !Celsius;
    const newTemperature = Celsius ? convertorFahrenheit(temp) : temp;
    onTemperatureConversion(newTemperature, newCelsius);
  };

  return (
    <Tooltip
      placement="left"
      title={Celsius ? "Converter para Fahrenheit" : "Converter para Celsius"}
    >
      <button className="far_cel_button" onClick={myFunction}>
        {Celsius ? (
          <img className="icones_cel_far" src={fahrenheit} />
        ) : (
          <img className="icones_cel_far" src={celsius} />
        )}
      </button>
    </Tooltip>
  );
};

export default Button;
