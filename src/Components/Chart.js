import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Nunito";

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
          },
        },
      ],
    },
  },
};

export function Chart({ rawData, startDate, endDate }) {
  const dataByMonth = rawData.reduce((result, obj) => {
    const { cases, deaths, month, year, day } = obj;

    const dateLabel = `${year}-${month}`;

    const date = new Date(`${year}-${month}-${day}`);
    if (date >= startDate && date <= endDate) {
      if (!result[dateLabel]) {
        result[dateLabel] = {
          cases: 0,
          deaths: 0,
        };
      }
      result[dateLabel].cases += cases;
      result[dateLabel].deaths += deaths;
    }

    return result;
  }, []);

  const sortedDataByMonth = Object.keys(dataByMonth)
    .sort()
    .reduce((obj, key) => {
      obj[key] = dataByMonth[key];
      return obj;
    }, {});

  const labels = Object.keys(sortedDataByMonth);

  const caseNumber = Object.values(sortedDataByMonth).map((mon) => {
    return mon.cases;
  });

  const deathNumber = Object.values(sortedDataByMonth).map((mon) => {
    return mon.deaths;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: caseNumber,
        borderColor: "#ffd770",
        backgroundColor: "#ffd770",
      },
      {
        label: "Deaths",
        data: deathNumber,
        borderColor: "#c35562",
        backgroundColor: "#c35562",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
