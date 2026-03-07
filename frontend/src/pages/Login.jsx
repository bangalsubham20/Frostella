import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      alert('Login failed. For demo, mocking a login.');
      // Mock login for demo
      dispatch(loginSuccess({ token: "fake-jwt-token", role: email === 'admin@frostella.com' ? 'ADMIN' : 'CUSTOMER', email }));
      navigate('/');
    }
  };

  return (
    <div className="py-24 px-4 max-w-md mx-auto">
      <h1 className="text-4xl font-heading text-center text-accent mb-8">Welcome Back</h1>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-accent mb-2">Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-2">Password</label>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all">
          Login
        </button>
        <p className="text-center text-sm text-accent opacity-80">
          Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
}
