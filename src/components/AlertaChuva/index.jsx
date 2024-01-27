import React, { useState, useRef, forwardRef } from "react";
import "./index.css";
import chuviscos from "../../icones/chuvisco.gif";
import neve from "../../icones/neve.gif";
import { CSSTransition } from "react-transition-group";
function AlertaChuva({ daily, idWind, onVerifChange }) {
  const transitionRef = useRef(null);
  const [modalVerif, setModalVerif] = useState(false);
  const [verifSnow, setVerifSnow] = useState(false);
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
      return "Probabilidades altas de Nevar nessa região!";
    } else if (media1 >= 30) {
      return "Probabilidades médias de Nevar nessa região!";
    } else if (media1 >= 10) {
      return "Probabilidades baixas de Nevar nessa região!";
    } else {
      // Se media1 for menor que 10, não retorna nada
      return null;
    }
  }
  const probabilidadeNeve = getProbabilidadeNeve(media1);

  const handleVerifiOpen = () => {
    setModalVerif(true);
  };
  const handleVerifiClose = () => {
    setModalVerif(false);
  };

  const handleVerif = (e) => {
    e.stopPropagation();
    handleVerifiClose();
  };
  const handleVerifTwo = (e) => {
    onVerifChange(true);
    e.stopPropagation();
    handleVerifiClose();
  };

  const cor = media0 > 25 ? "alto" : "baixo";
  const conteinerModal = () => {
    return (
      <CSSTransition
        nodeRef={transitionRef}
        in={modalVerif}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div ref={transitionRef} className="modal">
          <div className="alert_avo">
            <span onClick={handleVerif} className="close">
              &times;
            </span>
            <p className="alert_text0">Alerta do clima!</p>
            <p className="alert_text1 p">
              As chances de chuva são calculadas com base na previsão de até 5
              dias da região pesquisada!
            </p>
            <p className={`alert_text2 ${cor}`}>
              {media0}% de chances de chover
            </p>
            {media1 > 0 && (
              <div>
                <p>Região com Neve!</p>
                <p className={`alert_text2 snow_text`}>
                  {media1}% chances de nevar
                </p>
              </div>
            )}
            <p className="alert_text3 p">
              Com base nas possibilidades dos próximos dias&nbsp;
              <strong onClick={handleVerifTwo} style={{ cursor: "pointer" }}>
                <a href={`#${idWind}`} className="text_chuva">
                  (Você pode ver na sessão de gráficos da chuva)
                </a>
              </strong>
              &nbsp;é basicamente feito a média dos números obtidos
            </p>
          </div>
        </div>
      </CSSTransition>
    );
  };
  if (media0 > 50) {
    alertaChuva = [
      <div
        key="div1"
        onClick={() => handleVerifiOpen()}
        className="alertAlt alertPop"
        role="alert"
      >
        <div
          className={`o_div ${probabilidadeNeve !== null ? "case_snow" : ""}`}
        >
          <img className="chuviscos_gif" src={chuviscos} />
          <p>Chances altas de Chuva para os próximos dias!</p>
        </div>
        {probabilidadeNeve !== null && (
          <div className="div_neve" style={{ display: "flex" }}>
            <img className="neve_gif" src={neve} />
            <p className="p_snow">{probabilidadeNeve}</p>
          </div>
        )}
      </div>,
      <div key="div2">
        {modalVerif && (
          <div className="overlay" onClick={() => handleVerifiClose()}></div>
        )}
        {conteinerModal()}
      </div>,
    ];
  } else if (media0 >= 30 && media0 <= 50) {
    alertaChuva = [
      <div
        key="div1"
        onClick={() => handleVerifiOpen()}
        className="alertMed alertPop"
        role="alert"
      >
        <div
          className={`o_div ${probabilidadeNeve !== null ? "case_snow" : ""}`}
        >
          <img className="chuviscos_gif" src={chuviscos} />
          <p>Chances médias de chuva para os próximos dias!</p>
        </div>
        {probabilidadeNeve !== null && (
          <div className="div_neve" style={{ display: "flex" }}>
            <img className="neve_gif" src={neve} />
            <p className="p_snow">{probabilidadeNeve}</p>
          </div>
        )}
      </div>,
      <div key="div2">
        {modalVerif && (
          <div className="overlay" onClick={() => handleVerifiClose()}></div>
        )}
        {conteinerModal()}
      </div>,
    ];
  } else if (media0 < 30) {
    alertaChuva = [
      <div
        key="div1"
        onClick={() => handleVerifiOpen()}
        className="alertBai alertPop"
        role="alert"
      >
        <div
          className={`o_div ${probabilidadeNeve !== null ? "case_snow" : ""}`}
        >
          <img className="chuviscos_gif" src={chuviscos} />
          <p>Chances baixas de chuva para os próximos dias!</p>
        </div>

        {probabilidadeNeve !== null && (
          <div className="div_neve" style={{ display: "flex" }}>
            <img className="neve_gif" src={neve} />
            <p className="p_snow">{probabilidadeNeve}</p>
          </div>
        )}
      </div>,
      <div key="div2">
        {modalVerif && (
          <div className="overlay" onClick={() => handleVerifiClose()}></div>
        )}
        {conteinerModal()}
      </div>,
    ];
    return alertaChuva;
  }
  return <div role="alert">{alertaChuva}</div>;
}

export default AlertaChuva;
