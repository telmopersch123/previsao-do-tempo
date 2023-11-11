import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./index.css";
const Graphic = ({ dailyData }) => {
  return (
    <div className="grapchis">
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Graphic;
