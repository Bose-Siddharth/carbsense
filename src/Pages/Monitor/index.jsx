import React from 'react';
import Topbar from '../../Components/Topbar';
import Measurements from '../../Components/Monitor/Measurements';
import OilLevel from '../../Components/Monitor/OilLevel';

function index() {
  return (
    <div className="flex flex-col  gap-10">
      <Topbar header="Monitor" />
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="bg-white rounded-2xl">
          <Measurements />
        </div>
        <div className="bg-white rounded-2xl">
          <OilLevel />
        </div>
        {/* <div className="bg-white w-[25%] h-full">3</div> */}
      </div>
      <div className="flex gap-5">
        <div className="bg-white w-[25%] h-full">5</div>
        <div className="bg-white w-[25%] h-full">6</div>
        <div className="bg-white w-[50%] h-full">4</div>
      </div>
    </div>
  );
}

export default index;
