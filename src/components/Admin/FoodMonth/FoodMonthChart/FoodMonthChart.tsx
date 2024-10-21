import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { convertDaysToDate } from "../../../../utils/convertDaysToDate";

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface DayData {
  calories: string;
  carbohydrate: string;
  date_int: string;
  fat: string;
  protein: string;
}

interface MonthData {
  day: DayData[] | DayData;
  from_date_int: string;
  to_date_int: string;
}

interface WeightChartProps {
  month: MonthData;
}

const FoodMonthChart: React.FC<WeightChartProps> = ({ month }) => {
  const isArray = Array.isArray(month.day);

  // Получаем даты в зависимости от того, является day массивом или объектом
  const dates = isArray
    ? (month.day as DayData[]).map((day) => convertDaysToDate(Number(day.date_int)).slice(0, 5))
    : [convertDaysToDate(Number((month.day as DayData).date_int)).slice(0, 5)];

  // Получаем данные о калориях в зависимости от типа day
  const calories = isArray
    ? (month.day as DayData[]).map((day) => parseFloat(day.calories))
    : [parseFloat((month.day as DayData).calories)];

  // Функция для расчета Y шкалы (опционально)
  const calculateYScale = (calories: number[]) => {
    const min = Math.min(...calories);
    const max = Math.max(...calories);
    return {
      suggestedMin: min - (max - min) * 0.05,
      suggestedMax: max + (max - min) * 0.05,
    };
  };

  const { suggestedMin, suggestedMax } = calculateYScale(calories);

  const data = {
    labels: dates, // Метки (даты)
    datasets: [
      {
        label: "Калории (ккал)",
        data: calories, // Данные (калории)
        backgroundColor: "blueviolet", // Цвет столбцов
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  // Опции для диаграммы
  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin, // Минимальное значение по оси Y
        suggestedMax, // Максимальное значение по оси Y
        grid: {
          color: "blueviolet", // Цвет сетки
        },
        ticks: {
          color: "white", // Цвет подписей значений
        },
      },
      x: {
        ticks: {
          color: "white", // Цвет подписей значений
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
        display: false,
      },
      title: {
        display: true,
        text: `Потребление калорий с ${convertDaysToDate(Number(month.from_date_int))} по ${convertDaysToDate(
          Number(month.to_date_int)
        )}`,
        color: "white",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FoodMonthChart;
