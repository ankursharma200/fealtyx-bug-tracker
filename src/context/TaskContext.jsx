import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_TASKS } from './MockData';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), timeSpent: 0, status: 'Open', history: [] };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const logTime = (id, hours) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, timeSpent: (t.timeSpent || 0) + Number(hours) } : t
    ));
  };

  const requestClosure = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Pending Approval' } : t));
  };

  const approveClosure = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Closed' } : t));
  };

  const rejectClosure = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'In Progress' } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, logTime, requestClosure, approveClosure, rejectClosure }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);