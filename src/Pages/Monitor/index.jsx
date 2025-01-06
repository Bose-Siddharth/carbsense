/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import Topbar from '../../Components/Topbar';
import GaugeView from '../../Components/Monitor/gaugeView/GaugeView';
import ProductionCharts from '../../Components/Monitor/productionCharts/ProductionCharts';
import OverviewCard from '../../Components/Monitor/overviewCard/OverviewCard';
import InfoCard from '../../Components/Monitor/InfoCard';
import FilterBox from '../../Components/Monitor/filterBox/FilterBox';
import RankingCharts from '../../Components/Monitor/rankingCharts/RankingCharts';
import TrendsCharts from '../../Components/Monitor/trendsCharts/TrendsCharts';

// Helper function to generate dummy data
const generateDummyData = (numStates, numWeeks) => {
  const categories = Array.from({ length: numWeeks }, (_, i) => `Week ${i + 1}`);
  const data = Array.from({ length: numStates }, () =>
    Array.from({ length: numWeeks }, () => Math.floor(Math.random() * 100))
  );

  return {
    categories,
    data
  };
};

function index() {
  // Generate dummy data for ProductionCharts
  const { categories: productionCategories, data: productionData } = generateDummyData(8, 12); // 8 states, 12 weeks

  const categories = ['Well_8', 'Well_12', 'Well_21', 'Well_42', 'Well_50'];
  const seriesData = [
    {
      name: 'Gas Temperature',
      data: [120000, 60000, 40000, 20000, 10000]
    },
    {
      name: 'Gas Level (PPM)',
      data: [110000, 50000, 35000, 18000, 9000]
    }
  ];

  const categories1 = ['Week 51 2024', 'Week 52 2024', 'Week 01 2025'];
  const seriesData1 = [
    {
      name: 'Oil Production',
      data: [108340, 117370, 60680]
    },
    {
      name: 'Gas Production',
      data: [329370, 361430, 192310]
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Bar */}
      <Topbar header="Monitor" notification={true} back={true} />
      {/* layer 1 */}
      <div className="sm:flex items-center gap-5 grid">
        <div className="flex-1">
          <FilterBox />
        </div>
        <div className="flex-1">
          <InfoCard title="Gas Type" subTitle="Carbon Monoxide(CO)" />
        </div>
        <div className="flex-1">
          <OverviewCard
            title="Gas BOPED"
            currentWeekValue={243687}
            previousWeekValue={0}
            percentageOfChange="100.00%"
          />
        </div>
      </div>
      {/* layer 2 */}
      <div className='flex gap-5'>
        {/* gauge section */}
        <div className='flex-1 flex gap-5'>
          <GaugeView
            title='Temperature'
            value={20}
            unit='°C'
            percentage={20}
          />
          <GaugeView
            title='Gas Level(PPM)'
            value={64}
            unit='ppm'
            percentage={64}
          />
        </div>
        {/* graphs */}
        <div className="flex-1">
          <TrendsCharts
          title='Gas Condition Overview'
            categories={categories1}
            seriesData={seriesData1}
          />
        </div>
      </div>
    </div>
  );
}

export default index;
