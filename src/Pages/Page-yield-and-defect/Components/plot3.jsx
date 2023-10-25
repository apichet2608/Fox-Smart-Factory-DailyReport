import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LineChart = ({ data, titles }) => {
  const [xData, setXData] = useState([]);
  const [traceData, setTraceData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const trace1 = {
        type: "scattergl",
        mode: "lines",
        name: "Target",
        x: data.map((item) => item.lss_lot_no),
        y: new Array(data.length).fill(99), // สร้างอาร์เรย์ขนาดเท่ากับจำนวนข้อมูลแล้วเติมค่า 95 ทุกตำแหน่ง
        text: data.map((item) => item.lss_lot_no),
        marker: {
          color: "#ffff00", // กำหนดสีเขียวffff00
        },
      };
      const warning = {
        type: "scattergl",
        mode: "lines",
        name: "Warning",
        x: data.map((item) => item.lss_lot_no),
        y: new Array(data.length).fill(98.5), // สร้างอาร์เรย์ขนาดเท่ากับจำนวนข้อมูลแล้วเติมค่า 95 ทุกตำแหน่ง
        text: data.map((item) => item.lss_lot_no),
        marker: {
          color: "#ff2e10", // ff2e10
        },
      };
      const trace2 = {
        type: "scattergl",
        mode: "lines+markers",
        name: "percent_yield",
        x: data.map((item) => item.lss_lot_no),
        y: data.map((item) => item.percent_yield),
        text: data.map((item) => item.lss_lot_no),
        marker: {
          color: "#17ea06", // กำหนดสีเขียว
        },
      };
      setTraceData([trace1, warning, trace2]);
    }
  }, [data, titles]);

  if (!data || data.length === 0) {
    return <div>Wait Api Data</div>;
  }
  return (
    <Plot
      data={traceData}
      layout={{
        width: "100%",
        height: "100%",
        title: "% Yield",
        xaxis: {
          title: "Lot Number",
          type: "category",
          tickangle: -45,
          automargin: true,
        },
        showlegend: true,
        legend: {
          x: 1,
          xanchor: "right",
          y: 1.2,
        },
        yaxis: {
          // range: [90, 100],
        },
      }}
    />
  );
};

export default LineChart;
