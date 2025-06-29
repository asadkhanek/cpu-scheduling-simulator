// CPU Scheduling Algorithms Implementation

/**
 * Process structure:
 * {
 *   id: string,
 *   arrivalTime: number,
 *   burstTime: number,
 *   priority: number,
 *   remainingTime?: number
 * }
 */

export const calculateMetrics = (processes, timeline) => {
  const metrics = processes.map(process => {
    const processBlocks = timeline.filter(block => block.processId === process.id);
    const completionTime = Math.max(...processBlocks.map(block => block.endTime));
    const startTime = Math.min(...processBlocks.map(block => block.startTime));
    
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    const responseTime = startTime - process.arrivalTime;
    
    return {
      ...process,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime
    };
  });

  const avgWaitingTime = metrics.reduce((sum, p) => sum + p.waitingTime, 0) / metrics.length;
  const avgTurnaroundTime = metrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / metrics.length;
  const avgResponseTime = metrics.reduce((sum, p) => sum + p.responseTime, 0) / metrics.length;
  const totalTime = Math.max(...timeline.map(block => block.endTime));
  const cpuUtilization = (timeline.reduce((sum, block) => sum + (block.endTime - block.startTime), 0) / totalTime) * 100;
  const throughput = processes.length / totalTime;

  return {
    processMetrics: metrics,
    averages: {
      waitingTime: avgWaitingTime,
      turnaroundTime: avgTurnaroundTime,
      responseTime: avgResponseTime,
      cpuUtilization,
      throughput
    }
  };
};

// First Come First Served (FCFS)
export const fcfs = (processes) => {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const timeline = [];
  let currentTime = 0;

  sortedProcesses.forEach(process => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const endTime = startTime + process.burstTime;
    
    timeline.push({
      processId: process.id,
      startTime,
      endTime,
      color: process.color || `hsl(${Math.random() * 360}, 70%, 60%)`
    });
    
    currentTime = endTime;
  });

  return { timeline, metrics: calculateMetrics(processes, timeline) };
};

// Shortest Job First (Non-preemptive)
export const sjf = (processes) => {
  const processesCopy = processes.map(p => ({ ...p }));
  const timeline = [];
  const completed = [];
  let currentTime = 0;

  while (completed.length < processesCopy.length) {
    const availableProcesses = processesCopy.filter(
      p => p.arrivalTime <= currentTime && !completed.includes(p.id)
    );

    if (availableProcesses.length === 0) {
      currentTime = Math.min(...processesCopy.filter(p => !completed.includes(p.id)).map(p => p.arrivalTime));
      continue;
    }

    const shortestJob = availableProcesses.reduce((shortest, current) =>
      current.burstTime < shortest.burstTime ? current : shortest
    );

    const startTime = currentTime;
    const endTime = startTime + shortestJob.burstTime;

    timeline.push({
      processId: shortestJob.id,
      startTime,
      endTime,
      color: shortestJob.color || `hsl(${Math.random() * 360}, 70%, 60%)`
    });

    completed.push(shortestJob.id);
    currentTime = endTime;
  }

  return { timeline, metrics: calculateMetrics(processes, timeline) };
};

// Shortest Remaining Time First (Preemptive SJF)
export const srtf = (processes) => {
  const processesCopy = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline = [];
  let currentTime = 0;
  let currentProcess = null;

  while (processesCopy.some(p => p.remainingTime > 0)) {
    const availableProcesses = processesCopy.filter(
      p => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (availableProcesses.length === 0) {
      currentTime++;
      continue;
    }

    const shortestRemaining = availableProcesses.reduce((shortest, current) =>
      current.remainingTime < shortest.remainingTime ? current : shortest
    );

    if (currentProcess !== shortestRemaining.id) {
      currentProcess = shortestRemaining.id;
    }

    const startTime = currentTime;
    shortestRemaining.remainingTime--;
    currentTime++;

    const lastBlock = timeline[timeline.length - 1];
    if (lastBlock && lastBlock.processId === shortestRemaining.id && lastBlock.endTime === startTime) {
      lastBlock.endTime = currentTime;
    } else {
      timeline.push({
        processId: shortestRemaining.id,
        startTime,
        endTime: currentTime,
        color: shortestRemaining.color || `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
  }

  return { timeline, metrics: calculateMetrics(processes, timeline) };
};

// Priority Scheduling (Non-preemptive)
export const priority = (processes) => {
  const processesCopy = processes.map(p => ({ ...p }));
  const timeline = [];
  const completed = [];
  let currentTime = 0;

  while (completed.length < processesCopy.length) {
    const availableProcesses = processesCopy.filter(
      p => p.arrivalTime <= currentTime && !completed.includes(p.id)
    );

    if (availableProcesses.length === 0) {
      currentTime = Math.min(...processesCopy.filter(p => !completed.includes(p.id)).map(p => p.arrivalTime));
      continue;
    }

    const highestPriority = availableProcesses.reduce((highest, current) =>
      current.priority < highest.priority ? current : highest // Lower number = higher priority
    );

    const startTime = currentTime;
    const endTime = startTime + highestPriority.burstTime;

    timeline.push({
      processId: highestPriority.id,
      startTime,
      endTime,
      color: highestPriority.color || `hsl(${Math.random() * 360}, 70%, 60%)`
    });

    completed.push(highestPriority.id);
    currentTime = endTime;
  }

  return { timeline, metrics: calculateMetrics(processes, timeline) };
};

// Preemptive Priority Scheduling
export const preemptivePriority = (processes) => {
  const processesCopy = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline = [];
  let currentTime = 0;
  let currentProcess = null;

  while (processesCopy.some(p => p.remainingTime > 0)) {
    const availableProcesses = processesCopy.filter(
      p => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    if (availableProcesses.length === 0) {
      currentTime++;
      continue;
    }

    const highestPriority = availableProcesses.reduce((highest, current) =>
      current.priority < highest.priority ? current : highest // Lower number = higher priority
    );

    if (currentProcess !== highestPriority.id) {
      currentProcess = highestPriority.id;
    }

    const startTime = currentTime;
    highestPriority.remainingTime--;
    currentTime++;

    const lastBlock = timeline[timeline.length - 1];
    if (lastBlock && lastBlock.processId === highestPriority.id && lastBlock.endTime === startTime) {
      lastBlock.endTime = currentTime;
    } else {
      timeline.push({
        processId: highestPriority.id,
        startTime,
        endTime: currentTime,
        color: highestPriority.color || `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
  }

  return { timeline, metrics: calculateMetrics(processes, timeline) };
};

// Round Robin
export const roundRobin = (processes, timeQuantum = 2) => {
  const processesCopy = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const timeline = [];
  const queue = [];
  let currentTime = 0;
  let arrived = [];

  // Add initial processes to queue
  processesCopy.forEach(process => {
    if (process.arrivalTime <= currentTime) {
      queue.push(process);
      arrived.push(process.id);
    }
  });

  while (queue.length > 0 || processesCopy.some(p => p.remainingTime > 0 && !arrived.includes(p.id))) {
    // Add newly arrived processes
    processesCopy.forEach(process => {
      if (process.arrivalTime <= currentTime && !arrived.includes(process.id)) {
        queue.push(process);
        arrived.push(process.id);
      }
    });

    if (queue.length === 0) {
      currentTime++;
      continue;
    }

    const currentProcess = queue.shift();
    
    if (currentProcess.remainingTime <= 0) {
      continue;
    }

    const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
    const startTime = currentTime;
    const endTime = startTime + executionTime;

    timeline.push({
      processId: currentProcess.id,
      startTime,
      endTime,
      color: currentProcess.color || `hsl(${Math.random() * 360}, 70%, 60%)`
    });

    currentProcess.remainingTime -= executionTime;
    currentTime = endTime;

    // Add newly arrived processes before re-queueing current process
    processesCopy.forEach(process => {
      if (process.arrivalTime <= currentTime && !arrived.includes(process.id)) {
        queue.push(process);
        arrived.push(process.id);
      }
    });

    // Re-queue if not finished
    if (currentProcess.remainingTime > 0) {
      queue.push(currentProcess);
    }
  }

  return { timeline, metrics: calculateMetrics(processes, timeline) };
};

export const algorithms = {
  fcfs: { name: 'First Come First Served', func: fcfs, supportsPreemption: false },
  sjf: { name: 'Shortest Job First', func: sjf, supportsPreemption: true, preemptiveFunc: srtf },
  priority: { name: 'Priority Scheduling', func: priority, supportsPreemption: true, preemptiveFunc: preemptivePriority },
  rr: { name: 'Round Robin', func: roundRobin, supportsPreemption: false, requiresQuantum: true }
};
