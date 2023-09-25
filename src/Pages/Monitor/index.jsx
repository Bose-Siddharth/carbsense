import React from 'react';
import Measurements from '../../Components/Monitor/Measurements';
import OilLevel from '../../Components/Monitor/OilLevel';

function index() {
  return (
    <div>
      <div className="flex">
        <Measurements />
        <OilLevel />
      </div>
      <div></div>
    </div>
  );
}

export default index;
