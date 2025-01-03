import React from 'react';
import PropTypes from 'prop-types';

function InfoCard({ title, value, unit }) {
  return (
    <div className="bg-white h-24 text-center py-5 rounded-lg">
      <div className="font-semibold text-gray-500 text-md mb-1">{title}</div>
      <div className="font-medium text-gray-700 text-xl">
        {value} <span className="font-medium text-gray-700">{unit}</span>
      </div>
    </div>
  );
}

export default InfoCard;

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};
