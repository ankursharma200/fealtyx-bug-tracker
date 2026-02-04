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
    if (login(email, password)) navigate('/dashboard');
    else alert("Invalid! Try dev@test.com / 123");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Bug Tracker</h2>
        <div className="mb-6 text-center text-sm text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
          <p>Test Mail: <span className="font-bold text-blue-600 font-mono">dev@test.com</span></p>
          <p>Password: <span className="font-bold text-blue-600 font-mono">123</span></p>
        </div>
        <input className="w-full p-2 mb-4 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 mb-6 border rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}