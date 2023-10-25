import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LineChart = ({ data, titles }) => {
  const [xData, setXData] = useState([]);
  const [traceData, setTraceData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const trace1 = {
        fill: "tozeroy",
        type: "scattergl",
        name: "total_count",
        x: data.map((item) => item.lss_lot_no),
        y: data.map((item) => item.total_count),
        text: data.map((item) => item.lss_lot_no),
      };
      // const trace2 = {
      //   fill: "tozeroy",
      //   type: "scattergl",
      //   name: "total_count",
      //   x: data.map((item) => item.lss_lot_no),
      //   y: data.map((item) => item.total_count),
      //   text: data.map((item) => item.lss_lot_no),
      // };
      // setTraceData([trace1, trace2]);
      setTraceData([trace1]);
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
        title: "Output Sheet",
        xaxis: {
          title: "Lot Number",
          type: "category",
          tickangle: -45,
          automargin: true,
        },
        yaxis: {
          // range: [0, 100],
        },
      }}
    />
  );
};

export default LineChart;
