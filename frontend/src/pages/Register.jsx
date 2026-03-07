import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Mocking success for demo.');
      navigate('/login');
    }
  };

  return (
    <div className="py-24 px-4 max-w-md mx-auto">
      <h1 className="text-4xl font-heading text-center text-accent mb-8">Create Account</h1>
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Full Name</label>
          <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Email</label>
          <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Phone</label>
          <input required type="text" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Password</label>
          <input required type="password" onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all mt-4">
          Register
        </button>
        <p className="text-center text-sm text-accent opacity-80">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
