import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import api from '../services/api';
import { ShoppingCart, Eye, Heart, Sparkles } from 'lucide-react';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.log('Using fallback items:', error.message);
      // Fallback items if backend is offline
      setProducts([
        { id: 1, name: 'Chocolate Truffle', price: 650, category: 'Cakes', imageUrl: '/images/chocolate_truffle.png' },
        { id: 2, name: 'Pineapple Delight', price: 550, category: 'Cakes', imageUrl: '/images/pineapple_cake.png' },
        { id: 3, name: 'Red Velvet Cupcake', price: 80, category: 'Cupcakes', imageUrl: '/images/cupcakes.png' },
        { id: 4, name: 'Custom Anniversary', price: 1200, category: 'Custom Cakes', imageUrl: '/images/red_velvet.png' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-screen py-32 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-primary w-5 h-5" />
            <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">Artisanal Bakery</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-heading text-accent mb-8">The Collection</h1>
          <p className="max-w-2xl mx-auto text-accent opacity-60 text-lg md:text-xl font-medium italic">
            "Baked fresh in Rudrapur, every cake tells a story of love and premium craftsmanship."
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-24 flex-wrap">
          {['All', 'Cakes', 'Cupcakes', 'Custom Cakes'].map((cat, idx) => (
            <motion.button 
              key={cat} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 border-2 ${
                activeCategory === cat 
                  ? 'bg-primary border-primary text-white shadow-xl shadow-primary/30 translate-y-[-4px]' 
                  : 'bg-white border-transparent text-accent hover:border-primary/20'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-premium hover:shadow-hover transition-all duration-700 h-full flex flex-col border border-white/50">
                  <div className="h-80 relative overflow-hidden">
                    <img 
                      src={product.imageUrl || '/placeholder.png'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                    />
                    
                    {/* Floating Controls */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                      <button 
                        onClick={() => dispatch(toggleWishlist(product))}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${
                          isInWishlist(product.id) ? 'bg-primary text-white' : 'bg-white/80 text-accent hover:bg-primary hover:text-white'
                        }`}
                      >
                        <Heart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                      </button>
                      <Link 
                        to={`/product/${product.id}`}
                        className="w-12 h-12 bg-white/80 text-accent rounded-full flex items-center justify-center shadow-lg backdrop-blur-md hover:bg-accent hover:text-white transition-all"
                      >
                        <Eye size={20} />
                      </Link>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                       <button 
                        onClick={() => {
                          dispatch(addToCart(product));
                          alert('Added to cart!');
                        }}
                        className="w-full bg-white text-accent py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all shadow-xl"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-10 text-center flex-grow flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-primary/40 uppercase tracking-[.3em] mb-2">{product.category}</span>
                    <h3 className="font-heading text-3xl mb-3 text-accent group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-primary font-bold text-2xl tracking-tighter">₹{product.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40">
            <h2 className="text-3xl font-heading text-accent opacity-20 italic">"No treats found here, let's try another category!"</h2>
          </motion.div>
        )}
      </div>
    </div>
  );
}
