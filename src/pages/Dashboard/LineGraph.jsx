import React from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { round } from "lodash";

const Line = ({ dataColors, statData, graphPeriod }) => {
  const lineEChartColors = getChartColorsArray(dataColors);
  const now = new Date();

  const graphPeriodMap = {
    hour: now.getMinutes(),
    day: now.getHours(),
    month: now.getDate() - 1,
    year: now.getMonth(),
  };

  function getTime(sale, t) {
    const stime = new Date(sale.sale_timestamp);
    console.log(stime, "This is the time");
    switch (t) {
      case "hour":
        return [
          stime.getMinutes(),
          [
            stime.getFullYear(),
            stime.getMonth(),
            stime.getDate(),
            stime.getHours(),
          ],
        ];
      case "day":
        return [
          stime.getHours(),
          [stime.getFullYear(), stime.getMonth(), stime.getDate()],
        ];
      case "month":
        return [stime.getDate(), [stime.getFullYear(), stime.getMonth()]];
      case "year":
        return [stime.getMonth(), [stime.getFullYear()]];
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

  function getTimeLable(i, graphPeriod) {
    const now = new Date();
    switch (graphPeriod) {
      case "year":
        return valueMap.year[i];
      case "month":
        const currentMonth = valueMap.year[now.getMonth()];
        return `${currentMonth} ${i + 1}`;
      case "day":
        return `${i} o'clock`;
      case "hour":
        const t = i < 10 ? `0${i}` : i;
        const currentHour = now.getHours();
        return `${currentHour}:${t}`;
    }
  }

  function getTotalIncome(sales) {
    let sum = 0;
    sales.forEach((item) => (sum = sum + parseFloat(item.product_price)));
    return round(sum * 0.8, 2);
  }

  const to_period = graphPeriodMap[graphPeriod];
  let source_data = [["Time", "Revenue"]];
  let all_sales = [];
  statData.product_stats.forEach((product) => {
    product.product_sales.forEach((val) => {
      if (val.completed) {
        all_sales.push({
          ...val,
          product_name: product.product_name,
          product_price: product.product_price,
        });
      }
    });
  });
  console.log("These are sales", all_sales);
  for (let i = 0; i <= to_period; i++) {
    const s = all_sales.filter((sale) => {
      const sale_time = getTime(sale, graphPeriod);
      const now = new Date();
      const compNow = [
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
      ].slice(0, sale_time[1].length);

      const saleTimeComp = ["year", "day", "hour"].includes(graphPeriod)
        ? sale_time[0] === i && sale_time[1].toString() === compNow.toString()
        : sale_time[0] === i + 1 &&
          sale_time[1].toString() === compNow.toString();
      return saleTimeComp && sale.completed === true;
    });
    source_data.push([`${getTimeLable(i, graphPeriod)}`, getTotalIncome(s)]);
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
      name: "Time",
      axisLine: {
        lineStyle: {
          color: "#8791af",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Income",
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
        name: "Revenue in ETB",
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
