import React, { useState } from "react";
import "./index.css";
import { CSSTransition } from "react-transition-group";
import { icone } from "./icone.jsx";
function Alert({ daily, idProp }) {
  const [modalVerif, setModalVerifi] = useState(false);
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

  const handleVerifiOpen = () => {
    setModalVerifi(true);
  };
  const handleVerifiClose = () => {
    setModalVerifi(false);
  };
  const handleVerif = (e) => {
    e.stopPropagation();
    handleVerifiClose();
  };

  const cor = media > 25 ? "calor" : "frio";

  const conteinerModal = () => {
    return (
      <div>
        {modalVerif && (
          <div className="overlay" onClick={() => handleVerifiClose()}></div>
        )}
        <CSSTransition
          in={modalVerif}
          timeout={500}
          classNames="modal"
          unmountOnExit
        >
          <div className="modal">
            <div className="alert_avo">
              <span onClick={handleVerif} className="close">
                &times;
              </span>
              <p className="alert_text0">Alerta do clima!</p>
              <p className="alert_text1 p">
                O clima é calculado com base na previsão de até 5 dias da região
                pesquisada
              </p>
              <p className={`alert_text2 ${cor}`}>{media} °C a média</p>
              <p className="alert_text3 p">
                Com base nas temperaturas dos próximos dias&nbsp;
                <strong onClick={handleVerif} style={{ cursor: "pointer" }}>
                  <a href={`#${idProp}`}>
                    (Você pode ver na sessão de previsão do tempo)
                  </a>
                </strong>
                &nbsp;é basicamente feito a média dos números obtidos
              </p>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  };

  let alertaComponente;
  if (media > 35) {
    alertaComponente = (
      <div>
        <div
          onClick={handleVerifiOpen}
          className="alertCaElevado alert"
          role="alert"
        >
          {icone()}
          <p>Alerta! Calor elevado para esta região.</p>
        </div>
        {conteinerModal()}
      </div>
    );
  } else {
    if (media >= 25 && media <= 30) {
      alertaComponente = (
        <div>
          <div
            onClick={handleVerifiOpen}
            className="alertCaModerado alert"
            role="alert"
          >
            {icone()}
            <p>Alerta! Calor moderado para esta região.</p>
          </div>
          {conteinerModal()}
        </div>
      );
    } else {
      if (media <= 20 && media >= 15) {
        alertaComponente = (
          <div>
            <div
              onClick={handleVerifiOpen}
              className="alertFrModerado alert"
              role="alert"
            >
              {icone()}
              <p>Alerta! Frio Moderado para esta região.</p>
            </div>
            {conteinerModal()}
          </div>
        );
      } else {
        if (media <= 15) {
          alertaComponente = (
            <div>
              <div
                onClick={handleVerifiOpen}
                className="alertFrElevado alert"
                role="alert"
              >
                {icone()}
                <p>Alerta! Frio elevado para esta região.</p>
              </div>
              {conteinerModal()}
            </div>
          );
        } else {
          alertaComponente = (
            <div>
              <div
                onClick={handleVerifiOpen}
                style={{ display: "none" }}
                className="alert"
                role="alert"
              ></div>
              {conteinerModal()}
            </div>
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
