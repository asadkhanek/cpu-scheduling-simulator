import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, Zap, Target, Activity, Award, BarChart3 } from 'lucide-react';

const AnimatedStats = ({ metrics, algorithmName, isVisible }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!metrics || !isVisible) return;

    const { averages } = metrics;
    const targets = {
      waitingTime: averages.waitingTime,
      turnaroundTime: averages.turnaroundTime,
      responseTime: averages.responseTime,
      cpuUtilization: averages.cpuUtilization,
      throughput: averages.throughput
    };

    // Animate values
    Object.keys(targets).forEach(key => {
      const target = targets[key];
      let current = 0;
      const increment = target / 30; // 30 steps
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: current }));
      }, 50);
    });
  }, [metrics, isVisible]);

  if (!metrics) return null;

  const StatCard = ({ icon: Icon, title, value, unit, color, description, rank }) => (
    <div className={`relative p-6 rounded-xl border-l-4 ${color} bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
            <Icon size={24} className={color.replace('border-l-', 'text-').replace('-500', '-600')} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">
              {(animatedValues[Object.keys(animatedValues).find(k => title.toLowerCase().includes(k.replace(/([A-Z])/g, ' $1').toLowerCase()))] || 0).toFixed(2)}
              <span className="text-sm text-gray-500 ml-1">{unit}</span>
            </p>
          </div>
        </div>
        {rank && (
          <div className="absolute top-2 right-2">
            <div className={`px-2 py-1 rounded-full text-xs font-bold ${
              rank === 1 ? 'bg-yellow-100 text-yellow-800' :
              rank === 2 ? 'bg-gray-100 text-gray-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              #{rank}
            </div>
          </div>
        )}
      </div>
      
      {showDetails && (
        <div className="text-xs text-gray-600 border-t pt-3">
          {description}
        </div>
      )}
      
      {/* Animated progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${color.replace('border-l-', 'bg-')}`}
          style={{ 
            width: `${Math.min(100, (animatedValues[Object.keys(animatedValues).find(k => title.toLowerCase().includes(k.replace(/([A-Z])/g, ' $1').toLowerCase()))] || 0) / value * 100)}%` 
          }}
        />
      </div>
    </div>
  );

  const { averages, processMetrics } = metrics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Performance Analytics</h2>
          {algorithmName && (
            <p className="text-gray-600">Algorithm: <span className="font-semibold text-blue-600">{algorithmName}</span></p>
          )}
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <BarChart3 size={16} />
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Clock}
          title="Average Waiting Time"
          value={averages.waitingTime}
          unit="time units"
          color="border-l-blue-500"
          description="Time processes spend waiting in the ready queue. Lower values indicate better algorithm efficiency."
        />
        
        <StatCard
          icon={Timer}
          title="Average Turnaround Time"
          value={averages.turnaroundTime}
          unit="time units"
          color="border-l-green-500"
          description="Total time from process arrival to completion. Includes both waiting and execution time."
        />
        
        <StatCard
          icon={Zap}
          title="Average Response Time"
          value={averages.responseTime}
          unit="time units"
          color="border-l-purple-500"
          description="Time from process arrival to first CPU allocation. Critical for interactive systems."
        />
        
        <StatCard
          icon={Activity}
          title="CPU Utilization"
          value={averages.cpuUtilization}
          unit="%"
          color="border-l-orange-500"
          description="Percentage of time the CPU is actively executing processes. Higher is better."
        />
        
        <StatCard
          icon={Target}
          title="Throughput"
          value={averages.throughput}
          unit="proc/time"
          color="border-l-red-500"
          description="Number of processes completed per time unit. Measures system productivity."
        />
        
        <StatCard
          icon={Award}
          title="Total Processes"
          value={processMetrics.length}
          unit="processes"
          color="border-l-indigo-500"
          description="Total number of processes in the current simulation."
        />
      </div>

      {/* Process Performance Chart */}
      {showDetails && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Individual Process Performance</h3>
          <div className="space-y-3">
            {processMetrics.map((process, index) => (
              <div key={process.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: process.color }}
                />
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{process.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Wait: </span>
                    <span className="font-medium text-blue-600">{process.waitingTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Turn: </span>
                    <span className="font-medium text-green-600">{process.turnaroundTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Resp: </span>
                    <span className="font-medium text-purple-600">{process.responseTime}</span>
                  </div>
                </div>
                
                {/* Performance indicator */}
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  process.waitingTime < averages.waitingTime 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {process.waitingTime < averages.waitingTime ? 'Efficient' : 'Delayed'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedStats;
