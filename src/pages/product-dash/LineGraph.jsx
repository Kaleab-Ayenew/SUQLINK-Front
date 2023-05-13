import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const Line = ({ dataColors, orderData, graphPeriod }) => {
  const lineEChartColors = getChartColorsArray(dataColors);
  const now = new Date();

  const graphPeriodMap = {
    hour: now.getMinutes(),
    day: now.getHours(),
    week: now.getDate(),
    month: now.getDate(),
    year: now.getMonth(),
  };

  function getTime(order, t) {
    const otime = new Date(order.order_time);
    console.log(otime, "This is the time");
    switch (t) {
      case "hour":
        return [otime.getMinutes(), otime.getHours()];
      case "day":
        return [otime.getHours(), otime.getDate()];
      case "month":
        return [otime.getDate(), otime.getMonth()];
      case "year":
        return [otime.getMonth(), otime.getYear()];
    }
  }

  const valueMap = {
    year: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const to_period = graphPeriodMap[graphPeriod];
  let source_data = [["Time", "Orders"]];
  for (let i = 0; i <= to_period; i++) {
    const s = orderData.filter((o) => {
      const o_time = getTime(o, graphPeriod);
      return o_time[0] === i;
    });
    source_data.push([
      `${graphPeriod === "year" ? valueMap["year"][i] : i}`,
      s.length,
    ]);
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
