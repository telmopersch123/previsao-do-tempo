import { useState } from "react";

const Button = () => {
  const [Celsius, setIsCelsius] = useState(true);

  const myFunction = () => {
    setIsCelsius((prevCelsius) => !prevCelsius);
  };

  return (
    <button className="far_cel_button" onClick={myFunction}>
      {Celsius ? "F" : "C"}
    </button>
  );
};

export default Button;
