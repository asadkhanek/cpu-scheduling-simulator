# 🖥️ CPU Scheduling Simulator

An interactive, educational web application that visualizes and compares CPU scheduling algorithms including FCFS, SJF, Priority, and Round Robin. Built with React and modern web technologies for an engaging learning experience.

## 🚀 Live Demo

**[Try the Simulator Live](https://asadkhanek.github.io/cpu-scheduling-simulator/)**

## ✨ Features

### 🎯 Core Functionality
- **📊 Process Management**: Dynamic form for adding, editing, and deleting processes with real-time validation
- **🔄 Algorithm Support**: FCFS, SJF/SRTF, Priority (preemptive/non-preemptive), Round Robin
- **📈 Real-time Visualization**: Interactive Gantt charts with step-by-step animation
- **📋 Performance Metrics**: Comprehensive statistics including waiting time, turnaround time, response time, CPU utilization, and throughput
- **📊 Comparative Analysis**: Side-by-side comparison of all algorithms with interactive charts

### 🎨 User Experience
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎮 Interactive Controls**: Play, pause, step, and reset simulation controls
- **🗂️ Tabbed Interface**: Organized layout with simulation, comparison, and settings tabs
- **✨ Modern UI**: Clean design with smooth animations and intuitive interactions
- **🎓 Interactive Help**: Built-in tutorial and algorithm explanations

### 📊 Advanced Visualization
- **🎬 Animated Gantt Charts**: Real-time timeline showing process execution with color coding
- **📈 Performance Charts**: Bar and line charts for algorithm comparison with customizable metrics
- **🎨 Process Color Coding**: Visual distinction between different processes
- **⏱️ Current Time Indicator**: Real-time progress tracking during simulation
- **📊 Animated Statistics**: Dynamic counters and progress bars for metrics

### 🔧 Advanced Features
- **💾 Data Import/Export**: Save and load process configurations as JSON
- **📋 Sample Data**: Pre-configured process sets for quick testing
- **⚙️ Algorithm Configuration**: Customizable time quantum for Round Robin
- **🔄 Preemptive Modes**: Toggle between preemptive and non-preemptive scheduling
- **📊 Batch Comparison**: Run all algorithms simultaneously for comprehensive analysis

## Technologies Used

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for responsive and modern UI
- **Charts**: Chart.js with react-chartjs-2 for data visualization
- **Icons**: Lucide React for consistent iconography
- **State Management**: React useState and useEffect hooks

## Installation and Setup

### Prerequisites
- Node.js 16+ and npm

### Installation Steps

1. **Clone or download the project**
   ```bash
   # If you have the project files
   cd cpu-scheduling-simulator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application should load with the simulation interface

### Build for Production
```bash
npm run build
```

## Usage Guide

### 1. Process Management
- **Add Processes**: Use the process table to add new processes with:
  - Process ID (unique identifier)
  - Arrival Time (when process arrives)
  - Burst Time (CPU time required)
  - Priority (1 = highest priority)
- **Edit/Delete**: Click edit or delete buttons for existing processes
- **Sample Data**: Use "Load Sample Data" for quick setup
- **Import/Export**: Save and load process configurations

### 2. Algorithm Selection
- **Choose Algorithm**: Select from FCFS, SJF, Priority, or Round Robin
- **Configure Options**:
  - Enable preemption for SJF and Priority scheduling
  - Set time quantum for Round Robin (1-10 time units)
- **Algorithm Descriptions**: View detailed explanations for each algorithm

### 3. Simulation Controls
- **Start**: Begin the simulation animation
- **Pause/Resume**: Control simulation playback
- **Step**: Advance one time unit at a time
- **Stop**: End simulation and jump to completion
- **Reset**: Return to initial state

### 4. Viewing Results
- **Gantt Chart**: Visual timeline showing process execution order
- **Metrics Panel**: Detailed performance statistics
- **Individual Process Metrics**: Per-process waiting, turnaround, and response times
- **Overall Averages**: System-wide performance indicators

### 5. Algorithm Comparison
- **Compare All**: Run all algorithms with current process set
- **Interactive Charts**: Toggle between bar and line charts
- **Metric Selection**: Show/hide specific performance metrics
- **Algorithm Filtering**: Enable/disable specific algorithms in comparison
- **Performance Summary**: Tabular comparison of all algorithms

## Scheduling Algorithms

### First Come First Served (FCFS)
- **Type**: Non-preemptive
- **Selection**: Processes executed in arrival order
- **Pros**: Simple, fair for equal burst times
- **Cons**: Can cause convoy effect

### Shortest Job First (SJF)
- **Type**: Non-preemptive or Preemptive (SRTF)
- **Selection**: Shortest burst time first
- **Pros**: Minimizes average waiting time
- **Cons**: Can cause starvation of long processes

### Priority Scheduling
- **Type**: Non-preemptive or Preemptive
- **Selection**: Highest priority first (lower number = higher priority)
- **Pros**: Important processes get preference
- **Cons**: Can cause priority inversion

### Round Robin (RR)
- **Type**: Preemptive with time quantum
- **Selection**: Fair time-sliced execution
- **Pros**: Fair scheduling, good response time
- **Cons**: Context switching overhead

## Performance Metrics

### Process-Level Metrics
- **Waiting Time**: Time spent in ready queue
- **Turnaround Time**: Total time from arrival to completion
- **Response Time**: Time from arrival to first execution

### System-Level Metrics
- **Average Waiting Time**: Mean waiting time across all processes
- **Average Turnaround Time**: Mean turnaround time across all processes
- **Average Response Time**: Mean response time across all processes
- **CPU Utilization**: Percentage of time CPU is busy
- **Throughput**: Number of processes completed per time unit

## Project Structure

```
src/
├── components/
│   ├── ProcessTable.jsx          # Process management interface
│   ├── AlgorithmSelector.jsx     # Algorithm selection and configuration
│   ├── SimulationControls.jsx    # Simulation control buttons
│   ├── GanttChart.jsx            # Gantt chart visualization
│   ├── MetricsPanel.jsx          # Performance metrics display
│   └── ComparisonCharts.jsx      # Algorithm comparison charts
├── utils/
│   └── schedulingAlgorithms.js   # Core scheduling algorithm implementations
├── App.jsx                       # Main application component
├── main.jsx                      # Application entry point
└── index.css                     # Global styles and Tailwind imports
```

## Contributing

This is an educational project demonstrating CPU scheduling algorithms. Feel free to:
- Report bugs or suggest improvements
- Add new scheduling algorithms
- Enhance the user interface
- Improve documentation

## License

This project is open source and available under the MIT License.

## Educational Value

This simulator is designed to help students and professionals understand:
- How different CPU scheduling algorithms work
- The trade-offs between different scheduling approaches
- Performance characteristics of various algorithms
- The impact of process characteristics on algorithm performance
- Real-world scheduling concepts through interactive visualization
