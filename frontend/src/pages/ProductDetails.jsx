import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';
import { ShoppingCart, Plus, Minus, ArrowLeft, Heart, Share2 } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedSize, setSelectedSize] = useState('1 kg');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        setProduct({
          id: parseInt(id),
          name: id == '3' ? 'Red Velvet Cupcake' : 'Signature Cake',
          price: id == '3' ? 80 : 650,
          category: id == '3' ? 'Cupcakes' : 'Cakes',
          description: 'A deeply rich and moist 100% eggless treat crafted to make your moments perfect. Baked with premium quality ingredients and no preservatives.',
          imageUrl: id == '1' ? '/images/chocolate_truffle.png' : id == '2' ? '/images/pineapple_cake.png' : id == '3' ? '/images/cupcakes.png' : '/images/red_velvet.png'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      ...product, 
      quantity, 
      customMessage, 
      size: product.category === 'Cakes' ? selectedSize : null,
      price: product.price * (selectedSize === '1.5 kg' ? 1.5 : selectedSize === '2 kg' ? 2 : 1)
    }));
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return <div className="py-24 text-center font-heading text-3xl">Product not found</div>;

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/menu" className="inline-flex items-center gap-2 text-accent hover:text-primary font-bold text-sm tracking-widest uppercase mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-[3rem] shadow-premium overflow-hidden border border-white p-4">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden group">
                <img 
                  src={product.imageUrl || '/images/chocolate_truffle.png'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                />
              </div>
            </div>
            
            <div className="absolute top-10 right-10 flex flex-col gap-4">
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
          
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 inline-block">
              {product.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-heading text-accent mb-6">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-8 border-b border-primary/10 pb-8">
              <p className="text-5xl font-bold text-primary">₹{product.price}</p>
              <div className="flex items-center text-gold gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <span className="text-accent text-sm font-medium ml-2 opacity-40">(48 Reviews)</span>
              </div>
            </div>

            <p className="text-accent/60 text-lg leading-relaxed mb-10 font-medium italic">
              "{product.description}"
            </p>
            
            <div className="space-y-10">
              {product.category !== 'Cupcakes' && (
                <div>
                  <label className="block text-xs font-bold text-accent uppercase tracking-widest mb-4">Select Size</label>
                  <div className="flex flex-wrap gap-4">
                    {['0.5 kg', '1 kg', '1.5 kg', '2 kg'].map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                          selectedSize === size 
                            ? 'bg-primary text-white shadow-lg' 
                            : 'bg-white text-accent hover:bg-primary/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="group">
                <label className="block text-xs font-bold text-accent uppercase tracking-widest mb-4">Personal Message</label>
                <input 
                  type="text" 
                  maxLength="30"
                  placeholder="e.g. Happy Birthday Roshni!"
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  className="w-full bg-white rounded-2xl p-4 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium shadow-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-6">
                <div className="flex items-center gap-6 bg-white p-2 rounded-full shadow-sm border border-primary/5 px-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-4 bg-accent text-white py-5 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-2xl group"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Reserve Order
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Star({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}
