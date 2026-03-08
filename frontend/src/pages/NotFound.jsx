import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center bg-white/80 backdrop-blur-xl p-12 rounded-[3.5rem] shadow-premium border border-white"
      >
        <div className="relative mb-8">
          <h1 className="text-[12rem] font-heading leading-none text-primary/10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl">🧁</span>
          </div>
        </div>
        
        <h2 className="text-4xl font-heading text-accent mb-4">Sweet Mystery!</h2>
        <p className="text-accent/60 mb-10 font-medium">
          The treat you're looking for must have been eaten already. Let's get you back to the bakery!
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-dark transition-all shadow-xl group"
        >
          <Home className="w-5 h-5" />
          Back to Home
          <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
