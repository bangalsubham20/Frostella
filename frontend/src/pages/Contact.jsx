import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  Clock, 
  Instagram, 
  Facebook, 
  Send, 
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-primary w-5 h-5 animate-pulse" />
            <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">The Concierge</span>
            <Sparkles className="text-primary w-5 h-5 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-[9rem] font-heading text-accent mb-10 leading-none">Let's <span className="text-primary italic">Connect.</span></h1>
          <p className="max-w-2xl mx-auto text-accent opacity-40 text-lg md:text-xl font-medium italic leading-relaxed">
            "Whether it's a dream wedding cake or a simple box of cupcakes, we're here to turn your imaginations into reality."
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-white/70 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] shadow-premium relative overflow-hidden border border-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl text-primary/10"></div>
            
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-8"
                >
                  <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-heading text-accent">Dispach Successful!</h2>
                  <p className="text-accent/50 font-medium italic max-w-sm mx-auto">"Our head baker has received your inquiry. Expect a sweet response within 24 hours."</p>
                  <button onClick={() => setFormStatus('idle')} className="text-[10px] font-bold text-primary uppercase tracking-[.3em] hover:underline">Send another inquiry</button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
                  <h2 className="text-4xl font-heading text-accent mb-12">Consultation Inquiry</h2>
                  <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Identity (Full Name)</label>
                        <input required type="text" className="w-full p-5 bg-secondary/50 rounded-[2rem] border-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-accent" placeholder="Your name" />
                      </div>
                      <div className="space-y-3">
                        <label className="block text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">E-Mail Registry</label>
                        <input required type="email" className="w-full p-5 bg-secondary/50 rounded-[2rem] border-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-accent" placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">The Occasion / Vision</label>
                      <textarea required rows="6" className="w-full p-6 bg-secondary/50 rounded-[2.5rem] border-none focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none text-accent" placeholder="Describe your dream cake or order details..."></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'sending'}
                      className="w-full bg-accent text-white py-6 rounded-[2.5rem] font-bold text-xl hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? 'Dispatching Message...' : (
                        <>
                          Dispatch Inquiry
                          <div className="relative overflow-hidden w-6 h-6">
                            <Send size={24} className="group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-500" />
                            <Send size={24} className="absolute -left-10 top-10 group-hover:left-0 group-hover:top-0 transition-all duration-500" />
                          </div>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-accent p-12 md:p-16 rounded-[4rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              <h2 className="text-3xl font-heading mb-12">Artisan Studio Intelligence</h2>
              
              <div className="space-y-12 relative z-10">
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500">
                    <MapPin className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest text-primary mb-2">Location Origin</p>
                    <p className="opacity-70 text-lg leading-relaxed italic">Rudrapur, Domjur, Howrah,<br/>West Bengal, 711411</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500">
                    <Phone className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest text-primary mb-2">Voice Consultation</p>
                    <p className="opacity-70 text-lg font-bold">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500">
                    <Clock className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm uppercase tracking-widest text-primary mb-2">Studio Hours</p>
                    <p className="opacity-70 text-lg italic">Everyday: 10 AM — 9 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap gap-5">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 px-8 rounded-3xl font-bold hover:scale-105 transition-all shadow-xl text-xs uppercase tracking-widest">
                  <MessageCircle size={18} />
                  Connect via WhatsApp
                </a>
                <div className="flex gap-4">
                  <a href="#" className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center hover:bg-primary transition-all group">
                    <Instagram size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center hover:bg-primary transition-all group">
                    <Facebook size={22} className="group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Micro-map Visibility */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-5 rounded-[4rem] shadow-premium h-80 overflow-hidden relative group border border-white"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117833.0560706788!2d88.23233306873528!3d22.643237191834162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027964b4c8038d%3A0xe7c5625c1b6d17b!2sDomjur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1716123456789!5m2!1sen!2sin" 
                className="w-full h-full rounded-[3rem] border-none grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                title="Google Map location"
              ></iframe>
              <div className="absolute inset-x-12 bottom-10 p-5 bg-white/90 backdrop-blur-xl rounded-3xl text-accent font-bold text-center text-xs tracking-[.4em] uppercase shadow-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                Direction to the Artisans
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
