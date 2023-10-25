import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const BarChartH = ({ data, title, subtitle }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Group data by uut_attributes_defect_desc
    const groupedData = data.reduce((acc, item) => {
      const { uut_attributes_defect_desc, defect_count } = item;
      if (uut_attributes_defect_desc !== "NA") {
        if (!acc[uut_attributes_defect_desc]) {
          acc[uut_attributes_defect_desc] = defect_count;
        } else {
          acc[uut_attributes_defect_desc] += defect_count;
        }
      }
      return acc;
    }, {});

    // Sort data by defect_count in descending order
    const sortedData = Object.entries(groupedData)
      .sort((a, b) => b[1] - a[1])
      // .slice(0, 5) // Select the top 5
      .map(([key, value], index) => {
        // Determine the color based on subtitle
        let color;
        if (subtitle === "Date") {
          color = `rgb(255, ${index * 20}, ${index * 20})`; // Red shades
        } else if (subtitle === "Month") {
          color = `rgb(255, ${165 + index * 20}, 0)`; // Orange shades
        } else if (subtitle === "Week") {
          color = `rgb(155, ${index * 20}, 255)`; // Green shades
        }

        return {
          x: [value],
          y: [key],
          type: "bar",
          orientation: "h",
          name: key,
          marker: {
            color: color, // Set the color for each bar
          },
        };
      });

    // Reverse the sorted data
    const reversedData = sortedData.reverse();

    setChartData(reversedData);
  }, [data, subtitle]);

  return (
    <Plot
      data={chartData}
      layout={{
        width: 450,
        height: "100%",
        title: `Top Defect Count by ${subtitle} ${title}`,
        xaxis: {
          title: "Defect Count",
        },
        // yaxis: {
        //   title: "UUT Attributes Defect Description",
        // },
        showlegend: false,
        margin: {
          l: 120,
          r: 0,
          b: 40,
          t: 40,
          pad: 4,
        },
      }}
      config={{ displayModeBar: false }}
    />
  );
};

export default BarChartH;
