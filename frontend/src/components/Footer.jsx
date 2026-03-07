import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-accent text-white py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="font-heading text-4xl mb-6 italic text-primary">Frostella</h3>
          <p className="text-sm opacity-60 leading-relaxed mb-8">
            Artisanal 100% eggless creations, crafted for the most discerning palates. Baked fresh in the heart of Domjur.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group">
                <Icon className="w-5 h-5 opacity-60 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-primary">Explore</h4>
          <ul className="space-y-4 opacity-70 text-sm font-medium">
            <li><a href="/menu" className="hover:text-primary transition-all flex items-center gap-2">Our Collection</a></li>
            <li><a href="/about" className="hover:text-primary transition-all flex items-center gap-2">Artisan Story</a></li>
            <li><a href="/contact" className="hover:text-primary transition-all flex items-center gap-2">Bulk Orders</a></li>
            <li><a href="/login" className="hover:text-primary transition-all flex items-center gap-2">Member Login</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-primary">Boutique</h4>
          <ul className="space-y-4 opacity-70 text-sm font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span>Rudrapur, Domjur, Howrah,<br/>West Bengal, 711411</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <span>hello@frostella.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-primary">Newsletter</h4>
          <p className="text-sm opacity-60 mb-6 font-medium">Get a 10% discount code by joining our mailing list.</p>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Your email address" 
              className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all pr-12" 
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between gap-6">
        <p className="text-xs opacity-40 font-medium italic">
          &copy; {new Date().getFullYear()} Frostella Gourmet Patisserie. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40 font-bold">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
