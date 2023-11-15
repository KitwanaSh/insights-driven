// components/ScatterPlot.js
import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterPlot = ({ data }) => {
  return <Scatter data={data} />;
};

export default ScatterPlot;