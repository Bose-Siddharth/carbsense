/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import Topbar from '../../Components/Topbar';
import GaugeView from '../../Components/Monitor/GaugeView';
import ProductionCharts from '../../Components/Monitor/ProductionCharts';
import OverviewCard from '../../Components/Monitor/OverviewCard';
import InfoCard from '../../Components/Monitor/InfoCard';
import FilterBox from '../../Components/Monitor/FilterBox';
import RankingCharts from '../../Components/Monitor/RankingCharts';
import TrendsCharts from '../../Components/Monitor/TrendsCharts';

function index() {
  return (
    <div className="flex flex-col  gap-10">
      <Topbar header="Monitor" />
      {/* layer 1 */}
      <div className="flex gap-10">
        {/* layer 2 */}
        <div className="flex flex-col gap-5">
          {/* layer 3 */}
          <div className="flex gap-5">
            <div className="">
              <div className="">
                <FilterBox />
              </div>
              <div className="mt-2">
                <InfoCard title="Flow Pressure" value={79.21} unit="K psi" />
              </div>
              <div className="mt-2">
                <InfoCard title="Gas-Oil Ratio (GOR)" value={865.09} unit="mcf/bbl" />
              </div>
            </div>
            <div>
              <div>
                <OverviewCard
                  title="Oil BOEPD"
                  currentWeekValue={124181}
                  previousWeekValue={0}
                  percentageOfChange="100.00%"
                />
              </div>
              <div className="mt-3">
                <OverviewCard
                  title="Gas BOEPD"
                  currentWeekValue={231580}
                  previousWeekValue={0}
                  percentageOfChange="100.00%"
                />
              </div>
            </div>
          </div>
          {/* layer 3 */}
          <div>
            <TrendsCharts />
          </div>
        </div>
        <div className="flex flex-col w-full">
          {/* gauges */}
          <div className="flex w-full">
            <div className="flex-1">
              <GaugeView label='test'/>
            </div>
            <div className="flex-1">
              <GaugeView label='test'/>
            </div>
            <div className="flex-1">
              <GaugeView label='test'/>
            </div>
            <div className="flex-1">
              <GaugeView label='test'/>
            </div>
          </div>
          {/* charts */}
          <div className="flex flex-1">
            <div className="flex flex-1 flex-col gap-5">
              <RankingCharts />
              <RankingCharts />
            </div>
            <div className="flex-1">
              <ProductionCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
