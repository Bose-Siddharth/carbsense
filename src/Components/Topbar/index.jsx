import React, { useState } from 'react';
import { RiMessage3Fill, RiArrowGoBackFill } from 'react-icons/ri';
import DropDownNotification from '../../Components/DropDownNotification';

function index({ header, notification, back }) {
  const [openNotification, setOpenNotification] = useState(false);

  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="flex justify-between border border-black border-s-4 border-r-0 border-t-0 border-b-0">
      <h1 className="font-semibold text-4xl whitespace-pre">{header}</h1>
      <div className="flex w-1/12">
        <div
          className={`${
            notification === 'false' ? 'hidden' : 'flex flex-1 justify-center items-center group'
          }`}>
          <h2 className="fixed bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:mr-32 group-hover:px-2 group-hover:py-1 group-hover:w-fit">
            <span className="group-hover:underline">Notification</span>
          </h2>
          <RiMessage3Fill
            className="text-3xl"
            onClick={() => setOpenNotification(!openNotification)}
          />

          {openNotification && <DropDownNotification />}
        </div>
        <div
          className={`${
            back === 'false' ? 'hidden' : 'flex flex-1 justify-center items-center group'
          }`}>
          <RiArrowGoBackFill className="text-3xl" onClick={handleBack} />
          <h2 className="fixed bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:ml-20 group-hover:px-2 group-hover:py-1 group-hover:w-fit">
            <span className="group-hover:underline">Back</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default index;
