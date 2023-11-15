// CsvInsights.js

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import './style/CsvInsights.css'; // Import the CSS file

const CsvInsights = () => {
  const [data, setData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedChart, setSelectedChart] = useState('line');
  const [selectedChartColumns, setSelectedChartColumns] = useState([]);
  const [chartData, setChartData] = useState(null);

  const onDrop = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = async (e) => {
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

    fileInput.click();
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
    if (selectedChartColumns.length < 2) {
      alert('Please select at least two columns for the chart');
      return;
    }

    // Implement your logic for generating the chart based on selectedColumns and data
    switch (selectedChart) {
      case 'line':
        setChartData(generateLineChartData());
        break;
      // Add cases for other chart types
      default:
        setChartData(null);
    }
  };

  const generateLineChartData = () => {
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

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="file-upload-container mb-4">
        <h2 className="text-2xl font-bold mb-2">Upload CSV File</h2>
        <div {...useDropzone({ onDrop })} className="file-upload-label border-dashed border-2 border-gray-300 p-4 cursor-pointer">
          <p>Click or drag & drop a CSV file here</p>
        </div>
      </div>
      {data.length > 0 && (
        <div className="column-selection-container mb-4">
          <h2 className="text-2xl font-bold mb-2">Select Columns</h2>
          <div>
            {selectedColumns.map((column) => (
              <label key={column} className="column-label mr-4 text-lg">
                <input
                  type="checkbox"
                  value={column}
                  checked={selectedColumns.includes(column)}
                  onChange={handleColumnSelect}
                  className="column-checkbox mr-1"
                />
                {column}
              </label>
            ))}
          </div>
          <div className="mt-2">
            <label className="text-lg font-bold mr-2">Select Chart Type:</label>
            <select value={selectedChart} onChange={handleChartSelect} className="chart-dropdown p-2">
              <option value="line">Line Chart</option>
              {/* Add options for other chart types */}
            </select>
          </div>
          <div className="mt-4">
            <label className="text-lg font-bold mr-2">Select Columns for Chart:</label>
            {selectedChartColumns.map((column, index) => (
              <select
                key={index}
                value={column}
                onChange={(e) => handleChartColumnSelect(e, index)}
                className="chart-dropdown p-2 mr-2"
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
              className="generate-chart-button ml-2"
            >
              Generate Chart
            </button>
          </div>
        </div>
      )}
      {chartData && (
        <div className="chart-display-container mt-4">
          <h2 className="chart-title text-2xl font-bold mb-2">Chart</h2>
          {/* Render the appropriate chart component based on the selected chart type */}
        </div>
      )}
    </div>
  );
};

export default CsvInsights;
