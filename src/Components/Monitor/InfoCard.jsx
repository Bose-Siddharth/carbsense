import React from 'react';
import PropTypes from 'prop-types';

function InfoCard({ title, subTitle }) {
  return (
    <div className="bg-white h-28 lg:h-[100px] text-center py-5 rounded-lg">
      <div className="font-semibold text-gray-500 text-lg mb-1">{title}</div>
      <div className="font-medium text-gray-700 text-2xl">{subTitle}</div>
    </div>
  );
}

export default InfoCard;

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};
