import React from 'react';
import PropTypes from 'prop-types';
import { FaBatteryFull, FaExclamationCircle } from 'react-icons/fa'; // Icons for status
import './OverviewCard.css';

function OverviewCard({ sensorId, sensorStatus, upTime, efficiency }) {
  return (
    <div className="overview-card">
      <div className="header flex justify-between items-center">
        <div className="sensor-id">
          <strong>Sensor ID: </strong>
          <span>{sensorId}</span>
        </div>
        <div className="sensor-status flex items-center">
          {sensorStatus === 'Active' ? (
            <FaBatteryFull className="text-green-500" size={20} />
          ) : (
            <FaExclamationCircle className="text-red-500" size={20} />
          )}
          <span className="status-text">{sensorStatus}</span>
        </div>
      </div>

      <div className="values-container">
        <div className="value-item">
          <span className="value">{upTime}</span>
          <span className="label">Up Time</span>
        </div>
        <div className="separator"></div>
        <div className="value-item">
          <span className="value">{efficiency}%</span>
          <span className="label">Efficiency</span>
        </div>
      </div>
    </div>
  );
}

OverviewCard.propTypes = {
  sensorId: PropTypes.string.isRequired,
  sensorStatus: PropTypes.string.isRequired,
  upTime: PropTypes.string.isRequired,
  efficiency: PropTypes.number.isRequired
};

export default OverviewCard;
