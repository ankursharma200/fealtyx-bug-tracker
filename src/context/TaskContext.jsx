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
    const newTask = { 
      ...task, 
      id: Date.now(), 
      timeSpent: 0, 
      status: 'Open', 
      createdAt: new Date().toLocaleDateString() 
    };
    setTasks([...tasks, newTask]);
  };
  const updateTask = (id, updatedFields) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updatedFields } : t));
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
    updateTask(id, { status: 'Pending Approval' });
  };

  const approveClosure = (id) => {
    updateTask(id, { status: 'Closed' });
  };

  const rejectClosure = (id) => {
    updateTask(id, { status: 'In Progress' });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, logTime, requestClosure, approveClosure, rejectClosure }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);