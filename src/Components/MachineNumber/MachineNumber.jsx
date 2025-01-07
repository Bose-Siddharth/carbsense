import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

export const MachineNumber = ({ title, totalNumber, icon, description }) => {
  return (
    <div className="w-full justify-between lg:w-2/6 bg-white rounded-lg py-9 px-5 shadow-md poppins">
      <div>
        <h2 className="text-[1.5rem] font-semibold">{title}</h2>
      </div>
      <div className="flex justify-between pt-3 items-center gap-4 ">
        <div className="flex justify-center flex-col gap-4 ">
          <p className="text-[2rem] font-bold text-[#044A72]">{totalNumber}</p>
          <p
            className={`font-bold  ${
              title === 'Active Machines'
                ? 'text-green-600'
                : title === 'Warning Machines'
                ? 'text-yellow-600'
                : title === 'Inactive Machines'
                ? 'text-red-600'
                : 'text-[#052A75]'
            }`}>
            {description}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src={icon} alt={title} className="w-36 h-32" />
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
MachineNumber.propTypes = {
  title: PropTypes.string.isRequired,
  totalNumber: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
