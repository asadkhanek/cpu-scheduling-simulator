import React, { useState, useEffect } from 'react';
import { Cpu, BarChart3, HelpCircle, Github, Download, Upload, Settings, Moon, Sun } from 'lucide-react';

const EnhancedHeader = ({ 
  onRunAllAlgorithms, 
  canRunAll, 
  onShowHelp,
  onImportData,
  onExportData,
  theme,
  onToggleTheme 
}) => {
  const [showTooltip, setShowTooltip] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    onExportData();
    setShowTooltip('exported');
    setTimeout(() => setShowTooltip(null), 2000);
  };

  const HeaderButton = ({ icon: Icon, label, onClick, disabled, tooltip, variant = 'default' }) => {
    const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative";
    const variants = {
      default: disabled 
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md',
      primary: disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-105',
      success: disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg',
      purple: disabled
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg'
    };

    return (
      <div className="relative">
        <button
          onClick={onClick}
          disabled={disabled}
          className={`${baseClasses} ${variants[variant]}`}
          onMouseEnter={() => setShowTooltip(tooltip)}
          onMouseLeave={() => setShowTooltip(null)}
          title={tooltip}
        >
          <Icon size={18} />
          {label}
        </button>
        {showTooltip === tooltip && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
            {tooltip}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`transition-transform duration-500 ${isAnimating ? 'rotate-12 scale-110' : ''}`}>
              <Cpu className="text-white" size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                CPU Scheduling Simulator
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Interactive visualization of FCFS, SJF, Priority, and Round Robin algorithms
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex -space-x-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                </div>
                <span className="text-xs text-blue-100">Real-time simulation</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <HeaderButton
              icon={HelpCircle}
              label="Help"
              onClick={onShowHelp}
              variant="default"
              tooltip="Interactive guide and tutorials"
            />
            
            <HeaderButton
              icon={Upload}
              label="Import"
              onClick={() => document.getElementById('import-file').click()}
              variant="default"
              tooltip="Import process data from JSON file"
            />
            
            <HeaderButton
              icon={Download}
              label="Export"
              onClick={handleExport}
              variant="default"
              tooltip="Export current process data"
            />
            
            <HeaderButton
              icon={BarChart3}
              label="Compare All"
              onClick={onRunAllAlgorithms}
              disabled={!canRunAll}
              variant="purple"
              tooltip={canRunAll ? "Run all algorithms for comparison" : "Add processes first"}
            />

            <HeaderButton
              icon={Github}
              label="GitHub"
              onClick={() => window.open('https://github.com/your-username/cpu-scheduling-simulator', '_blank')}
              variant="default"
              tooltip="View source code on GitHub"
            />
          </div>
        </div>

        {/* Success message for export */}
        {showTooltip === 'exported' && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">Data exported successfully!</span>
          </div>
        )}
      </div>

      {/* Hidden file input for import */}
      <input
        id="import-file"
        type="file"
        accept=".json"
        onChange={onImportData}
        className="hidden"
      />
    </header>
  );
};

export default EnhancedHeader;
