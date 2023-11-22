import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PieChart } from "@mui/x-charts/PieChart";
import { convertorFahrenheit } from "../Conv";
import "./index.css";
import grapchis_icon from "../../icones/grafico-preditivo.png";
import grapchis_icon_weather from "../../icones/grafico_chuva.png";
import grapchis_icon_cloudy from "../../icones/nublado_grafico.png";
import grapchis_icon_estatistics from "../../icones/estatisticas_grafico.png";
const Graphic = ({ dailyData, newMomentDay, Celsius }) => {
  const [morningData, setMorningData] = useState([]);
  const temperature_manha = dailyData;
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

  const getTemperature = (data, period) => {
    const day = mapDayPeriod(period);

    return (
      data?.[day]?.[0]?.main || { temp_max: undefined, temp_min: undefined }
    );
  };
  function getTemperature01(temperature) {
    return Celsius
      ? temperature - 273.15
      : convertorFahrenheit(temperature - 273.15);
  }

  const generateTemperatureData = (temperatureData, period, offset) => {
    return Array.from({ length: 5 }, (_, i) => {
      const day = i + 1;
      const { temp_max, temp_min } = getTemperature(
        temperatureData[day - 1],

        period,
      );

      return {
        day,
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
      newMomentDay === "manha" ? 2 : newMomentDay === "tarde" ? 10 : 5,
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
    const dayIndex = parseInt(label) - 1; // dayIndex começa em 1
    const selectedData = dailyData[dayIndex];
    const formattedDate = selectedData
      ? formatCustomDate(selectedData.date)
      : "";
    return (
      <div
        style={{
          background: "#141a1f",

          color: "#fff",

          borderRadius: "13px",

          textAlign: "center",

          padding: "10px",
        }}
      >
        {formattedDate}

        <hr style={{ borderTop: "1px solid", opacity: 0.5 }} />

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
  const handleCloudyIconClick = () => {
    setSelectedChart((prevChart) =>
      prevChart === "barChart" ? "pieChart" : "barChart",
    );
  };
  const [showItems, setShowItems] = useState(false);
  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },
  ];
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
            title="Pressão atmosférica"
            src={grapchis_icon_estatistics}
            alt="Gráficos"
          />
          <p>|</p>
          <img
            onClick={props.onCloudyIconClick}
            title="Condições sinóticas"
            src={grapchis_icon_cloudy}
            alt="Gráficos"
          />
          <p>|</p>
          <img title="Chuvas" src={grapchis_icon_weather} alt="Gráficos" />
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
      ) : (
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={200}
        />
      )}
    </div>
  );
};

export default Graphic;
