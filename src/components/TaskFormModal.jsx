import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

export default function TaskFormModal({ onClose }) {
  const { addTask } = useTasks();
  const { user } = useAuth();
  
  // SAFEGUARDS: We check if 'user' exists before asking for 'user.name'
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    priority: 'Medium', 
    dueDate: '', 
    assignee: user ? user.name : 'Developer' // <--- This prevents the crash
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input 
            placeholder="Task Title" 
            required 
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
          />
          
          <textarea 
            placeholder="Description" 
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
          />

          <div className="flex gap-2">
            <select 
              className="border p-2 rounded w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input 
              type="date"
              required
              className="border p-2 rounded w-1/2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-600"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}