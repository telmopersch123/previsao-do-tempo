import { useState, useEffect, useCallback } from "react";

import * as React from "react";
import AreaChartVal from "./AreachartVal";
import MuiLineChart from "./MuiLineChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { convertorFahrenheit } from "../Conv";
import "./index.css";

import grapchis_icon from "../../icones/grafico-preditivo.png";
import grapchis_icon_weather from "../../icones/grafico_chuva.png";
import grapchis_icon_cloudy from "../../icones/nublado_grafico.png";
import grapchis_icon_estatistics from "../../icones/estatisticas_grafico.png";
import grapchis_icon_temper from "../../icones/temper_grapchis.png";

const Graphic = ({
  dailyData,
  newMomentDay,
  Celsius,
  idWind,
  verifValue,
  onVerifValueChange,
}) => {
  const [morningData, setMorningData] = useState([]);
  const mapDayPeriod = useCallback(
    (period) => {
      period = newMomentDay;
      switch (period) {
        case "manha":
          return "morning";

        case "tarde":
          return "afternoon";

        case "noite":
          return "night";

        default:
          return period;
      }
    },
    [newMomentDay],
  );
  const getTemperature = useCallback(
    (dailyData, period) => {
      const day = mapDayPeriod(period);
      return (
        dailyData?.[day]?.[0]?.main || {
          temp_max: undefined,
          temp_min: undefined,
        }
      );
    },
    [mapDayPeriod],
  );
  const getTemperature01 = useCallback(
    (temperature) => {
      return Celsius
        ? temperature - 273.15
        : convertorFahrenheit(temperature - 273.15);
    },
    [Celsius],
  );

  const generateTemperatureData = useCallback(
    (temperatureData, period, offset) => {
      const days = Object.keys(temperatureData).map(Number); // Converta chaves para números
      const minDay = Math.min(...days);
      return Array.from({ length: 5 }, (_, i) => {
        const day = minDay + i;
        const { temp_max, temp_min } = getTemperature(
          temperatureData[day],
          period,
        );

        return {
          day: i + 1,
          temp_max: temp_max
            ? getTemperature01(temp_max).toFixed(0)
            : undefined,
          temp_min: temp_min
            ? getTemperature01(temp_min - offset).toFixed(0)
            : undefined,
        };
      });
    },
    [getTemperature, getTemperature01],
  );

  const generateMorningData = useCallback(() => {
    return generateTemperatureData(
      dailyData,
      newMomentDay,
      newMomentDay === "manha" ? 2 : newMomentDay === "tarde" ? 5 : 5,
    );
  }, [dailyData, generateTemperatureData, newMomentDay]);

  useEffect(() => {
    setMorningData(generateMorningData());
  }, [dailyData, Celsius, newMomentDay, generateMorningData]);

  const formatCustomDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day} - ${month} - ${year}`;
  };
  const CustomTooltipContent = ({ payload, label }) => {
    const dayIndex = parseInt(label - 1); // dayIndex começa em 1
    const selectedData = dailyData[dayIndex];
    const formattedDate = selectedData
      ? formatCustomDate(selectedData.date)
      : "";
    return (
      <div
        style={{
          background: "#1d2938",
          color: "#fff",
          borderRadius: "10px",
          textAlign: "center",
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {formattedDate}

        <hr style={{ borderTop: "1px solid #445366", margin: "8px 0" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {payload &&
            payload.map((entry, index) => (
              <div
                key={index}
                style={{
                  display: "flex",

                  alignItems: "center",

                  marginRight: "10px",
                }}
              >
                <div
                  style={{
                    width: "10px",

                    height: "10px",

                    borderRadius: "50%",

                    background: `linear-gradient(to right, ${
                      entry.name === "Temperatura Máxima"
                        ? "#9e2a2a, #ff7a7a"
                        : "#00aaff, #7ad4ff"
                    })`,

                    marginRight: "5px",
                  }}
                ></div>
                <span>
                  {entry.name} : {entry.value} °{Celsius ? "C" : "F"}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const [selectedChart, setSelectedChart] = useState("barChart");
  const [showItems, setShowItems] = useState(false);
  const handleStatisticsIconClick = () => {
    setSelectedChart("lineChart");
  };
  const handleStatisticsIconClickTwo = () => {
    setSelectedChart("pieChart");
  };
  const handleStatisticsIconClickThree = () => {
    setSelectedChart("barChart");
  };
  const handleStatisticsIconClickFour = () => {
    setSelectedChart("radialChart");
  };
  const handleCloudyIconClick = () => {
    setSelectedChart((prevChart) =>
      prevChart === "barChart"
        ? "lineChart"
        : prevChart === "lineChart"
        ? "pieChart"
        : prevChart === "pieChart"
        ? "radialChart"
        : "barChart",
    );
  };
  useEffect(() => {
    if (verifValue) {
      setSelectedChart("radialChart");
      onVerifValueChange();
    }
  }, [onVerifValueChange, verifValue]);

  const Button = () => {
    const handleClick = () => {
      setShowItems(!showItems);
    };

    const LightTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
      },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        color: "rgb(255, 255, 255, 0.900) !important",
        boxShadow: theme.shadows[1],
        fontSize: 11,
      },
    }));

    return (
      <div className={`div_button_grapchis`}>
        <button
          style={{
            borderRadius: showItems ? "50px 0px 0px 50px" : "50px",
          }}
          className={`button_grapchis`}
          onClick={handleClick}
        >
          <img className="img_escolhe" src={grapchis_icon} alt="Gráficos" />
        </button>
        <div
          style={{
            display: showItems ? "flex" : "none",
          }}
          className={`div_tipo_grapchis ${showItems ? "div_animada" : ""}`}
        >
          <LightTooltip title="Condições de Ventos">
            <img
              onClick={() => {
                handleStatisticsIconClick();
              }}
              src={grapchis_icon_estatistics}
              alt="Gráficos"
            />
          </LightTooltip>
          <p>|</p>
          <LightTooltip title="Condições Sinóticas">
            <img
              onClick={() => {
                handleStatisticsIconClickTwo();
              }}
              src={grapchis_icon_cloudy}
              alt="Gráficos"
            />
          </LightTooltip>
          <p>|</p>
          <LightTooltip title="Condições de Chuvas">
            <img
              onClick={() => {
                handleStatisticsIconClickFour();
              }}
              src={grapchis_icon_weather}
              alt="Gráficos"
            />
          </LightTooltip>
          <p>|</p>
          <LightTooltip title="Temperaturas">
            <img
              onClick={() => {
                handleStatisticsIconClickThree();
              }}
              src={grapchis_icon_temper}
              alt="Gráficos"
            />
          </LightTooltip>
        </div>
      </div>
    );
  };
  const CustomYAxisTick = ({ x, y, payload }) => {
    const unitSymbol = Celsius ? "°C" : "°F";
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={-4} textAnchor="end" fill="#fff" fontSize={14}>
          {`${payload.value} ${unitSymbol}`}
        </text>
      </g>
    );
  };

  const extractHumidityData = (period) => {
    const dayPeriod = mapDayPeriod(period);
    const days = Object.keys(dailyData).map(Number); // Converta chaves para números
    const minDay = Math.min(...days);
    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;
      const humidity = dailyData[day]?.[dayPeriod]?.[0]?.main.humidity;
      const visibility = dailyData[day]?.[dayPeriod]?.[0]?.visibility / 1000;
      const cloudy = dailyData[day]?.[dayPeriod]?.[0]?.clouds.all;
      return {
        day: 1 + i,
        humidity: humidity !== undefined ? humidity : null,
        visibility: visibility !== undefined ? visibility : null,
        cloudy: cloudy !== undefined ? cloudy : null,
      };
    });
  };
  const valData = extractHumidityData();

  const CustomTooltip = ({ active, payload, label }) => {
    const dayIndex = parseInt(label - 1); // dayIndex começa em 1
    const selectedData = dailyData[dayIndex];
    const formattedDate = selectedData
      ? formatCustomDate(selectedData.date)
      : "";
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#1d2938",
            color: "#fff",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {formattedDate}
          <hr style={{ borderTop: "1px solid #445366", margin: "8px 0" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {payload.map((entry, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 0",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: entry.stroke,
                    marginRight: "8px",
                  }}
                ></div>
                <span>
                  {entry.name === "Visibilidade"
                    ? ` ${entry.value} KM de ${entry.name}`
                    : ` ${entry.value} % de ${entry.name}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div id={idWind} className="graphics">
      <Button onCloudyIconClick={handleCloudyIconClick} />
      {selectedChart === "barChart" ? (
        <ResponsiveContainer width="90%" height={300}>
          <BarChart
            data={morningData}
            style={{
              textShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            <XAxis
              dataKey="day"
              tick={{ fill: "#fff" }}
              axisLine={{ stroke: "#fff" }}
            />
            <YAxis axisLine={{ stroke: "#fff" }} tick={<CustomYAxisTick />} />

            <RechartsTooltip
              labelFormatter={(day) => (
                <div>
                  {day}

                  <hr style={{ borderTop: "1px solid", opacity: 0.5 }} />
                </div>
              )}
              contentStyle={{
                background: "#141a1f",

                color: "#fff",

                border: "none",

                borderRadius: "13px",

                textAlign: "center",
              }}
              itemStyle={{
                color: "#fff",
              }}
              content={<CustomTooltipContent />}
            >
              {/* outros conteúdos do Tooltip */}
            </RechartsTooltip>
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                color: "#fff",
                marginTop: "-30px",
              }}
              iconType="square"
              iconSize={10}
              formatter={(value) => (
                <span style={{ color: "#fff" }}>{value}</span>
              )}
            />
            <Bar
              dataKey="temp_max"
              fill="url(#max-temp-gradient)"
              stackId="A"
              name="Temperatura Máxima"
              barSize={70}
              className="bar-with-shadow"
            />
            <Bar
              dataKey="temp_min"
              fill="url(#min-temp-gradient)"
              stackId="B"
              name="Temperatura Mínima"
              barSize={70}
              className="bar-with-shadow"
            />
            <defs>
              <linearGradient
                id="max-temp-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#ff7a7a" />

                <stop offset="100%" stopColor="#9e2a2a" />
              </linearGradient>

              <linearGradient
                id="min-temp-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#7a9eff" />

                <stop offset="100%" stopColor="#2a459e" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      ) : selectedChart === "pieChart" ? (
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart
            data={valData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis
              tick={{ fill: "#fff" }}
              axisLine={{ stroke: "#fff" }}
              dataKey="day"
            />
            <YAxis tick={{ fill: "#fff" }} axisLine={{ stroke: "#fff" }} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="center"
              iconSize={20}
              wrapperStyle={{
                marginTop: "-30px",
                display: "flex",
                justifyContent: "center",
              }}
              content={(props) => {
                return (
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {props.payload.map((entry, index) => (
                      <li
                        key={`item-${index}`}
                        style={{ display: "inline-block", marginRight: "20px" }}
                      >
                        <div
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: entry.color,
                            marginRight: "8px",
                            display: "inline-block",
                          }}
                        />
                        <span style={{ color: "#fff" }}>{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                );
              }}
            />
            {valData.map((data, index, array) => {
              const nextDay = array[index + 1]?.day || data.day;

              return (
                <ReferenceArea
                  key={`reference-area-${index}-overlay`}
                  x1={data.day}
                  x2={nextDay}
                  y1={0}
                  y2={Math.max(
                    data.visibility || 0,
                    array[index + 1]?.visibility || 0,
                  )}
                  stroke="none"
                  fill="#6BB7E3"
                  fillOpacity={0.1}
                />
              );
            })}
            <RechartsLine
              type="monotone"
              dataKey="humidity"
              name="Umidade"
              stroke="#6BB7E3"
              strokeWidth={3}
              dot={{ strokeWidth: 3, r: 4, fill: "#6BB7E3" }}
              activeDot={{ r: 8 }}
            />
            <RechartsLine
              type="monotone"
              dataKey="cloudy"
              name="Nublado"
              stroke="#A5A5A5"
              strokeWidth={3}
              dot={{ strokeWidth: 3, r: 4, fill: "#A5A5A5" }}
              activeDot={{ r: 8 }}
            />
            <RechartsLine
              type="monotone"
              dataKey="visibility"
              name="Visibilidade"
              stroke="#00AEEF"
              strokeWidth={3}
              dot={{ strokeWidth: 3, r: 4, fill: "#00AEEF" }}
              activeDot={{ r: 8 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      ) : selectedChart === "lineChart" ? (
        <MuiLineChart newMomentDay={newMomentDay} dailyData={dailyData} />
      ) : selectedChart === "radialChart" ? (
        <AreaChartVal
          idWind={idWind}
          newMomentDay={newMomentDay}
          dailyData={dailyData}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Graphic;
