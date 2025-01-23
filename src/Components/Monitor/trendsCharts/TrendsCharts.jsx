import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './TrendsCharts.css';

function TrendsCharts({
  title,
  subtitle,
  categories,
  initialSeriesData,
  latestReading,
  thresholds
}) {
  const [seriesData, setSeriesData] = useState(initialSeriesData);

  useEffect(() => {
    if (latestReading) {
      // Append the latest reading to the last series and keep only the last 10 data points
      setSeriesData((prevSeries) =>
        prevSeries.map((series, index) => ({
          ...series,
          data: [...series.data, latestReading[index]].slice(-10) // Keep only the last 10 data points
        }))
      );
    }
  }, [latestReading]);

  const getDynamicColors = (data) => {
    return data.map((series) => {
      const thresholdColor = thresholds.find((threshold) =>
        series.data.some((value) => value >= threshold.value)
      );
      return thresholdColor ? thresholdColor.color : '#1E90FF'; // Default color
    });
  };

  const [dynamicColors, setDynamicColors] = useState(getDynamicColors(seriesData));

  useEffect(() => {
    setDynamicColors(getDynamicColors(seriesData));
  }, [seriesData]);

  const options = {
    chart: {
      height: '100%',
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: categories.slice(-10), // Show only the last 10 categories
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
          return value.toLocaleString();
        }
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd, yyyy'
      },
      y: {
        formatter: function (value) {
          return value.toLocaleString();
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    colors: dynamicColors,
    title: {
      text: title,
      align: 'left',
      margin: 10,
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    subtitle: {
      text: subtitle,
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialSeriesData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired
    })
  ).isRequired,
  latestReading: PropTypes.arrayOf(PropTypes.number),
  thresholds: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TrendsCharts;
