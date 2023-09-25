import React from 'react';
import DropDownNotification from '../../Components/DropDownNotification';

function index() {
  return (
    <div className="flex flex-col  gap-10">
      <div className="flex justify-between border border-black border-s-4 border-r-0 border-t-0 border-b-0">
        <h1 className="font-semibold text-4xl">Monitor</h1>
        <div className="flex ">
          <div>
            <DropDownNotification />
          </div>
          <div>2</div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="bg-white w-[50%] h-full">1</div>
        <div className="bg-white w-[25%] h-full">2</div>
        <div className="bg-white w-[25%] h-full">3</div>
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
