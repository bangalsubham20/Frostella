import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: "url('/images/hero_bg.png')" }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-heading text-accent mb-6 leading-tight drop-shadow-sm">
            Delicious 100% <span className="text-primary italic">Eggless Cakes</span>
          </h1>
          <p className="text-xl md:text-2xl text-accent mb-10 font-medium max-w-2xl mx-auto">
            Gourmet treats freshly baked in Domjur. Specializing in custom cakes and sweet moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/menu" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-2xl">
              Order Now
            </Link>
            <Link to="/menu" className="bg-white bg-opacity-80 border-2 border-accent text-accent px-10 py-4 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all shadow-xl">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Chef's Special</span>
            <h2 className="text-5xl font-heading text-accent mt-2">Signature Creations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { id: 1, name: 'Chocolate Truffle', price: '650', img: '/images/chocolate_truffle.png' },
              { id: 4, name: 'Custom Red Velvet', price: '1200', img: '/images/red_velvet.png' },
              { id: 2, name: 'Pineapple Delight', price: '550', img: '/images/pineapple_cake.png' }
            ].map(cake => (
              <Link to={`/product/${cake.id}`} key={cake.id} className="group rounded-3xl overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-500 bg-secondary bg-opacity-20 border border-secondary border-opacity-50">
                <div className="h-80 relative overflow-hidden">
                  <img src={cake.img} alt={cake.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-accent bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-8 text-center bg-white">
                  <h3 className="text-2xl font-heading mb-2 text-accent">{cake.name}</h3>
                  <p className="text-primary font-bold text-xl">₹{cake.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
