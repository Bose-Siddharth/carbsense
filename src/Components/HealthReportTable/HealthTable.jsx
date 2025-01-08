import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Datajson from '../../Utils/Jsons/Dashboard/DashboardCard.json';
import './heathTable.css';

import Lottie from 'react-lottie';
import warningLottie from '../../Lottie/warningLottie.json';
import activeLottie from '../../Lottie/activeLottie.json';
import dangerLottie from '../../Lottie/dangerLottie.json';

const toSentenceCase = (str) => {
  if (!str) return '';
  const lowerCased = str.replace(/([^\w\s])/g, '').toLowerCase();
  return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
};

export const HealthTable = ({ name }) => {
  const navigate = useNavigate();
  const { data = [] } = Datajson;

  const handleClick = () => {
    navigate('/monitor');
  };

  const filteredData = data.filter((item) => {
    if (name === 'Active Machines Health Reports' && item.status === 'Active') {
      return true;
    } else if (name === 'Inactive Machines Health Reports' && item.status === 'Inactive') {
      return true;
    } else if (name === 'Warning Machines Health Reports' && item.status === 'Warning') {
      return true;
    }
    return false;
  });

  const headings = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  const warningLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: warningLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const activeLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: activeLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const dangerLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: dangerLottie,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="p-4 poppins">
      <h1 className="text-lg font-bold mb-4">{name}</h1>
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        {/* Table Wrapper for Horizontal Scrolling */}
        <div className="overflow-x-auto">
          {/* Table */}
          <table className="min-w-full table-auto">
            {/* Table Head */}
            <thead>
              {filteredData.length > 0 && (
                <tr className="bg-[#044A72] text-[#fff] font-semibold">
                  {/* <th className="p-3 w-16 text-center border-b border-gray-300"> </th> */}
                  {headings.map((heading) => (
                    <th key={heading} className="p-3 text-center border-b border-gray-300">
                      {toSentenceCase(heading)}
                    </th>
                  ))}
                  <th className="p-3 w-32 text-center border-b border-gray-300">Actions</th>
                </tr>
              )}
            </thead>

            {/* Table Body */}
            <tbody className={`${filteredData.length > 0 ? 'h-64' : ''} overflow-y-auto`}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-gray-800`}>
                    {headings.map((heading) => (
                      <td key={heading} className="p-3 text-center border-b border-gray-300">
                        <div className="">
                          {/* Conditionally render the Lottie animation */}
                          {item[heading] === 'Active' && (
                            <Lottie options={activeLottieOptions} height={40} width={40} />
                          )}
                          {item[heading] === 'Warning' && (
                            <Lottie options={warningLottieOptions} height={40} width={40} />
                          )}
                          {item[heading] === 'Inactive' && (
                            <Lottie options={dangerLottieOptions} height={40} width={40} />
                          )}
                          {/* Display the item[heading] text */}
                          <span>{item[heading]}</span>
                        </div>
                      </td>
                    ))}
                    <td className="p-3 text-center border-b border-gray-300">
                      <button
                        className="px-4 w-40 py-2 bg-[#246d97] text-white rounded-lg hover:bg-[#15234b]"
                        onClick={handleClick}>
                        Monitor View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headings.length + 2} className="p-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

HealthTable.propTypes = {
  name: PropTypes.string.isRequired
};
