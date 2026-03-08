import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, MessageCircle, Clock, Instagram, Facebook, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-bold tracking-[.3em] uppercase text-xs mb-4 inline-block">Connect with us</span>
          <h1 className="text-6xl md:text-8xl font-heading text-accent mb-6 leading-tight">Get In <span className="text-primary italic">Touch</span></h1>
          <p className="max-w-2xl mx-auto text-accent opacity-60 text-lg md:text-xl font-medium italic">
            "Have a dream cake in mind? We're here to turn your sweet imaginations into handcrafted reality."
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-premium relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <h2 className="text-3xl font-heading text-accent mb-10">Send an Inquiry</h2>
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-1">Full Name</label>
                  <input type="text" className="w-full p-4 bg-secondary rounded-[1.5rem] border-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-1">Email Address</label>
                  <input type="email" className="w-full p-4 bg-secondary rounded-[1.5rem] border-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-accent uppercase tracking-widest mb-3 ml-1">Your Message</label>
                <textarea rows="5" className="w-full p-4 bg-secondary rounded-[2rem] border-none focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none" placeholder="Describe your dream cake..."></textarea>
              </div>
              <button 
                type="button" 
                onClick={() => alert('Message Sent (Demo)')} 
                className="w-full bg-accent text-white py-5 rounded-[2rem] font-bold text-lg hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3 group"
              >
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Dispatch Inqeury
              </button>
            </form>
          </motion.div>

          {/* Social & Location */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-accent p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              <h2 className="text-3xl font-heading mb-10">Artisan Studio</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg uppercase tracking-tight">Location</p>
                    <p className="opacity-70 text-sm leading-relaxed">Rudrapur, Domjur, Howrah,<br/>West Bengal, 711411 (Near the main market)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg uppercase tracking-tight">Phone</p>
                    <p className="opacity-70 text-sm">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg uppercase tracking-tight">Hours</p>
                    <p className="opacity-70 text-sm">Mon-Sun: 10:00 AM - 09:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap gap-4">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 px-6 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg text-sm">
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-primary transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </motion.div>

            {/* Google Map Mock/Iframe */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-4 rounded-[3.5rem] shadow-premium h-80 overflow-hidden relative group"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117833.0560706788!2d88.23233306873528!3d22.643237191834162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027964b4c8038d%3A0xe7c5625c1b6d17b!2sDomjur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1716123456789!5m2!1sen!2sin" 
                className="w-full h-full rounded-[2.5rem] border-none grayscale contrast-[1.1] hover:grayscale-0 transition-all duration-1000"
                loading="lazy"
                title="Google Map location"
              ></iframe>
              <div className="absolute inset-x-8 bottom-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl text-accent font-bold text-center text-xs tracking-widest uppercase shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                Come Visit Our Home Bakery
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
