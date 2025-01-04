import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './RankingCharts.css'; // Import the CSS file

function RankingCharts({ title, categories, seriesData }) {
  const options = {
    chart: {
      type: 'bar',
      height: '100%',
      toolbar: {
        show: false // Hide chart toolbar for a cleaner UI
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top' // Show data labels on top of bars
        },
        borderRadius: 5, // Rounded corners for bars
        barHeight: '70%' // Adjust bar height for better readability
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#fff'] // White text on bars
      },
      offsetX: -6
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: categories,
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
    title: {
      text: title,
      align: 'left',
      margin: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // Alternating row colors
        opacity: 0.5
      }
    }
  };

  return (
    <div className="ranking-charts">
      <ReactApexChart options={options} series={seriesData} type="bar" height={400} />
    </div>
  );
}

RankingCharts.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  seriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired
};

export default RankingCharts;
