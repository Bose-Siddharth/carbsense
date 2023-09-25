import React from 'react';

function index() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1>Monitor</h1>
      </div>
      <div className="flex gap-5">
        <div className="bg-white w-[50%] h-full">1</div>
        <div className="bg-white w-[25%] h-full">2</div>
        <div className="bg-white w-[25%] h-full">3</div>
      </div>
      <div className="flex gap-5">
        <div className="bg-white w-[50%] h-full">4</div>
        <div className="bg-white w-[25%] h-full">5</div>
        <div className="bg-white w-[25%] h-full">6</div>
      </div>
    </div>
  );
}

export default index;
