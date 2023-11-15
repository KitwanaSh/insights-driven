// components/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = ({ data }) => {
  return <Radar data={data} />;
};

export default RadarChart;