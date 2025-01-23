import React from 'react';
import ReactApexChart from 'react-apexcharts';

const DataChart = ({ data, label, text, text1, text2 }) => {
  const labels = data.map((item) => item.updatedAt.split('T')[1].split('.')[0]);
  
  let temperatures;
  if (label === 'Temperature (°C)') {
    temperatures = data.map((item) => item.temperature);
  } else {
    temperatures = data.map((item) => item.concentration);
  }

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    title: {
      text: text,
      align: 'center',
    },
    xaxis: {
      categories: labels,
      title: {
        text: text1,
      },
    },
    yaxis: {
      title: {
        text: text2,
      },
      min: 20,
      max: 35,
    },
    stroke: {
      curve: 'smooth',
    },
    markers: {
      size: 5,
      colors: ['#fff'],
      strokeColors: 'rgba(75, 192, 192, 1)',
      strokeWidth: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: ['rgba(75, 192, 192, 0.2)'],
        inverseColors: true,
        opacityFrom: 0.75,
        opacityTo: 0.25,
      },
    },
    tooltip: {
      theme: 'light',
    },
  };

  const series = [
    {
      name: label,
      data: temperatures,
    },
  ];

  return (
    <div className="bg-[#fff] px-6 rounded h-[30vh]">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="line"
        height="100%"
      />
    </div>
  );
};

export default DataChart;
