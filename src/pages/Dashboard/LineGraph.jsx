import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const Line = ({ dataColors, statData, graphPeriod }) => {
  const lineEChartColors = getChartColorsArray(dataColors);
  const now = new Date();

  const graphPeriodMap = {
    hour: now.getMinutes(),
    day: now.getHours(),
    week: now.getDate(),
    month: now.getDate(),
    year: now.getMonth(),
  };

  function getTime(sale, t) {
    const stime = new Date(sale.sale_timestamp);
    console.log(stime, "This is the time");
    switch (t) {
      case "hour":
        return [stime.getMinutes(), stime.getHours()];
      case "day":
        return [stime.getHours(), stime.getDate()];
      case "month":
        return [stime.getDate(), stime.getMonth()];
      case "year":
        return [stime.getMonth(), stime.getYear()];
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
  let source_data = [["Time", "Sales"]];
  let all_sales = [];
  statData.product_stats.forEach((product) => {
    product.product_sales.forEach((val) => {
      all_sales.push({ ...val, product_name: product.product_name });
    });
  });
  console.log("These are sales", all_sales);
  for (let i = 0; i <= to_period; i++) {
    const s = all_sales.filter((p) => {
      const s_time = getTime(p, graphPeriod);
      return s_time[0] === i;
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
