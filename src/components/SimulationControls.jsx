import React from 'react';
import { Play, Pause, Square, SkipForward, RotateCcw } from 'lucide-react';

const SimulationControls = ({
  isSimulating,
  isPaused,
  currentTime,
  maxTime,
  onStart,
  onPause,
  onStop,
  onStep,
  onReset,
  canSimulate
}) => {
  const progress = maxTime > 0 ? (currentTime / maxTime) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Simulation Controls</h2>
      
      {/* Control Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {!isSimulating ? (
          <button
            onClick={onStart}
            disabled={!canSimulate}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              canSimulate
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title="Start simulation"
          >
            <Play size={18} />
            Start
          </button>
        ) : (
          <button
            onClick={isPaused ? onStart : onPause}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            title={isPaused ? 'Resume simulation' : 'Pause simulation'}
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        
        <button
          onClick={onStop}
          disabled={!isSimulating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            isSimulating
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title="Stop simulation"
        >
          <Square size={18} />
          Stop
        </button>
        
        <button
          onClick={onStep}
          disabled={!canSimulate || (isSimulating && !isPaused)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            canSimulate && (!isSimulating || isPaused)
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title="Step forward one time unit"
        >
          <SkipForward size={18} />
          Step
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium"
          title="Reset simulation"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Simulation Status */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Current Time:</span>
          <span className="font-mono text-lg font-bold text-blue-600">
            {currentTime} / {maxTime}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-3 h-3 rounded-full ${
            isSimulating
              ? isPaused
                ? 'bg-yellow-500'
                : 'bg-green-500'
              : 'bg-gray-400'
          }`} />
          <span className="text-gray-700">
            {isSimulating
              ? isPaused
                ? 'Paused'
                : 'Running'
              : 'Stopped'
            }
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Instructions:</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• <strong>Start:</strong> Begin the simulation animation</li>
          <li>• <strong>Pause/Resume:</strong> Pause or continue the simulation</li>
          <li>• <strong>Step:</strong> Advance simulation by one time unit</li>
          <li>• <strong>Stop:</strong> Stop the simulation completely</li>
          <li>• <strong>Reset:</strong> Reset to initial state</li>
        </ul>
      </div>

      {!canSimulate && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            Please add at least one process and select an algorithm to start the simulation.
          </p>
        </div>
      )}
    </div>
  );
};

export default SimulationControls;
