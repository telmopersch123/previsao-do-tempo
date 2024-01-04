import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import solLimpo from "../../icones/sol.gif";
import luaLimpa from "../../icones/lua.gif";
import chuva from "../../icones/chuva.gif";
import chuvaForte from "../../icones/trovoada.gif";
import nublado from "../../icones/nublado.gif";
import neve from "../../icones/neve-unscreen.gif";
import "./index.css";

function WeatherIcon({
  weather,
  setClasses,
  cloudsData,
  rainData,
  snowData,
  unixSunrise,
  unixSunset,
  convertedDateTime,
  handleImagenControl,
}) {
  const [exibirPeriodo, setExibirPeriodo] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [stringBack, setStringBack] = useState("");
  const [icon, setIcon] = useState(false);
  useEffect(() => {
    // Chame handleImagenControl aqui para evitar o loop infinito
    handleImagenControl(stringBack);
  }, [stringBack, handleImagenControl]);

  const Situacao_clima = () => {
    let situacao;
    switch (weather.description) {
      case "few clouds":
        situacao = <p>Limpo com poucas nuvens!</p>;

        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setStringBack("limpo_dia");
        } else {
          setStringBack("limpo_noite");
        }

        break;
      case "broken clouds":
        situacao = <p>Limpo com nuvens quebradas!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setStringBack("quebradas_dia");
        } else {
          setStringBack("quebradas_noite");
        }
        break;
      case "scattered clouds":
        situacao = <p>Limpo com nuvens dispersas!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setStringBack("dispersas_dia");
        } else {
          setStringBack("dispersas_noite");
        }
        break;
      case "mist":
        situacao = <p>Lugar com Nevoeiro!</p>;
        setStringBack("nublado_period");
        break;
      case "smoke":
        situacao = <p>Lugar afumaçado!</p>;
        setStringBack("nublado_period");
        break;
      case "clear sky":
        situacao = <p>Céu Limpo!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setStringBack("limpo_dia");
        } else {
          setStringBack("limpo_noite");
        }
        break;
      default:
    }
    return situacao;
  };
  const PeriodoDoDia_icone = () => {
    if (convertedDateTime >= unixSunrise && convertedDateTime < unixSunset) {
      return (
        <div
          onClick={handleDivClick}
          style={{ width: "auto" }}
          className={`icon-wrapper icon2`}
        >
          <img className={`icones`} src={solLimpo} alt={weather.description} />
          <div>{Situacao_clima()}</div>
        </div>
      );
    } else {
      return (
        <div
          onClick={handleDivClick}
          style={{ width: "auto" }}
          className={`icon-wrapper icon2`}
        >
          <img className={`icones`} src={luaLimpa} alt={weather.description} />
          <div>{Situacao_clima()}</div>
        </div>
      );
    }
  };

  const Weather_situation = () => {
    let situation;
    setStringBack("nublado_period");
    switch (weather.description) {
      case "smoke":
        situation = (
          <p>
            <span className="Title_Icon">Fumaçado!</span>
            {` com ${cloudsData.all}% de nebulosidade`}
          </p>
        );
        break;
      case "mist":
        situation = (
          <p>
            <span className="Title_Icon">Névoa!</span>
            {` com ${cloudsData.all}% de nebulosidade`}
          </p>
        );
        break;
      case "sand":
        situation = (
          <p>
            <span className="Title_Icon">Névoa!</span>
            {` com ${cloudsData.all}% de Areia pelo Ar!`}
          </p>
        );
        break;
      case "tornado":
        situation = (
          <p>
            <span className="Title_Icon">Névoa!</span>
            {` com ${cloudsData.all}% de de invisibilidade causado por um Tornado!`}
          </p>
        );
        break;
      default:
        situation = (
          <p>
            <span className="Title_Icon">Nublado!</span>
            {` com ${cloudsData.all}% de nebulosidade`}
          </p>
        );
        break;
    }
    return situation;
  };
  const Wind_situation = () => {
    let situation;
    if (snowData === undefined) {
      setStringBack("chuva_period");
      switch (weather.description) {
        case "heavy intensity shower rain" ||
          "heavy intensity rain" ||
          "very heavy rain" ||
          "extreme rain":
          setIcon(chuvaForte);
          situation = (
            <p>
              <span className="Title_Icon">Chuva Forte!</span>
              {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
            </p>
          );
          break;
        case "light intensity drizzle":
          setIcon(chuva);
          situation = (
            <p>
              <span className="Title_Icon">Garoa!</span>
              {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
            </p>
          );
          break;
        default:
          setIcon(chuva);
          situation = (
            <p>
              <span className="Title_Icon">Chuva!</span>
              {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
            </p>
          );
          break;
      }
      return situation;
    } else {
      setStringBack("neve_period");
      switch (snowData) {
        case snowData !== undefined:
          setIcon(neve);
          situation = (
            <div className="description-text">
              <img
                className={`icones neve`}
                src={neve}
                alt={weather.description}
              />
              <p>
                <span className="Title_Icon">Nevando!</span>
                {` nessa região com ${snowData["1h"]}mm de volume de neve`}
              </p>
            </div>
          );
          break;
        default:
      }
    }
  };
  const handleDivClick = () => {
    setMostrarModal(true);
  };
  const handleModalClose = () => {
    setMostrarModal(false);
  };
  // Use uma função para lidar com o clique no span para evitar a propagação do evento
  const handleSpanClick = (e) => {
    e.stopPropagation(); // Impede que o evento se propague para a div
    handleModalClose(); // Chama a função para fechar o modal
  };

  const alternarImagem = () => {
    setExibirPeriodo(!exibirPeriodo);
  };

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 200);
  };

  return (
    <div className="icon_temp">
      {mostrarModal && (
        <div className="overlay" onClick={handleModalClose}></div>
      )}

      <CSSTransition
        in={mostrarModal}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleSpanClick}>
              &times;
            </span>
            <div className="div_avo00">
              <p className="title_temp_modal">
                Ícones do período correspondente da região
              </p>
              <div className="div_pai00">
                <div
                  onClick={() => {
                    alternarImagem();
                    handleClick();
                  }}
                  className={`div_filho00 ${clicked ? "clicked" : ""}`}
                >
                  {exibirPeriodo ? (
                    <img src={solLimpo} />
                  ) : (
                    <img src={luaLimpa} />
                  )}
                </div>
                <p className="text_temp_modal">
                  Cada ícone representa o período que está a região, o sol
                  representa que a região pesquisada esta no período diurno, e a
                  lua no noturno!
                </p>
              </div>
            </div>

            <div className="div_avo01">
              <p className="text_modal_weather">
                Ícones do tempo correspondente para a região
              </p>
              <div className="div_pai01">
                <div className="div_filhos">
                  <img src={chuva} />
                  <p>
                    Ícone que representa o período chuvoso fraco/médio na região
                    pesquisada, inclui chuviscos e sereno!
                  </p>
                </div>
                <div className="div_filhos">
                  <img src={chuvaForte} />
                  <p>
                    Ícone que representa um período chuvoso forte na região
                    pesquisada, inclui granizos, trovoadas e ventos fortes!
                  </p>
                </div>
                <div className="div_filhos">
                  <img src={nublado} />
                  <p>
                    Ícone que representa um tempo nublado na região pesquisada,
                    inclui frente fria, tempo fechado e poluição!
                  </p>
                </div>
                <div className="div_filhos">
                  <img src={neve} />
                  <p>
                    Ícone que representa um tempo nevoso na região pesquisada,
                    isso inclui estações de inverno de abundância de neve que
                    existem em algumas regiões do mundo!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      {weather.description ? <PeriodoDoDia_icone /> : <div></div>}
      {cloudsData.all >= 50 ? (
        <div onClick={handleDivClick} className="icon-wrapper icon2">
          <img className="icones" src={nublado} alt={weather.description} />
          <div>
            <Weather_situation />
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {rainData || snowData ? (
        <div onClick={handleDivClick} className="icon-wrapper icon2">
          <img
            className={`icones chuva`}
            src={icon}
            alt={weather.description}
          />
          <div>{<Wind_situation />}</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default WeatherIcon;
