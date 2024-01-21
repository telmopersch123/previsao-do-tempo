import React, { useState, useEffect } from "react";
import "./index.css";

import limpo_dia from "./videos_site/limpo_rend.mp4";
import limpo_noite from "./videos_site/limpo_n_rend.mp4";
import quebrado_dia from "./videos_site/nuvensque_rend.mp4";
import quebrado_noite from "./videos_site/quebradas_n_rend.mp4";
import disperso_dia from "./videos_site/nuvensdisp_rend.mp4";
import disperso_noite from "./videos_site/nuvensdis_n_rend.mp4";
import nublado_rend from "./videos_site/nublado_rend.mp4";
import neve_red from "./videos_site/neve_rend.mp4";
import chuva_rend from "./videos_site/chuva_rend.mp4";

const Imagens = ({ stringBack }) => {
  const [key, setKey] = useState(0);
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [stringBack]);

  return (
    <div
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      key={key}
      className="video-container"
    >
      {(() => {
        switch (stringBack) {
          case "limpo_dia":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={limpo_dia} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "quebradas_dia":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={quebrado_dia} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "dispersas_dia":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={disperso_dia} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "limpo_noite":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={limpo_noite} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "quebradas_noite":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={quebrado_noite} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "dispersas_noite":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={disperso_noite} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "chuva_period":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={chuva_rend} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "nublado_period":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={nublado_rend} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          case "neve_period":
            return (
              <div className="video-conteiner">
                <div className="liner-top"></div>
                <video className="imagem_paisagem" autoPlay loop muted>
                  <source src={neve_red} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <div className="liner-bottom"></div>
              </div>
            );
          default:
            return null;
        }
      })()}
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default Imagens;
