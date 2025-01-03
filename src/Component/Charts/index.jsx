import React from "react";

import "./style.css";

import { Line, Pie } from "@ant-design/charts";

const ChartComponenets = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return {
      date: item.date,
      amount: item.amount,
    };
  });
  const spendingData = sortedTransactions.filter((item) => {
    if (item.type == "expense") {
      return {
        tag: item.tag,
        amount: item.amount,
      };
    }
  });
  let finalSpending = spendingData.reduce((acc, obj) => {
    let existingObj = acc.find((o) => o.tag === obj.tag);
    if (existingObj) {
      existingObj.amount += obj.amount;
    } else {
      acc.push({ tag: obj.tag, amount: obj.amount });
    }
    return acc;
  }, []);

  const config = {
    data: data,
    height: 400,
    width: 700,
    autofit: false,
    xField: "date",
    yField: "amount",
  };
  const spendingConfig = {
    data: Object.values(finalSpending),
    height: 400,
    width: 700,
    angleField: "amount",
    colorField: "tag",
  };
  let chart;
  let pieChart;

  return (
    <div className="chart-wrapper">
      <div style={{ boxShadow: "var(--shadow)", borderRadius: "0.6rem" }}>
        <h2>Your Analytics</h2>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
        />
        ;
      </div>

      <div style={{ boxShadow: "var(--shadow)", borderRadius: "0.6rem" }}>
        <h2>Your Spendings</h2>
        <Pie
          {...spendingConfig}
          onReady={(chartInstance) => (pieChart = chartInstance)}
        />
        ;
      </div>
    </div>
  );
};

export default ChartComponenets;
