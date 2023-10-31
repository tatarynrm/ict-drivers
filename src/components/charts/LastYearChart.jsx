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
      labels: {
        font: {
          // size: "20px",
        },
        
      },
      
    },
    title: {
      display: true,
      text: "Графік перевезень за минулий рік",
      font: "20px",
    },
  },
};


const LastYearChart = ({ item }) => {
  const labels = item?.lastYear?.map(
    (item) =>
      moment(item.MIS).format("MMMM").charAt(0).toUpperCase() +
      moment(item.MIS).format("MMMM").slice(1)
  );
  const dataInfo = item?.lastYear?.map((item) => item.KIL);
  const data = {
    labels,
    datasets: [
      {
        label: "Перевезень",
        data: dataInfo,
        backgroundColor: "#ED8936",
        title: "DASDAS",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default LastYearChart;
