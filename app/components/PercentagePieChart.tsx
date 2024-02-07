import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem,
  Color,
} from "chart.js";
import ChartDataLables, { Context } from 'chartjs-plugin-datalabels';
import { Pie } from "react-chartjs-2";
import { chartListType } from "../(store)/store/Dashboard/page";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLables);

export const PercentagePieChart: React.FC<PercentagePieChartProp> = ({
  chartData,
}) => {
  const data: ChartData<"pie"> = {
    labels: chartData.map((item) => item.lable),
    datasets: [
      {
        type: 'pie',
        data: chartData.map((item) => item.percent[0]),
        backgroundColor: chartData.map((item) => item.fill),
        borderDash: [0,0],
        borderAlign: 'inner',
        borderWidth: 2,
        rotation: 90,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      datalabels: {
        color: '#630303',
        font: {
          family: "Estedad-FD",
          style: 'normal',
          weight: 600,
        },
        align: 'right',
        anchor: 'center',
        padding: 8,
        offset: 8,
        formatter : (value: number,context: Context) => {
          const percentage = ((+value! / context.dataset.data.reduce((a: number,b) => +a! + +b!, 0)) * 100);
          return percentage > 5 ? `${percentage}%`: ``;
        }
      },
      legend: {
        rtl: true,
        display: true,
        position: "right",
        maxHeight: 140,
        onClick: (e) => e.native!.stopPropagation(),
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 6,
          boxHeight: 6,
          padding: 14,
          generateLabels: (chart) => {
            const data = chart.data.datasets[0].data;
            const backgroundColors = chart.data.datasets[0].backgroundColor as Color[];
            const total: number = data.reduce((acc: number, curr) => acc + +curr!, 0);
            return data.map((value, index: number) => {
              const label = chart.data.labels![index];
              const percentage = ((+value! / total) * 100);
              return {
                text: `${label}  %${percentage}`,
                fillStyle: backgroundColors![index],
                lineWidth: 0,
                hidden: isNaN(+value!) || value === 0,
                index: index,
              };
            });
          },
          font: {
            family: "Estedad-FD",
            weight: 600,
            size: 12,
          },
        },
      },
      tooltip: {
        rtl: true,
        usePointStyle: true,
        cornerRadius: 8,
        boxWidth: 10,
        padding: 10,
        caretSize: 4,
        titleColor: "white",
        titleFont: {
          family: "Estedad-FD",
          weight: 500,
          size: 12,
        },
        bodyAlign: "right",
        bodyFont: {
          family: "Estedad-FD",
          weight: 500,
          size: 12,
        },
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const value =
              context.chart.data.datasets[0].data[context.dataIndex];
            const total = context.chart.data.datasets[0].data.reduce(
              (acc, curr) => +acc! + +curr!,
              0
            );
            const percentage = ((+value! / +total!) * 100).toFixed(2);
            return ` % ${percentage} `;
          },
        },
      },
    },
    font: {
      family: "Estedad-FD",
      weight: 500,
      size: 12,
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 50,
        left: 50,
      },
    },
  };

  return <Pie width={360} height={144} className="md:left-5 relative" options={options} data={data} />;
};

// Types
interface PercentagePieChartProp {
  chartData: chartListType[];
}