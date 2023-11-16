// CsvInsights.js
import React, { useState } from 'react';
import Papa from 'papaparse';

import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import ScatterPlot from '../components/ScatterPlot';
import AreaChart from '../components/AreaChart';
import RadarChart from '../components/RadarChart';
import BubbleChart from '../components/BubbleChart';

const CsvInsights = () => {
  const [data, setData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedChart, setSelectedChart] = useState('line');
  const [selectedChartColumns, setSelectedChartColumns] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await new Promise((resolve) => {
        Papa.parse(file, {
          complete: (result) => {
            resolve(result);
          },
        });
      });

      const headerRow = result.data[0];
      const newData = result.data.slice(1);
      setData(newData);
      setSelectedColumns(headerRow);
    }
  };

  const handleColumnSelect = (e) => {
    const selectedColumn = e.target.value;
    setSelectedColumns((prev) =>
      prev.includes(selectedColumn)
        ? prev.filter((column) => column !== selectedColumn)
        : [...prev, selectedColumn]
    );
  };

  const handleChartSelect = (e) => {
    setSelectedChart(e.target.value);
  };

  const handleChartColumnSelect = (e, index) => {
    const value = e.target.value;
    setSelectedChartColumns((prev) => {
      const newColumns = [...prev];
      newColumns[index] = value;
      return newColumns;
    });
  };

  const generateChart = () => {
    try {
      if (selectedChartColumns.length >= 2) {
        alert('Please select at least two columns for the chart');
        return;
      }
  } catch(error) {
    console.error("Error generting chart", error)
  }

    // Implement your logic for generating the chart based on selectedColumns and data
    switch (selectedChart) {
      case 'line':
        setChartData(generateLineChartData());
        break;
      case 'bar':
        setChartData(generateBarChartData());
        break;
      case 'scatter':
        setChartData(generateScatterChartData());
        break;
      case 'area':
        setChartData(generateAreaChartData());
        break;
      case 'radar':
        setChartData(generateRadarChartData());
        break;
      case 'bubble':
        setChartData(generateBubbleChartData());
        break;
      default:
        setChartData(null);
    }
  };

  const generateLineChartData = () => {
    console.log("Generating Line chart")
    return {
      labels: data.map((entry) => entry[selectedChartColumns[0]]),
      datasets: selectedChartColumns.slice(1).map((column, index) => ({
        label: column,
        data: data.map((entry) => entry[column]),
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
        lineTension: 0.1,
        fill: false,
      })),
    };
  };

  const generateBarChartData = () => {
    // Implement logic for generating BarChart data
    // Example: Grouped bar chart with two columns
    return {
      labels: data.map((entry) => entry[selectedChartColumns[0]]),
      datasets: selectedChartColumns.slice(1).map((column, index) => ({
        label: column,
        data: data.map((entry) => entry[column]),
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`,
      })),
    };
  };

  const generateScatterChartData = () => {
    // Implement logic for generating ScatterPlot data
    // Example: Scatter plot with two columns
    return {
      datasets: [
        {
          label: 'Scatter Plot',
          data: data.map((entry) => ({
            x: entry[selectedChartColumns[0]],
            y: entry[selectedChartColumns[1]],
          })),
          backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`,
        },
      ],
    };
  };

  const generateAreaChartData = () => {
    // Implement logic for generating AreaChart data
    // Example: Area chart with two columns
    return {
      labels: data.map((entry) => entry[selectedChartColumns[0]]),
      datasets: [
        {
          label: 'Area Chart',
          data: data.map((entry) => entry[selectedChartColumns[1]]),
          backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`,
          fill: true,
        },
      ],
    };
  };

  const generateRadarChartData = () => {
    // Implement logic for generating RadarChart data
    // Example: Radar chart with two columns
    return {
      labels: data.map((entry) => entry[selectedChartColumns[0]]),
      datasets: [
        {
          label: selectedChartColumns[1],
          data: data.map((entry) => entry[selectedChartColumns[1]]),
          backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`,
          fill: true,
        },
      ],
    };
  };

  const generateBubbleChartData = () => {
    // Implement logic for generating BubbleChart data
    // Example: Bubble chart with three columns
    return {
      datasets: [
        {
          label: 'Bubble Chart',
          data: data.map((entry) => ({
            x: entry[selectedChartColumns[0]],
            y: entry[selectedChartColumns[1]],
            r: entry[selectedChartColumns[2]],
          })),
          backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`,
        },
      ],
    };
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className='p-20 bg-gray-600 text-white'><p>I am here</p></div>
      <div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4">Upload CSV File</h2>
        <label className="block text-sm text-gray-600">Choose a CSV file:</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mt-2 p-3 border border-indigo-500 rounded-md focus:outline-none focus:ring focus:border-indigo-400"
        />
      </div>

      {data.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Select Columns</h2>
          <div className="flex flex-wrap">
            {selectedColumns.map((column) => (
              <label key={column} className="mr-4 text-lg flex items-center">
                <input
                  type="checkbox"
                  value={column}
                  checked={selectedColumns.includes(column)}
                  onChange={handleColumnSelect}
                  className="mr-1"
                />
                {column}
              </label>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-lg font-bold mr-2">Select Chart Type:</label>
            <select
              value={selectedChart}
              onChange={handleChartSelect}
              className="p-2 border rounded"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="scatter">Scatter Plot</option>
              <option value="area">Area Chart</option>
              <option value="radar">Radar Chart</option>
              <option value="bubble">Bubble Chart</option>
            </select>
          </div>

          <div className="mt-4 flex items-center">
            <label className="text-lg font-bold mr-2">Select Columns for Chart:</label>
            {selectedChartColumns.map((column, index) => (
              <select
                key={index}
                value={column}
                onChange={(e) => handleChartColumnSelect(e, index)}
                className="p-2 border rounded mr-2"
              >
                {selectedColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            ))}
            <button
              onClick={generateChart}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Generate Chart
            </button>
          </div>
        </div>
      )}
      {chartData && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Chart</h2>
          {selectedChart === 'line' && <LineChart data={chartData} />}
          {selectedChart === 'bar' && <BarChart data={chartData} />}
          {selectedChart === 'scatter' && <ScatterPlot data={chartData} />}
          {selectedChart === 'area' && <AreaChart data={chartData} />}
          {selectedChart === 'radar' && <RadarChart data={chartData} />}
          {selectedChart === 'bubble' && <BubbleChart data={chartData} />}
        </div>
      )}
    </div>
  );
};

export default CsvInsights;

