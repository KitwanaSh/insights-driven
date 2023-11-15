// components/BubbleChart.js
import React from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChart = ({ data }) => {
  return <Bubble data={data} />;
};

export default BubbleChart;