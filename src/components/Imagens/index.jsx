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

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [stringBack]);

  return (
    <div key={key}>
      {(() => {
        switch (stringBack) {
          case "limpo_dia":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={limpo_dia} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "quebradas_dia":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={quebrado_dia} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "dispersas_dia":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={disperso_dia} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "limpo_noite":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={limpo_noite} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "quebradas_noite":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={quebrado_noite} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "dispersas_noite":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={disperso_noite} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "chuva_period":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={chuva_rend} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "nublado_period":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={nublado_rend} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          case "neve_period":
            return (
              <video className="imagem_paisagem" autoPlay loop muted>
                <source src={neve_red} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Imagens;
