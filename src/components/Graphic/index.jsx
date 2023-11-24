import { useState, useEffect } from "react";
import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { LineChart as MUILineChart } from "@mui/x-charts/LineChart";
import { convertorFahrenheit } from "../Conv";
import "./index.css";

import grapchis_icon from "../../icones/grafico-preditivo.png";
import grapchis_icon_weather from "../../icones/grafico_chuva.png";
import grapchis_icon_cloudy from "../../icones/nublado_grafico.png";
import grapchis_icon_estatistics from "../../icones/estatisticas_grafico.png";
import grapchis_icon_temper from "../../icones/temper_grapchis.png";

const Graphic = ({ dailyData, newMomentDay, Celsius }) => {
  const [morningData, setMorningData] = useState([]);

  const mapDayPeriod = (period) => {
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
  };

  const getTemperature = (dailyData, period) => {
    const day = mapDayPeriod(period);

    return (
      dailyData?.[day]?.[0]?.main || {
        temp_max: undefined,
        temp_min: undefined,
      }
    );
  };
  function getTemperature01(temperature) {
    return Celsius
      ? temperature - 273.15
      : convertorFahrenheit(temperature - 273.15);
  }

  const generateTemperatureData = (temperatureData, period, offset) => {
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
        temp_max: temp_max ? getTemperature01(temp_max).toFixed(0) : undefined,
        temp_min: temp_min
          ? getTemperature01(temp_min - offset).toFixed(0)
          : undefined,
      };
    });
  };

  const generateMorningData = () => {
    return generateTemperatureData(
      dailyData,
      newMomentDay,
      newMomentDay === "manha" ? 2 : newMomentDay === "tarde" ? 5 : 5,
    );
  };

  useEffect(() => {
    setMorningData(generateMorningData());
  }, [dailyData, newMomentDay, Celsius]);

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
  const Button = (props) => {
    const handleClick = () => {
      setShowItems(!showItems);
    };
    return (
      <div className={`div_button_grapchis`}>
        <button
          style={{
            borderRadius: showItems ? "50px 0px 0px 50px" : "50px",
          }}
          className={`button_grapchis`}
          onClick={handleClick}
        >
          <img
            style={{
              width: "35px",
              height: "30px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.419)",
              borderRadius: "10px",
              padding: "5px",
            }}
            src={grapchis_icon}
            alt="Gráficos"
          />
        </button>
        <div
          style={{
            display: showItems ? "flex" : "none",
          }}
          className={`div_tipo_grapchis ${showItems ? "div_animada" : ""}`}
        >
          <img
            onClick={() => {
              handleStatisticsIconClick();
            }}
            title="Condições de Ventos"
            src={grapchis_icon_estatistics}
            alt="Gráficos"
          />
          <p>|</p>
          <img
            onClick={() => {
              handleStatisticsIconClickTwo();
            }}
            title="Condições Sinóticas"
            src={grapchis_icon_cloudy}
            alt="Gráficos"
          />
          <p>|</p>
          <img
            onClick={() => {
              handleStatisticsIconClickFour();
            }}
            title="Condições de Chuvas"
            src={grapchis_icon_weather}
            alt="Gráficos"
          />
          <p>|</p>
          <img
            onClick={() => {
              handleStatisticsIconClickThree();
            }}
            title="Temperaturas"
            src={grapchis_icon_temper}
            alt="Gráficos"
          />
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
  const years = [
    new Date(1990, 0, 1),
    new Date(1991, 0, 1),
    new Date(1992, 0, 1),
    new Date(1993, 0, 1),
    new Date(1994, 0, 1),
    new Date(1995, 0, 1),
    new Date(1996, 0, 1),
    new Date(1997, 0, 1),
    new Date(1998, 0, 1),
    new Date(1999, 0, 1),
    new Date(2000, 0, 1),
    new Date(2001, 0, 1),
    new Date(2002, 0, 1),
    new Date(2003, 0, 1),
    new Date(2004, 0, 1),
    new Date(2005, 0, 1),
    new Date(2006, 0, 1),
    new Date(2007, 0, 1),
    new Date(2008, 0, 1),
    new Date(2009, 0, 1),
    new Date(2010, 0, 1),
    new Date(2011, 0, 1),
    new Date(2012, 0, 1),
    new Date(2013, 0, 1),
    new Date(2014, 0, 1),
    new Date(2015, 0, 1),
    new Date(2016, 0, 1),
    new Date(2017, 0, 1),
    new Date(2018, 0, 1),
  ];
  const FranceGDPperCapita = [
    28129, 28294.264, 28619.805, 28336.16, 28907.977, 29418.863, 29736.645,
    30341.807, 31323.078, 32284.611, 33409.68, 33920.098, 34152.773, 34292.03,
    35093.824, 35495.465, 36166.16, 36845.684, 36761.793, 35534.926, 36086.727,
    36691, 36571, 36632, 36527, 36827, 37124, 37895, 38515.918,
  ];

  const UKGDPperCapita = [
    26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248,
    29259.764, 30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426,
    34865.78, 35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473,
    34971, 35185, 35618, 36436, 36941, 37334, 37782.83, 38058.086,
  ];

  const GermanyGDPperCapita = [
    25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982,
    30186.945, 31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44,
    35528.715, 36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582,
    43189, 43320, 43413, 43922, 44293, 44689, 45619.785, 46177.617,
  ];
  return (
    <div className="graphics">
      <Button onCloudyIconClick={handleCloudyIconClick} />
      {selectedChart === "barChart" ? (
        <BarChart
          width={1000}
          height={400}
          data={morningData}
          style={{
            textShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
            marginTop: "60px",
          }}
        >
          <XAxis
            dataKey="day"
            tick={{ fill: "#fff" }}
            axisLine={{ stroke: "#fff" }}
          />
          <YAxis axisLine={{ stroke: "#fff" }} tick={<CustomYAxisTick />} />

          <Tooltip
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
          </Tooltip>
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{ color: "#fff", marginTop: "-15px" }}
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
            <linearGradient id="max-temp-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7a7a" />

              <stop offset="100%" stopColor="#9e2a2a" />
            </linearGradient>

            <linearGradient id="min-temp-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a9eff" />

              <stop offset="100%" stopColor="#2a459e" />
            </linearGradient>
          </defs>
        </BarChart>
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
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="center"
              iconSize={20}
              wrapperStyle={{
                marginTop: "-25px",
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
        <div style={{ position: "relative", width: "600px", height: "400px" }}>
          <MUILineChart
            xAxis={[
              {
                id: "Years",
                data: years,
                scaleType: "time",
                valueFormatter: (date) => date.getFullYear().toString(),
              },
            ]}
            series={[
              {
                id: "France",
                label: "French GDP per capita",
                data: FranceGDPperCapita,
                stack: "total",
                area: true,
                showMark: false,
              },
              {
                id: "Germany",
                label: "German GDP per capita",
                data: GermanyGDPperCapita,
                stack: "total",
                area: true,
                showMark: false,
              },
              {
                id: "United Kingdom",
                label: "UK GDP per capita",
                data: UKGDPperCapita,
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
            width={600}
            height={400}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </div>
      ) : selectedChart === "radialChart" ? (
        <div>
          <MUILineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={500}
            height={300}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Graphic;
