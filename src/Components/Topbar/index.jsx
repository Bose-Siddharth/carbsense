import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RiMessage3Fill, RiArrowGoBackFill } from 'react-icons/ri';
import DropDownNotification from '../../Components/DropDownNotification';

function TopBar({ header, notification = false, back = false }) {
  const [openNotification, setOpenNotification] = useState(false);

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
    <div className="flex flex-1 justify-between items-center border-b border-black px-4 py-2 mr-5">
      {/* Header */}
      <h1 className="font-semibold text-4xl whitespace-pre">{header}</h1>

      {/* Right Controls */}
      <div className="flex space-x-6">
        {/* Notification */}
        {notification && (
          <div className="relative flex items-center group notification-dropdown">
            {/* Notification Icon */}
            <RiMessage3Fill
              className="text-3xl cursor-pointer"
              onClick={() => setOpenNotification(!openNotification)}
            />

            {/* Tooltip */}
            {!openNotification && (
              <h2 className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white font-semibold rounded-md drop-shadow-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Notification
              </h2>
            )}

            {/* Dropdown */}
            {openNotification && <DropDownNotification />}
          </div>
        )}

        {/* Back */}
        {back && (
          <div className="relative flex items-center group">
            {/* Back Icon */}
            <RiArrowGoBackFill
              className="text-3xl cursor-pointer text-black"
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
