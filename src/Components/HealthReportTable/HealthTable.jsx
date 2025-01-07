import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Datajson from '../../Utils/Jsons/Dashboard/DashboardCard.json';

export const HealthTable = ({ name = '' }) => {
  const { data } = Datajson;
  console.log(name);

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

  // Extract table headings from the keys of the first object in the filtered data
  const headings = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">{name}</h1>
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
        {/* Table Head */}
        {filteredData.length > 0 && (
          <div className="bg-gray-200 text-gray-700 font-semibold flex w-full">
            {headings.map((heading) => (
              <div key={heading} className="p-3 flex-1 text-center border-b border-gray-300">
                {heading}
              </div>
            ))}
            {/* Add a column for the button */}
            <div className="p-3 w-32 text-center border-b border-gray-300">Actions</div>
          </div>
        )}

        {/* Table Body */}
        <div className={`${filteredData.length > 0 ? 'h-64' : ''} overflow-y-auto`}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } text-gray-800`}>
                {headings.map((heading) => (
                  <div key={heading} className="p-3 flex-1 text-center border-b border-gray-300">
                    {item[heading]}
                  </div>
                ))}
                {/* Add the View button */}
                <div className="p-3 w-32 text-center border-b border-gray-300">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add prop types validation
HealthTable.propTypes = {
  name: PropTypes.string.isRequired
};
