import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

const ProcessTable = ({ processes, setProcesses }) => {
  const [editingId, setEditingId] = useState(null);
  const [newProcess, setNewProcess] = useState({
    id: '',
    arrivalTime: 0,
    burstTime: 1,
    priority: 1
  });

  const generateColor = () => `hsl(${Math.random() * 360}, 70%, 60%)`;

  const addProcess = () => {
    if (!newProcess.id.trim()) {
      alert('Please enter a Process ID');
      return;
    }
    
    if (processes.some(p => p.id === newProcess.id)) {
      alert('Process ID already exists');
      return;
    }

    if (newProcess.burstTime <= 0) {
      alert('Burst time must be greater than 0');
      return;
    }

    const processToAdd = {
      ...newProcess,
      arrivalTime: Math.max(0, parseInt(newProcess.arrivalTime)),
      burstTime: Math.max(1, parseInt(newProcess.burstTime)),
      priority: Math.max(1, parseInt(newProcess.priority)),
      color: generateColor()
    };

    setProcesses([...processes, processToAdd]);
    setNewProcess({ id: '', arrivalTime: 0, burstTime: 1, priority: 1 });
  };

  const deleteProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const startEdit = (process) => {
    setEditingId(process.id);
  };

  const saveEdit = (id, updatedProcess) => {
    if (updatedProcess.burstTime <= 0) {
      alert('Burst time must be greater than 0');
      return;
    }

    setProcesses(processes.map(p => 
      p.id === id 
        ? {
            ...updatedProcess,
            arrivalTime: Math.max(0, parseInt(updatedProcess.arrivalTime)),
            burstTime: Math.max(1, parseInt(updatedProcess.burstTime)),
            priority: Math.max(1, parseInt(updatedProcess.priority))
          }
        : p
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const loadSampleData = () => {
    const sampleProcesses = [
      { id: 'P1', arrivalTime: 0, burstTime: 6, priority: 2, color: generateColor() },
      { id: 'P2', arrivalTime: 1, burstTime: 8, priority: 1, color: generateColor() },
      { id: 'P3', arrivalTime: 2, burstTime: 7, priority: 3, color: generateColor() },
      { id: 'P4', arrivalTime: 3, burstTime: 3, priority: 2, color: generateColor() },
      { id: 'P5', arrivalTime: 4, burstTime: 4, priority: 1, color: generateColor() }
    ];
    setProcesses(sampleProcesses);
  };

  const clearAll = () => {
    setProcesses([]);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(processes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processes.json';
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProcesses = JSON.parse(e.target.result);
        if (Array.isArray(importedProcesses)) {
          setProcesses(importedProcesses.map(p => ({
            ...p,
            color: p.color || generateColor()
          })));
        }
      } catch (error) {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Process Management</h2>
      
      {/* Action Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={loadSampleData}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Load Sample Data
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        >
          Clear All
        </button>
        <button
          onClick={exportData}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Export Data
        </button>
        <label className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 cursor-pointer">
          Import Data
          <input
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </label>
      </div>

      {/* Add New Process */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4 p-3 bg-gray-50 rounded">
        <input
          type="text"
          placeholder="Process ID"
          value={newProcess.id}
          onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="number"
          placeholder="Arrival Time"
          min="0"
          value={newProcess.arrivalTime}
          onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="number"
          placeholder="Burst Time"
          min="1"
          value={newProcess.burstTime}
          onChange={(e) => setNewProcess({ ...newProcess, burstTime: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <input
          type="number"
          placeholder="Priority"
          min="1"
          value={newProcess.priority}
          onChange={(e) => setNewProcess({ ...newProcess, priority: e.target.value })}
          className="px-2 py-1 border rounded text-sm"
        />
        <button
          onClick={addProcess}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center gap-1"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {/* Process Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left text-sm">Process ID</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm">Arrival Time</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm">Burst Time</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm">Priority</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-sm">Color</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <ProcessRow
                key={process.id}
                process={process}
                isEditing={editingId === process.id}
                onEdit={startEdit}
                onSave={saveEdit}
                onCancel={cancelEdit}
                onDelete={deleteProcess}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {processes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No processes defined. Add some processes or load sample data to get started.
        </div>
      )}
    </div>
  );
};

const ProcessRow = ({ process, isEditing, onEdit, onSave, onCancel, onDelete }) => {
  const [editData, setEditData] = useState(process);

  React.useEffect(() => {
    setEditData(process);
  }, [process]);

  if (isEditing) {
    return (
      <tr>
        <td className="border border-gray-300 px-3 py-2">
          <span className="text-sm font-mono">{process.id}</span>
        </td>
        <td className="border border-gray-300 px-3 py-2">
          <input
            type="number"
            min="0"
            value={editData.arrivalTime}
            onChange={(e) => setEditData({ ...editData, arrivalTime: e.target.value })}
            className="w-full px-1 py-1 border rounded text-sm"
          />
        </td>
        <td className="border border-gray-300 px-3 py-2">
          <input
            type="number"
            min="1"
            value={editData.burstTime}
            onChange={(e) => setEditData({ ...editData, burstTime: e.target.value })}
            className="w-full px-1 py-1 border rounded text-sm"
          />
        </td>
        <td className="border border-gray-300 px-3 py-2">
          <input
            type="number"
            min="1"
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            className="w-full px-1 py-1 border rounded text-sm"
          />
        </td>
        <td className="border border-gray-300 px-3 py-2">
          <div
            className="w-6 h-6 rounded"
            style={{ backgroundColor: process.color }}
          />
        </td>
        <td className="border border-gray-300 px-3 py-2 text-center">
          <div className="flex gap-1 justify-center">
            <button
              onClick={() => onSave(process.id, editData)}
              className="p-1 text-green-600 hover:bg-green-100 rounded"
              title="Save"
            >
              <Save size={14} />
            </button>
            <button
              onClick={onCancel}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
              title="Cancel"
            >
              <X size={14} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="border border-gray-300 px-3 py-2">
        <span className="text-sm font-mono font-semibold">{process.id}</span>
      </td>
      <td className="border border-gray-300 px-3 py-2 text-sm">{process.arrivalTime}</td>
      <td className="border border-gray-300 px-3 py-2 text-sm">{process.burstTime}</td>
      <td className="border border-gray-300 px-3 py-2 text-sm">{process.priority}</td>
      <td className="border border-gray-300 px-3 py-2">
        <div
          className="w-6 h-6 rounded"
          style={{ backgroundColor: process.color }}
        />
      </td>
      <td className="border border-gray-300 px-3 py-2 text-center">
        <div className="flex gap-1 justify-center">
          <button
            onClick={() => onEdit(process)}
            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(process.id)}
            className="p-1 text-red-600 hover:bg-red-100 rounded"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProcessTable;
