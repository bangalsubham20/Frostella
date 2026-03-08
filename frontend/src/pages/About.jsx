import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles, Smile } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-primary font-bold tracking-[.3em] uppercase text-xs mb-4 inline-block">The Soul of the Bakery</span>
          <h1 className="text-6xl md:text-9xl font-heading text-accent mb-8 leading-tight">Crafting <span className="text-primary italic">Happiness</span></h1>
          <p className="max-w-2xl mx-auto text-accent opacity-60 text-lg md:text-xl font-medium italic leading-relaxed">
            "At Frostella, we believe every celebration deserves a centerpiece that tastes like a memory."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-[4rem] shadow-premium overflow-hidden border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Roshni Patra" 
                className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[3.5rem] shadow-2xl hidden md:block">
              <p className="font-heading text-3xl mb-1">Roshni Patra</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">Founder & Head Baker</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-heading text-accent">The Story of Frostella</h2>
              <p className="text-lg text-accent/60 leading-relaxed font-medium">
                Frostella was born out of a small kitchen in <span className="text-accent font-bold">Rudrapur, Domjur</span>, with a single mission: to create 100% eggless desserts that never compromise on texture or taste.
              </p>
              <p className="text-lg text-accent/60 leading-relaxed font-medium">
                What started as a passion project for Roshni Patra has grown into a boutique home-bakery known for its intricate custom cakes and signature cupcakes. Every order is handled with the personal touch that only an artisan home baker can provide.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Heart size={24} fill="currentColor" />
                </div>
                <h4 className="font-bold text-accent text-xl">100% Eggless</h4>
                <p className="text-sm text-accent/50 leading-relaxed">Inclusivity in Every Bite. Perfect for every tradition and lifestyle.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Star size={24} fill="currentColor" />
                </div>
                <h4 className="font-bold text-accent text-xl">Premium Only</h4>
                <p className="text-sm text-accent/50 leading-relaxed">No preservatives. Only high-grade cocoa, fresh cream, and real fruit.</p>
              </div>
            </div>

            <div className="pt-10 flex flex-wrap gap-8 items-center border-t border-primary/10">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-secondary flex items-center justify-center text-xs font-bold text-accent overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-accent font-bold text-lg">500+ Happy Moments</p>
                <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">Delivered across Howrah</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <section className="mt-40 bg-accent rounded-[4rem] p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <Sparkles className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-5xl md:text-7xl font-heading">Our Baking Philosophy</h2>
            <p className="text-xl md:text-2xl font-light opacity-70 leading-relaxed italic">
              "We don't just bake cakes; we create the centerpiece for your most cherished memories. From the first sketch to the final sprinkle, excellence is our only standard."
            </p>
            <Smile className="w-12 h-12 text-primary mx-auto opacity-30" />
          </div>
        </section>
      </div>
    </div>
  );
}
