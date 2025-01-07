import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../Components/Topbar';
import { MachineNumber } from '../../Components/MachineNumber/MachineNumber';
import activeMachine from '../../assets/air-pump_13893596.gif';
import warningMachine from '../../assets/broken_11201792.gif';
import inactiveMachine from '../../assets/terrorism_15597286.gif';
import totalMachine from '../../assets/settings_11260823.gif';
import { HealthTable } from '../../Components/HealthReportTable/HealthTable';

function index() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/monitor');
  };

  return (
    <div>
      <Topbar header="Dashboard" notification="true" back="true" />
      <div className="lg:p-4 p-6 ">
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
        <div className="flex lg:flex-row flex-col justify-center items-center gap-8 lg:pt-4 pt-6">
          <MachineNumber
            title="Active Machines"
            totalNumber="150"
            icon={activeMachine}
            description="Working fine"
          />
          <MachineNumber
            title="Warning Machines"
            totalNumber="50"
            icon={warningMachine}
            description="Warning!!!"
          />
          <MachineNumber
            title="Inactive Machines"
            totalNumber="50"
            icon={inactiveMachine}
            description="OOPS!!! Something is wrong!!!"
          />
          <MachineNumber
            title="Total Machines"
            totalNumber="200"
            icon={totalMachine}
            description="Overall"
          />
        </div>
      </div>

      {/* Tables */}
      <HealthTable name="Active Machines Health Reports" />
      <HealthTable name="Warning Machines Health Reports" />
      <HealthTable name="Inactive Machines Health Reports" />
    </div>
  );
}

export default index;
