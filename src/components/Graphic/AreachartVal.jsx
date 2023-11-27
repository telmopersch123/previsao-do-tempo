import { popoverClasses } from "@mui/material";
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
const AreaChartVal = ({ dailyData, newMomentDay, Celsius }) => {
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
    const days = Object.keys(dailyData).map(Number); // Converta chaves para números
    const minDay = Math.min(...days);

    return Array.from({ length: 5 }, (_, i) => {
      const day = minDay + i;
      const dataForDay = dailyData[day]?.[dayPeriod]?.[0] || {};

      return {
        day: 1 + i,
      pop: dataForDay.pop !== undefined ? dataForDay.pop : 0.0,
      rain: dataForDay.rain !== undefined && dataForDay.rain["3h"] !== undefined ? dataForDay.rain["3h"] : 0.0,
      snow: dataForDay.snow !== undefined ? dataForDay.snow : 0.0,
      };
    });
  };
  const valData = extractHumidityData();
const data = [
  { "name": "1", "uv": valData[0].pop, "pv": valData[0].rain, "snow": valData[0].snow },
  { "name": "2", "uv": valData[1].pop, "pv": valData[1].rain, "snow": valData[1].snow },
  { "name": "3", "uv": valData[2].pop, "pv": valData[2].rain, "snow": valData[2].snow },
  { "name": "4", "uv": valData[3].pop, "pv": valData[3].rain, "snow": valData[3].snow },
  { "name": "5", "uv": valData[4].pop, "pv": valData[4].rain, "snow": valData[4].snow },
];


return (
  <ResponsiveContainer  width="90%" height={400}>
  <AreaChart data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorsnow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#4682B4" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#00004B" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#00004B" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Area type="monotone" dataKey="snow" stroke="#FFFFFF" fillOpacity={1} fill="url(#colorsnow)" />
      <Area type="monotone" dataKey="uv" stroke="#4682B4" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="pv" stroke="#00005B" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
</ResponsiveContainer>
)
};
export default AreaChartVal;