import React from "react";
import { Bar } from "react-chartjs-2";
import type { chartListType } from "../(store)/store/Dashboard/page";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressBarChart: React.FC<ProgressBarChartProp> = ({ chartData }) => {
  const chartDatalables: string[] = chartData.map((item) => item.lable);
  const chartPercentage: number[] = chartData.map((item) => item.percent[0]);
  const borderRadius: number = 8;
  const borderRadiusAllCorners = {
    topLeft: borderRadius,
    topRight: borderRadius,
    bottomLeft: borderRadius,
    bottomRight: borderRadius,
  };
  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        min: 0,
        max: 100,
        reverse: true,
        stacked: true,
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        position: "right",
        stacked: true,
      },
    },
    plugins: {
      tooltip: { enabled: false },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const data: ChartData<"bar"> = {
    labels: chartDatalables,
    datasets: [
      {
        type: "bar",
        data: chartPercentage,
        backgroundColor: "#03A9F4",
        borderColor: "#03A9F4",
        borderWidth: 0,
        borderSkipped: false,
        borderRadius: borderRadiusAllCorners,
        barPercentage: 0.2,
        categoryPercentage: 0.9,
      },
      {
        type: "bar",
        data: chartData.map((item) => item.percent[1]),
        backgroundColor: "#ECEFF1",
        hoverBackgroundColor: "#ECEFF1",
        borderColor: "#ECEFF1",
        borderWidth: 0,
        borderSkipped: "left",
        borderRadius: borderRadiusAllCorners,
        barPercentage: 0.2,
        categoryPercentage: 0.9,
      },
    ],
  };

  const labelStyles = (index: number) => {
    const topValue = `${index * 4}rem`;
    return {
      top: topValue,
    };
  };

  return (
    <>
      <div className="relative">
        {chartDatalables.map((item, index) => (
          <div
            className="flex items-center justify-between container pr-2 absolute text-xs font-semibold text-gray-900 text-right"
            key={index}
            style={labelStyles(index)}
          >
            <span>{item}</span>
            <span className="text-blue-gray-500">{`${chartPercentage[index]}%`}</span>
          </div>
        ))}
      </div>
      <div className="flex relative">
        <Bar width={360} height={200} data={data} options={options} />
      </div>
    </>
  );
};

export default ProgressBarChart;


// Types
interface ProgressBarChartProp {
  chartData: chartListType[];
}
