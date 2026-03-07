import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';
import { ShoppingCart, Eye } from 'lucide-react';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.log('Using mock data, failed to fetch:', error.message);
        setProducts([
          { id: 1, name: 'Chocolate Truffle', price: 650, category: 'Cakes', imageUrl: '/images/chocolate_truffle.png' },
          { id: 2, name: 'Vanilla Buttercream', price: 550, category: 'Cakes', imageUrl: '/images/pineapple_cake.png' },
          { id: 3, name: 'Red Velvet Cupcake', price: 80, category: 'Cupcakes', imageUrl: '/images/cupcakes.png' },
          { id: 4, name: 'Custom Anniversary Cake', price: 1200, category: 'Custom Cakes', imageUrl: '/images/red_velvet.png' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-heading text-accent mb-6">The Collection</h1>
          <p className="max-w-2xl mx-auto text-accent opacity-60 text-lg">
            Every creation is handcrafted with the finest ingredients and a pinch of magic.
          </p>
        </motion.div>
        
        <div className="flex justify-center gap-4 mb-20 flex-wrap">
          {['All', 'Cakes', 'Cupcakes', 'Custom Cakes'].map((cat, idx) => (
            <motion.button 
              key={cat} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                  : 'bg-white text-accent hover:bg-primary/5 hover:scale-105'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-premium hover:shadow-hover transition-all duration-500 group flex flex-col h-full"
              >
                <div className="h-64 bg-secondary relative overflow-hidden">
                  <img 
                    src={product.imageUrl || '/images/chocolate_truffle.png'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-white text-primary rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                    <Link 
                      to={`/product/${product.id}`}
                      className="p-3 bg-white text-accent rounded-full hover:bg-accent hover:text-white transition-all transform hover:scale-110"
                    >
                      <Eye className="w-6 h-6" />
                    </Link>
                  </div>
                </div>
                <div className="p-8 text-center flex-grow flex flex-col justify-center">
                  <h3 className="font-heading text-2xl mb-3 text-accent group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-primary font-bold text-xl">₹{product.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-heading text-accent opacity-40">No treats found in this category... yet!</h2>
          </div>
        )}
      </div>
    </div>
  );
}
