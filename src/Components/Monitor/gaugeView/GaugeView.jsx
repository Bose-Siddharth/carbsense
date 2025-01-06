/* eslint-disable no-unused-vars */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import './GaugeView.css'; // Import the CSS file

function GaugeView({ title, value, unit, percentage }) {
  const [state, setState] = React.useState({
    series: [percentage || 0], // Ensure series has a default value
    options: {
      chart: {
        type: 'radialBar',
        height: '100%'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '65%' // Adjust hollow size
          },
          dataLabels: {
            show: true,
            value: {
              fontSize: '20px',
              fontWeight: 'bold',
              formatter: function () {
                return `${unit || 0} ${'' || ''}`; // Avoid undefined
              }
            }
          },
          track: {
            background: '#eee',
            strokeWidth: '97%'
          },
          colors: ['#FF6F61'] // Bar color
        }
      },
      labels: [value || ''], // Avoid undefined
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: '80%'
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '60%'
                }
              }
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: '70%'
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: '50%'
                }
              }
            }
          }
        }
      ]
    }
  });

  return (
    <div className="gauge-view">
      <div id="chart">
        <h1 className="gauge-title">{title || 'Gauge'}</h1>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="radialBar"
          height="100%"
        />
      </div>
    </div>
  );
}

GaugeView.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  percentage: PropTypes.number.isRequired
};

export default GaugeView;
