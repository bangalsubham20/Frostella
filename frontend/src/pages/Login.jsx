import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import api from '../services/api';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      const errorMessage = typeof errorData === 'object' ? (errorData.message || errorData.error || JSON.stringify(errorData)) : errorData;
      setError(errorMessage || 'Login failed. Please check your credentials.');
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

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-2xl border border-white border-opacity-20 transform transition-all">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-heading text-accent mb-2">Frostella</h1>
            <p className="text-accent opacity-60 font-medium">Welcome back, sweet friend!</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-bold text-accent mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-40 group-focus-within:text-primary transition-colors" />
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-secondary bg-opacity-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary focus:ring-opacity-10 outline-none transition-all font-medium text-accent" 
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-accent mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent opacity-40 group-focus-within:text-primary transition-colors" />
                <input 
                  required 
                  type="password" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-secondary bg-opacity-50 rounded-2xl border-2 border-transparent focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary focus:ring-opacity-10 outline-none transition-all font-medium text-accent" 
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl hover:shadow-primary hover:shadow-opacity-20 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <p className="text-accent opacity-70 font-medium">
                New to our bakery? {' '}
                <Link to="/register" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
                  Join us here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
