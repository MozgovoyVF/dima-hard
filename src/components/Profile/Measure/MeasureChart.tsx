import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
import zoomPlugin from "chartjs-plugin-zoom";

// Регистрация компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  ChartDataLabels
);

interface MeasureChart {
  dates: string[];
  measure: string[];
  title: string;
}

const MeasureChart: React.FC<MeasureChart> = ({ dates, measure, title }) => {
  const calculateYScale = (measure: number[]) => {
    const min = Math.min(...measure);
    const max = Math.max(...measure);

    return {
      suggestedMin: min,
      suggestedMax: max + (max - min) * 0.1,
    };
  };

  const { suggestedMin, suggestedMax } = calculateYScale(measure.map((e) => Number(e)));

  const data = {
    labels: dates.map((v) =>
      new Date(v)
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .map((v) => v.slice(-2))
        .join(".")
    ),
    datasets: [
      {
        label: `${title} (см)`,
        data: measure,
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
        display: false,
      },
      title: {
        display: false,
        text: `${title}`,
        color: "white",
        font: {
          size: 16, // Размер шрифта значений по оси Y
        },
      },
      zoom: {
        pan: {
          enabled: true, // Включаем панорамирование (скролл)
          mode: "x" as const, // Панорамирование по оси X
        },
        zoom: {
          wheel: {
            enabled: true, // Включаем зум на колесе мыши
          },
          pinch: {
            enabled: true, // Включаем зум через pinch на тачпадах
          },
          mode: "x" as const, // Зум по оси X
        },
      },
      datalabels: {
        color: "white", // Устанавливаем белый цвет для подписей на столбцах
        anchor: "end" as const,
        align: "top" as const,
      },
    },
  };

  return (
    <div style={{ minHeight: "200px", width: "100%" }}>
      <Line data={data} options={options} height={200} />
    </div>
  );
};

export default MeasureChart;
