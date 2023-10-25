import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LineChart = ({ data }) => {
  const [traces, setTraces] = useState([]);
  const [formattedTimes, setFormattedTimes] = useState([]);

  useEffect(() => {
    const formattedTimes = [];
    const newTraces = [];

    data.forEach((item) => {
      const { station_process, test_attributes_uut_stop, accumulate } = item;
      const formattedTime = new Date(test_attributes_uut_stop).toLocaleString();

      if (!formattedTimes.includes(formattedTime)) {
        formattedTimes.push(formattedTime);
      }

      const traceIndex = newTraces.findIndex((t) => t.name === station_process);
      if (traceIndex !== -1) {
        newTraces[traceIndex].x.push(formattedTime);
        newTraces[traceIndex].y.push(accumulate);
      } else {
        newTraces.push({
          x: [formattedTime],
          y: [accumulate],
          mode: "markers",
          type: "scatter",
          // marker: {
          //   size: 0.5, // กำหนดขนาดของ markers ที่ต้องการ
          // },
          name: station_process,
          connectgaps: true, // เพิ่มตัวเลือก connectgaps เป็น false
        });
      }
    });

    // const additionalTrace = {
    //   x: formattedTimes,
    //   y: Array(formattedTimes.length).fill(19500),
    //   mode: "lines",
    //   type: "scatter",
    //   name: "Target",
    //   line: {
    //     color: "#17EA06",
    //   },
    //   connectgaps: true, // เพิ่มตัวเลือก connectgaps เป็น false
    // };

    // newTraces.push(additionalTrace);
    setFormattedTimes(formattedTimes);
    setTraces(newTraces);
  }, [data]);

  const layout = {
    xaxis: {
      type: "category",
      categoryarray: formattedTimes,
    },
    yaxis: {
      title: "Accumulate",
      range: [0, "auto"], // ตั้งค่าค่าเริ่มต้นของแกน y ให้มีค่าเป็น 0
    },
    hovermode: "closest",
    margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 20,
      pad: 4,
    },
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{ displayModeBar: false }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default LineChart;
