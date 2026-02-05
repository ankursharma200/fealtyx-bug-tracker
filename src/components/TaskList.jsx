import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Trash2, Clock, CheckCircle, XCircle, Edit, ListFilter } from 'lucide-react';

export default function TaskList({ tasks }) {
  const { user } = useAuth();
  const { deleteTask, updateTask, logTime, requestClosure, approveClosure, rejectClosure } = useTasks();
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = tasks.filter(task => {
    if (priorityFilter === 'All') return true;
    return task.priority === priorityFilter;
  });

  const handleEdit = (task) => {
    const newTitle = prompt("Edit Task Title:", task.title);
    if (newTitle) {
      updateTask(task.id, { title: newTitle });
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-700">Task List</h3>
        <div className="flex items-center gap-2">
          <ListFilter size={16} className="text-gray-500"/>
          <select 
            className="border rounded p-1 text-sm bg-white"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-100 border-b text-gray-600 text-sm">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Status</th>
            <th className="p-4">Hrs</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr><td colSpan="5" className="p-4 text-center text-gray-500">No tasks found.</td></tr>
          ) : (
            filteredTasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="font-bold text-gray-800">{task.title}</div>
                  <div className="text-xs text-gray-500">{task.description}</div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-400">Created: {task.createdAt || 'N/A'}</span>
                    {task.dueDate && (
                      <span className="text-xs text-red-500 font-medium bg-red-50 px-1 rounded">
                        Due: {task.dueDate}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded border ${
                    task.priority === 'High' ? 'bg-red-50 text-red-600 border-red-200' :
                    task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' :
                    'bg-green-50 text-green-600 border-green-200'
                  }`}>
                    {task.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    task.status === 'Closed' ? 'bg-green-100 text-green-800' : 
                    task.status === 'Pending Approval' ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-sm">{task.timeSpent}h</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {user.role === 'DEVELOPER' && (
                      <>
                        <button onClick={() => handleEdit(task)} className="text-gray-500 hover:text-blue-600" title="Edit">
                          <Edit size={16}/>
                        </button>
                        <button onClick={() => logTime(task.id, prompt("Hours spent?"))} className="text-gray-500 hover:text-blue-600" title="Log Time">
                          <Clock size={16} />
                        </button>
                        {task.status !== 'Closed' && task.status !== 'Pending Approval' && (
                          <button onClick={() => requestClosure(task.id)} className="text-green-600 border border-green-600 px-2 py-0.5 rounded text-xs hover:bg-green-50">
                            Done
                          </button>
                        )}
                        <button onClick={() => deleteTask(task.id)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={16}/>
                        </button>
                      </>
                    )}

                    {user.role === 'MANAGER' && task.status === 'Pending Approval' && (
                      <>
                        <button onClick={() => approveClosure(task.id)} className="text-green-500 hover:bg-green-100 p-1 rounded"><CheckCircle size={18}/></button>
                        <button onClick={() => rejectClosure(task.id)} className="text-red-500 hover:bg-red-100 p-1 rounded"><XCircle size={18}/></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}