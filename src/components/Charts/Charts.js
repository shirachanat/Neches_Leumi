import React, { useRef } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { statuses, statusesDesc } from '../../dec';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({filteredResponders}) => {
  const chartRef = useRef(null);
  const data = {
    labels: statuses.map((status) => status.label),
    datasets: [
      {
        // label: statuses.map((status) => status.label),
        data: statuses.map((status) => 
            filteredResponders.filter((responder) =>   {
                //switch case instead of if else
               switch (status.codeStatus) {
                   case statusesDesc.arrived:
                     return responder.arrived;
                 case statusesDesc.onWay:
                   return responder.latitude;
                 default:
                   return responder.messageStatus === status.codeStatus;
               }}).length
    ),
        backgroundColor: statuses.map((status) => status.color),
      },
    ],
  };

  const options = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    // },
    scales: {
        y: {
          beginAtZero: true, // Ensures the scale starts at 0
          max: filteredResponders.length, // Set the maximum value for the Y-axis
          ticks: {
            stepSize: 5, // Set the step size (optional)
          },
        },
      },
    onClick: (event) => {
      const chart = chartRef.current;
      if (!chart) return;

      // Get the clicked element index
      const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

      if (points.length) {
        const firstPoint = points[0];
        const label = chart.data.labels[firstPoint.index];
        const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

        alert(`Clicked on: ${label} - Value: ${value}`);
      }
    },
  };

  return <Bar ref={chartRef} data={data} options={options} />;
};

export {BarChart};
