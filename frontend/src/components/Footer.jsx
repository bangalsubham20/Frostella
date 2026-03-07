import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-accent text-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-2xl mb-4 italic">Frostella</h3>
          <p className="text-sm opacity-80 mb-4">Delicious 100% Eggless Cakes made with love. Freshly baked in Rudrapur, Domjur.</p>
        </div>
        <div>
          <h4 className="font-heading text-xl mb-4">Quick Links</h4>
          <ul className="space-y-2 opacity-80 text-sm">
            <li><a href="/menu" className="hover:text-primary transition-colors">Our Menu</a></li>
            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-xl mb-4">Contact Info</h4>
          <ul className="space-y-2 opacity-80 text-sm">
            <li>Rudrapur, Domjur, Howrah</li>
            <li>West Bengal, India</li>
            <li>Phone: +91 9876543210</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-opacity-20 border-secondary text-sm opacity-60">
        &copy; {new Date().getFullYear()} Frostella. All rights reserved.
      </div>
    </footer>
  );
}
