/* eslint-disable no-unused-vars */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

function GaugeView({ label }) {
  const [state, setState] = React.useState({
    series: [70],
    options: {
      chart: {
        height: 350,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '40%'
          }
        }
      },
      labels: [label]
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="radialBar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default GaugeView;

GaugeView.propTypes = {
  label: PropTypes.string.isRequired
};
