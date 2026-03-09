import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginSuccess } from '../redux/authSlice';
import api from '../services/api';
import { Mail, Lock, Loader2, ArrowRight, Sparkles } from 'lucide-react';

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
      const errorData = error.response?.data;
      const errorMessage = typeof errorData === 'object' ? (errorData.message || errorData.error || JSON.stringify(errorData)) : errorData;
      setError(errorMessage || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Artistic Side */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="hidden lg:block space-y-10"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="text-primary" />
            <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">Premium Member Access</span>
          </div>
          <h1 className="text-8xl font-heading text-accent leading-none">Sweet <br/><span className="text-primary italic">Homecoming</span></h1>
          <p className="text-xl text-accent/60 font-medium italic max-w-md leading-relaxed">
            "Enter your sanctuary of artisanal treats and managed your gourmet reservations."
          </p>
          <div className="flex -space-x-4 pt-10">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-14 h-14 rounded-full border-4 border-white shadow-lg" alt="" />
            ))}
            <div className="w-14 h-14 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-xs font-bold shadow-lg">
              1K+
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="bg-white/80 backdrop-blur-2xl p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[4rem] shadow-premium border border-white">
            <div className="text-center lg:text-left mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading text-accent mb-2">Sign In</h2>
              <p className="text-accent/40 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Welcome back to Frostella</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 italic">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Email Intelligence</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/20 group-focus-within:text-primary transition-colors" />
                  <input 
                    required 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="your@email.com"
                    className="w-full pl-14 pr-6 py-5 bg-secondary/30 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-accent" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between px-1">
                  <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest">Secret Vault</label>
                  <button type="button" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/20 group-focus-within:text-primary transition-colors" />
                  <input 
                    required 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-5 bg-secondary/30 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-accent" 
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-accent text-white h-16 sm:h-20 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    Unlock Experience
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center pt-8 border-t border-accent/5">
                <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">
                  Not a collector yet? {' '}
                  <Link to="/register" className="text-primary hover:underline underline-offset-4">
                    Join the Patisserie
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
