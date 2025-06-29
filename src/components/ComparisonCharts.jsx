import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { BarChart3, TrendingUp, Eye, EyeOff } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ComparisonCharts = ({ comparisonData }) => {
  const [chartType, setChartType] = useState('bar');
  const [visibleMetrics, setVisibleMetrics] = useState({
    waitingTime: true,
    turnaroundTime: true,
    responseTime: true,
    cpuUtilization: false,
    throughput: false
  });
  const [visibleAlgorithms, setVisibleAlgorithms] = useState({});

  React.useEffect(() => {
    if (comparisonData && Object.keys(comparisonData).length > 0) {
      const initialVisible = {};
      Object.keys(comparisonData).forEach(alg => {
        initialVisible[alg] = true;
      });
      setVisibleAlgorithms(initialVisible);
    }
  }, [comparisonData]);

  if (!comparisonData || Object.keys(comparisonData).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Algorithm Comparison</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto mb-3 opacity-50" />
            <p>Run simulations with different algorithms to see comparisons</p>
          </div>
        </div>
      </div>
    );
  }

  const algorithms = Object.keys(comparisonData).filter(alg => visibleAlgorithms[alg]);
  const metrics = [
    { key: 'waitingTime', label: 'Average Waiting Time', color: 'rgb(59, 130, 246)' },
    { key: 'turnaroundTime', label: 'Average Turnaround Time', color: 'rgb(16, 185, 129)' },
    { key: 'responseTime', label: 'Average Response Time', color: 'rgb(139, 92, 246)' },
    { key: 'cpuUtilization', label: 'CPU Utilization (%)', color: 'rgb(245, 158, 11)' },
    { key: 'throughput', label: 'Throughput', color: 'rgb(239, 68, 68)' }
  ];

  const getChartData = () => {
    const datasets = metrics
      .filter(metric => visibleMetrics[metric.key])
      .map(metric => ({
        label: metric.label,
        data: algorithms.map(alg => comparisonData[alg].averages[metric.key]),
        backgroundColor: metric.color,
        borderColor: metric.color,
        borderWidth: chartType === 'line' ? 2 : 0,
        fill: false,
        tension: 0.1
      }));

    return {
      labels: algorithms,
      datasets
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Algorithm Performance Comparison',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const unit = label.includes('Utilization') ? '%' : 
                        label.includes('Throughput') ? 'proc/time' : 'time units';
            return `${label}: ${value.toFixed(2)} ${unit}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Scheduling Algorithm'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const toggleMetric = (metricKey) => {
    setVisibleMetrics(prev => ({
      ...prev,
      [metricKey]: !prev[metricKey]
    }));
  };

  const toggleAlgorithm = (algorithm) => {
    setVisibleAlgorithms(prev => ({
      ...prev,
      [algorithm]: !prev[algorithm]
    }));
  };

  const ChartComponent = chartType === 'bar' ? Bar : Line;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Algorithm Comparison</h2>
      
      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Chart Type Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Chart Type:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                chartType === 'bar'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 size={16} className="inline mr-1" />
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                chartType === 'line'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <TrendingUp size={16} className="inline mr-1" />
              Line Chart
            </button>
          </div>
        </div>

        {/* Metric Toggles */}
        <div>
          <span className="text-sm font-medium text-gray-700 mb-2 block">Visible Metrics:</span>
          <div className="flex flex-wrap gap-2">
            {metrics.map(metric => (
              <button
                key={metric.key}
                onClick={() => toggleMetric(metric.key)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  visibleMetrics[metric.key]
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {visibleMetrics[metric.key] ? (
                  <Eye size={14} />
                ) : (
                  <EyeOff size={14} />
                )}
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Toggles */}
        <div>
          <span className="text-sm font-medium text-gray-700 mb-2 block">Visible Algorithms:</span>
          <div className="flex flex-wrap gap-2">
            {Object.keys(comparisonData).map(algorithm => (
              <button
                key={algorithm}
                onClick={() => toggleAlgorithm(algorithm)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  visibleAlgorithms[algorithm]
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                {visibleAlgorithms[algorithm] ? (
                  <Eye size={14} />
                ) : (
                  <EyeOff size={14} />
                )}
                {algorithm}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 mb-6">
        <ChartComponent data={getChartData()} options={chartOptions} />
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Performance Summary</h3>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">Algorithm</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Avg Waiting</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Avg Turnaround</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Avg Response</th>
              <th className="border border-gray-300 px-3 py-2 text-center">CPU Util (%)</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Throughput</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(comparisonData).map(([algorithm, data]) => (
              <tr key={algorithm} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 font-medium">{algorithm}</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {data.averages.waitingTime.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {data.averages.turnaroundTime.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {data.averages.responseTime.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {data.averages.cpuUtilization.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {data.averages.throughput.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analysis */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2 text-blue-800">Quick Analysis:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          {Object.entries(comparisonData).length > 1 && (
            <>
              <p>• <strong>Best Average Waiting Time:</strong> {
                Object.entries(comparisonData)
                  .sort((a, b) => a[1].averages.waitingTime - b[1].averages.waitingTime)[0][0]
              }</p>
              <p>• <strong>Best Average Turnaround Time:</strong> {
                Object.entries(comparisonData)
                  .sort((a, b) => a[1].averages.turnaroundTime - b[1].averages.turnaroundTime)[0][0]
              }</p>
              <p>• <strong>Highest CPU Utilization:</strong> {
                Object.entries(comparisonData)
                  .sort((a, b) => b[1].averages.cpuUtilization - a[1].averages.cpuUtilization)[0][0]
              }</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonCharts;
