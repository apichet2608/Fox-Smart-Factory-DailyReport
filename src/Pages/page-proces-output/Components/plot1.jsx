import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { formatDate } from "../../../utils/formatCreateDate"; // Import formatDate function from utils
const LineChart = ({ data }) => {
  const [traces, setTraces] = useState([]);
  const [formattedTimes, setFormattedTimes] = useState([]);

  useEffect(() => {
    const formattedTimes = [];
    const newTraces = [];

    data.forEach((item) => {
      const { station_process, test_attributes_uut_stop, accumulate } = item;
      const formattedTime = formatDate(test_attributes_uut_stop);

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
          type: "scattergl",
          mode: "markers",
          // marker: {
          //   size: 0.5, // กำหนดขนาดของ markers ที่ต้องการ
          // },
          name: station_process,
          connectgaps: true, // เพิ่มตัวเลือก connectgaps เป็น false
          // transforms: [
          //   {
          //     type: "filter",
          //     target: "y",
          //     operation: ">",
          //     value: 4,
          //   },
          // ],
        });
      }
    });

    const additionalTrace = {
      x: formattedTimes,
      y: Array(formattedTimes.length).fill(19500),
      mode: "lines",
      name: "Target",
      line: {
        color: "#17EA06",
      },
      connectgaps: true, // เพิ่มตัวเลือก connectgaps เป็น false
    };

    // newTraces.push(additionalTrace);
    setFormattedTimes(formattedTimes);
    setTraces(newTraces);
  }, [data]);

  const layout = {
    xaxis: {
      tickangle: -45, // มุมการหมุนของเลเบลแกน x
      automargin: true,
      type: "category",
      categoryarray: formattedTimes,
    },
    yaxis: {
      title: "Accumulate",
    },
    // hovermode: "closest",
    // margin: {
    //   l: 50,
    //   r: 50,
    //   b: 200,
    //   t: 20,
    //   pad: 4,
    // },
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{ displayModeBar: false }}
      style={{ width: "100%", height: 600 }}
    />
  );
};

export default LineChart;
