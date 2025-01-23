import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';
import './GaugeView.css';

function GaugeView({ title, value, unit, percentage, thresholds }) {
  const getGaugeColor = (value) => {
    if (value <= thresholds.low) {
      return { background: '#e0f7fa', bar: '#00796b', text: '#004d40' };
    } else if (value <= thresholds.high) {
      return { background: '#fff8e1', bar: '#ffa000', text: '#ff6f00' };
    } else {
      return { background: '#ffebee', bar: '#d32f2f', text: '#b71c1c' };
    }
  };

  const [gaugeColor, setGaugeColor] = useState(getGaugeColor(value));
  const [state, setState] = useState({
    series: [percentage],
    options: {
      chart: {
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%'
          },
          track: {
            background: '#e0e0e0'
          },
          dataLabels: {
            value: {
              fontSize: '22px',
              color: gaugeColor.text,
              formatter: () => `${value} ${unit}`
            },
            name: {
              fontSize: '14px',
              offsetY: -10,
              color: gaugeColor.text
            }
          }
        }
      },
      colors: [gaugeColor.bar],
      labels: [title]
    }
  });

  useEffect(() => {
    setGaugeColor(getGaugeColor(value));
    setState((prevState) => ({
      ...prevState,
      series: [percentage],
      options: {
        ...prevState.options,
        colors: [gaugeColor.bar],
        plotOptions: {
          ...prevState.options.plotOptions,
          radialBar: {
            ...prevState.options.plotOptions.radialBar,
            dataLabels: {
              ...prevState.options.plotOptions.radialBar.dataLabels,
              value: {
                ...prevState.options.plotOptions.radialBar.dataLabels.value,
                color: gaugeColor.text,
                formatter: () => `${value} ${unit}`
              }
            }
          }
        }
      }
    }));
  }, [value, percentage]);

  return (
    <div
      className="gauge-view"
      style={{
        backgroundColor: gaugeColor.background,
        color: gaugeColor.text
      }}>
      <h2 className="gauge-title">
        {title}
        <span className="tooltip-icon">
          <FaInfoCircle />
          <div className="tooltip">
            <strong>Thresholds:</strong>
            <ul>
              <li>
                <span style={{ color: '#00796b' }}>Healthy (≤ {thresholds.low})</span>
              </li>
              <li>
                <span style={{ color: '#ffa000' }}>
                  Moderate ({thresholds.low} - {thresholds.high})
                </span>
              </li>
              <li>
                <span style={{ color: '#d32f2f' }}>Critical (≥ {thresholds.high})</span>
              </li>
            </ul>
          </div>
        </span>
      </h2>
      <ReactApexChart options={state.options} series={state.series} type="radialBar" height={250} />
    </div>
  );
}

GaugeView.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  percentage: PropTypes.number.isRequired,
  thresholds: PropTypes.shape({
    low: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired
  }).isRequired
};

export default GaugeView;
