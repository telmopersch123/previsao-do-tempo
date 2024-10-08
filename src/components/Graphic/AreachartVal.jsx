import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
// pop,rain,snow
const AreaChartVal = ({ dailyData, newMomentDay }) => {
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
  const extractHumidityData = (period) => {
    const dayPeriod = mapDayPeriod(period);
    const days = Object.keys(dailyData).map(Number); 
    const minDay = Math.min(...days);

    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;
      const dataForDay = dailyData[day]?.[dayPeriod]?.[0] || {};

      return {
        day: 1 + i,
        pop: dataForDay.pop !== undefined ? dataForDay.pop : 0.0,
        rain:
          dataForDay.rain !== undefined &&
          parseInt(dataForDay.rain?.["3h"]) !== undefined
            ? parseInt(dataForDay.rain?.["3h"])
            : 0.0,
        snow:
          dataForDay.snow?.["3h"] !== undefined ? dataForDay.snow?.["3h"] : 0.0,
      };
    });
  };

  const valData = extractHumidityData();
  const data = [
    {
      name: "1",
      uv: valData[0].pop,
      pv: valData[0].rain,
      snow: valData[0].snow,
    },
    {
      name: "2",
      uv: valData[1].pop,
      pv: valData[1].rain,
      snow: valData[1].snow,
    },
    {
      name: "3",
      uv: valData[2].pop,
      pv: valData[2].rain,
      snow: valData[2].snow,
    },
    {
      name: "4",
      uv: valData[3].pop,
      pv: valData[3].rain,
      snow: valData[3].snow,
    },
    {
      name: "5",
      uv: valData[4].pop,
      pv: valData[4].rain,
      snow: valData[4].snow,
    },
  ];
  const formatCustomDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day} - ${month} - ${year}`;
  };
  const CustomTooltip = ({ active, payload, label }) => {
    const dayIndex = parseInt(label - 1);
    const selectedData = dailyData[dayIndex];
    const formattedDate = selectedData
      ? formatCustomDate(selectedData.date)
      : "";

    if (active && payload && payload.length) {
      const rain = payload[0]?.payload?.pv;
      const pop = payload[0]?.payload?.uv;
      const snow = payload[0]?.payload?.snow;

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
          {rain !== undefined && (
            <p>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#0A4F6D",
                  marginRight: "5px",
                }}
              ></span>
              <span>Volume de chuva </span>
              <span style={{ color: "#0A4F6D", fontWeight: "bold" }}>
                {rain.toFixed(2)}mm
              </span>
            </p>
          )}
          {pop !== undefined && (
            <p>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#00796B",
                  marginRight: "5px",
                }}
              ></span>
              {`Probabilidade de chuva: ${pop.toFixed(1) * 100} %`}
            </p>
          )}
          {snow !== undefined && (
            <p>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  marginRight: "5px",
                }}
              ></span>
              <span>Volume de neve </span>
              <span style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {snow.toFixed(2)}mm
              </span>
            </p>
          )}
        </div>
      );
    }
  };
  return (
    <ResponsiveContainer width="90%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorsnow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00796B" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#00796B" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#003366" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#003366" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#FFFFFF" />
        <YAxis stroke="#FFFFFF" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="snow"
          stroke="#FFFFFF"
          fillOpacity={1}
          fill="url(#colorsnow)"
        />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#00796B"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#003366"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartVal;
