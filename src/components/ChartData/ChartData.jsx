import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChartData.css";

import { Line, update } from "react-chartjs-2";
import { marketChartDataReducer } from "../../redux/reducers/market.chart.data.reducer";

function ChartData({ coinName, coinPrice, marketChartDataReducer }) {
  const [chartData, setChartData] = useState({});
  // const [coinLabels, setCoinLabels] = useState();

  const [coinPriceData, setCoinPriceData] = useState([
    marketChartDataReducer[0],
    marketChartDataReducer[1],
    marketChartDataReducer[2],
    marketChartDataReducer[3],

    marketChartDataReducer[4],
    marketChartDataReducer[5],
    marketChartDataReducer[6],
    marketChartDataReducer[7],

    marketChartDataReducer[8],
    marketChartDataReducer[9],
    marketChartDataReducer[10],
    marketChartDataReducer[11],

    marketChartDataReducer[12],
    marketChartDataReducer[13],
    marketChartDataReducer[14],
    marketChartDataReducer[15],

    marketChartDataReducer[16],
    marketChartDataReducer[17],
    marketChartDataReducer[18],
    marketChartDataReducer[19],

    marketChartDataReducer[20],
    marketChartDataReducer[21],
    marketChartDataReducer[22],
    coinPrice,
  ]);

  function addData(chart, data) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  const chart = () => {
    setChartData({
      labels: [
        "23h",
        "22h",
        "21h",
        "20h",
        "19h",
        "18h",
        "17h",
        "16h",
        "15h",
        "14h",
        "13h",
        "12h",
        "11h",
        "10h",
        "9h",
        "8h",
        "7h",
        "6h",
        "5h",
        "4h",
        "3h",
        "2h",
        "1h",
        "Now",
      ],
      datasets: [
        {
          label: `${coinName}`,
          data: [
            marketChartDataReducer[0],
            marketChartDataReducer[1],
            marketChartDataReducer[2],
            marketChartDataReducer[3],

            marketChartDataReducer[4],
            marketChartDataReducer[5],
            marketChartDataReducer[6],
            marketChartDataReducer[7],

            marketChartDataReducer[8],
            marketChartDataReducer[9],
            marketChartDataReducer[10],
            marketChartDataReducer[11],

            marketChartDataReducer[12],
            marketChartDataReducer[13],
            marketChartDataReducer[14],
            marketChartDataReducer[15],

            marketChartDataReducer[16],
            marketChartDataReducer[17],
            marketChartDataReducer[18],
            marketChartDataReducer[19],

            marketChartDataReducer[20],
            marketChartDataReducer[21],
            marketChartDataReducer[22],
          ],
          backgroundColor: [`rgba(75, 192, 192, 0.6)`],
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <>
      <Line
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    </>
  );
}

export default ChartData;
