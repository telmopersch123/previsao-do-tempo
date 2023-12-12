import React from "react";
import "./index.css";
import chuviscos from "../../icones/chuvisco.gif";

function AlertaChuva({ daily }) {
  console.log(daily);
  if (!daily) {
    return null;
  }
  const arrayAlert = () => {
    const days = Object.keys(daily).map(Number); // Converta chaves para números
    const minDay = Math.min(...days);
    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;
      const dataAlertPop = daily[day]?.pop || 0.0;
      return {
        pop:
          dataAlertPop !== undefined
            ? parseFloat((dataAlertPop * 100).toFixed(0))
            : 0.0,
      };
    });
  };
  const alertDataPop = arrayAlert();
  const pops = alertDataPop.map((item) => item.pop);
  const soma0 = pops.reduce((acc, pop) => acc + pop, 0);
  const media0 = Number((soma0 / pops.length).toFixed(0));
  let alertaChuva;
  if (media0 > 50) {
    alertaChuva = (
      <div className="alertAlt alertPop" role="alert">
        <img className="chuviscos_gif" src={chuviscos} />
        <p>Chances altas de Chuva!</p>
      </div>
    );
  } else if (media0 >= 30 && media0 <= 50) {
    alertaChuva = (
      <div className="alertMed alertPop" role="alert">
        <img className="chuviscos_gif" src={chuviscos} />
        <p>Chances médias de Chuva!</p>
      </div>
    );
  } else if (media0 < 30) {
    alertaChuva = (
      <div className="alertBai alertPop" role="alert">
        <img className="chuviscos_gif" src={chuviscos} />
        <p>Chances baixas de Chuva!</p>
      </div>
    );
    return alertaChuva;
  }

  return (
    <div className="alertPop" role="alert">
      {alertaChuva}
    </div>
  );
}

export default AlertaChuva;
