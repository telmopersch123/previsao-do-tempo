import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import { CSSTransition } from "react-transition-group";
import solLimpo from "../../icones/sol.gif";
import luaLimpa from "../../icones/lua.gif";
import chuva from "../../icones/chuva.gif";
import chuvaForte from "../../icones/trovoada.gif";
import nublado from "../../icones/nublado.gif";
import neve from "../../icones/neve-unscreen.gif";
import "./index.css";

function WeatherIcon({
  weather,
  cloudsData,
  rainData,
  snowData,
  unixSunrise,
  unixSunset,
  convertedDateTime,
  handleImagenControl,
}) {
  const transitionRef = useRef(null);
  const [climate, setclimate] = useState(false);
  const [situacao_clima, setSituacao_clima] = useState(false);
  const [exibirPeriodo, setExibirPeriodo] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [stringBack, setStringBack] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    handleImagenControl(stringBack);
  }, [stringBack, handleImagenControl]);

  useEffect(() => {
    const stringBack = climate;
    setStringBack(stringBack);
  }, [climate, setStringBack]);

  const Situacao_clima = useCallback(() => {
    let newSituacao;
    switch (weather.description) {
      case "few clouds":
        newSituacao = <p>Limpo com poucas nuvens!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setclimate("limpo_dia");
        } else {
          setclimate("limpo_noite");
        }

        break;
      case "broken clouds":
        newSituacao = <p>Limpo com nuvens quebradas!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setclimate("quebradas_dia");
        } else {
          setclimate("quebradas_noite");
        }
        break;
      case "scattered clouds":
        newSituacao = <p>Limpo com nuvens dispersas!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setclimate("dispersas_dia");
        } else {
          setclimate("dispersas_noite");
        }
        break;
      case "mist":
        newSituacao = <p>Lugar com Nevoeiro!</p>;
        setclimate("nublado_period");
        break;
      case "smoke":
        newSituacao = <p>Lugar afumaçado!</p>;
        setclimate("nublado_period");
        break;
      case "clear sky":
        newSituacao = <p>Céu Limpo!</p>;
        if (
          convertedDateTime >= unixSunrise &&
          convertedDateTime < unixSunset
        ) {
          setclimate("limpo_dia");
        } else {
          setclimate("limpo_noite");
        }
        break;
      default:
    }
    return newSituacao;
  }, [convertedDateTime, unixSunrise, unixSunset, weather]);

  useEffect(() => {
    const climateValue = Situacao_clima();
    setSituacao_clima(climateValue);
  }, [convertedDateTime, unixSunrise, unixSunset, weather, Situacao_clima]);

  const PeriodoDoDia_icone = useCallback(() => {
    if (convertedDateTime >= unixSunrise && convertedDateTime < unixSunset) {
      return (
        <div
          onClick={handleDivClick}
          style={{ width: "auto" }}
          className={`icon-wrapper icon2`}
        >
          <img className={`icones`} src={solLimpo} alt={weather.description} />
          <div>{situacao_clima}</div>
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
          <div>{situacao_clima}</div>
        </div>
      );
    }
  }, [convertedDateTime, situacao_clima, unixSunrise, unixSunset, weather]);

  const Weather_situation = useCallback(() => {
    let situation;
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
  }, [cloudsData, weather]);

  useEffect(() => {
    switch (weather.description) {
      case "smoke":
        setclimate("nublado_period");
        break;
      case "mist":
        setclimate("nublado_period");
        break;
      case "sand":
        setclimate("nublado_period");
        break;
      case "tornado":
        setclimate("nublado_period");
        break;
      case "broken clouds":
        setclimate("nublado_period");
        break;
      case "overcast clouds":
        setclimate("nublado_period");
        break;
    }
  }, [weather.description]);
  useEffect(() => {
    switch (weather.description) {
      case "heavy intensity shower rain":
        setclimate("chuva_period");
        setIcon(chuvaForte);
        break;
      case "heavy intensity rain":
        setclimate("chuva_period");
        setIcon(chuvaForte);
        break;
      case "very heavy rain":
        setclimate("chuva_period");
        setIcon(chuvaForte);
        break;
      case "light intensity drizzle":
        setclimate("chuva_period");
        setIcon(chuva);
        break;
      case "extreme rain":
        setclimate("chuva_period");
        setIcon(chuvaForte);
        break;
      default:
        if (snowData !== undefined) {
          setclimate("neve_period");
          setIcon(neve);
        } else {
          if (rainData !== undefined) {
            setclimate("chuva_period");
            setIcon(chuva);
          }
        }
        break;
    }
  }, [weather.description, snowData, rainData]);
  const Wind_situation = useCallback(() => {
    let situation;

    if (rainData !== undefined) {
      switch (weather.description) {
        case "heavy intensity shower rain" ||
          "heavy intensity rain" ||
          "very heavy rain" ||
          "extreme rain":
          situation = (
            <p>
              <span className="Title_Icon">Chuva Forte!</span>
              {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
            </p>
          );
          break;
        case "light intensity drizzle":
          situation = (
            <p>
              <span className="Title_Icon">Garoa!</span>
              {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
            </p>
          );
          break;
        default:
          situation = (
            <p>
              <span className="Title_Icon">Chuva!</span>
              {` com ${rainData["1h"]}mm de Volume de Chuva na última 1 Hora!`}
            </p>
          );
          break;
      }
    } else {
      situation = (
        <p>
          <span className="Title_Icon">Nevando!</span>
          {` nessa região com ${snowData["1h"]}mm de volume de neve`}
        </p>
      );
    }
    return situation;
  }, [rainData, snowData, weather]);

  const handleDivClick = () => {
    setMostrarModal(true);
  };
  const handleModalClose = () => {
    setMostrarModal(false);
  };

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
        nodeRef={transitionRef}
        in={mostrarModal}
        timeout={500}
        classNames="modal"
        unmountOnExit
      >
        <div ref={transitionRef} className="modal">
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
