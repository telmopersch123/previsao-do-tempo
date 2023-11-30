import { useState } from "react";
import { convertorFahrenheit } from "../Conv";
import celsius from "../../icones/celsius.png";
import fahrenheit from "../../icones/fahrenheit.png";
const Button = ({ temp, onTemperatureConversion, Celsius }) => {
  const myFunction = () => {
    const newCelsius = !Celsius;
    const newTemperature = Celsius ? convertorFahrenheit(temp) : temp;
    onTemperatureConversion(newTemperature, newCelsius);
  };

  return (
    <button className="far_cel_button" onClick={myFunction}>
      {Celsius ? (
        <img
          style={{ width: "80%", height: "80%", opacity: "0.7" }}
          src={fahrenheit}
        />
      ) : (
        <img
          style={{ width: "80%", height: "80%", opacity: "0.7" }}
          src={celsius}
        />
      )}
    </button>
  );
};

export default Button;
