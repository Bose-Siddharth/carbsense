/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FaAngleDoubleUp } from 'react-icons/fa';

function OverviewCard({ title, currentWeekValue, previousWeekValue, percentageOfChange }) {
  return (
    <div className="bg-white w-72 h-40 rounded-lg p-4 text-center">
      <div className="flex justify-center items-center">
        <FaAngleDoubleUp className="text-green-500" size={20} />
        <span className="text-green-500 text-xl">{percentageOfChange}</span>
      </div>
      <div className="font-semibold text-gray-500 mt-2">{title}</div>
      <div className="flex mt-2 justify-between text-center">
        <div className="">
          <span className="text-2xl">{currentWeekValue.toLocaleString()}</span>
          <h1 className="text-sm">Previous Week</h1>
        </div>
        <div className="border-r-2"></div>
        <div>
          <span className="text-2xl">{previousWeekValue.toLocaleString()}</span>
          <h1 className="text-sm">Current Week</h1>
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
