import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { convertDaysToDate } from "../../../../utils/convertDaysToDate";

// Регистрация компонентов Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface DayData {
  date_int: string;
  weight_comment?: string;
  weight_kg: string;
}

interface MonthData {
  day: DayData[];
  from_date_int: string;
  to_date_int: string;
}

interface WeightChartProps {
  month: MonthData;
}

const WeightChart: React.FC<WeightChartProps> = ({ month }) => {
  const dates = month.day.map((day) => convertDaysToDate(Number(day.date_int)).slice(0, 5));
  const weights = month.day.map((day) => parseFloat(day.weight_kg));

  const calculateYScale = (weights: number[]) => {
    const min = Math.min(...weights);
    const max = Math.max(...weights);

    return {
      suggestedMin: min - 5, // Начинаем от минимального значения - 10 кг
      suggestedMax: max + (max - min) * 0.1, // Увеличиваем максимум на 10% от разброса
    };
  };

  const { suggestedMin, suggestedMax } = calculateYScale(weights);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Вес (кг)",
        data: weights,
        fill: false,
        borderColor: "blueviolet",
        tension: 0.1,
        pointBackgroundColor: "white", // Цвет точки
        pointBorderColor: "white", // Цвет обводки точки
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin,
        suggestedMax,
        grid: {
          color: "blueviolet",
        },
        ticks: {
          color: "white",
        },
        font: {
          size: 16, // Размер шрифта значений по оси Y
        },
      },
      x: {
        ticks: {
          color: "white",
        },
        font: {
          size: 30, // Размер шрифта значений по оси Y
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Показатели веса с ${convertDaysToDate(Number(month.from_date_int))} по ${convertDaysToDate(
          Number(month.to_date_int)
        )}`,
        color: "white",
        font: {
          size: 16, // Размер шрифта значений по оси Y
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeightChart;
