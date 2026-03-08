import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import api from '../services/api';
import { ShoppingCart, Eye, Heart, Sparkles, Search, Filter, X } from 'lucide-react';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="text-primary w-5 h-5 animate-pulse" />
            <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">The Artisanal Collection</span>
            <Sparkles className="text-primary w-5 h-5 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-[9rem] font-heading text-accent mb-10 leading-none">Curated <span className="text-primary italic">Treats.</span></h1>
          <p className="max-w-xl mx-auto text-accent opacity-40 text-lg md:text-xl font-medium italic leading-relaxed">
            "A symphony of 100% eggless creations, meticulously handcrafted for your celebration."
          </p>
        </motion.div>
        
        {/* Navigation & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20 bg-white/40 backdrop-blur-3xl p-6 rounded-[3rem] shadow-premium border border-white">
          <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
            {['All', 'Cakes', 'Cupcakes', 'Custom Cakes'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3.5 rounded-2xl text-[10px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-accent text-white shadow-xl shadow-accent/20' 
                    : 'bg-white/50 text-accent/40 hover:text-accent hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform" size={18} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flavor or category..."
              className="w-full pl-14 pr-14 py-4 bg-white/80 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium italic text-accent shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-accent/20 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
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
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <div className="bg-white rounded-[3rem] overflow-hidden shadow-premium hover:shadow-hover transition-all duration-700 h-full flex flex-col border border-white/50 group-hover:-translate-y-2">
                  <div className="h-[22rem] relative overflow-hidden m-4 rounded-[2.5rem]">
                    <img 
                      src={product.imageUrl || '/placeholder.png'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" 
                    />
                    
                    {/* Floating Premium Controls */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <button 
                        onClick={() => dispatch(toggleWishlist(product))}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-xl transition-all ${
                          isInWishlist(product.id) ? 'bg-primary text-white' : 'bg-white/90 text-accent hover:bg-primary hover:text-white'
                        }`}
                      >
                        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={isInWishlist(product.id) ? 0 : 2} />
                      </button>
                      <Link 
                        to={`/product/${product.id}`}
                        className="w-12 h-12 bg-white/90 text-accent rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-xl hover:bg-accent hover:text-white transition-all"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                       <button 
                        onClick={() => {
                          dispatch(addToCart({ ...product, quantity: 1 }));
                          // You could add a toast here instead of alert
                        }}
                        className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-2xl"
                      >
                        <ShoppingCart size={16} className="animate-bounce" />
                        Quick Reserve
                      </button>
                    </div>
                  </div>

                  <div className="px-8 pb-10 pt-2 text-center flex-grow flex flex-col items-center justify-center space-y-4">
                    <div className="space-y-1">
                       <span className="text-[9px] font-bold text-primary tracking-[.4em] uppercase opacity-40">{product.category}</span>
                       <h3 className="font-heading text-3xl text-accent group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-8 h-px bg-accent/5"></div>
                       <p className="text-accent font-bold text-2xl tracking-tighter">₹{product.price}</p>
                       <div className="w-8 h-px bg-accent/5"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="text-center py-48 bg-white/30 backdrop-blur-md rounded-[4rem] border border-white max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-primary/20">
               <Search size={40} />
            </div>
            <h2 className="text-4xl font-heading text-accent mb-6">No matches found in our boutique.</h2>
            <p className="text-accent/30 font-medium italic leading-relaxed px-10">
               "Perhaps a custom creation is what you seek? Adjust your search or consult our head baker for a personalized design."
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-12 text-[10px] font-bold text-primary uppercase tracking-[.3em] hover:underline"
            >
               Reset Boutique Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
