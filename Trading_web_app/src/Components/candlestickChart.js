import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const LiveCandlestickChart = () => {
    const [series, setSeries] = useState([
        {
            data: [
                { x: new Date('2023-12-14').getTime(), y: [6629.81, 6650.5, 6623.04, 6633.33] },
            ],
        },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newDataPoint = {
                x: new Date().getTime(),
                y: [
                    Math.random() * 1000 + 6000, // Open
                    Math.random() * 1000 + 6000, // High
                    Math.random() * 1000 + 6000, // Low
                    Math.random() * 1000 + 6000, // Close
                ],
            };

            setSeries((prevSeries) => [
                {
                    data: [...prevSeries[0].data, newDataPoint],
                },
            ]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const chartOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
        },
        xaxis: {
            type: 'datetime',
        },
    };

    return <ReactApexChart options={chartOptions} series={series} type="candlestick" height={350} />;
};

export default LiveCandlestickChart;
