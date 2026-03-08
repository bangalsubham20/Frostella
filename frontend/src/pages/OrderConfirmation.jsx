import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight, Sparkles, Heart } from 'lucide-react';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId || "REF-" + Math.floor(Math.random() * 90000 + 10000);

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-2xl rounded-[4rem] p-12 md:p-20 shadow-premium border border-white text-center relative"
        >
          {/* Decorative Sparks */}
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 right-10 text-primary opacity-20">
            <Sparkles size={40} />
          </motion.div>
          
          <div className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-primary/30 relative">
            <CheckCircle2 size={48} />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary rounded-[2rem]"
            ></motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading text-accent mb-6">Baked with <span className="text-primary italic">Success!</span></h1>
          <p className="max-w-md mx-auto text-accent opacity-60 text-lg md:text-xl font-medium italic leading-relaxed mb-12">
            "Your gourmet reservation has been secured. Our ovens are preheating for your artistic treats."
          </p>

          <div className="bg-secondary/30 p-10 rounded-[3rem] mb-12 border border-accent/5 inline-block min-w-[300px]">
            <span className="text-[10px] font-bold text-accent/30 uppercase tracking-[.3em] block mb-2">Reservation Reference</span>
            <span className="text-4xl font-heading text-primary italic">#{orderId}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
            <Link 
              to="/orders" 
              className="flex items-center justify-center gap-3 bg-accent text-white py-5 rounded-2xl font-bold text-sm hover:bg-primary transition-all shadow-xl group"
            >
              <ShoppingBag size={18} />
              Track Status
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/menu" 
              className="flex items-center justify-center gap-3 bg-white text-accent py-5 rounded-2xl font-bold text-sm border-2 border-accent/5 hover:border-primary/20 transition-all shadow-sm"
            >
              Explore More
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-accent/5 flex items-center justify-center gap-3 opacity-30">
            <Heart size={14} fill="currentColor" className="text-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[.4em]">Thank you for choosing Frostella</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
