import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LineChart = ({ data }) => {
  const [xData, setXData] = useState([]);
  const [traceData, setTraceData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item) => ({
        production_date: new Date(item.production_date).toLocaleDateString(
          "en-GB"
        ),
        test15_spi_ky: item.test15_spi_ky,
        test18_aoi: item.test18_aoi,
        test27_holding_time: item.test27_holding_time,
        test12_xray: item.test12_xray,
        iqc_flex3_et: item.iqc_flex3_et,
        test42_oqc_et: item.test42_oqc_et,
        test21_avi_percent_yield: item.test21_avi_percent_yield,
        test13_oqc_fai: item.test13_oqc_fai,
        test39_holding_time: item.test39_holding_time,
        test74_holding_time: item.test74_holding_time,
        test15_spi_ckd: item.test15_spi_ckd,
      }));

      const xValues = formattedData.map((item) => item.production_date);
      const traces = Object.keys(formattedData[0]).filter(
        (key) => key !== "production_date"
      );

      const traceData = traces.map((trace) => ({
        x: xValues,
        y: formattedData.map((item) => item[trace]),
        name: trace,
        type: "scattergl",
        mode: "lines+markers",
      }));

      setXData(xValues);
      setTraceData(traceData);
    }
  }, [data]);
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
