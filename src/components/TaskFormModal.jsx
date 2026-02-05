import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

export default function TaskFormModal({ onClose }) {
  const { addTask } = useTasks();
  const { user } = useAuth();
  const [data, setData] = useState({ title: '', description: '', priority: 'Medium',
     dueDate: '', assignee: user.name });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 flex flex-col gap-4">
        <h3 className="text-xl font-bold">New Task</h3>
        <input placeholder="Title" className="border p-2 rounded" required onChange={e => setData({...data, title: e.target.value})} />
        <textarea placeholder="Description" className="border p-2 rounded" onChange={e => setData({...data, description: e.target.value})} />
        <select className="border p-2 rounded" onChange={e => setData({...data, priority: e.target.value})}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <input 
              type="date"
              required
              className="border p-2 rounded w-1/2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-600"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
        <button className="bg-blue-600 text-white p-2 rounded">Create</button>
        <button type="button" onClick={onClose} className="text-gray-500">Cancel</button>
      </form>
    </div>
  );
}