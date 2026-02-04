import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function TaskList({ tasks }) {
  const { user } = useAuth();
  const { deleteTask, logTime, requestClosure, approveClosure, rejectClosure } = useTasks();

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr><th className="p-4">Title</th><th className="p-4">Status</th><th className="p-4">Hrs</th><th className="p-4">Actions</th></tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-b">
              <td className="p-4">
                <div className="font-bold">{task.title}</div>
                <div className="text-sm text-gray-500">{task.description}</div>
              </td>
              <td className="p-4"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{task.status}</span></td>
              <td className="p-4">{task.timeSpent}h</td>
              <td className="p-4 flex gap-2">
                {user.role === 'DEVELOPER' && (
                  <>
                    <button onClick={() => logTime(task.id, prompt("Hours?"))} title="Log Time"><Clock size={16} /></button>
                    <button onClick={() => deleteTask(task.id)} className="text-red-500"><Trash2 size={16}/></button>
                    {task.status === 'Open' && <button onClick={() => requestClosure(task.id)} className="text-green-600 border px-2 text-xs rounded">Mark Done</button>}
                  </>
                )}
                {user.role === 'MANAGER' && task.status === 'Pending Approval' && (
                  <>
                    <button onClick={() => approveClosure(task.id)} className="text-green-500"><CheckCircle size={18}/></button>
                    <button onClick={() => rejectClosure(task.id)} className="text-red-500"><XCircle size={18}/></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}