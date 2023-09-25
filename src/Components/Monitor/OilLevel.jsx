/* eslint-disable react/prop-types */
import React from 'react';
import { color } from 'd3-color';
import LiquidFillGauge from 'react-liquid-gauge';

function OilLevel({ value = 50, radius = '100', unit = '%' }) {
  return (
    // <div className="bg-white flex justify-center items-center h-full font-semibold rounded-2xl">
    <div className="container mx-auto p-4">
      <div className="p-8 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-3xl font-medium mb-8 text-blue-900 self-start">Oil Level</h1>
        <LiquidFillGauge
          width={radius * 2}
          height={radius * 2}
          value={value}
          percent={unit}
          textSize={1}
          textOffsetX={10}
          textOffsetY={30}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          outerRadius={0.94}
          circleStyle={{
            fill: '#FE6FEE'
          }}
          waveStyle={{
            fill: '#FE6FEE'
          }}
          textStyle={{
            fill: color('#444').toString(),
            fontFamily: 'Arial'
          }}
          waveTextStyle={{
            fill: color('#fff').toString(),
            fontFamily: 'Arial'
          }}
        />
        <p className="text-blue-600">Last Update: 11:28 am</p>
      </div>
    </div>
  );
}
export default OilLevel;
