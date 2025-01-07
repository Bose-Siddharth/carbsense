import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './ProductionCharts.css'; // Import the CSS file

function ProductionCharts({ title, data, categories }) {
  const options = {
    chart: {
      height: '100%',
      type: 'heatmap',
      toolbar: { show: false }
    },
    colors: [
      function ({ value }) {
        // Green for healthy, yellow for neutral, red for unhealthy
        return value < 50 ? '#00E396' : value < 75 ? '#FEB019' : '#FF4560';
      }
    ],
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { fontSize: '12px' } }
    },
    yaxis: {
      labels: { style: { fontSize: '12px' } }
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          const seriesName = data[seriesIndex].name;
          return `${seriesName.includes('Temperature') ? value + '°C' : value + ' ppm'}`;
        }
      }
    },
    title: {
      text: title,
      align: 'left',
      margin: 10,
      style: { fontSize: '16px', fontWeight: 'bold' }
    },
    legend: { position: 'top', horizontalAlign: 'center' }
  };

  return (
    <div className="production-charts">
      <ReactApexChart options={options} series={data} type="heatmap" height={350} />
    </div>
  );
}

ProductionCharts.propTypes = {
  title: PropTypes.string.isRequired, // Chart title
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired, // Heatmap data
  categories: PropTypes.arrayOf(PropTypes.string).isRequired // Categories (x-axis labels)
};

export default ProductionCharts;
