import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../Components/Topbar';

function index() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/monitor');
  };
  return (
    <div>
      <Topbar header="Dashboard" notification="true" back="true" />
      <div className="p-4 sm:p-6">
        <button
          onClick={handleClick}
          className="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
          focus:outline-none
          focus:shadow-outline
          transition
          duration-300
          ease-in-out
        ">
          Go To Monitor Page
        </button>
      </div>
    </div>
  );
}

export default index;
