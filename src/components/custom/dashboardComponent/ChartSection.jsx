import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const ChartSection = () => {
  return (
    <div className="card mt-4 p-3">
      <h5 className="mb-3">Weekly Activity Overview</h5>
      <LineChart
        height={300}
        series={[{ data: [3, 5, 2, 8, 6, 7], label: "Activity" }]}
        xAxis={[{
          scaleType: "point",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }]}
      />
    </div>
  );
};

export default ChartSection;