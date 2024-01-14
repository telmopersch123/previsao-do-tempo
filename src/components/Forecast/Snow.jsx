import React from "react";
import "./snow.css";

const Snowflakes = ({ visibleSn, calcularValorDinamico }) => {
  // const generateRandomLeft = () => `${Math.random() * 250}px`;
  return (
    <div
      className="anima_snow"
      style={{ display: visibleSn ? "block" : "none" }}
    >
      {[...Array(20)].map((_, index) => (
        <div
          style={{
            top: calcularValorDinamico(index),
            left: calcularValorDinamico(index),
          }}
          key={index}
          className={`anima_snow_filho group1`}
        ></div>
      ))}
      {[...Array(30)].map((_, index) => (
        <div
          style={{
            top: calcularValorDinamico(index),
            left: calcularValorDinamico(index),
          }}
          key={index}
          className={`anima_snow_filho group2`}
        ></div>
      ))}
      {[...Array(40)].map((_, index) => (
        <div
          style={{
            top: calcularValorDinamico(index),
            left: calcularValorDinamico(index),
          }}
          key={index}
          className={`anima_snow_filho group3`}
        ></div>
      ))}
    </div>
  );
};

export default Snowflakes;
