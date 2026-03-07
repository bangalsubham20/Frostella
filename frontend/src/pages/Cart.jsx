import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-heading text-accent">Your Cart</h1>
          <p className="text-accent opacity-60 font-medium mt-2">Ready for your sweet delivery?</p>
        </motion.div>
        
        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-white/50 backdrop-blur-md rounded-[3rem] border border-white shadow-premium"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-heading text-accent mb-4">Your basket is empty</h2>
            <p className="text-accent opacity-60 mb-10 max-w-sm mx-auto font-medium">Looks like you haven't added any sweet treats to your cart yet.</p>
            <Link to="/menu" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-dark transition-all shadow-xl">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row items-center gap-8 p-8 bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-white shadow-premium hover:shadow-hover transition-all group"
                  >
                    <div className="w-32 h-32 rounded-3xl overflow-hidden bg-secondary flex-shrink-0 group-hover:scale-105 transition-transform">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          {item.category === 'Cupcakes' ? '🧁' : '🎂'}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-2xl font-heading text-accent mb-1">{item.name}</h3>
                      <p className="text-primary font-bold text-lg mb-2">₹{item.price}</p>
                      {item.size && (
                        <span className="text-[10px] uppercase tracking-widest font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {item.size}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 bg-secondary/50 p-2 rounded-full px-4">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-bold text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-4 text-accent/20 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-accent text-white p-10 rounded-[3rem] shadow-2xl h-fit relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              
              <h3 className="text-3xl font-heading mb-10 pb-6 border-b border-white/10 uppercase tracking-widest text-sm font-bold">Summary</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-medium tracking-wide">Subtotal</span>
                  <span className="text-2xl font-bold italic">₹{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-medium tracking-wide">Delivery</span>
                  <span className="font-bold text-primary">FREE</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mb-12">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold">Grand Total</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-4xl font-heading italic">₹{total}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-full font-bold text-xl transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3 group"
              >
                Checkout
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mt-8">
                Secure SSL Encryption
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
