import { useState } from "react";

const Button = ({ temp }) => {
  const [Celsius, setIsCelsius] = useState(true);

  const myFunction = () => {
    setIsCelsius((prevCelsius) => !prevCelsius);
  };

  const convertorFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const temperaturaDisplay = Celsius ? temp : convertorFahrenheit(temp);

  return (
    <button className="far_cel_button" onClick={myFunction}>
      {Celsius ? "F" : "C"}
    </button>
  );
};

export default Button;
