import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';
import { ShoppingCart, Plus, Minus, ArrowLeft, Heart, Share2, Star, MessageSquare, Clock } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedSize, setSelectedSize] = useState('1 kg');
  const [activeTab, setActiveTab] = useState('description');
  
  const { isAuthenticated, userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const [{ data: productData }, { data: reviewsData }] = await Promise.all([
        api.get(`/products/${id}`),
        api.get(`/reviews/product/${id}`)
      ]);
      setProduct(productData);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to fetch product details', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    
    const formData = new FormData(e.target);
    const reviewData = {
      product: { id: parseInt(id) },
      user: { id: parseInt(userId) },
      rating: parseInt(formData.get('rating')),
      comment: formData.get('comment')
    };

    try {
      const { data } = await api.post('/reviews', reviewData);
      setReviews([data, ...reviews]);
      e.target.reset();
      alert('Review shared! Thank you.');
    } catch (err) {
      alert('Failed to submit review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mesh">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return <div className="py-24 text-center font-heading text-3xl">Product not found</div>;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/menu" className="inline-flex items-center gap-2 text-accent hover:text-primary font-bold text-sm tracking-widest uppercase mb-12 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-4 h-4" />
            Collection
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Visual Presentation */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="aspect-square bg-white rounded-[4rem] shadow-premium overflow-hidden border border-white p-6">
              <div className="w-full h-full rounded-[3rem] overflow-hidden group relative">
                <img 
                  src={product.imageUrl || '/images/chocolate_truffle.png'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Commercial Content */}
          <div className="flex flex-col">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold tracking-[.3em] uppercase">
                  {product.category}
                </span>
                <div className="flex items-center text-gold gap-1">
                  <Star size={14} fill="currentColor" />
                  <span className="text-accent font-bold text-sm">{averageRating}</span>
                  <span className="text-accent/30 text-xs font-medium ml-1">({reviews.length} reviews)</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-8xl font-heading text-accent mb-8 leading-none">{product.name}</h1>
              <p className="text-5xl font-bold text-primary mb-10 tracking-tighter">₹{product.price}</p>
              
              {/* Product Tabs */}
              <div className="flex gap-10 border-b border-primary/10 mb-8">
                {['description', 'reviews'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-accent' : 'text-accent/30 hover:text-accent/50'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'description' ? (
                  <motion.div key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                    <p className="text-accent/60 text-xl leading-relaxed font-medium italic">
                      "{product.description}"
                    </p>
                    
                    <div className="space-y-8">
                      {product.category !== 'Cupcakes' && (
                        <div>
                          <label className="block text-[10px] font-bold text-accent uppercase tracking-[.2em] mb-4">Quantity (Weight)</label>
                          <div className="flex flex-wrap gap-4">
                            {['0.5 kg', '1 kg', '1.5 kg', '2 kg'].map(size => (
                              <button 
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                                  selectedSize === size 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                                    : 'bg-white text-accent hover:bg-primary/5'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-bold text-accent uppercase tracking-[.2em] mb-4">Artisanal Message (Optional)</label>
                        <input 
                          type="text" 
                          maxLength="30"
                          placeholder="Note on the cake..."
                          value={customMessage}
                          onChange={e => setCustomMessage(e.target.value)}
                          className="w-full bg-white rounded-2xl p-4 border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium shadow-sm"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-6">
                        <div className="flex items-center gap-6 bg-white p-2 rounded-2xl shadow-sm border border-primary/5 px-4 h-16">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-xl flex items-center justify-center text-accent hover:bg-primary/10 transition-all">
                            <Minus size={18} />
                          </button>
                          <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-xl flex items-center justify-center text-accent hover:bg-primary/10 transition-all">
                            <Plus size={18} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={handleAddToCart}
                          className="flex-1 min-w-[200px] h-16 flex items-center justify-center gap-4 bg-accent text-white rounded-2xl font-bold text-lg hover:bg-primary transition-all shadow-xl active:scale-95 group"
                        >
                          <ShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
                          Reserve This Cake
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="rev" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                    {/* Add Review Form */}
                    <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-sm">
                      <h4 className="font-heading text-lg mb-4">Share your Experience</h4>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div className="flex gap-4">
                          <select name="rating" required className="bg-secondary/50 p-3 rounded-xl border-none text-sm font-bold appearance-none cursor-pointer">
                            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                            <option value="4">⭐⭐⭐⭐ Great</option>
                            <option value="3">⭐⭐⭐ Good</option>
                            <option value="2">⭐⭐ Fair</option>
                            <option value="1">⭐ Poor</option>
                          </select>
                        </div>
                        <textarea name="comment" required placeholder="Tell us how it tasted..." className="w-full bg-secondary/30 p-4 rounded-xl border-none text-sm font-medium focus:ring-2 focus:ring-primary" rows="2"></textarea>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all">
                          Post Review
                        </button>
                      </form>
                    </div>

                    {/* Review List */}
                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {reviews.length === 0 ? (
                        <p className="text-center py-10 text-accent/30 font-medium uppercase tracking-widest text-xs">No feedback yet. Be the first!</p>
                      ) : (
                        reviews.map(review => (
                          <div key={review.id} className="p-6 bg-white rounded-3xl border border-primary/5">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                  {review.user?.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-sm">{review.user?.name}</p>
                                  <div className="flex text-gold">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                  </div>
                                </div>
                              </div>
                              <span className="text-[10px] font-bold text-accent/30 uppercase tracking-tighter">Verified Taste</span>
                            </div>
                            <p className="text-sm text-accent/60 leading-relaxed font-medium italic">"{review.comment}"</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
