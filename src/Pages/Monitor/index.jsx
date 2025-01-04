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
      name: 'Gas Production',
      data: [120000, 60000, 40000, 20000, 10000]
    },
    {
      name: 'Oil Production',
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
      <Topbar header="Monitor" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex flex-col gap-2 w-full lg:w-1/3">
          <FilterBox />
          <div className="space-y-2">
            <InfoCard title="Flow Pressure" value={79.21} unit="K psi" />
            <InfoCard title="Gas-Oil Ratio (GOR)" value={865.09} unit="mcf/bbl" />
          </div>
          <div className="space-y-2">
            <OverviewCard
              title="Oil BOEPD"
              currentWeekValue={124181}
              previousWeekValue={0}
              percentageOfChange="100.00%"
            />
            <OverviewCard
              title="Gas BOEPD"
              currentWeekValue={231580}
              previousWeekValue={0}
              percentageOfChange="100.00%"
            />
          </div>
          <div>
            <TrendsCharts
              title="Oil and Gas Production Trends"
              subtitle="Last 4 Weeks"
              categories={categories1}
              seriesData={seriesData1}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-2 w-full lg:w-2/3">
          {/* Gauges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            <GaugeView title="Well Uptime" value={26} unit="units" percentage={70} />
            <GaugeView title="Gas Production Rate" value={46} unit="mcf/day" percentage={59} />
            <GaugeView title="Well Uptime" value={72} unit="dgl/day" percentage={82} />
            <GaugeView title="Production Efficiency" value={66} unit="%" percentage={66} />
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <RankingCharts
              title="Top 5 Gas-Producing Wells"
              categories={categories}
              seriesData={seriesData}
            />
            <RankingCharts
              title="Top 5 Gas-Producing Wells"
              categories={categories}
              seriesData={seriesData}
            />
          </div>
          <div>
            <ProductionCharts
              title="Production by State"
              data={productionData}
              categories={productionCategories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
