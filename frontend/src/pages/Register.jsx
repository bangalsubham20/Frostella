import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Phone, Lock, Loader2, UserPlus } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError(error.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/images/hero_bg.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-2xl border border-white border-opacity-20 transform transition-all mt-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading text-accent mb-2">Create Account</h1>
            <p className="text-accent opacity-60 font-medium">Join our community of cake lovers!</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group md:col-span-2">
              <label className="block text-sm font-bold text-accent mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-40 group-focus-within:text-primary transition-colors" />
                <input 
                  required 
                  type="text" 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary bg-opacity-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary focus:ring-opacity-10 outline-none transition-all font-medium text-accent" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-accent mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-40 group-focus-within:text-primary transition-colors" />
                <input 
                  required 
                  type="email" 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary bg-opacity-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary focus:ring-opacity-10 outline-none transition-all font-medium text-accent" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-accent mb-2 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-40 group-focus-within:text-primary transition-colors" />
                <input 
                  required 
                  type="text" 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  placeholder="+91 9876543210"
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary bg-opacity-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary focus:ring-opacity-10 outline-none transition-all font-medium text-accent" 
                />
              </div>
            </div>

            <div className="group md:col-span-2">
              <label className="block text-sm font-bold text-accent mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-40 group-focus-within:text-primary transition-colors" />
                <input 
                  required 
                  type="password" 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-secondary bg-opacity-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary focus:ring-opacity-10 outline-none transition-all font-medium text-accent" 
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="md:col-span-2 w-full bg-accent text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl flex items-center justify-center gap-2 group mt-2"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Register
                  <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>

            <div className="md:col-span-2 text-center pt-2">
              <p className="text-accent opacity-70 font-medium">
                Already have an account? {' '}
                <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
