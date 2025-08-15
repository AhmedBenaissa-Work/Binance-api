import ReactApexChart from 'react-apexcharts';

const LiveCandlestickChart = ({ data }) => {
  const series = [
    {
      data: data, // Ensure 'data' is an array of appropriate format for candlestick charts
    },
  ];

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
