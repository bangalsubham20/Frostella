import os

base_dir = r"C:\Subham\Frostella\frontend\src"

files = {
    "index.css": """@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #F48FB1;
  --secondary: #FFF3E0;
  --accent: #5D4037;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--secondary);
  color: var(--accent);
}

h1, h2, h3, h4, h5, h6, .font-heading {
  font-family: 'Playfair Display', serif;
}
""",
    "tailwind.config.js": """export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F48FB1',
        secondary: '#FFF3E0',
        accent: '#5D4037',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
""",
    "App.jsx": """import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
""",
    "main.jsx": """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
""",
    "components/Navbar.jsx": """import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading text-3xl font-bold italic tracking-wider">
              Frostella
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-accent transition-colors font-medium">Home</Link>
            <Link to="/menu" className="hover:text-accent transition-colors font-medium">Menu</Link>
            <Link to="/about" className="hover:text-accent transition-colors font-medium">About</Link>
            <Link to="/contact" className="hover:text-accent transition-colors font-medium">Contact</Link>
            <Link to="/cart" className="flex items-center hover:text-accent transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="ml-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-accent">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
""",
    "components/Footer.jsx": """import React from 'react';

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
""",
    "pages/Home.jsx": """import React from 'react';
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
""",
    "pages/Menu.jsx": """import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Menu() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Chocolate Truffle', price: 650, category: 'Cakes', image_url: '' },
    { id: 2, name: 'Vanilla Buttercream', price: 550, category: 'Cakes', image_url: '' },
    { id: 3, name: 'Red Velvet Cupcake', price: 80, category: 'Cupcakes', image_url: '' },
  ]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl font-heading text-center text-accent mb-12">Our Menu</h1>
      
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {['All', 'Cakes', 'Cupcakes', 'Custom Cakes'].map(cat => (
          <button key={cat} className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all">
            <div className="h-48 bg-secondary flex items-center justify-center">
              <span className="text-5xl">{product.category === 'Cupcakes' ? '🧁' : '🎂'}</span>
            </div>
            <div className="p-5 flex flex-col items-center">
              <h3 className="font-heading text-xl mb-2 text-center text-accent">{product.name}</h3>
              <p className="text-primary font-semibold mb-4">₹{product.price}</p>
              <button className="w-full py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
"""
}

# The tailwind config goes to the root of the frontend folder
for path, content in files.items():
    if path == "tailwind.config.js":
        full_path = r"C:\Subham\Frostella\frontend\tailwind.config.js"
    else:
        full_path = os.path.join(base_dir, path)
    
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Frontend scaffolding completed successfully.")
