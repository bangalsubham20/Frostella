import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { User, Mail, Phone, Lock, Loader2, UserPlus, Sparkles, ArrowRight } from 'lucide-react';

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
      alert('Welcome to the Frostella family! Please sign in.');
      navigate('/login');
    } catch (error) {
      const errorData = error.response?.data;
      const errorMessage = typeof errorData === 'object' ? (errorData.message || errorData.error || JSON.stringify(errorData)) : errorData;
      setError(errorMessage || 'Registration failed. Let\'s try that again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4 py-32 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        
        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="hidden lg:block lg:col-span-5 space-y-12"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="text-primary" />
            <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">Artisan Membership</span>
          </div>
          <h1 className="text-7xl font-heading text-accent leading-none">Join the <br/><span className="text-primary italic">Patisserie</span></h1>
          <p className="text-lg text-accent/60 font-medium italic leading-relaxed">
            "Become a part of our artisanal journey and enjoy curated treats, early reservations, and sweet surprises."
          </p>
          
          <div className="bg-white/50 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-premium max-w-sm">
            <div className="flex items-center gap-6 mb-6">
               <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                 <Lock size={20} />
               </div>
               <p className="text-xs font-bold text-accent uppercase tracking-widest">Secure & Identity-First</p>
            </div>
            <p className="text-xs text-accent/40 font-medium leading-relaxed">Your data is secured with JWT encryption in our private cloud infrastructure.</p>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7"
        >
          <div className="bg-white/80 backdrop-blur-2xl p-8 sm:p-10 md:p-14 rounded-[2.5rem] sm:rounded-[4rem] shadow-premium border border-white">
            <div className="mb-10 sm:mb-12 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-heading text-accent mb-2">Create Profile</h2>
              <p className="text-accent/40 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Begin your sweet history today</p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 p-5 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 italic">
                {error}
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Legal Designation (Name)</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/20 group-focus-within:text-primary transition-colors" />
                  <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Master Chef / Sweet Tooth" className="w-full pl-14 pr-6 py-4 bg-secondary/30 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Electronic Mail</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/20 group-focus-within:text-primary transition-colors" />
                  <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" className="w-full pl-14 pr-6 py-4 bg-secondary/30 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Tele-Communication (Phone)</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/20 group-focus-within:text-primary transition-colors" />
                  <input required type="text" onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXX XXX XXX" className="w-full pl-14 pr-6 py-4 bg-secondary/30 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-accent" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Pass-Code Protection</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/20 group-focus-within:text-primary transition-colors" />
                  <input required type="password" onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full pl-14 pr-6 py-4 bg-secondary/30 rounded-3xl border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none font-medium text-accent" />
                </div>
              </div>

              <button 
                disabled={loading}
                className="md:col-span-2 w-full h-16 sm:h-20 bg-accent text-white rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    Initialize Membership
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              <div className="md:col-span-2 text-center pt-6">
                <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">
                  Part of the family? {' '}
                  <Link to="/login" className="text-primary hover:underline underline-offset-4">
                    Member Login
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
