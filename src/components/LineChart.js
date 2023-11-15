// components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  return <Line data={data} />;
};

export default LineChart;