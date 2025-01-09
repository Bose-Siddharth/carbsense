import React, { useEffect, useState } from 'react';
import './DropDownNotification.css';
import Notifications from '../../Utils/Jsons/Dashboard/Notifications.json';

function DropDownNotification({data}) {
  const [notifications] = useState(data);
  useEffect(()=>{
    console.log(notifications)
  },[])


  return (
    <div className="flex flex-col dropDownProfile z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 poppins">
      {notifications.length>0?
        <ul className="flex flex-col gap-3">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className="bg-gray-50 hover:bg-[#f1f0f0] transition duration-200 h-20 rounded-lg p-3 shadow-sm flex items-center">
            <div>
              <h3 className="text-gray-800 font-medium text-lg">{notification.device_id}</h3>
              <p className="text-gray-600 text-sm">{notification.gas_type}</p>
            </div>
          </li>
        ))}
      </ul>:
      <div className='h-[200px] flex w-full justify-center items-center'>
          No Notifications Found
      </div>
      }
    </div>
  );
}

export default DropDownNotification;
