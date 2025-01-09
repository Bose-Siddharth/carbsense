import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar';
import { MachineNumber } from '../../Components/MachineNumber/MachineNumber';
import activeMachine from '../../assets/air-pump_13893596.gif';
import warningMachine from '../../assets/broken_11201792.gif';
import inactiveMachine from '../../assets/terrorism_15597286.gif';
import totalMachine from '../../assets/settings_11260823.gif';
import { HealthTable } from '../../Components/HealthReportTable/HealthTable';
import useHttp from '../../hooks/useHttp'; 

function Index() {
  const { sendGetRequest } = useHttp(); 
  const [alert, setAlert] = useState([]);
  const [machineStats, setMachineStats] = useState({
    totalDevices: 0,
    activeDevices: 0,
    warningDevices: 0,
    inactiveDevices: 0,
    deviceStatuses: []
  });

  const fetchMachineData = async () => {
    try {
      const response = await sendGetRequest('dashboard');
      const { totalDevices, activeDevices, inactiveDevices, warningDevices, deviceStatuses } =
        response;

      console.log(response);

      setMachineStats({
        totalDevices,
        activeDevices,
        inactiveDevices,
        warningDevices,
        deviceStatuses
      });
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  const fetchAlert=async()=>{
    const response= await sendGetRequest(`dashboard/alert`);
    console.log(response.data)
    setAlert(response.data);
  }

  useEffect(() => {
    fetchMachineData();
    fetchAlert();
  }, []);

  const top3Active = machineStats.deviceStatuses
    .filter((device) => device.status === 'Active')
    .slice(0, 3);
  const top3Warning = machineStats.deviceStatuses
    .filter((device) => device.status === 'Warning')
    .slice(0, 3);
  const top3Inactive = machineStats.deviceStatuses
    .filter((device) => device.status === 'Inactive')
    .slice(0, 3);

  return (
    <div className="poppins w-full">
      <Topbar header="Dashboard" notification="true" back="true" data={alert.length>0?alert:[]}/>
      <div className="lg:p-4 flex flex-col justify-center">
        <div className="flex lg:flex-row flex-col justify-center items-center gap-8 lg:pt-4 pt-6">
          <MachineNumber
            title="Active Machines"
            totalNumber={machineStats.activeDevices} 
            icon={activeMachine}
            description="Working fine"
          />
          <MachineNumber
            title="Warning Machines"
            totalNumber={machineStats.warningDevices}
            icon={warningMachine}
            description="Warning!!!"
          />
          <MachineNumber
            title="Inactive Machines"
            totalNumber={machineStats.inactiveDevices}
            icon={inactiveMachine}
            description="OOPS!!! Something is wrong!!!"
          />
          <MachineNumber
            title="Total Machines"
            totalNumber={machineStats.totalDevices}
            icon={totalMachine}
            description="Overall"
          />
        </div>
      </div>

      <HealthTable name="Active Machines Health Reports" newdata={top3Active} />
      {/* <HealthTable
        name="Warning Machines Health Reports"
        newdata={top3Warning} 
      /> */}
      <HealthTable name="Inactive Machines Health Reports" newdata={top3Inactive} />
    </div>
  );
}

export default Index;
