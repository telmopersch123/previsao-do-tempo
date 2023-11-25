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
    const days = Object.keys(prop.dailyData).map(Number); // Converta chaves para números
    const minDay = Math.min(...days);
    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;

      const speed = prop.dailyData[day]?.[dayPeriod]?.[0]?.wind.speed;
      const gust = prop.dailyData[day]?.[dayPeriod]?.[0]?.wind.gust;

      return {
        day: 1 + i,
        speed: speed !== undefined ? speed : null,
        gust: gust !== undefined ? gust : null,
      };
    });
  };
  const valData = extractHumidityData();
  const data = [
    {
      name: "1",
      uv: valData[0].gust,
      pv: 2400,
      amt: valData[0].speed,
    },
    {
      name: "2",
      uv: valData[1].gust,
      pv: 1398,
      amt: valData[1].speed,
    },
    {
      name: "3",
      uv: valData[2].gust,
      pv: 9800,
      amt: valData[2].speed,
    },
    {
      name: "4",
      uv: valData[3].gust,
      pv: 3908,
      amt: valData[3].speed,
    },
    {
      name: "5",
      uv: valData[4].gust,
      pv: 4800,
      amt: valData[4].speed,
    },
  ];
  const formatCustomDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day} - ${month} - ${year}`;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    const speedColor = "#82ca9d"; // Cor correspondente à velocidade do vento
    const gustColor = "#ffc658";
    const dayIndex = parseInt(label - 1); // dayIndex começa em 1
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
              {`Rajada de Vento: ${gust.toFixed(2)} m/s`}
            </p>
          )}
        </div>
      );
    }

    return null;
  };
  return (
    <div style={{ width: "90%", height: "300px" }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
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
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MuiLineChart;
