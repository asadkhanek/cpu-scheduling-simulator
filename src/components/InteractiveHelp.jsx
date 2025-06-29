import React, { useState } from 'react';
import { HelpCircle, X, BookOpen, Lightbulb, Target, Zap } from 'lucide-react';

const InteractiveHelp = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('algorithms');

  if (!isOpen) return null;

  const algorithmGuide = [
    {
      name: 'FCFS (First Come First Served)',
      description: 'Processes are executed in the order they arrive.',
      pros: ['Simple to implement', 'Fair for equal burst times', 'No starvation'],
      cons: ['Poor average waiting time', 'Convoy effect with long processes'],
      bestFor: 'Batch systems where fairness is more important than efficiency',
      example: 'Like a queue at a bank - first person in line gets served first'
    },
    {
      name: 'SJF (Shortest Job First)',
      description: 'Process with shortest burst time is selected next.',
      pros: ['Optimal average waiting time', 'Good for short processes'],
      cons: ['Starvation of long processes', 'Requires knowing burst times'],
      bestFor: 'Systems where burst time prediction is accurate',
      example: 'Like choosing the shortest checkout line at a store'
    },
    {
      name: 'Priority Scheduling',
      description: 'Processes with higher priority are executed first.',
      pros: ['Important processes get preference', 'Flexible priority assignment'],
      cons: ['Can cause starvation', 'Priority inversion problems'],
      bestFor: 'Real-time systems with critical processes',
      example: 'Like emergency room triage - critical patients first'
    },
    {
      name: 'Round Robin',
      description: 'Each process gets a fixed time quantum in circular order.',
      pros: ['Fair time sharing', 'Good response time', 'No starvation'],
      cons: ['Context switching overhead', 'Poor for I/O bound processes'],
      bestFor: 'Interactive time-sharing systems',
      example: 'Like taking turns in a game - everyone gets equal time'
    }
  ];

  const metrics = [
    {
      name: 'Waiting Time',
      formula: 'Turnaround Time - Burst Time',
      description: 'Time a process spends waiting in the ready queue',
      importance: 'Lower is better - indicates system responsiveness'
    },
    {
      name: 'Turnaround Time',
      formula: 'Completion Time - Arrival Time',
      description: 'Total time from process arrival to completion',
      importance: 'Overall process completion efficiency'
    },
    {
      name: 'Response Time',
      formula: 'First CPU Time - Arrival Time',
      description: 'Time from arrival to first CPU allocation',
      importance: 'Critical for interactive systems'
    },
    {
      name: 'CPU Utilization',
      formula: '(CPU Busy Time / Total Time) × 100',
      description: 'Percentage of time CPU is actively working',
      importance: 'Higher is better - indicates efficient resource use'
    }
  ];

  const tips = [
    {
      icon: Lightbulb,
      title: 'Start with Sample Data',
      description: 'Use the "Load Sample Data" button to quickly see how algorithms work with predefined processes.'
    },
    {
      icon: Target,
      title: 'Compare Algorithms',
      description: 'Use "Compare All" to run all algorithms with the same process set and see performance differences.'
    },
    {
      icon: Zap,
      title: 'Step Through Simulation',
      description: 'Use the "Step" button to advance one time unit at a time and understand algorithm decisions.'
    },
    {
      icon: BookOpen,
      title: 'Experiment with Parameters',
      description: 'Try different time quantums for Round Robin and toggle preemption modes to see their effects.'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Interactive Guide</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex">
          <div className="w-64 bg-gray-50 p-4 border-r">
            <nav className="space-y-2">
              {[
                { id: 'algorithms', label: 'Algorithms', icon: BookOpen },
                { id: 'metrics', label: 'Metrics', icon: Target },
                { id: 'tips', label: 'Tips & Tricks', icon: Lightbulb }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {activeTab === 'algorithms' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Scheduling Algorithms Guide</h3>
                {algorithmGuide.map((algo, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-blue-600 mb-2">{algo.name}</h4>
                    <p className="text-gray-700 mb-3">{algo.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h5 className="font-medium text-green-600 mb-1">Advantages:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {algo.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-600 mb-1">Disadvantages:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {algo.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm"><strong>Best for:</strong> {algo.bestFor}</p>
                      <p className="text-sm mt-1"><strong>Real-world analogy:</strong> {algo.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Performance Metrics Explained</h3>
                {metrics.map((metric, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-purple-600 mb-2">{metric.name}</h4>
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <code className="text-sm font-mono">{metric.formula}</code>
                    </div>
                    <p className="text-gray-700 mb-2">{metric.description}</p>
                    <p className="text-sm text-blue-600 font-medium">{metric.importance}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Tips for Better Understanding</h3>
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <tip.icon size={24} className="text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
                      <p className="text-gray-700">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHelp;
