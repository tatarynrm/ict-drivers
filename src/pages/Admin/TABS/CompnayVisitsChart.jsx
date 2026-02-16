import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../../utils/axios'; // Використовуємо axios для запитів (якщо потрібно)
import moment from "moment";
import "moment/locale/uk";
import { Bar } from 'react-chartjs-2';

const CompanyVisitsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartDataAll, setChartDataAll] = useState(null);
  const [dataForChart, setDataForChart] = useState([]);
  const userData = useSelector((state) => state.auth.data);
  const companyName = userData?.user?.NUR;

  // Отримуємо дані для відвідувань компанії
  const getCompanyVisits = async () => {
    try {
      const data = await axios.post('/visit/visits', { company: companyName });
      
      setDataForChart(data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyVisits();
  }, [companyName]);

  useEffect(() => {
    if (dataForChart.length > 0) {
      // Фільтруємо дані тільки за поточний місяць
     
      const uniquePages = [...new Set(dataForChart.map(item => item.page))];
      const currentMonth = moment().month(); // Отримуємо поточний місяць
      const currentYear = moment().year(); // Отримуємо поточний рік

      const filteredData = dataForChart.filter(item => {
        const visitDate = moment(item.date); // Перетворюємо дату на moment
        return visitDate.month() === currentMonth && visitDate.year() === currentYear; // Перевіряємо, чи цей запис відноситься до поточного місяця
      });

      // Створюємо список всіх днів поточного місяця
      const allDaysInMonth = [];
      for (let day = 1; day <= moment().daysInMonth(); day++) {
        allDaysInMonth.push(moment().date(day).format('YYYY-MM-DD'));
      }

      // Групуємо дані за сторінкою та датою
      const groupedData = {};

      filteredData.forEach(item => {
        // Форматуємо дату для XAxis
        const dateKey = moment(item.date).format('YYYY-MM-DD'); // Форматуємо дату як YYYY-MM-DD для зручності

        // Якщо такої дати ще немає в оброблених даних, додаємо
        if (!groupedData[dateKey]) {
          groupedData[dateKey] = {};
        }

        // Додаємо значення для відповідної сторінки
        groupedData[dateKey][item.page] = (groupedData[dateKey][item.page] || 0) + item.counter;
      });

      // Перетворюємо groupedData в масив для використання в LineChart
      const transformedData = allDaysInMonth.map(date => {
        const row = { day: date };

        // Якщо дані є для цього дня, додаємо їх
        const dataForDay = groupedData[date] || {};

        // Додаємо дані по кожній сторінці
        uniquePages.forEach(page => {
          row[page] = dataForDay[page] || 0; // Якщо сторінка не має відвідувань для цього дня, ставимо 0
        });

        return row;
      });

      setChartData(transformedData);
    }
  }, [dataForChart]);

  useEffect(() => {
    // Отримуємо дані з API
    const getAllData = async ()=>{
      try {
        const result = await axios.get('visit/visits-all');
        
        if (result.data) {
          const data1 = result.data;
          const labels = data1.map(item => item?.company);
          const visitCounts = data1.map(item => parseInt(item?.visit_count, 10));
  
          setChartDataAll({
            labels,
            datasets: [
              {
                label: 'Visits (Current Month)',
                data: visitCounts,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
        
      }
    }

        
getAllData()

  }, []);
// Кастомізація Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'whitesmoke', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h4 style={{color:"red"}}>{label}</h4>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: 'green' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };
  return (
    <div>
      <h2>Відвідування компанії {companyName} за {moment().format('MMMM').toUpperCase()} місяць</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {['main', 'transpotation', 'pay-day', 'cargos', 'admin'].map((page, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={page}
              stroke={`green`} // Генеруємо випадковий колір для кожної лінії
              activeDot={{ r: 1 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>


    </div>
  );
};

export default CompanyVisitsChart;
