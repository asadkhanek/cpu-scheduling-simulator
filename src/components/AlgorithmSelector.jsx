import React from 'react';
import { algorithms } from '../utils/schedulingAlgorithms';

const AlgorithmSelector = ({ 
  selectedAlgorithm, 
  setSelectedAlgorithm, 
  isPreemptive, 
  setIsPreemptive,
  timeQuantum,
  setTimeQuantum
}) => {
  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    // Reset preemptive mode when switching algorithms
    if (!algorithms[algorithm].supportsPreemption) {
      setIsPreemptive(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Algorithm Configuration</h2>
      
      {/* Algorithm Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scheduling Algorithm
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(algorithms).map(([key, algorithm]) => (
            <label
              key={key}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedAlgorithm === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="algorithm"
                value={key}
                checked={selectedAlgorithm === key}
                onChange={(e) => handleAlgorithmChange(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-medium text-sm">{algorithm.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {key === 'fcfs' && 'Non-preemptive, processes executed in arrival order'}
                  {key === 'sjf' && 'Shortest job executed first, supports preemption'}
                  {key === 'priority' && 'Higher priority processes first, supports preemption'}
                  {key === 'rr' && 'Time-sliced execution with configurable quantum'}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Preemption Toggle */}
      {algorithms[selectedAlgorithm]?.supportsPreemption && (
        <div className="mb-4">
          <label className="flex items-center p-3 border rounded-lg">
            <input
              type="checkbox"
              checked={isPreemptive}
              onChange={(e) => setIsPreemptive(e.target.checked)}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-sm">Enable Preemptive Mode</div>
              <div className="text-xs text-gray-500 mt-1">
                {selectedAlgorithm === 'sjf' && 'SRTF: Shortest Remaining Time First'}
                {selectedAlgorithm === 'priority' && 'Higher priority processes can interrupt lower priority ones'}
              </div>
            </div>
          </label>
        </div>
      )}

      {/* Time Quantum for Round Robin */}
      {selectedAlgorithm === 'rr' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Quantum
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              max="10"
              value={timeQuantum}
              onChange={(e) => setTimeQuantum(Math.max(1, parseInt(e.target.value) || 1))}
              className="px-3 py-2 border border-gray-300 rounded-md w-20"
            />
            <span className="text-sm text-gray-600">time units</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Each process gets this much CPU time before being preempted
          </p>
        </div>
      )}

      {/* Algorithm Description */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-sm mb-2">Algorithm Details:</h3>
        <div className="text-sm text-gray-700">
          {selectedAlgorithm === 'fcfs' && (
            <div>
              <strong>First Come First Served:</strong> Processes are executed in the order they arrive. 
              Simple but can cause convoy effect where short processes wait for long ones.
            </div>
          )}
          {selectedAlgorithm === 'sjf' && (
            <div>
              <strong>Shortest Job First:</strong> 
              {isPreemptive ? (
                <span> (SRTF) Process with shortest remaining time is executed next. 
                Can preempt currently running process if a shorter one arrives.</span>
              ) : (
                <span> Process with shortest burst time is selected next. 
                Non-preemptive version waits for current process to complete.</span>
              )}
            </div>
          )}
          {selectedAlgorithm === 'priority' && (
            <div>
              <strong>Priority Scheduling:</strong> 
              {isPreemptive ? (
                <span> Higher priority processes can interrupt lower priority ones. 
                Lower numbers indicate higher priority.</span>
              ) : (
                <span> Process with highest priority is selected next. 
                Lower numbers indicate higher priority.</span>
              )}
            </div>
          )}
          {selectedAlgorithm === 'rr' && (
            <div>
              <strong>Round Robin:</strong> Each process gets a fixed time quantum ({timeQuantum} units). 
              If not completed, it goes to the back of the queue. Fair scheduling algorithm.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmSelector;
