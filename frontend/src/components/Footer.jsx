import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Sparkles, Send, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-accent text-white pt-20 sm:pt-32 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 text-center md:text-left">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10 flex flex-col items-center md:items-start">
            <Link to="/" className="group inline-flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all duration-500">
                 <Sparkles size={20} sm:size={24} className="text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-3xl sm:text-4xl font-bold tracking-tight italic leading-none text-white group-hover:text-primary transition-colors">
                  Frostella
                </span>
                <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[.4em] sm:tracking-[.5em] text-white/30 mt-1">Patisserie Studio</span>
              </div>
            </Link>
            
            <p className="text-base sm:text-lg text-white/40 leading-relaxed font-medium italic md:pr-10 max-w-sm">
              "We believe that every celebration deserves a centerpiece of artisanal perfection. 100% Eggless, handcrafted in the heart of West Bengal."
            </p>
            
            <div className="flex gap-4 sm:gap-6 justify-center md:justify-start">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary/20 border border-white/5 hover:border-primary/20 transition-all group">
                  <Icon size={18} sm:size={20} className="text-white/20 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-10">
            <div>
              <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.3em] sm:tracking-[.4em] mb-6 sm:mb-10 text-primary">Experience</h4>
              <ul className="space-y-4 sm:space-y-6">
                {['Menu Index', 'Artisan Story', 'Bulk Inquiry', 'Order History'].map(item => (
                  <li key={item}>
                    <Link to={item.toLowerCase().includes('menu') ? '/menu' : item.toLowerCase().includes('story') ? '/about' : item.toLowerCase().includes('history') ? '/orders' : '/contact'} className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.2em] text-white/40 hover:text-white transition-all inline-block hover:translate-x-1">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.3em] sm:tracking-[.4em] mb-6 sm:mb-10 text-primary">Atelier</h4>
              <ul className="space-y-8 sm:space-y-10 text-white/40 group flex flex-col items-center md:items-start">
                <li className="flex items-start gap-4">
                  <MapPin size={16} sm:size={18} className="text-primary mt-1 shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    Rudrapur, Domjur,<br/>Howrah, WB 711411
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={16} sm:size={18} className="text-primary shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">+91 98765 43210</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Engagement */}
          <div className="lg:col-span-3 space-y-8 sm:space-y-10 flex flex-col items-center md:items-start w-full">
            <div className="w-full">
               <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.3em] sm:tracking-[.4em] mb-4 text-primary">Intelligence</h4>
               <p className="text-[11px] sm:text-xs text-white/40 font-medium leading-relaxed max-w-xs mx-auto md:mx-0">Join our private circle for curated recipes and early reservation notice.</p>
            </div>
            <div className="relative group w-full max-w-sm">
               <input 
                 type="email" 
                 placeholder="Your electronic mail..." 
                 className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-6 py-4 sm:py-5 text-[11px] sm:text-xs focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-14 font-medium" 
               />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                 <Send size={14} sm:size={16} />
               </button>
            </div>
          </div>
        </div>

        {/* Technical Registry */}
        <div className="mt-20 sm:mt-32 pt-8 sm:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center sm:text-left">
           <div className="flex items-center gap-3">
              <Heart size={12} sm:size={14} className="text-primary fill-primary" />
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[.4em] sm:tracking-[.5em] text-white/20">
                Gourmet Patisserie Studio
              </p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
              <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[.3em] text-white/20 italic">
                &copy; {new Date().getFullYear()} Designed with Precision
              </span>
              <div className="flex gap-6 text-[7px] sm:text-[8px] font-bold uppercase tracking-[.3em] text-white/20">
                 <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                 <a href="#" className="hover:text-primary transition-colors">Terms</a>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
}
