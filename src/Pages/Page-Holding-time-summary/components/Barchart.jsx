import React from "react";
import ReactApexChart from "react-apexcharts";

const DoubleBarChart = () => {
  const options = {
    chart: {
      id: "double-bar-chart",
      type: "bar",
    },
    xaxis: {
      categories: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
      ],
    },
  };

  const series = [
    {
      name: "Series 1",
      data: [44, 55, 41, 64, 22],
    },
    {
      name: "Series 2",
      data: [25, 17, 32, 39, 51],
    },
  ];

  return (
    <div>
      <h1>Double Bar Chart Example</h1>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default DoubleBarChart;
