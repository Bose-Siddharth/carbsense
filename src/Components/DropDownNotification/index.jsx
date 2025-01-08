import React, { useState } from 'react';
import './DropDownNotification.css';
import Notifications from '../../Utils/Jsons/Dashboard/Notifications.json';

function DropDownNotification() {
  const [notifications] = useState(Notifications.notifications);

  return (
    <div className="flex flex-col dropDownProfile z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 poppins">
      <ul className="flex flex-col gap-3">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="bg-gray-50 hover:bg-[#f1f0f0] transition duration-200 h-20 rounded-lg p-3 shadow-sm flex items-center">
            <div>
              <h3 className="text-gray-800 font-medium text-lg">{notification.title}</h3>
              <p className="text-gray-600 text-sm">{notification.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDownNotification;
