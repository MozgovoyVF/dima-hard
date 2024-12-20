import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Регистрация необходимых компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface CurrentDayData {
  carbohydrate: string;
  fat: string;
  protein: string;
}

const PieChart: React.FC<{ currentDay: CurrentDayData }> = ({ currentDay }) => {
  // Преобразование данных в числа для использования в диаграмме
  const carbohydrate = parseFloat(currentDay.carbohydrate);
  const fat = parseFloat(currentDay.fat);
  const protein = parseFloat(currentDay.protein);

  const data = {
    labels: ["Углеводы", "Жиры", "Белки"],
    datasets: [
      {
        label: "Макроэлементы (г)",
        data: [carbohydrate, fat, protein], // Данные для круговой диаграммы
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Цвет для углеводов
          "rgba(255, 99, 132, 0.6)", // Цвет для жиров
          "rgba(54, 162, 235, 0.6)", // Цвет для белков
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1, // Толщина границы секторов
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white", // Цвет текста легенды
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw} гр.`;
          },
        },
      },
      datalabels: {
        color: "white", // Цвет текста
        font: {
          size: 16, // Размер текста
        },
        formatter: (value: number) =>
          `${value} гр. (${Math.round(
            (value / (Number(currentDay.carbohydrate) + Number(currentDay.fat) + Number(currentDay.protein))) * 100
          )}%)`, // Формат отображения значений
        anchor: "end" as const, // Позиция текста, чтобы был снаружи сектора
        align: "start" as const, // Выравнивание текста относительно сектора
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
