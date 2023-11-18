import { useState, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./index.css";

const Graphic = ({ dailyData, newMomentDay }) => {
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
  const generateMorningData = (temperatureData, period) => {
    return Array.from({ length: 5 }, (_, i) => {
      const day = i + 1;
      const { temp_max, temp_min } = getTemperature(
        temperatureData[day - 1],
        period,
      );

      return {
        day,
        temp_max: temp_max ? (temp_max - 273.15).toFixed(0) : undefined,
        temp_min:
          period === "manha"
            ? temp_min
              ? (temp_min - 273.15 - 2).toFixed(0)
              : undefined
            : period === "tarde"
              ? temp_min
                ? (temp_min - 273.15 - 10).toFixed(0)
                : undefined
              : period === "noite"
                ? temp_min
                  ? (temp_min - 273.15 - 5).toFixed(0)
                  : undefined
                : undefined,
      };
    });
  };

  const morningData = generateMorningData(temperature_manha, newMomentDay);

  const CustomTooltipContent = ({ payload, label }) => {
    return (
      <div
        style={{
          background: "#141a1f",
          color: "#fff",
          borderRadius: "13px",
          textAlign: "center",
          padding: "10px",
          transition: "opacity 0.01s",
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
                    backgroundColor:
                      entry.name === "Temperatura Máxima"
                        ? "#9e2a2a"
                        : "#00aaff",
                    marginRight: "5px",
                  }}
                ></div>
                <span>
                  {entry.name} : {entry.value}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="graphics">
      <BarChart
        width={1500}
        height={400}
        data={morningData}
        style={{
          textShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
          fontWeight: "300",
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
          fill="#9e2a2a"
          stackId="A"
          name="Temperatura Máxima"
          barSize={70}
          className="bar-with-shadow"
        />
        <Bar
          dataKey="temp_min"
          fill="#00aaff"
          stackId="B"
          name="Temperatura Mínima"
          barSize={70}
          className="bar-with-shadow"
        />
      </BarChart>
    </div>
  );
};

export default Graphic;
