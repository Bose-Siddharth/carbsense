/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import Topbar from '../../Components/Topbar';
import GaugeView from '../../Components/Monitor/gaugeView/GaugeView';
import ProductionCharts from '../../Components/Monitor/productionCharts/ProductionCharts';
import OverviewCard from '../../Components/Monitor/overviewCard/OverviewCard';
import InfoCard from '../../Components/Monitor/InfoCard';
import FilterBox from '../../Components/Monitor/filterBox/FilterBox';
import TrendsCharts from '../../Components/Monitor/trendsCharts/TrendsCharts';
import { useParams } from 'react-router-dom';

function generateDummyData(rows = 10, columns = 8) {
  const categories = Array.from({ length: columns }, (_, i) => `Day ${i + 1}`);
  const data = [];
  for (let i = 0; i < rows; i++) {
    const tempData = Array.from({ length: columns }, () => Math.floor(Math.random() * 101));
    data.push({ name: `Interval ${i + 1} Temperature`, data: tempData });
    const ppmData = Array.from({ length: columns }, () => Math.floor(Math.random() * 201));
    data.push({ name: `Interval ${i + 1} PPM`, data: ppmData });
  }
  return { categories, data };
}

function generateDummyGaugeData() {
  const gasTemperature = Math.floor(Math.random() * 101);
  const gasLevel = Math.floor(Math.random() * 301);
  const gasTemperaturePercentage = Math.min((gasTemperature / 100) * 100, 100);
  const gasLevelPercentage = Math.min((gasLevel / 300) * 100, 100);
  return {
    gasTemperature: {
      value: gasTemperature,
      percentage: gasTemperaturePercentage
    },
    gasLevel: {
      value: gasLevel,
      percentage: gasLevelPercentage
    }
  };
}

function index() {
  const { data, categories } = generateDummyData(5, 8);
  const [dataGauge, setDataGauge] = useState(generateDummyGaugeData());
  const [latestReading, setLatestReading] = useState(null);
  const [categoriesTime, setCategoriesTime] = useState([...categories]);
  const { id } = useParams();


  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateDummyGaugeData();
      // console.log(id)
      console.log('Generated Dummy Data:', newData);
      setDataGauge({
        gasTemperature: {
          value: newData.gasTemperature.value,
          percentage: newData.gasTemperature.percentage
        },
        gasLevel: {
          value: newData.gasLevel.value,
          percentage: newData.gasLevel.percentage
        }
      });
      setLatestReading([newData.gasTemperature.value, newData.gasLevel.value]);
      setCategoriesTime((prevCategories) => [...prevCategories, new Date().toLocaleTimeString()]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const initialSeriesData = [
    {
      name: 'Gas Temperature',
      data: Array.from({ length: categoriesTime.length }, () => Math.floor(Math.random() * 101))
    },
    {
      name: 'Gas Level (PPM)',
      data: Array.from({ length: categoriesTime.length }, () => Math.floor(Math.random() * 301))
    }
  ];

  const thresholds = [
    { value: 250, color: '#FF0000' },
    { value: 150, color: '#FFA500' },
    { value: 0, color: '#1E90FF' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Topbar header="Monitor" notification={true} back={true} />
      <div className="sm:flex items-center gap-5 grid">
        <div className="flex-1">
          <FilterBox />
        </div>
        <div className="flex-1">
          <InfoCard title="Gas Type" subTitle="Carbon Monoxide(CO)" />
        </div>
        <div className="flex-1">
          <OverviewCard
            sensorId="SENSOR12345"
            sensorStatus="Active"
            upTime="72 hours"
            efficiency={95}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
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
        <div className="flex-1">
          <TrendsCharts
            title="Dynamic Trends Chart"
            subtitle="Values updated dynamically"
            categories={categoriesTime}
            initialSeriesData={initialSeriesData}
            latestReading={latestReading}
            thresholds={thresholds}
          />
        </div>
      </div>
      <div>
        <ProductionCharts
          title="Gas Temperature and PPM Trends"
          data={data}
          categories={categories}
        />
      </div>
    </div>
  );
}

export default index;
