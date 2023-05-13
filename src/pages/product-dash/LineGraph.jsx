import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const Line = ({ dataColors, orderData, graphPeriod }) => {
  const lineEChartColors = getChartColorsArray(dataColors);
  const now = new Date();
  const to_period = graphPeriod === "all" ? 59 : now.getMinutes();
  let source_data = [["Minutes", "Orders"]];
  for (let i = 0; i <= to_period; i++) {
    const s = orderData.filter((o) => {
      const o_time = new Date(o.order_time);
      console.log("This is from Line:", o_time.getMinutes());
      return o_time.getMinutes() === i;
    });
    source_data.push([`${now.getHours()}:${i}`, s.length]);
  }
  const options = {
    tooltip: {
      trigger: "axis",
    },
    dataset: {
      source: source_data,
    },
    xAxis: {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#8791af",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#8791af",
        },
      },
      splitLine: {
        lineStyle: {
          color: "rgba(166, 176, 207, 0.1)",
        },
      },
    },
    series: [
      {
        type: "line",
        smooth: false,
        encode: {
          x: source_data[0][0],
          y: source_data[0][1],
        },
      },
    ],
    color: lineEChartColors,
    textStyle: {
      color: ["#8791af"],
    },
  };
  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  );
};
export default Line;
