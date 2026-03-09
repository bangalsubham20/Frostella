import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  Edit2, 
  Save, 
  X, 
  LogOut, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { logout, updateProfile } from '../redux/authSlice';
import api from '../services/api';

export default function Profile() {
  const { userId, isAuthenticated, email: authEmail } = useSelector(state => state.auth);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [orderCount, setOrderCount] = useState(0);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchUserProfile();
    fetchUserStats();
  }, [isAuthenticated, userId]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get(`/users/${userId}`);
      setUser(data);
      setEditForm({ name: data.name, email: data.email });
    } catch (err) {
      console.error('Failed to fetch profile', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const { data } = await api.get(`/orders/user/${userId}`);
      setOrderCount(data.length);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/users/${userId}`, editForm);
      setUser(data);
      dispatch(updateProfile({ email: data.email }));
      setIsEditing(false);
      alert('Artisan Profile Synchronized!');
    } catch (err) {
      alert('Profile update failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 sm:mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10">
             <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-[2.5rem] sm:rounded-[3rem] shadow-premium flex items-center justify-center text-4xl sm:text-6xl font-heading text-accent border border-white relative z-10 overflow-hidden">
                   {user?.name.charAt(0)}
                   <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xl z-20 animate-pulse">
                   <Sparkles size={18} sm:size={20} />
                </div>
             </div>
             <div className="text-center md:text-left space-y-4">
                <span className="text-primary font-bold tracking-[.3em] sm:tracking-[.4em] uppercase text-[9px] sm:text-[10px]">Patisserie Member</span>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading text-accent leading-tight sm:leading-none">Greetings, <br/> <span className="text-primary italic">{user?.name}</span></h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                   <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-accent/40 hover:text-accent transition-colors">
                      <Edit2 size={10} sm:size={12} /> Edit Narrative
                   </button>
                   <span className="text-accent/10 hidden sm:inline">|</span>
                   <button onClick={handleLogout} className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500 transition-colors">
                      <LogOut size={10} sm:size={12} /> Log Out
                   </button>
                </div>
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Primary Intelligence */}
           <div className="lg:col-span-8 space-y-8 sm:space-y-12">
              <div className="bg-white/70 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 shadow-premium border border-white">
                 <div className="flex justify-between items-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-heading text-accent">Personal Registry</h2>
                    <ShieldCheck className="text-primary/20 hidden sm:block" size={32} />
                 </div>
                 
                 <AnimatePresence mode="wait">
                    {isEditing ? (
                       <motion.form 
                         key="edit"
                         initial={{ opacity: 0, x: -10 }} 
                         animate={{ opacity: 1, x: 0 }} 
                         exit={{ opacity: 0, x: 10 }}
                         onSubmit={handleUpdate} 
                         className="space-y-6 sm:space-y-8"
                       >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                             <div>
                                <label className="text-[9px] sm:text-[10px] font-bold text-accent uppercase tracking-widest mb-2 sm:mb-3 ml-1 block">Full Name</label>
                                <input 
                                  value={editForm.name} 
                                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                                  className="w-full p-4 bg-secondary/30 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium" 
                                />
                             </div>
                             <div>
                                <label className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-1 block">Electronic Mail</label>
                                <input 
                                  type="email"
                                  value={editForm.email} 
                                  onChange={e => setEditForm({...editForm, email: e.target.value})}
                                  className="w-full p-4 bg-secondary/30 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium" 
                                />
                             </div>
                          </div>
                           <div className="flex flex-col sm:flex-row gap-4">
                              <button type="submit" className="flex-1 bg-accent text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3">
                                 <Save size={16} sm:size={18} /> Commit Changes
                              </button>
                              <button type="button" onClick={() => setIsEditing(false)} className="px-10 bg-secondary/50 text-accent py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-3">
                                 <X size={16} sm:size={18} /> Cancel
                              </button>
                           </div>
                       </motion.form>
                    ) : (
                       <motion.div 
                         key="view"
                         initial={{ opacity: 0, x: 10 }} 
                         animate={{ opacity: 1, x: 0 }} 
                         exit={{ opacity: 0, x: -10 }}
                         className="grid grid-cols-1 md:grid-cols-2 gap-12"
                       >
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.3em]">Full Name</p>
                             <p className="text-2xl font-medium text-accent italic">{user?.name}</p>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.3em]">Electronic Mail</p>
                             <p className="text-2xl font-medium text-accent italic">{user?.email}</p>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.3em]">Account Status</p>
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-sm font-bold text-accent uppercase tracking-widest">Active Verified</p>
                             </div>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.3em]">Member Registry ID</p>
                             <p className="text-sm font-bold text-accent/20">#FR-USER-00{userId}</p>
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              {/* Recent Activity Mini-List */}
              <div className="bg-white/50 backdrop-blur-3xl rounded-[4rem] p-12 shadow-premium border border-white">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-heading text-accent">Recent Transactions</h2>
                    <Link to="/orders" className="text-[10px] font-bold text-primary uppercase tracking-[.2em] hover:underline flex items-center gap-2">
                       Detailed Ledger <ChevronRight size={14} />
                    </Link>
                 </div>
                 {orderCount === 0 ? (
                    <div className="py-12 text-center">
                       <p className="text-accent/30 font-bold uppercase tracking-[.3em] italic text-xs">No transactions recorded in the current lifecycle.</p>
                    </div>
                 ) : (
                    <div className="space-y-4">
                       <p className="text-accent/60 font-medium italic">You have <span className="text-primary font-bold">{orderCount}</span> historical reservations in our boutique ledger.</p>
                       <Link to="/orders" className="inline-block bg-accent text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all">Review Order History</Link>
                    </div>
                 )}
              </div>
           </div>

           {/* Metrics & Discovery */}
           <div className="lg:col-span-4 space-y-12">
              <div className="bg-accent p-12 rounded-[4rem] shadow-2xl relative overflow-hidden text-white group">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/20 transition-all duration-1000"></div>
                 <ShoppingBag className="w-12 h-12 mb-8 text-primary" />
                 <p className="text-[10px] font-bold uppercase tracking-[.4em] opacity-40 mb-2">Total Reservations</p>
                 <p className="text-7xl font-heading italic tracking-tighter">{orderCount}</p>
                 <p className="text-xs font-medium text-white/30 mt-6 leading-relaxed">"Every reservation represents a significant moment we've had the honor to sweeten."</p>
              </div>

              <div className="bg-white p-12 rounded-[4rem] shadow-premium border border-white">
                 <h3 className="text-xl font-heading text-accent mb-8">Artisan Links</h3>
                 <ul className="space-y-6">
                    <li>
                       <Link to="/wishlist" className="flex items-center justify-between group">
                          <span className="text-sm font-bold text-accent/60 group-hover:text-primary transition-colors uppercase tracking-widest">Your Aspirations</span>
                          <span className="w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center text-accent/20 group-hover:bg-primary group-hover:text-white transition-all"><Sparkles size={14} /></span>
                       </Link>
                    </li>
                    <li>
                       <Link to="/menu" className="flex items-center justify-between group">
                          <span className="text-sm font-bold text-accent/60 group-hover:text-primary transition-colors uppercase tracking-widest">Boutique Menu</span>
                          <span className="w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center text-accent/20 group-hover:bg-primary group-hover:text-white transition-all"><ChevronRight size={14} /></span>
                       </Link>
                    </li>
                    <li>
                       <Link to="/contact" className="flex items-center justify-between group">
                          <span className="text-sm font-bold text-accent/60 group-hover:text-primary transition-colors uppercase tracking-widest">Consultations</span>
                          <span className="w-8 h-8 rounded-xl bg-secondary/50 flex items-center justify-center text-accent/20 group-hover:bg-primary group-hover:text-white transition-all"><Mail size={14} /></span>
                       </Link>
                    </li>
                 </ul>
              </div>

              <div className="p-10 bg-secondary/20 rounded-[3rem] border border-accent/5 text-center">
                 <Calendar className="w-10 h-10 text-primary/30 mx-auto mb-6" />
                 <p className="text-[10px] font-bold text-accent/30 uppercase tracking-widest mb-1">Curation Date</p>
                 <p className="text-sm font-bold text-accent/60 italic">{new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} Edition</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
