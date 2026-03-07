import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex flex-wrap gap-4 justify-center items-center pointer-events-none">
          {/* Subtle background pattern could go here */}
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading text-accent mb-6 leading-tight">
            Delicious 100% <span className="text-primary italic">Eggless Cakes</span> made with love.
          </h1>
          <p className="text-lg md:text-xl text-accent mb-10 opacity-90 max-w-2xl mx-auto">
            Freshly baked in Rudrapur, Domjur. Specializing in custom cakes, cupcakes, and daily treats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-lg">
              Order Now
            </Link>
            <Link to="/menu" className="bg-transparent border-2 border-accent text-accent px-8 py-3 rounded-full font-medium hover:bg-accent hover:text-white transition-all">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-heading text-center text-accent mb-16">Featured Creations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="h-64 bg-secondary relative overflow-hidden flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <span className="text-4xl">🎂</span>
                  </div>
                </div>
                <div className="p-6 bg-secondary bg-opacity-30 text-center">
                  <h3 className="text-xl font-heading mb-2 text-accent">Signature Cake {i}</h3>
                  <p className="text-primary font-medium">₹599</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
