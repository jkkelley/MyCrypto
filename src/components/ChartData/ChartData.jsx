import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ChartData.css";

import { Line } from "react-chartjs-2";

function ChartData({ currentPrice, coinName, marketChartDataReducer }) {
  const dispatch = useDispatch();
  console.log(`marketChartDataReducer =>`, marketChartDataReducer);
  // const marketChartDataReducer = useSelector(
  //   (store) => store.marketChartDataReducer
  // );
  // Local State for Chart
  const [chartData, setChartData] = useState({});
  console.log(currentPrice[0]?.current_price);
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
            marketChartDataReducer[0][1],
            marketChartDataReducer[1][1],
            marketChartDataReducer[2][1],
            marketChartDataReducer[3][1],

            marketChartDataReducer[4][1],
            marketChartDataReducer[5][1],
            marketChartDataReducer[6][1],
            marketChartDataReducer[7][1],

            marketChartDataReducer[8][1],
            marketChartDataReducer[9][1],
            marketChartDataReducer[10][1],
            marketChartDataReducer[11][1],

            marketChartDataReducer[12][1],
            marketChartDataReducer[13][1],
            marketChartDataReducer[14][1],
            marketChartDataReducer[15][1],

            marketChartDataReducer[16][1],
            marketChartDataReducer[17][1],
            marketChartDataReducer[18][1],
            marketChartDataReducer[19][1],

            marketChartDataReducer[20][1],
            marketChartDataReducer[21][1],
            marketChartDataReducer[22][1],
            currentPrice[0]?.current_price,
          ],
          backgroundColor: [`rgba(75, 192, 192, 0.6)`],
        },
      ],
    });
  };

  // useEffect(async () => {
  //   await dispatch({ type: "FETCH_MARKET_CHART_DATA", payload: coinName });
  // }, []);

  useEffect(async () => {
    await chart();
  }, []);

  return (
    <>
      {marketChartDataReducer ? (
        <div className="market-chart-data-container">
          <Line
            data={chartData}
            options={{
              responsive: true,
            }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ChartData;
