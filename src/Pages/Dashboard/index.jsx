import React from 'react';
import Topbar from '../../Components/Topbar';
import { MachineNumber } from '../../Components/MachineNumber/MachineNumber';
import activeMachine from '../../assets/air-pump_13893596.gif';
import warningMachine from '../../assets/broken_11201792.gif';
import inactiveMachine from '../../assets/terrorism_15597286.gif';
import totalMachine from '../../assets/settings_11260823.gif';
import { HealthTable } from '../../Components/HealthReportTable/HealthTable';

function index() {
  return (
    <div className="poppins">
      <Topbar header="Dashboard" notification="true" back="true" />
      <div className="lg:p-4 p-6 ">
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
