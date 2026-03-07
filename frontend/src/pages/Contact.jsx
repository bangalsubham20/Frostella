import React from 'react';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl font-heading text-center text-accent mb-12">Get In Touch</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-3xl font-heading text-accent mb-8">Contact Form</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-accent mb-2">Name</label>
              <input type="text" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-2">Email</label>
              <input type="email" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" placeholder="Your Email address" />
            </div>
            <div>
              <label className="block text-sm font-medium text-accent mb-2">Message</label>
              <textarea rows="4" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" onClick={() => alert('Message Sent (Demo)')} className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-md">
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm h-full flex flex-col justify-center">
            <h2 className="text-3xl font-heading text-accent mb-8">Contact Info</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-accent">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Address</p>
                  <p className="opacity-80">Rudrapur, Domjur, Howrah,<br/>West Bengal, India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-accent">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Phone</p>
                  <p className="opacity-80">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-accent">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-lg">Email</p>
                  <p className="opacity-80">hello@frostella.com</p>
                </div>
              </div>

              <div className="pt-6 border-t border-secondary">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-md">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
