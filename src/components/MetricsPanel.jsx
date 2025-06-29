import React from 'react';
import { Clock, Timer, Zap, Activity, Target, TrendingUp } from 'lucide-react';

const MetricsPanel = ({ metrics, algorithmName }) => {
  if (!metrics) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Performance Metrics</h2>
        <div className="flex items-center justify-center h-32 text-gray-500">
          Run a simulation to see performance metrics
        </div>
      </div>
    );
  }

  const { processMetrics, averages } = metrics;

  const MetricCard = ({ icon: Icon, title, value, unit, color }) => (
    <div className={`p-4 rounded-lg border-l-4 ${color}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-gray-600" />
        <div className="flex-1">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-lg font-bold text-gray-800">
            {typeof value === 'number' ? value.toFixed(2) : value}
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Performance Metrics
        {algorithmName && (
          <span className="text-sm text-gray-500 ml-2">({algorithmName})</span>
        )}
      </h2>

      {/* Average Metrics */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Overall Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            icon={Clock}
            title="Avg Waiting Time"
            value={averages.waitingTime}
            unit="time units"
            color="border-l-blue-500 bg-blue-50"
          />
          <MetricCard
            icon={Timer}
            title="Avg Turnaround Time"
            value={averages.turnaroundTime}
            unit="time units"
            color="border-l-green-500 bg-green-50"
          />
          <MetricCard
            icon={Zap}
            title="Avg Response Time"
            value={averages.responseTime}
            unit="time units"
            color="border-l-purple-500 bg-purple-50"
          />
          <MetricCard
            icon={Activity}
            title="CPU Utilization"
            value={averages.cpuUtilization}
            unit="%"
            color="border-l-orange-500 bg-orange-50"
          />
          <MetricCard
            icon={Target}
            title="Throughput"
            value={averages.throughput}
            unit="processes/time"
            color="border-l-red-500 bg-red-50"
          />
          <MetricCard
            icon={TrendingUp}
            title="Total Processes"
            value={processMetrics.length}
            color="border-l-gray-500 bg-gray-50"
          />
        </div>
      </div>

      {/* Individual Process Metrics */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Individual Process Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Process</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Arrival</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Burst</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Completion</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Waiting</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Turnaround</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm">Response</th>
              </tr>
            </thead>
            <tbody>
              {processMetrics.map((process) => (
                <tr key={process.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: process.color }}
                      />
                      <span className="font-mono font-semibold">{process.id}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-sm">{process.arrivalTime}</td>
                  <td className="border border-gray-300 px-3 py-2 text-sm">{process.burstTime}</td>
                  <td className="border border-gray-300 px-3 py-2 text-sm">{process.completionTime}</td>
                  <td className="border border-gray-300 px-3 py-2 text-sm font-medium text-blue-600">
                    {process.waitingTime}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-sm font-medium text-green-600">
                    {process.turnaroundTime}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-sm font-medium text-purple-600">
                    {process.responseTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metrics Definitions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-sm mb-2 text-gray-700">Metric Definitions:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600">
          <div><strong>Waiting Time:</strong> Time spent waiting in ready queue</div>
          <div><strong>Turnaround Time:</strong> Total time from arrival to completion</div>
          <div><strong>Response Time:</strong> Time from arrival to first execution</div>
          <div><strong>CPU Utilization:</strong> Percentage of time CPU is busy</div>
          <div><strong>Throughput:</strong> Number of processes completed per time unit</div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
