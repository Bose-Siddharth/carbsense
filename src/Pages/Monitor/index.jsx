import React from 'react';
import { RiMessage3Fill, RiArrowGoBackFill } from 'react-icons/ri';
import DropDownNotification from '../../Components/DropDownNotification';
import Measurements from '../../Components/Monitor/Measurements';
import OilLevel from '../../Components/Monitor/OilLevel';

function index() {
  return (
    <div className="flex flex-col  gap-10">
      <div className="flex justify-between border border-black border-s-4 border-r-0 border-t-0 border-b-0">
        <h1 className="font-semibold text-4xl">Monitor</h1>
        <div className="flex w-1/12">
          <div className="flex flex-1 justify-center items-center">
            <RiMessage3Fill className="text-3xl" />
            <DropDownNotification />
          </div>
          <div className="flex flex-1 justify-center items-center">
            <RiArrowGoBackFill className="text-3xl" />
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="bg-white w-[50%] h-96 rounded-2xl">
          <Measurements />
        </div>
        <div className="bg-white w-[25%] h-96 rounded-2xl">
          <OilLevel />
        </div>
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
