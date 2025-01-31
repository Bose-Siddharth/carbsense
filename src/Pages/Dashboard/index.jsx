import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar';
import { MachineNumber } from '../../Components/MachineNumber/MachineNumber';
import activeMachine from '../../Lottie/activeMachine.json';
import warningMachine from '../../Lottie/warning.json';  // Import the Lottie animation for warnings
import inactiveMachine from '../../Lottie/inactive.json';  // GIF for inactive machines
import totalMachine from '../../Lottie/total.json';  
import { HealthTable } from '../../Components/HealthReportTable/HealthTable';
import useHttp from '../../hooks/useHttp';
import Lottie from 'react-lottie';

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

  useEffect(() => {
    localStorage.clear();
  }, []);

  const fetchMachineData = async () => {
    try {
      const response = await sendGetRequest('dashboard');
      const { totalDevices, activeDevices, inactiveDevices, warningDevices, deviceStatuses } =
        response;

      console.log(response);

      setMachineStats({
        totalDevices,
        activeDevices,
        warningDevices,
        inactiveDevices,
        deviceStatuses
      });
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  const fetchAlert = async () => {
    const response = await sendGetRequest('dashboard/alert');
    console.log(response.data);
    setAlert(response.data);
  };

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

  // Lottie animation options for Active Machines
  const activeLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: activeMachine, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Lottie animation options for Warning Machines
  const warningLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: warningMachine,  
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const inactiveLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: inactiveMachine,  
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const totalLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: totalMachine,  
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="poppins w-full">
      <Topbar
        header="IEMA CARBSENSE Dashboard"
        notification="true"
        back="true"
        data={alert.length > 0 ? alert : []}
      />
      
      <div className="lg:p-4 flex flex-col justify-center">
        <div className="flex lg:flex-row flex-col justify-center items-center gap-8 lg:pt-4 pt-6">
          <MachineNumber
            title="Active Machines"
            totalNumber={machineStats.activeDevices}
            lottieOptions={activeLottieOptions}  
            description="Working fine"
          />
          {/* Pass warning Lottie animation for Warning Machines */}
          <MachineNumber
            title="Warning Machines"
            totalNumber={machineStats.warningDevices}
            lottieOptions={warningLottieOptions}  // Use the Lottie options for warning machines here
            description="Warning!!!"
          />

          <MachineNumber
            title="Inactive Machines"
            totalNumber={machineStats.inactiveDevices}
            lottieOptions={inactiveLottieOptions} 
            description="OOPS!!! Something is wrong!!!"
          />
          <MachineNumber
            title="Total Machines"
            totalNumber={machineStats.totalDevices}
            lottieOptions={totalLottieOptions}
            description="Overall"
          />
        </div>
      </div>

      <HealthTable name="Active Machines Health Reports" newdata={top3Active} />
      <HealthTable name="Inactive Machines Health Reports" newdata={top3Inactive} />
    </div>
  );
}

export default Index;
