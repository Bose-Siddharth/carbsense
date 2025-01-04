import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './ProductionCharts.css'; // Import the CSS file

function ProductionCharts({ title, data, categories }) {
  const generateHeatmapData = (data) => {
    return data.map((row, index) => ({
      name: `State ${index + 1}`,
      data: row
    }));
  };

  const options = {
    chart: {
      height: '100%',
      type: 'heatmap',
      toolbar: {
        show: false // Hide chart toolbar
      }
    },
    dataLabels: {
      enabled: false // Disable data labels for a cleaner chart
    },
    colors: ['#008FFB'], // Custom color for heatmap
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
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value.toLocaleString(); // Add commas to tooltip values
        }
      }
    },
    title: {
      text: title, // Chart title
      align: 'left',
      margin: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    }
  };

  return (
    <div className="production-charts">
      <ReactApexChart
        options={options}
        series={generateHeatmapData(data)}
        type="heatmap"
        height={350}
      />
    </div>
  );
}

ProductionCharts.propTypes = {
  title: PropTypes.string.isRequired, // Chart title
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired, // Heatmap data
  categories: PropTypes.arrayOf(PropTypes.string).isRequired // Categories (x-axis labels)
};

export default ProductionCharts;
