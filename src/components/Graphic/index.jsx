import { useState, useEffect } from "react";

const Graphic = ({ dailyData }) => {
  if (Array.isArray(dailyData) && dailyData.length > 0) {
    const firstData = dailyData[0];
    if (
      firstData &&
      firstData.main &&
      typeof firstData.main.humidity !== "undefined"
    ) {
      const humidity = firstData.main.humidity;
      console.log(humidity);
      console.log(dailyData);
    } else {
      console.log("Dados de umidade não estão disponíveis no primeiro objeto.");
    }
  } else {
    console.log("Dados diários não estão disponíveis ou a matriz está vazia.");
  }
  return <div></div>;
};

export default Graphic;
