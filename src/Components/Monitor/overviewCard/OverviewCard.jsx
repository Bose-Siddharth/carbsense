import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleDoubleUp } from 'react-icons/fa';
import './OverviewCard.css';

function OverviewCard({ title, currentWeekValue, previousWeekValue, percentageOfChange }) {
  return (
    <div className="overview-card">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaAngleDoubleUp className="text-green-500" size={20} />
          <span className="percentage-change">{percentageOfChange}</span>
        </div>
        <div className="text-gray-500 text-sm">{title}</div>
      </div>

      <div className="values-container">
        <div className="value-item">
          <span className="value">{currentWeekValue.toLocaleString()}</span>
          <span className="label">Current Week</span>
        </div>
        <div className="separator"></div>
        <div className="value-item">
          <span className="value">{previousWeekValue.toLocaleString()}</span>
          <span className="label">Previous Week</span>
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;

OverviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  currentWeekValue: PropTypes.number.isRequired,
  previousWeekValue: PropTypes.number.isRequired,
  percentageOfChange: PropTypes.string.isRequired
};
