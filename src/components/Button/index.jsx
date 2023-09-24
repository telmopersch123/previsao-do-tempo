import { useState } from "react";
import { convertorFahrenheit } from "../Conv";
const Button = ({ temp, onTemperatureConversion, Celsius }) => {
  const myFunction = () => {
    const newCelsius = !Celsius;
    const newTemperature = Celsius ? convertorFahrenheit(temp) : temp;
    onTemperatureConversion(newTemperature, newCelsius);
  };

  return (
    <button className="far_cel_button" onClick={myFunction}>
      {Celsius ? "F" : "C"}
    </button>
  );
};

export default Button;
