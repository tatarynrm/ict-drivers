import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from '../../../utils/axios'; // Використовуємо axios для запитів (якщо потрібно)

// Реєструємо елементи для Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

// Функція для генерації динамічних кольорів
const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    colors.push(`rgba(${r}, ${g}, ${b}, 0.5)`); // Прозорий фон
  }
  return colors;
};

const VisitsPieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const result = await axios.get('visit/visits-all');
        if (result.data) {
          const data = result.data;

          const labels = data.map(item => item?.company);
          const visitCounts = data.map(item => parseInt(item?.visit_count, 10));

          // Генерація динамічних кольорів
          const dynamicColors = generateColors(data.length);

          setChartData({
            labels,
            datasets: [
              {
                data: visitCounts,
                backgroundColor: dynamicColors,
                borderColor: dynamicColors.map(color =>
                  color.replace(/0.5\)/, '1)') // Замінюємо прозорість на 1 для рамки
                ),
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllData();
  }, []);

  return (
    <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '16px' }}>
        Відвідування компаній
      </h2>
      {chartData ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Забезпечує налаштування для кастомного розміру
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const value = tooltipItem.raw;
                    return `${tooltipItem.label}: ${value} Відвідувань`;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default VisitsPieChart;
