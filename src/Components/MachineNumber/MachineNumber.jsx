import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

export const MachineNumber = ({ title, totalNumber, icon, description, lottieOptions }) => {
  return (
    <div className="w-[90%] md:w-full justify-between lg:w-2/6 bg-white rounded-lg lg:py-9 lg:px-5 px-3 py-5 shadow-md poppins">
      <div>
        <h2 className="text-[1.5rem] font-bold exo">{title}</h2>
      </div>
      <div className="flex justify-between pt-3 items-center gap-4">
        <div className="flex justify-center flex-col gap-4">
          <p className="text-[2rem] font-bold alegreya text-[#044A72]">{totalNumber}</p>
          <p
            className={`font-bold alegreya text-[1.5rem] ${
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
          
          {lottieOptions ? (
            <Lottie options={lottieOptions} height={140} width={140} />
          ) : (
            // Otherwise render the image (icon)
            <img src={icon} alt={title} className="lg:w-36 lg:h-32 w-48 h-28" />
          )}
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
MachineNumber.propTypes = {
  title: PropTypes.string.isRequired,
  totalNumber: PropTypes.number.isRequired,
  icon: PropTypes.string, // icon can be a string (for image)
  description: PropTypes.string.isRequired,
  lottieOptions: PropTypes.object, // For Lottie animation options
};

MachineNumber.defaultProps = {
  icon: '',
  lottieOptions: null,
};
