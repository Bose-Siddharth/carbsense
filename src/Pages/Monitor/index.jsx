import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar';
import GaugeView from '../../Components/Monitor/gaugeView/GaugeView';
import OverviewCard from '../../Components/Monitor/overviewCard/OverviewCard';
import InfoCard from '../../Components/Monitor/InfoCard';
import FilterBox from '../../Components/Monitor/filterBox/FilterBox';
import TrendsCharts from '../../Components/Monitor/trendsCharts/TrendsCharts';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

function Index() {
  const { sendGetRequest } = useHttp();
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("view_option1");
  const [dataGauge, setDataGauge] = useState(null);
  const [latestReading, setLatestReading] = useState(null);
  const [categoriesTime, setCategoriesTime] = useState([]);
  const [initialSeriesData, setInitialSeriesData] = useState([]);
  const [alert, setAlert] = useState([]);

  const thresholds = [
    { value: 250, color: '#FF0000' },
    { value: 150, color: '#FFA500' },
    { value: 0, color: '#1E90FF' }
  ];

  const fetchDeviceData = async () => {
    try {
      const response = await sendGetRequest(`getDeviceStats/?id=${id}`);
      const { currentTemperature, currentConcentration, historicalTemperatureData } = response;

      setDataGauge({
        gasTemperature: {
          value: currentTemperature,
          percentage: Math.min((currentTemperature / 100) * 100, 100)
        },
        gasLevel: {
          value: currentConcentration,
          percentage: Math.min((currentConcentration / 300) * 100, 100)
        }
      });

      setCategoriesTime((prevCategories) => [
        ...prevCategories,
        ...historicalTemperatureData.map((dataPoint) =>
          new Date(dataPoint.timestamp).toLocaleTimeString()
        )
      ]);

      const temperatureData = historicalTemperatureData.map((dataPoint) =>
        parseFloat(dataPoint.temperature)
      );

      setInitialSeriesData((prevSeriesData) => {
        const updatedTemperatureSeries = {
          name: 'Gas Temperature',
          data: [...(prevSeriesData[0]?.data || []), ...temperatureData]
        };

        const updatedGasLevelSeries = {
          name: 'Gas Level (PPM)',
          data: [
            ...(prevSeriesData[1]?.data || []),
            ...Array(historicalTemperatureData.length).fill(currentConcentration)
          ]
        };

        return [updatedTemperatureSeries, updatedGasLevelSeries];
      });

      setLatestReading([currentTemperature, currentConcentration]);
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  const fetchAlert=async(device_id)=>{
    console.log(device_id)
    const response= await sendGetRequest(`dashboard/alert?device_id=${device_id}`);
    console.log(response.data)
    setAlert(response.data);
  }

  useEffect(()=>{
  fetchAlert(id);
  },[id])

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDeviceData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [id]);

  useEffect(() => {
    if (!dataGauge) {
      setDataGauge({
        gasTemperature: { value: 50, percentage: 50 },
        gasLevel: { value: 150, percentage: 50 }
      });

      setCategoriesTime(Array.from({ length: 7 }, (_, i) => `0`));
      setInitialSeriesData([ 
        {
          name: 'Gas Temperature',
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 101))
        },
        {
          name: 'Gas Level (PPM)',
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 301))
        }
      ]);
    }
  }, [dataGauge]);

  // useEffect(()=>{
  //   console.log(dataGauge)
  // },[dataGauge])

  // useEffect(()=>{
  //   console.log(categoriesTime)
  // },[categoriesTime])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Topbar header="Monitor" notification={true} back={true} data={alert.length>0?alert:[]}/>
      <div className="flex-row lg:gap-12 lg:flex items-center">
        <div className="flex-1 mb-4">
          <FilterBox 
          onChange={(e) => setSelectedOption(e.target.value)}
          />
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
      {selectedOption === "view_option2" && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.print()} 
        >
          Print Page
        </button>
      )}
      <div className="block gap-5 lg:flex">
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
          {dataGauge && (
            <div className='block md:flex md:justify-between '>
              <GaugeView
                title="Gas Temperature"
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
    </div>
  );
}

export default Index;
