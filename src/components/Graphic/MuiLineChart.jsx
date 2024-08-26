import React from "react";

import {
  ComposedChart,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Area,
  Line,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
const MuiLineChart = (prop) => {
  const mapDayPeriod = (period) => {
    period = prop.newMomentDay;

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
  const extractHumidityData = (period) => {
    const dayPeriod = mapDayPeriod(period);
    const days = Object.keys(prop.dailyData).map(Number); 
    const minDay = Math.min(...days);

    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;

      const windData = prop.dailyData[day]?.[dayPeriod]?.[0]?.wind || {};

      const speed = windData.speed !== undefined ? windData.speed : null;
      const gust = windData.gust !== undefined ? windData.gust : null;
      const deg = windData.deg !== undefined ? windData.deg : null;

      return {
        day: 1 + i,
        speed,
        gust,
        deg,
      };
    });
  };

  const valData = extractHumidityData();
  const data = [
    {
      name: "1",
      uv: valData[0].gust,
      amt: valData[0].speed,
    },
    {
      name: "2",
      uv: valData[1].gust,
      amt: valData[1].speed,
    },
    {
      name: "3",
      uv: valData[2].gust,
      amt: valData[2].speed,
    },
    {
      name: "4",
      uv: valData[3].gust,
      amt: valData[3].speed,
    },
    {
      name: "5",
      uv: valData[4].gust,
      amt: valData[4].speed,
    },
  ];

  const formatCustomDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day} - ${month} - ${year}`;
  };
  const getArrowCharacter = (deg) => {
    let direction;
    if (deg >= 0 && deg < 45) {
      direction = "Norte";
      return { arrow: "↑", direction };
    } else if (deg >= 45 && deg < 135) {
      direction = "Leste";
      return { arrow: "➜", direction };
    } else if (deg >= 135 && deg < 225) {
      direction = "Sul";
      return { arrow: "↓", direction }; 
    } else if (deg >= 225 && deg < 315) {
      direction = "Oeste";
      return { arrow: "↖", direction };
    } else if (deg >= 315 && deg < 360) {
      direction = "Norte";
      return { arrow: "↑", direction }; 
    } else {
      direction = "Desconhecida";
      return { arrow: "➜", direction }; 
    }
  };
  const CustomTooltip = ({ active, payload, label }) => {
    const currentDeg = valData.map((data) => data.deg);
    const arrowCharacters = currentDeg.map((deg) => getArrowCharacter(deg));
    const speedColor = "#82ca9d"; 
    const gustColor = "#ffc658";
    const dayIndex = parseInt(label - 1); 
    const selectedData = prop.dailyData[dayIndex];
    const formattedDate = selectedData
      ? formatCustomDate(selectedData.date)
      : "";

    if (active && payload && payload.length) {
      const speed = payload[0]?.payload?.amt;
      const gust = payload[0]?.payload?.uv;

      return (
        <div
          style={{
            background: "#000",
            color: "#fff",
            borderRadius: "10px",
            textAlign: "center",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          {formattedDate}
          <hr style={{ borderTop: "1px solid #fff", margin: "8px 0" }} />
          {speed !== undefined && (
            <p>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: speedColor,
                  marginRight: "5px",
                }}
              ></span>
              {`Velocidade do vento: ${speed.toFixed(2)} m/s`}
            </p>
          )}
          {gust !== undefined && (
            <p>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: gustColor,
                  marginRight: "5px",
                }}
              ></span>
              {`Rajada de vento: ${gust.toFixed(2)} m/s`}
            </p>
          )}
          <p>
            <span
              style={{
                display: "inline-block",
                fontSize: "20px",
              }}
            ></span>
            {arrowCharacters[dayIndex] && (
              <span>
                Direção do vento: {arrowCharacters[dayIndex].direction}
              </span>
            )}
          </p>
        </div>
      );
    }

    return null;
  };
  const CustomLabel = ({ x, y, index }) => {
    const currentDeg = valData[index]?.deg;
    const arrowCharacter = getArrowCharacter(currentDeg);

    return (
      <text
        x={x + -5}
        y={y}
        dy={-10}
        fill="white"
        fontSize={16}
        textAnchor="middle"
      >
        {currentDeg !== undefined && (
          <>
            {`${arrowCharacter.arrow} `}
            <span style={{ fontWeight: "bold" }}>
              {arrowCharacter.direction}
            </span>
          </>
        )}
      </text>
    );
  };
  return (
    <div style={{ width: "90%", height: "300px" }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white", dx: -10 }} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value, entry) => (
              <span style={{ color: "white" }}>{value}</span>
            )}
            iconType="circle"
            wrapperStyle={{
              color: "white",
              fontSize: "14px",
              marginTop: "-30px",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amt"
            fill="#82ca9d"
            stroke="#82ca9d"
            fillOpacity={0.3}
            name="Velocidade do Vento"
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#ffc658"
            strokeWidth={2}
            name="Rajada de Vento"
          >
            <LabelList dataKey="uv" position="top" content={<CustomLabel />} />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MuiLineChart;
