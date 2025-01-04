import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './TrendsCharts.css'; // Import the CSS file

function TrendsCharts({ title, subtitle, categories, seriesData }) {
  const options = {
    chart: {
      height: '100%',
      type: 'area',
      toolbar: {
        show: false // Hide chart toolbar
      }
    },
    dataLabels: {
      enabled: false // Disable data labels for a cleaner chart
    },
    stroke: {
      curve: 'smooth' // Smooth lines for area chart
    },
    xaxis: {
      categories: categories, // Dynamic categories (e.g., weeks)
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        },
        formatter: function (value) {
          return value.toLocaleString(); // Add commas for better readability
        }
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd, yyyy' // Format tooltip x-axis labels
      },
      y: {
        formatter: function (value) {
          return value.toLocaleString(); // Add commas to tooltip values
        }
      }
    },
    fill: {
      type: 'gradient', // Gradient fill for areas
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    colors: ['#1E90FF', '#FFA500'], // Custom colors for series
    title: {
      text: title, // Chart title
      align: 'left',
      margin: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    subtitle: {
      text: subtitle, // Subtitle (e.g., Last 4 Weeks)
      align: 'left',
      margin: 10,
      style: {
        fontSize: '12px',
        fontWeight: 'normal'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    }
  };

  return (
    <div className="trends-charts">
      <ReactApexChart options={options} series={seriesData} type="area" height={350} />
    </div>
  );
}

TrendsCharts.propTypes = {
  title: PropTypes.string.isRequired, // Chart title
  subtitle: PropTypes.string, // Chart subtitle
  categories: PropTypes.arrayOf(PropTypes.string).isRequired, // Categories (x-axis labels)
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Series name
      data: PropTypes.arrayOf(PropTypes.number).isRequired // Data points
    })
  ).isRequired
};

export default TrendsCharts;
