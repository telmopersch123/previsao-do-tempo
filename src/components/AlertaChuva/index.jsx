import React from "react";
import "./index.css";
import chuviscos from "../../icones/chuvisco.gif";
import neve from "../../icones/neve.gif";

function AlertaChuva({ daily }) {
  if (!daily) {
    return null;
  }

  const arrayAlert = () => {
    const days = Object.keys(daily).map(Number); // Converta chaves para números
    const minDay = Math.min(...days);
    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;
      const dataAlertPop = daily[day]?.pop || 0.0;
      const dataAlertSnow = daily[day]?.snow?.["3h"] || 0.0;

      return {
        pop:
          dataAlertPop !== undefined
            ? parseFloat((dataAlertPop * 100).toFixed(0))
            : 0.0,
        snow:
          dataAlertSnow !== undefined
            ? parseFloat((dataAlertSnow * 100).toFixed(0))
            : 0.0,
      };
    });
  };

  const alertDataSnow = arrayAlert();
  const alertDataPop = arrayAlert();

  const snows = alertDataSnow.map((item) => item.snow);
  const soma1 = snows.reduce((acc, pop) => acc + pop, 0);
  const media1 = Number((soma1 / snows.length).toFixed(0));

  const pops = alertDataPop.map((item) => item.pop);
  const soma0 = pops.reduce((acc, pop) => acc + pop, 0);
  const media0 = Number((soma0 / pops.length).toFixed(0));
  let alertaChuva;

  function getProbabilidadeNeve(media1) {
    if (media1 >= 50) {
      return "Probabilidades Altas de Nevar nessa região!";
    } else if (media1 >= 30) {
      return "Probabilidades Médias de Nevar nessa região!";
    } else if (media1 >= 10) {
      return "Probabilidades Baixas de Nevar nessa região!";
    } else {
      // Se media1 for menor que 10, não retorna nada
      return null;
    }
  }
  const probabilidadeNeve = getProbabilidadeNeve(media1);

  if (media0 > 50) {
    alertaChuva = (
      <div className="alertAlt alertPop" role="alert">
        <div className="o_div">
          <img className="chuviscos_gif" src={chuviscos} />
          <p>Chances altas de Chuva para os proximos dias!</p>
        </div>
        {probabilidadeNeve !== null && (
          <div className="div_neve" style={{ display: "flex" }}>
            <img className="neve_gif" src={neve} />
            <p className="p_snow">{probabilidadeNeve}</p>
          </div>
        )}
      </div>
    );
  } else if (media0 >= 30 && media0 <= 50) {
    alertaChuva = (
      <div className="alertMed alertPop" role="alert">
        <div className="o_div">
          <img className="chuviscos_gif" src={chuviscos} />
          <p>Chances médias de Chuva para os proximos dias!</p>
        </div>
        {probabilidadeNeve !== null && (
          <div className="div_neve" style={{ display: "flex" }}>
            <img className="neve_gif" src={neve} />
            <p className="p_snow">{probabilidadeNeve}</p>
          </div>
        )}
      </div>
    );
  } else if (media0 < 30) {
    alertaChuva = (
      <div className="alertBai alertPop" role="alert">
        <div className="o_div">
          <img className="chuviscos_gif" src={chuviscos} />
          <p>Chances baixas de Chuva para os proximos dias!</p>
        </div>
        {probabilidadeNeve !== null && (
          <div className="div_neve" style={{ display: "flex" }}>
            <img className="neve_gif" src={neve} />
            <p className="p_snow">{probabilidadeNeve}</p>
          </div>
        )}
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
