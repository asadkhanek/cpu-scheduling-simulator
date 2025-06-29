import React, { useRef, useEffect } from 'react';

const GanttChart = ({ timeline, currentTime, isAnimating, title }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !timeline || timeline.length === 0) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate dimensions
    const maxTime = Math.max(...timeline.map(block => block.endTime));
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const timeScale = chartWidth / maxTime;
    const barHeight = 40;
    const barY = (height - barHeight) / 2;

    // Draw time axis
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, barY + barHeight + 10);
    ctx.lineTo(padding + chartWidth, barY + barHeight + 10);
    ctx.stroke();

    // Draw time labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    for (let i = 0; i <= maxTime; i++) {
      const x = padding + i * timeScale;
      ctx.beginPath();
      ctx.moveTo(x, barY + barHeight + 10);
      ctx.lineTo(x, barY + barHeight + 15);
      ctx.stroke();
      ctx.fillText(i.toString(), x, barY + barHeight + 28);
    }

    // Draw process blocks
    timeline.forEach((block, index) => {
      const startX = padding + block.startTime * timeScale;
      const blockWidth = (block.endTime - block.startTime) * timeScale;
      
      // Only show blocks up to current time if animating
      if (isAnimating && block.startTime >= currentTime) {
        return;
      }
      
      let displayWidth = blockWidth;
      if (isAnimating && block.endTime > currentTime) {
        displayWidth = (currentTime - block.startTime) * timeScale;
      }

      // Draw block
      ctx.fillStyle = block.color;
      ctx.fillRect(startX, barY, displayWidth, barHeight);
      
      // Draw block border
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1;
      ctx.strokeRect(startX, barY, blockWidth, barHeight);
      
      // Draw process label
      if (blockWidth > 20) { // Only show label if block is wide enough
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(
          block.processId,
          startX + blockWidth / 2,
          barY + barHeight / 2 + 5
        );
      }
    });

    // Draw current time indicator if animating
    if (isAnimating && currentTime <= maxTime) {
      const currentX = padding + currentTime * timeScale;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(currentX, barY - 10);
      ctx.lineTo(currentX, barY + barHeight + 20);
      ctx.stroke();
      
      // Current time label
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`t=${currentTime}`, currentX, barY - 15);
    }

    // Draw title
    if (title) {
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(title, padding, 25);
    }

  }, [timeline, currentTime, isAnimating, title]);

  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Gantt Chart</h2>
        <div className="flex items-center justify-center h-32 text-gray-500">
          No simulation data to display. Run a simulation to see the Gantt chart.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Gantt Chart</h2>
      <div className="w-full overflow-x-auto">
        <canvas
          ref={canvasRef}
          width={800}
          height={120}
          className="border border-gray-200 rounded w-full"
          style={{ minWidth: '600px' }}
        />
      </div>
      
      {/* Legend */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Process Legend:</h3>
        <div className="flex flex-wrap gap-3">
          {[...new Set(timeline.map(block => block.processId))].map(processId => {
            const block = timeline.find(b => b.processId === processId);
            return (
              <div key={processId} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: block.color }}
                />
                <span className="text-sm font-mono">{processId}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
