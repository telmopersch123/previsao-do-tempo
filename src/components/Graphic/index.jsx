import { useState, useEffect } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { convertorFahrenheit } from "../Conv";

import "./index.css";

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

  const CustomTooltipContent = ({ payload, label }) => {
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
        {label}

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
  const [showItems, setShowitems] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const Button = () => {
    const handleClick = () => {
      setShowitems(!showItems);
      setIsOpen(!isOpen);
    };
    const Item = () => {
      return (
        <div className={`div_tipo_grapchis ${isOpen ? "open" : ""}`}>
          <p>Item</p>
          <p>Item</p>
          <p>Item</p>
        </div>
      );
    };
    return (
      <div className="div_button_grapchis">
        <button
          style={{
            borderRadius: showItems ? "50px 0px 0px 50px" : "50px",
          }}
          className={`button_grapchis`}
          onClick={handleClick}
        >
          Gráficos
        </button>
        {showItems && <Item />}
      </div>
    );
  };

  return (
    <div className="graphics">
      <Button />
      <BarChart
        width={1500}
        height={400}
        data={morningData}
        style={{
          textShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
          fontWeight: "300",
          marginTop: "30px",
        }}
      >
        <XAxis
          dataKey="day"
          tick={{ fill: "#fff" }}
          axisLine={{ stroke: "#fff" }}
        />

        <YAxis tick={{ fill: "#fff" }} axisLine={{ stroke: "#fff" }} />

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
          formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
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
    </div>
  );
};

export default Graphic;
