import { metrics } from "./data";

import { Line } from "react-chartjs-2";

export const LineChart = () => {
  const getWeek = (date) => {
    let numberOfWeek = "";
    const day = Date.parse(date);
    const start = new Date(2021, 0, 0);
    start.setDate(start.getDate() + (1 - start.getDay()));
    const diff = day - start;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    numberOfWeek = Math.floor(diff / oneWeek);
    return numberOfWeek;
  };

  const dataFromMetrics = metrics.map((m) => {
    return {
      values: m.values_array,
      week: m.dates_array.map((date) => getWeek(date)),
    };
  });

  const dataForLineChart = dataFromMetrics.map((metric) =>
    metric.week
      .reduce((acc, v, i) => {
        acc[v] = [...(acc[v] || []), metric.values[i]];
        return acc;
      }, [])
      .map((v) => v.reduce((acc, v, i, arr) => acc + v / arr.length, 0))
  );

  const average = dataForLineChart.map((a) => Array.from(a, (i) => i || 0));

  console.log(dataForLineChart);

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 
    datasets: [
      {
        label: "Средняя оценка", 
        data: average[0], 
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "1",
      },
      {
        label: "Средняя оценка", 
        data: average[1], 
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(0, 0, 0, 0.2)",
        yAxisID: "2",
      },
      {
        label: "Средняя оценка", 
        data: average[2], 
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(100, 255, 0, 0.2)",
        yAxisID: "3",
      },
      {
        label: "Средняя оценка", 
        data: average[3], 
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(0, 255, 255, 0.2)",
        yAxisID: "4",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "1",
        },
        {
          type: "linear",
          display: false,
          position: "left",
          id: "2",
        },
        {
          type: "linear",
          display: false,
          position: "left",
          id: "3",
        },
        {
          type: "linear",
          display: false,
          position: "left",
          id: "4",
        },
      ],
    },
  };

  return (
    <>
      <div className="header">
        <h1 className="title">Line Chart</h1>
        <div className="links"></div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};
