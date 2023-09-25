import React from 'react';
import './DropDownNotification.css';
import { BiSolidMessageSquareDots } from 'react-icons/bi';

function index() {
  return (
    <>
      <BiSolidMessageSquareDots />
      <div className="flex flex-col dropDownProfile">
        <ul className="flex flex-col gap-4">
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </>
  );
}

export default index;
