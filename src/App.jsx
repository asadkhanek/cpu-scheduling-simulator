import React, { useState, useEffect } from 'react';
import ProcessTable from './components/ProcessTable';
import AlgorithmSelector from './components/AlgorithmSelector';
import SimulationControls from './components/SimulationControls';
import GanttChart from './components/GanttChart';
import MetricsPanel from './components/MetricsPanel';
import ComparisonCharts from './components/ComparisonCharts';
import EnhancedHeader from './components/EnhancedHeader';
import InteractiveHelp from './components/InteractiveHelp';
import AnimatedStats from './components/AnimatedStats';
import { algorithms } from './utils/schedulingAlgorithms';
import { Settings, Play, Sparkles, BarChart3 } from 'lucide-react';

function App() {
  // State for processes
  const [processes, setProcesses] = useState([]);
  
  // State for algorithm configuration
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('fcfs');
  const [isPreemptive, setIsPreemptive] = useState(false);
  const [timeQuantum, setTimeQuantum] = useState(2);
  
  // State for simulation
  const [simulationResult, setSimulationResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  
  // State for comparisons
  const [comparisonData, setComparisonData] = useState({});
  
  // State for UI
  const [activeTab, setActiveTab] = useState('simulation');
  const [showHelp, setShowHelp] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showWelcome, setShowWelcome] = useState(true);

  // Animation interval
  useEffect(() => {
    let interval = null;
    
    if (isSimulating && !isPaused && currentTime < maxTime) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const nextTime = prevTime + 1;
          if (nextTime >= maxTime) {
            setIsSimulating(false);
            setIsPaused(false);
          }
          return nextTime;
        });
      }, 500); // 500ms per time unit
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulating, isPaused, currentTime, maxTime]);

  const runSimulation = () => {
    if (processes.length === 0) return;

    const algorithm = algorithms[selectedAlgorithm];
    let result;

    if (selectedAlgorithm === 'sjf' && isPreemptive) {
      result = algorithm.preemptiveFunc(processes);
    } else if (selectedAlgorithm === 'priority' && isPreemptive) {
      result = algorithm.preemptiveFunc(processes);
    } else if (selectedAlgorithm === 'rr') {
      result = algorithm.func(processes, timeQuantum);
    } else {
      result = algorithm.func(processes);
    }

    setSimulationResult(result);
    setMaxTime(Math.max(...result.timeline.map(block => block.endTime)));
    
    // Add to comparison data
    const algorithmKey = getAlgorithmKey();
    setComparisonData(prev => ({
      ...prev,
      [algorithmKey]: result.metrics
    }));
  };

  const getAlgorithmKey = () => {
    let key = algorithms[selectedAlgorithm].name;
    if (selectedAlgorithm === 'sjf' && isPreemptive) {
      key = 'SRTF';
    } else if (selectedAlgorithm === 'priority' && isPreemptive) {
      key = 'Preemptive Priority';
    } else if (selectedAlgorithm === 'rr') {
      key = `Round Robin (q=${timeQuantum})`;
    }
    return key;
  };

  const handleStart = () => {
    if (!simulationResult) {
      runSimulation();
    }
    setIsSimulating(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsSimulating(false);
    setIsPaused(false);
    setCurrentTime(maxTime);
  };

  const handleStep = () => {
    if (!simulationResult) {
      runSimulation();
    }
    setCurrentTime(prev => Math.min(prev + 1, maxTime));
  };

  const handleReset = () => {
    setIsSimulating(false);
    setIsPaused(false);
    setCurrentTime(0);
    setSimulationResult(null);
    setMaxTime(0);
  };

  const canSimulate = processes.length > 0 && selectedAlgorithm;

  const runAllAlgorithms = () => {
    if (processes.length === 0) return;

    const newComparisonData = {};
    
    // Run FCFS
    const fcfsResult = algorithms.fcfs.func(processes);
    newComparisonData['FCFS'] = fcfsResult.metrics;

    // Run SJF (non-preemptive)
    const sjfResult = algorithms.sjf.func(processes);
    newComparisonData['SJF'] = sjfResult.metrics;

    // Run SRTF (preemptive SJF)
    const srtfResult = algorithms.sjf.preemptiveFunc(processes);
    newComparisonData['SRTF'] = srtfResult.metrics;

    // Run Priority (non-preemptive)
    const priorityResult = algorithms.priority.func(processes);
    newComparisonData['Priority'] = priorityResult.metrics;

    // Run Preemptive Priority
    const preemptivePriorityResult = algorithms.priority.preemptiveFunc(processes);
    newComparisonData['Preemptive Priority'] = preemptivePriorityResult.metrics;

    // Run Round Robin with different time quantums
    [1, 2, 3, 4].forEach(quantum => {
      const rrResult = algorithms.rr.func(processes, quantum);
      newComparisonData[`Round Robin (q=${quantum})`] = rrResult.metrics;
    });

    setComparisonData(newComparisonData);
    setActiveTab('comparison');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify({
      processes,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cpu-scheduler-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.processes && Array.isArray(importedData.processes)) {
          setProcesses(importedData.processes);
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  const WelcomeModal = () => {
    if (!showWelcome) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl mx-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <Sparkles size={32} />
              <div>
                <h2 className="text-2xl font-bold">Welcome to CPU Scheduling Simulator!</h2>
                <p className="text-blue-100 mt-1">Interactive learning made easy</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Add Processes</h3>
                  <p className="text-gray-600 text-sm">Start by adding processes or load sample data</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Choose Algorithm</h3>
                  <p className="text-gray-600 text-sm">Select from FCFS, SJF, Priority, or Round Robin</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Run & Compare</h3>
                  <p className="text-gray-600 text-sm">Simulate algorithms and compare performance</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowWelcome(false);
                  setShowHelp(true);
                }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show Interactive Guide
              </button>
              <button
                onClick={() => setShowWelcome(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Welcome Modal */}
      <WelcomeModal />
      
      {/* Interactive Help */}
      <InteractiveHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />
      
      {/* Enhanced Header */}
      <EnhancedHeader
        onRunAllAlgorithms={runAllAlgorithms}
        canRunAll={processes.length > 0}
        onShowHelp={() => setShowHelp(true)}
        onImportData={handleImportData}
        onExportData={handleExportData}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'simulation'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Play size={16} />
            Simulation
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'comparison'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <BarChart3 size={16} />
            Comparison
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {activeTab === 'simulation' && (
          <div className="space-y-6">
            {/* Configuration Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ProcessTable processes={processes} setProcesses={setProcesses} />
              </div>
              <div className="space-y-6">
                <AlgorithmSelector
                  selectedAlgorithm={selectedAlgorithm}
                  setSelectedAlgorithm={setSelectedAlgorithm}
                  isPreemptive={isPreemptive}
                  setIsPreemptive={setIsPreemptive}
                  timeQuantum={timeQuantum}
                  setTimeQuantum={setTimeQuantum}
                />
                <SimulationControls
                  isSimulating={isSimulating}
                  isPaused={isPaused}
                  currentTime={currentTime}
                  maxTime={maxTime}
                  onStart={handleStart}
                  onPause={handlePause}
                  onStop={handleStop}
                  onStep={handleStep}
                  onReset={handleReset}
                  canSimulate={canSimulate}
                />
              </div>
            </div>

            {/* Visualization Row */}
            <div className="space-y-6">
              <GanttChart
                timeline={simulationResult?.timeline}
                currentTime={currentTime}
                isAnimating={isSimulating}
                title={simulationResult ? getAlgorithmKey() : null}
              />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <MetricsPanel
                  metrics={simulationResult?.metrics}
                  algorithmName={simulationResult ? getAlgorithmKey() : null}
                />
                <AnimatedStats
                  metrics={simulationResult?.metrics}
                  algorithmName={simulationResult ? getAlgorithmKey() : null}
                  isVisible={!!simulationResult}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div>
            <ComparisonCharts comparisonData={comparisonData} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Application Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">About this Simulator</h3>
                  <p className="text-sm text-blue-700">
                    This CPU scheduling simulator allows you to visualize and compare different 
                    scheduling algorithms including FCFS, SJF/SRTF, Priority (preemptive and 
                    non-preemptive), and Round Robin scheduling.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Features</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Interactive process management with validation</li>
                    <li>• Real-time Gantt chart visualization</li>
                    <li>• Comprehensive performance metrics</li>
                    <li>• Algorithm comparison charts</li>
                    <li>• Step-by-step simulation control</li>
                    <li>• Data import/export functionality</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setShowHelp(true)}
                  className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Sparkles className="text-blue-600" size={20} />
                  <div className="text-left">
                    <div className="font-medium text-blue-800">Interactive Guide</div>
                    <div className="text-sm text-blue-600">Learn about algorithms and metrics</div>
                  </div>
                </button>

                <button
                  onClick={handleExportData}
                  className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Settings className="text-green-600" size={20} />
                  <div className="text-left">
                    <div className="font-medium text-green-800">Export Data</div>
                    <div className="text-sm text-green-600">Save current process configuration</div>
                  </div>
                </button>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-800 mb-2">Tips for Best Results</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Use diverse arrival times and burst times for better visualization</li>
                    <li>• Try different priority values (1 = highest priority)</li>
                    <li>• Experiment with different time quantums for Round Robin</li>
                    <li>• Use "Compare All" to see algorithm performance side-by-side</li>
                    <li>• Load sample data to get started quickly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
