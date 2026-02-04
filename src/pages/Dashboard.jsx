import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskFormModal from '../components/TaskFormModal';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myTasks = user.role === 'MANAGER' ? tasks : tasks.filter(t => t.assignee === user.name);
  const chartData = [{name:'Mon', tasks:2}, {name:'Tue', tasks:5}, {name:'Wed', tasks:3}, {name:'Thu', tasks:8}];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        {user.role === 'DEVELOPER' && (
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">+ New Task</button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Total Active Tasks</h3>
          <p className="text-4xl font-bold">{myTasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}><XAxis dataKey="name"/><Tooltip/><Line type="monotone" dataKey="tasks" stroke="#2563eb"/></LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <TaskList tasks={myTasks} />
      {isModalOpen && <TaskFormModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}