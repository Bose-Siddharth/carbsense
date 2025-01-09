import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { IoNotificationsSharp } from 'react-icons/io5';
import DropDownNotification from '../../Components/DropDownNotification';

function TopBar({ header, notification = false, back = false, data }) {
  const [openNotification, setOpenNotification] = useState(false);
  console.log(data)

  const handleBack = () => {
    window.history.back();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openNotification && !event.target.closest('.notification-dropdown')) {
        setOpenNotification(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openNotification]);

  return (
    <div className="flex flex-col w-full sm:flex-row justify-between items-center border-b border-black px-4 py-2 space-y-4 sm:space-y-0 sm:space-x-5">
      {/* Header */}
      <h1 className="font-semibold text-2xl sm:text-4xl text-center sm:text-left whitespace-pre">
        {header}
      </h1>

      {/* Right Controls */}
      <div className="flex space-x-6">
        {/* Notification */}
        {notification && (
          <div className="relative flex items-center group notification-dropdown">
            {/* Notification Icon */}
            <div className="relative">
              <IoNotificationsSharp
                className="text-2xl sm:text-3xl cursor-pointer"
                onClick={() => setOpenNotification(!openNotification)}
              />
              {data.length>0 && <div className="bg-red-500 w-2 h-2 rounded-full absolute top-0 right-0"></div>}
            </div>
            {/* <RiMessage3Fill
              className="text-3xl cursor-pointer"
              onClick={() => setOpenNotification(!openNotification)}
            /> */}

            {/* Tooltip */}
            {!openNotification && (
              <h2 className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white font-semibold rounded-md drop-shadow-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Notification
              </h2>
            )}

            {/* Dropdown */}
            {openNotification && <DropDownNotification data={data? data:[]}/>}
          </div>
        )}

        {/* Back */}
        {back && (
          <div className="relative flex items-center group">
            {/* Back Icon */}
            <RiArrowGoBackFill
              className="text-2xl sm:text-3xl cursor-pointer text-black"
              onClick={handleBack}
            />

            {/* Tooltip */}
            <h2 className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white font-semibold rounded-md drop-shadow-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Back
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

TopBar.propTypes = {
  header: PropTypes.string.isRequired,
  notification: PropTypes.bool,
  back: PropTypes.bool
};

export default TopBar;
