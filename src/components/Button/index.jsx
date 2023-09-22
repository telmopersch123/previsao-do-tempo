import { useState } from "react";
import { convertorFahrenheit } from "../conv";
const Button = ({ temp, onTemperatureConversion,Celsius }) => {
  const myFunction = () => {
    const newCelsius = !Celsius;
  //  setIsCelsius((prevCelsius) => !prevCelsius);

    // Chama a função para converter a temperatura e atualizar o estado no componente pai
    Celsius ? convertorFahrenheit(temp) : temp;
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
