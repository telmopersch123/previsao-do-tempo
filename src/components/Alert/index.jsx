import React from "react";
import "./index.css";
import { icone } from "./icone.jsx";
function Alert({ daily }) {
  if (!daily) {
    return null;
  }
  const arrayAlert = () => {
    const days = Object.keys(daily).map(Number); // Converta chaves para números
    const minDay = Math.min(...days);
    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;
      const dataAlertTemp = daily[day]?.main || {};
      return {
        temp:
          dataAlertTemp.temp - 273.15 !== undefined
            ? parseFloat((dataAlertTemp.temp - 273.15).toFixed(0))
            : 0.0,
      };
    });
  };

  const alertDataTemp = arrayAlert();

  const temps = alertDataTemp.map((item) => item.temp);
  const soma1 = temps.reduce((acc, temp) => acc + temp, 0);
  const media = Number((soma1 / temps.length).toFixed(0));

  let alertaComponente;
  if (media > 35) {
    alertaComponente = (
      <div className="alertCaElevado alert" role="alert">
        {icone()}
        <p>Alerta! Calor elevado para esta região.</p>
      </div>
    );
  } else {
    if (media >= 25 && media <= 30) {
      alertaComponente = (
        <div className="alertCaModerado alert" role="alert">
          {icone()}
          <p>Alerta! Calor moderado para esta região.</p>
        </div>
      );
    } else {
      if (media <= 20 && media >= 15) {
        alertaComponente = (
          <div className="alertFrModerado alert" role="alert">
            {icone()}
            <p>Alerta! Frio Moderado para esta região.</p>
          </div>
        );
      } else {
        if (media <= 15) {
          alertaComponente = (
            <div className="alertFrElevado alert" role="alert">
              {icone()}
              <p>Alerta! Frio elevado para esta região.</p>
            </div>
          );
        } else {
          alertaComponente = (
            <div
              style={{ display: "none" }}
              className="alert"
              role="alert"
            ></div>
          );
        }
      }
    }
    return alertaComponente;
  }

  return (
    <div className="alert" role="alert">
      {alertaComponente}
    </div>
  );
}

export default Alert;
