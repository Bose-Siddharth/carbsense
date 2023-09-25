import React from 'react';
import { BsLightningChargeFill } from 'react-icons/bs';

function Measurements() {
  return (
    <div>
      <div className="hidden sm:block"></div>

      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-medium mb-8 text-blue-900">Voltage Measurements</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="bg-pink-100 p-4 rounded-lg shadow">
              {/* <i className="fa-solid fa-bolt rounded-full bg-pink-400 text-white p-3 mb-3"></i> */}

              <div className="bg-pink-400 w-fit p-3 rounded-full">
                <BsLightningChargeFill className="text-white" />
              </div>

              <p className="text-lg">
                <span className="font-bold">200 V</span>
              </p>
              <h2 className="text-xl text-gray-800 py-4">Phase 1</h2>
              <p className="text-blue-600">Last Update: 11:57 am</p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg shadow">
              {/* <i className="fa-solid fa-bolt rounded-full bg-orange-400 text-white p-3 mb-3"></i> */}
              <div className="bg-orange-400 w-fit p-3 rounded-full">
                <BsLightningChargeFill className="text-white" />
              </div>

              <p className="text-lg">
                <span className="font-bold">300 V</span>
              </p>
              <h2 className="text-xl text-gray-800 py-4">Phase 2</h2>
              <p className="text-blue-600">Last Update: 12:00 pm </p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg shadow">
              {/* <i className="fa-solid fa-bolt rounded-full bg-green-400 text-white p-3 mb-3"></i> */}
              <div className="bg-green-400 w-fit p-3 rounded-full">
                <BsLightningChargeFill className="text-white" />
              </div>
              <p className="text-lg">
                <span className="font-bold">100 V</span>
              </p>
              <h2 className="text-xl text-gray-800 py-4">Phase 3</h2>
              <p className="text-blue-600">Last Update: 11:28 am </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Measurements;
