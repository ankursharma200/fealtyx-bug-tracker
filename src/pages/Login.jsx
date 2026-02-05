import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      alert("Invalid credentials. Please check the test emails.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Bug Tracker</h2>
        
        {/* ROLE DISPLAY SECTION */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 text-center text-xs text-gray-600 bg-blue-50 p-2 rounded border border-blue-100">
            <p className="font-bold text-blue-800 uppercase mb-1">Developer</p>
            <p className="font-mono">dev@test.com</p>
            <p className="font-mono">123</p>
          </div>
          <div className="flex-1 text-center text-xs text-gray-600 bg-purple-50 p-2 rounded border border-purple-100">
            <p className="font-bold text-purple-800 uppercase mb-1">Manager</p>
            <p className="font-mono">manager@test.com</p>
            <p className="font-mono">123</p>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>

        <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
}