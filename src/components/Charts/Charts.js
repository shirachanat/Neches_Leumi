import React, { useRef, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { statuses, statusesDesc } from '../../dec';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const filterMessageStatus = (status, responder) => {
    switch (status) {
        case statusesDesc.arrived:
            return responder.arrived;
        case statusesDesc.onWay:
            return !responder.arrived && responder.latitude;
        default:
            return !responder.latitude && !responder.arrived && responder.messageStatus === status;
    }
}

const BarChart = ({ filteredResponders, setFilterValue }) => {
    const chartRef = useRef(null);
    const [highlightIndex, setHighlightIndex] = useState(null);
    const data = {
        labels: statuses.map((status) => status.label),
        datasets: [
            {
                data: statuses.map((status) =>
                    filteredResponders.filter((responder) =>
                        filterMessageStatus(status.codeStatus, responder)
                    ).length
                ),
                backgroundColor: statuses.map((status) => status.color),
                borderColor: context => context.dataIndex === highlightIndex ? 'rgb(255, 99, 132)' : '',
                borderWidth: context => context.dataIndex === highlightIndex ? 3 : 0,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: filteredResponders.length,
                ticks: {
                    stepSize: 5,
                    color: 'white',
                },
                grid: {
                    color: 'gray',
                },
            },
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'gray',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
            tooltip: {
                titleColor: 'white',
                bodyColor: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
        },
        onClick: (event) => {
            const chart = chartRef.current;
            if (!chart) return;

            const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);

            if (points.length) {
                const firstPoint = points[0];
                const label = chart.data.labels[firstPoint.index];
                const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                const status = statuses.find((status) => status.label === label).codeStatus;
                setHighlightIndex(prev => prev === firstPoint.index ? null : firstPoint.index);
                setFilterValue(prev => ({ ...prev, status: prev.status === status ? '' : status }));
            }
        },
    };

    return <Bar ref={chartRef} data={data} options={options} />;
};

export { BarChart };
