import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Package, 
  Truck, 
  XCircle,
  HelpCircle,
  ChevronRight,
  MapPin,
  Calendar
} from 'lucide-react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { userId, isAuthenticated } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUserOrders();
    }
  }, [isAuthenticated, userId]);

  const fetchUserOrders = async () => {
    try {
      const { data } = await api.get(`/orders/user/${userId}`);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch user orders', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Clock className="text-yellow-500" />;
      case 'PROCESSING': return <Package className="text-blue-500" />;
      case 'SHIPPED': return <Truck className="text-purple-500" />;
      case 'DELIVERED': return <CheckCircle2 className="text-green-500" />;
      case 'CANCELLED': return <XCircle className="text-red-500" />;
      default: return <HelpCircle className="text-accent/30" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-premium border border-white max-w-lg mx-auto">
          <h2 className="text-4xl font-heading text-accent mb-6">Access Restricted</h2>
          <p className="text-accent/60 font-medium mb-10 leading-relaxed">Please sign in to your accounts to track your gourmet reservations and sweet history.</p>
          <Link to="/login" className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-xl transition-all inline-block hover:-translate-y-1">
            Sign In to Account
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center pt-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 text-center md:text-left">
          <span className="text-primary font-bold tracking-[.3em] uppercase text-[10px] mb-4 inline-block">Order History</span>
          <h1 className="text-6xl md:text-8xl font-heading text-accent leading-tight">My <span className="text-primary italic">Reservations</span></h1>
        </motion.div>
        
        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/70 backdrop-blur-xl p-20 rounded-[4rem] text-center shadow-premium border border-white">
            <ShoppingBag className="w-20 h-20 text-primary opacity-20 mx-auto mb-8" />
            <h2 className="text-3xl font-heading text-accent mb-4">No sweet memories yet</h2>
            <p className="text-accent/50 mb-10 font-medium max-w-sm mx-auto">Your orders will appear here. Start your journey with our signature collection.</p>
            <Link to="/menu" className="bg-accent text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-primary transition-all shadow-xl">
              Explore the Menu
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {orders.sort((a,b) => b.id - a.id).map((order, idx) => (
              <motion.div 
                key={order.id} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div 
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className={`cursor-pointer transition-all duration-500 overflow-hidden bg-white rounded-[3rem] shadow-premium hover:shadow-hover border-2 border-transparent ${
                    expandedOrder === order.id ? 'border-primary ring-4 ring-primary/5 shadow-hover' : 'hover:border-primary/20'
                  }`}
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap justify-between items-center gap-10">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                          expandedOrder === order.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                        }`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.2em] mb-1">Reservation ID</p>
                          <p className="text-2xl font-bold text-accent italic">#{order.id}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                        <div className="hidden md:block">
                          <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.2em] mb-1">Date</p>
                          <p className="font-bold text-accent">{order.deliveryDate}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.2em] mb-1">Investment</p>
                          <p className="font-bold text-primary text-xl">₹{order.totalAmount}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest
                            ${order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' : 
                              order.status === 'PROCESSING' ? 'bg-blue-50 text-blue-600' : 
                              order.status === 'DELIVERED' ? 'bg-green-50 text-green-600' : 
                              'bg-primary/5 text-primary'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="bg-secondary/50 p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                         <ChevronRight className={`transition-transform duration-300 ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-accent/5"
                      >
                        <div className="p-10 bg-secondary/10 grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-8">
                            <h4 className="text-xl font-heading mb-6">Delivery Details</h4>
                            <div className="flex items-start gap-4">
                              <MapPin size={18} className="text-primary mt-1 shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-accent/30 uppercase mb-1">Address</p>
                                <p className="text-accent font-medium leading-relaxed">{order.deliveryAddress}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4">
                              <Calendar size={18} className="text-primary mt-1 shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-accent/30 uppercase mb-1">Estimated Date</p>
                                <p className="text-accent font-medium">{order.deliveryDate || 'TBD'}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-8">
                            <h4 className="text-xl font-heading mb-6">Purchase Intel</h4>
                            <div className="bg-white p-6 rounded-[2rem] shadow-sm">
                               <p className="text-[10px] font-bold text-accent/30 uppercase tracking-widest mb-4">Method of Payment</p>
                               <p className="font-bold text-accent">{order.paymentMethod === 'ONLINE' ? 'Razorpay Secure' : 'Cash on Delivery'}</p>
                               {order.specialInstructions && (
                                 <div className="mt-6 pt-6 border-t border-accent/5">
                                   <p className="text-[10px] font-bold text-accent/30 uppercase tracking-widest mb-2 italic">Notes for the Baker</p>
                                   <p className="text-sm text-accent/60 italic font-medium">"{order.specialInstructions}"</p>
                                 </div>
                               )}
                            </div>
                          </div>
                        </div>
                        <div className="p-10 pt-0 bg-secondary/10 flex justify-end">
                          <Link to="/contact" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline">Need help with this order?</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
