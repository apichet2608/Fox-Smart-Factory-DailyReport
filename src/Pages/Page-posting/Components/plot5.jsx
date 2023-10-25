import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const LineChart = ({ data, title }) => {
  const [traces, setTraces] = useState([]);
  const [formattedTimes, setFormattedTimes] = useState([]);

  useEffect(() => {
    const groupedData = groupDataByTimestamp(data);

    const newTraces = [];
    const formattedTimes = [];

    for (const timestamp in groupedData) {
      const total_count = groupedData[timestamp].reduce(
        (sum, item) => sum + item.total_count,
        0
      );
      const formattedTime = new Date(timestamp).toLocaleString();

      formattedTimes.push(formattedTime);

      newTraces.push({
        x: [formattedTime],
        y: [total_count],
        type: "bar",
        name: formattedTime,
        connectgaps: true,
        text: total_count,
        marker: {
          color: "rgba(255, 0, 0, 0.5)", // Set the desired color for the bar with transparency
          line: {
            color: "rgba(0, 0, 0, 0)", // Set the line color to transparent
          },
        },
      });
    }

    setFormattedTimes(formattedTimes);
    setTraces(newTraces);
  }, [data]);

  const groupDataByTimestamp = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const { timestamp_group } = item;

      if (!groupedData[timestamp_group]) {
        groupedData[timestamp_group] = [];
      }

      groupedData[timestamp_group].push(item);
    });

    return groupedData;
  };

  const layout = {
    title: title,
    xaxis: {
      // tickangle: -40,
      automargin: true,
      type: "category",
      categoryarray: formattedTimes,
    },
    yaxis: {
      title: "total_count",
      range: [0, "auto"],
    },
    hovermode: "closest",
    // margin: {
    //   l: 50,
    //   r: 50,
    //   b: 40,
    //   t: 40,
    //   pad: 4,
    // },
    showlegend: false,
  };

  return (
    <Plot
      data={traces}
      layout={layout}
      config={{ displayModeBar: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default LineChart;
