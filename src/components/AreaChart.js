// components/AreaChart.js
import React from 'react';
import { PolarArea } from 'react-chartjs-2';

const AreaChart = ({ data }) => {
  return <PolarArea data={data} />;
};

export default AreaChart;