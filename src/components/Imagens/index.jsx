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
  const [videoPlay, setVideoPlay] = useState(true);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [stringBack]);

  const handlePlay = () => {
    setVideoPlay(false);
  };

  const handleClose = () => {
    setVideoPlay(true);
  };
  return (
    <div
      key={key}
      className="video-container"
      style={{ pointerEvents: "none" }}
    >
      {videoPlay && (
        <>
          {(() => {
            switch (stringBack) {
              case "limpo_dia":
                return (
                  <div className="video-conteiner">
                    <div className="liner-top"></div>
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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
                    <div id="video-overlay"></div>
                    <video
                      style={{ objectFit: "cover" }}
                      className="imagem_paisagem"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    >
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

          {/* Botão de fechar */}
          <button className="fechar-botao" onClick={handleClose}>
            Fechar Vídeo
          </button>

          <div className="gradient-overlay"></div>
        </>
      )}
    </div>
  );
};

export default Imagens;
