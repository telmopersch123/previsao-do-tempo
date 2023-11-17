import { BarChart } from "@mui/x-charts";
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

  // Gerar dados de temperatura para a manhã nos primeiros 5 dias
  const generateMorningData = (temperatureData) => {
    return Array.from({ length: 5 }, (_, i) => {
      const day = i;
      const { temp_max, temp_min } = getTemperature(
        temperatureData[day],
        "morning",
      );

      return {
        temp_max: temp_max ? (temp_max - 273.15).toFixed(0) : undefined,
        temp_min: temp_min ? (temp_min - 273.15 - 3).toFixed(0) : undefined,
      };
    });
  };
  const labelStyle = {
    fill: "white", // Substitua 'white' pela cor desejada
  };
  const morningData = generateMorningData(temperature_manha);

  return (
    <div className="grapchis">
      <BarChart
        series={[
          {
            data: morningData.map((day) => day.temp_max),
            stack: "B",
            label: "Temperatura Máxima",
            color: "#9e2a2a",
          },
          {
            data: morningData.map((day) => day.temp_min),
            label: "Temperatura Mínima",
            color: "#00aaff",
          },
        ]}
        width={1000}
        height={500}
      />
    </div>
  );
};

export default Graphic;
