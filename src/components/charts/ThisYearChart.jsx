import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import moment from "moment";
import "moment/locale/uk";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Графік перевезень за поточний рік",
    },
  },
};
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const ThisYearChart = ({ item }) => {
  console.log(item.lastYear);
  console.log(item.thisYear);
  const labels = item?.thisYear?.map(
    (item) =>
      moment(item.MIS).format("MMMM").charAt(0).toUpperCase() +
      moment(item.MIS).format("MMMM").slice(1)
  );
  const dataInfo = item?.thisYear?.map((item) => item.KIL);
  const data = {
    labels,
    datasets: [
      {
        label: "Перевезень",
        data: dataInfo,
        backgroundColor: "#4299E1",
      },
    ],
  };
  return <Bar  options={options} data={data} />;
};

export default ThisYearChart;
