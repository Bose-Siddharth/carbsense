import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar';
import GaugeView from '../../Components/Monitor/gaugeView/GaugeView';
import OverviewCard from '../../Components/Monitor/overviewCard/OverviewCard';
import InfoCard from '../../Components/Monitor/InfoCard';
import FilterBox from '../../Components/Monitor/filterBox/FilterBox';
import TrendsCharts from '../../Components/Monitor/trendsCharts/TrendsCharts';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import DataChart from '../../Components/ChartsUi/DataChart';

function Index() {
  const { sendGetRequest } = useHttp();
  const { sendPostRequest } = useHttp();
  // const { id } = useParams();
  const id = localStorage.getItem('id');
  const [selectedOption, setSelectedOption] = useState('view_option1');
  const [dataGauge, setDataGauge] = useState(null);
  const [latestReading, setLatestReading] = useState(null);
  const [latestReadingTemp, setLatestReadingTemp] = useState(null);
  const [latestReadingConc, setLatestReadingConc] = useState(null);
  const [categoriesTime, setCategoriesTime] = useState([]);
  const [initialSeriesData, setInitialSeriesData] = useState([]);
  const [initialSeriesDataTemp, setInitialSeriesDataTemp] = useState([]);
  const [initialSeriesDataConc, setInitialSeriesDataConc] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [alert, setAlert] = useState([]);
  const [dataTime, setDataTime] = useState([])

  const thresholds = [
    { value: 50, color: '#FF0000' },
    { value: 20, color: '#FFA500' },
    { value: 0, color: '#1E90FF' }
  ];


  const generateMockHistoricalData = (startTime, numPoints, intervalSeconds) => {
    const historicalData = [];
    for (let i = 0; i < numPoints; i++) {
      historicalData.push({
        timestamp: startTime + i * intervalSeconds * 1000,
      });
    }
    return historicalData;
  };

  const fetchDeviceData = async () => {
    try {
      const response = await sendGetRequest(`getDeviceStats/?id=${id}`);
      const { currentTemperature, currentConcentration } = response;

      const now = Date.now();
      const historicalTemperatureData = generateMockHistoricalData(
        now - 300000,
        60,
        30
      );

      setDataGauge({
        gasTemperature: {
          value: currentTemperature,
          percentage: Math.min((currentTemperature / 100) * 100, 100),
        },
        gasLevel: {
          value: currentConcentration,
          percentage: Math.min((currentConcentration / 300) * 100, 100),
        },
      });

      setCategoriesTime((prevCategories) => [
        ...prevCategories,
        ...historicalTemperatureData.map((dataPoint) =>
          new Date(dataPoint.timestamp).toLocaleTimeString()
        ),
      ]);

      const temperatureData = historicalTemperatureData.map((dataPoint) =>
        parseFloat(dataPoint.temperature)
      );

      setInitialSeriesData((prevSeriesData) => {
        const updatedTemperatureSeries = {
          name: 'Gas Temperature',
          data: [...(prevSeriesData[0]?.data || []), ...temperatureData],
        };

        const updatedGasLevelSeries = {
          name: 'Gas Level (PPM)',
          data: [
            ...(prevSeriesData[1]?.data || []),
            ...Array(historicalTemperatureData.length).fill(currentConcentration),
          ],
        };

        return [updatedTemperatureSeries, updatedGasLevelSeries];
      });

      setLatestReading([currentTemperature, currentConcentration]);
      setLatestReadingTemp([currentTemperature]);
      setLatestReadingConc([currentConcentration])
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };




  // const fetchDeviceData = async () => {
  //   try {
  //     const response = await sendGetRequest(`getDeviceStats/?id=${id}`);
  //     const { currentTemperature, currentConcentration, historicalTemperatureData } = response;

  //     setDataGauge({
  //       gasTemperature: {
  //         value: currentTemperature,
  //         percentage: Math.min((currentTemperature / 100) * 100, 100)
  //       },
  //       gasLevel: {
  //         value: currentConcentration,
  //         percentage: Math.min((currentConcentration / 300) * 100, 100)
  //       }
  //     });

  //     setCategoriesTime((prevCategories) => [
  //       ...prevCategories,
  //       ...historicalTemperatureData.map((dataPoint) =>
  //         new Date(dataPoint.timestamp).toLocaleTimeString()
  //       )
  //     ]);

  //     const temperatureData = historicalTemperatureData.map((dataPoint) =>
  //       parseFloat(dataPoint.temperature)
  //     );

  //     setInitialSeriesData((prevSeriesData) => {
  //       const updatedTemperatureSeries = {
  //         name: 'Gas Temperature',
  //         data: [...(prevSeriesData[0]?.data || []), ...temperatureData]
  //       };

  //       const updatedGasLevelSeries = {
  //         name: 'Gas Level (PPM)',
  //         data: [
  //           ...(prevSeriesData[1]?.data || []),
  //           ...Array(historicalTemperatureData.length).fill(currentConcentration)
  //         ]
  //       };

  //       return [updatedTemperatureSeries, updatedGasLevelSeries];
  //     });

  //     setLatestReading([currentTemperature, currentConcentration]);
  //   } catch (error) {
  //     console.error('Error fetching device data:', error);
  //   }
  // };

  const fetchAlert = async (device_id) => {
    console.log(device_id);
    const response = await sendGetRequest(`dashboard/alert?device_id=${device_id}`);
    console.log(response.data);
    setAlert(response.data);
  };

  useEffect(() => {
    fetchAlert(id);
  }, [id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedOption !== 'view_option3') {
        fetchDeviceData();
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, [id, selectedOption]);


  useEffect(() => {
    if (!dataGauge) {
      setDataGauge({
        gasTemperature: { value: 0, percentage: 0 },
        gasLevel: { value: 0, percentage: 0 }
      });

      setCategoriesTime(Array.from({ length: 7 }, (_, i) => `0`));
      setInitialSeriesData([
        {
          name: 'Gas Temperature',
          data: Array.from({ length: 7 }, () => 0),
          color: '#1E90FF', 
        },
        {
          name: 'Gas Level (PPM)',
          data: Array.from({ length: 7 }, () => 0),
          color: '#FF4500', 
        },
      ]);

      setInitialSeriesDataTemp([
        {
          name: 'Gas Temperature',
          data: Array.from({ length: 7 }, () => 0),
          color: '#1E90FF', 
        }
      ]);

      setInitialSeriesDataConc([
        {
          name: 'Gas Level (PPM)',
          data: Array.from({ length: 7 }, () => 0),
          color: '#FF4500', 
        },
      ]);


    }
  }, [dataGauge]);

  // useEffect(()=>{
  //   console.log(dataGauge)
  // },[dataGauge])

  // useEffect(()=>{
  //   console.log(categoriesTime)
  // },[categoriesTime])

  useEffect(() => {
    console.log(selectedOption)
  }, [selectedOption])



  const fetchTimeFrameData = async () => {
    if (!startTime || !endTime) {
      alert('Please select both start and end times');
      return;
    }

    try {
      // Prepare payload
      const payload = {
        date: startTime.split('T')[0],
        startTime: `${startTime.split('T')[1]}:00`,
        endTime: `${endTime.split('T')[1]}:00`,
      };


      console.log(payload)

      const response = await sendPostRequest(`getAllData/${id}`, {
        date: startTime.split('T')[0],
        startTime: `${startTime.split('T')[1]}:00`,
        endTime: `${endTime.split('T')[1]}:00`
      })

      console.log(response)

      console.log(response.data)

      setDataTime(response.data)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };








  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Topbar
        header="Monitor"
        notification={true}
        back={true}
        data={alert.length > 0 ? alert : []}
      />
      <div className="flex-row lg:gap-12 lg:flex items-center">
        <div className="flex-1 mb-4">
          <FilterBox onChange={(e) => setSelectedOption(e.target.value)} />
        </div>

        <div className="flex-1 mb-4">
          <InfoCard title="Gas Type" subTitle="Carbon Monoxide (CO)" />
        </div>
        <div className="flex-1 mb-4">
          <OverviewCard
            sensorId="SENSOR12345"
            sensorStatus="Active"
            upTime="72 hours"
            efficiency={95}
          />
        </div>
      </div>
      {selectedOption === 'view_option2' && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.print()}>
          Print Page
        </button>
      )}


      {(selectedOption === 'view_option1' || selectedOption === 'view_option2') &&
        <>
          <div className='flex w-[100%] gap-2' >
            <div className='w-[50%]'>
              {categoriesTime.length > 0 && initialSeriesData.length > 0 && (
                <TrendsCharts
                  title="Dynamic Trends Chart For Temperature"
                  subtitle="Values updated dynamically temperature"
                  categories={categoriesTime}
                  initialSeriesData={initialSeriesDataTemp}
                  latestReading={latestReadingTemp}
                  thresholds={thresholds}
                />
              )}
            </div>
            <div className='w-[50%]'>
              {categoriesTime.length > 0 && initialSeriesData.length > 0 && (
                <TrendsCharts
                  title="Dynamic Trends Chart For Concentration"
                  subtitle="Values updated dynamically concentration"
                  categories={categoriesTime}
                  initialSeriesData={initialSeriesDataConc}
                  latestReading={latestReadingConc}
                  thresholds={thresholds}
                />
              )}
            </div>
          </div>


          <div className="block gap-5 lg:flex">
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
              {dataGauge && (
                <div className="block md:flex md:justify-between ">
                  <GaugeView
                    title="Board Temperature"
                    value={dataGauge.gasTemperature.value}
                    unit="°C"
                    percentage={dataGauge.gasTemperature.percentage}
                    thresholds={{ low: 30, high: 60 }}
                  />
                  <GaugeView
                    title="Gas Level (PPM)"
                    value={dataGauge.gasLevel.value}
                    unit="ppm"
                    percentage={dataGauge.gasLevel.percentage}
                    thresholds={{ low: 100, high: 200 }}
                  />
                </div>
              )}
            </div>
            <div className="flex-1">
              {categoriesTime.length > 0 && initialSeriesData.length > 0 && (
                <TrendsCharts
                  title="Dynamic Trends Chart"
                  subtitle="Values updated dynamically"
                  categories={categoriesTime}
                  initialSeriesData={initialSeriesData}
                  latestReading={latestReading}
                  thresholds={thresholds}
                />
              )}
            </div>
          </div>
        </>
      }

      {selectedOption === 'view_option3' && (
        <>
          <div className="flex items-center gap-4">
            <input
              type="datetime-local"
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <input
              type="datetime-local"
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <button
              onClick={fetchTimeFrameData}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Fetch Data
            </button>
          </div>

          <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.print()}>
          Print Page
        </button>


          <div className='flex-row lg:flex  gap-2'>
            {dataTime.length > 0 ? <div className='w-[100%] lg:w-[50%] h-[300px]  rounded-lg overflow-hidden bg-[#fff]'>
              <DataChart data={dataTime} label={'Temperature (°C)'} text={'Temperature vs. Time'} text1={'Time (HH:MM:SS)'} text2={'Temperature (°C)'}/>
            </div> : <p>No data to display</p>}

            {dataTime.length > 0 ? <div className='w-[100%] mt-10 lg:mt-0 lg:w-[50%] h-[300px]  rounded-lg overflow-hidden bg-[#fff]'>
              <DataChart data={dataTime} label={'Concentration (PPM)'} text={'Concentration vs. Time'} text1={'Time (HH:MM:SS)'} text2={'Concentration (PPM)'}/>
            </div> : <p></p>}
          </div>

        </>
      )}




    </div>
  );
}

export default Index;
