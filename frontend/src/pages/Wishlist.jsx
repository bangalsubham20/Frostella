import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  Sparkles,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';

export default function Wishlist() {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-primary" size={20} />
            <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">Private Curation</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-heading text-accent leading-none">Your <span className="text-primary italic">Aspirations</span></h1>
          <p className="text-xl text-accent/40 font-medium italic mt-6 max-w-xl mx-auto leading-relaxed">
            "A curated collection of artisanal creations reserved for your most significant moments."
          </p>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 backdrop-blur-2xl rounded-[4rem] p-20 text-center shadow-premium border border-white max-w-3xl mx-auto"
          >
            <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-primary/30">
               <Heart size={48} />
            </div>
            <h2 className="text-4xl font-heading text-accent mb-6">The gallery is currently silent.</h2>
            <p className="text-accent/50 font-medium italic mb-12 max-w-sm mx-auto leading-relaxed">
               Discover our latest artisanal batches and save your favorites to your private vault.
            </p>
            <Link to="/menu" className="inline-flex items-center gap-4 bg-accent text-white px-12 py-5 rounded-full font-bold text-sm hover:bg-primary transition-all shadow-xl group">
               Explore the Boutique
               <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence>
              {wishlistItems.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-[3.5rem] p-8 shadow-premium hover:shadow-hover border border-white transition-all group-hover:-translate-y-2">
                    {/* Image Area */}
                    <Link to={`/product/${item.id}`} className="block aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 relative">
                       <img 
                         src={item.imageUrl} 
                         alt={item.name} 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                       <button 
                         onClick={(e) => {
                           e.preventDefault();
                           dispatch(removeFromWishlist(item.id));
                         }}
                         className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-red-500 shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                       >
                         <Trash2 size={18} />
                       </button>
                    </Link>

                    {/* Metadata */}
                    <div className="flex justify-between items-start mb-6">
                       <div className="space-y-1">
                          <h3 className="font-heading text-2xl text-accent group-hover:text-primary transition-colors">{item.name}</h3>
                          <span className="text-[10px] font-bold text-accent/30 uppercase tracking-widest">{item.category}</span>
                       </div>
                       <p className="text-2xl font-bold text-primary tracking-tighter">₹{item.price}</p>
                    </div>

                    {/* Action Area */}
                    <div className="flex gap-4">
                       <button 
                         onClick={() => handleMoveToCart(item)}
                         className="flex-grow bg-accent text-white h-16 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-accent/10 group/btn"
                       >
                          <ShoppingCart size={16} className="group-hover/btn:animate-bounce" />
                          Reserve to Cart
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Curation Footer */}
        {wishlistItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 pt-16 border-t border-accent/5 text-center"
          >
             <p className="text-[10px] font-bold text-accent/30 uppercase tracking-[.4em] mb-10 italic">
                All curated items are subject to availability and artisanal scheduling.
             </p>
             <Link to="/menu" className="text-primary font-bold text-xs uppercase tracking-widest hover:underline flex items-center justify-center gap-2 group">
                Continue Curating
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
