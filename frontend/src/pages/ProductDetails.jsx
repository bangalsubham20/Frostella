import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';
import { ShoppingCart, Plus, Minus, ArrowLeft, Heart, Share2, Star, MessageSquare, Clock, Sparkles } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
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
    setLoading(true);
    try {
      const [{ data: productData }, { data: reviewsData }, { data: allProducts }] = await Promise.all([
        api.get(`/products/${id}`),
        api.get(`/reviews/product/${id}`),
        api.get('/products')
      ]);
      setProduct(productData);
      setReviews(reviewsData);
      // Simple logic for related products: same category, excluding current product
      setRelatedProducts(allProducts.filter(p => p.category === productData.category && p.id !== parseInt(id)).slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch product details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const sizeMultiplier = selectedSize === '0.5 kg' ? 1 : selectedSize === '1 kg' ? 1.8 : selectedSize === '1.5 kg' ? 2.6 : 3.4;
    const finalPrice = product.category === 'Cakes' ? (product.price * sizeMultiplier) : product.price;

    dispatch(addToCart({ 
      ...product, 
      quantity, 
      customMessage, 
      size: product.category === 'Cakes' ? selectedSize : null,
      price: finalPrice
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

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mesh p-10">
       <h1 className="text-8xl font-heading text-primary/10 mb-8">404</h1>
       <p className="text-2xl font-heading text-accent mb-10">The Artisanal Selection was not found.</p>
       <Link to="/menu" className="bg-accent text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-primary transition-all">Back to Menu</Link>
    </div>
  );

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/menu" className="inline-flex items-center gap-2 text-accent/40 hover:text-primary font-bold text-[10px] tracking-[.3em] uppercase mb-16 transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Collection Index
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24 xl:gap-32">
          {/* Visual Presentation */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative order-1">
            <div className="aspect-square bg-white rounded-[2.5rem] sm:rounded-[4rem] shadow-premium overflow-hidden border-2 border-white p-4 sm:p-8 group">
              <div className="w-full h-full rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden relative shadow-inner">
                <img 
                  src={product.imageUrl || '/images/chocolate_truffle.png'} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[6s] ease-out" 
                />
                <div className="absolute top-6 left-6 sm:top-10 sm:left-10"><Sparkles className="text-white/50 animate-pulse size-5 sm:size-6" /></div>
              </div>
            </div>
            
            {/* Float Badge */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-accent p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl text-white z-20 hidden md:block"
            >
               <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Gourmet Rating</p>
               <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-3xl sm:text-4xl font-heading italic">{averageRating}</span>
                  <div className="flex gap-0.5 text-primary">
                    <Star size={14} sm:size={16} fill="currentColor" />
                  </div>
               </div>
            </motion.div>
          </motion.div>
          
          {/* Commercial Content */}
          <div className="flex flex-col justify-center order-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 mt-6 lg:mt-0">
                <span className="px-5 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-[8px] sm:text-[10px] font-bold tracking-[.3em] sm:tracking-[.4em] uppercase">
                   Artisan {product.category}
                </span>
                <span className="text-accent/30 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">{reviews.length} Experiences Shared</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading text-accent mb-6 sm:mb-10 leading-[0.9] sm:leading-none tracking-tight">{product.name}</h1>
              <div className="flex items-baseline gap-4 mb-8 sm:mb-12">
                 <span className="text-4xl sm:text-6xl font-bold text-primary tracking-tighter">₹{product.price}</span>
                 <span className="text-accent/30 text-[8px] sm:text-[10px] font-bold uppercase tracking-[.2em]">Starting Base Price</span>
              </div>
              
              {/* Product Tabs */}
              <div className="flex gap-8 sm:gap-12 border-b border-accent/5 mb-8 sm:mb-10 overflow-x-auto whitespace-nowrap scrollbar-none">
                {['description', 'reviews'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-5 text-[10px] font-bold uppercase tracking-[.3em] transition-all relative ${
                      activeTab === tab ? 'text-accent' : 'text-accent/20 hover:text-accent/40'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab-underline-product" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'description' ? (
                  <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
                    <p className="text-accent/60 text-2xl leading-relaxed font-medium italic">
                      "{product.description}"
                    </p>
                    
                    <div className="space-y-10">
                      {product.category === 'Cakes' && (
                        <div className="space-y-6">
                          <div className="flex items-end justify-between px-1">
                             <label className="text-[10px] font-bold text-accent uppercase tracking-[.4em]">Selection Weight</label>
                             <span className="text-[10px] font-bold text-primary uppercase italic">Premium Sizing</span>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            {['0.5 kg', '1 kg', '1.5 kg', '2 kg'].map(size => (
                              <button 
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all ${
                                  selectedSize === size 
                                    ? 'bg-accent text-white shadow-xl shadow-accent/20 translate-y-[-2px] ring-4 ring-accent/5' 
                                    : 'bg-white text-accent/40 hover:text-accent hover:bg-white/80 border border-accent/5 shadow-sm'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-6">
                        <label className="block text-[10px] font-bold text-accent uppercase tracking-[.4em] mb-4 ml-1">Custom Calligraphy</label>
                        <input 
                          type="text" 
                          maxLength="30"
                          placeholder="Note for the baker..."
                          value={customMessage}
                          onChange={e => setCustomMessage(e.target.value)}
                          className="w-full bg-white/80 backdrop-blur-sm rounded-[1.5rem] p-5 border-2 border-transparent focus:border-primary/20 focus:ring-8 focus:ring-primary/5 outline-none transition-all font-medium text-accent shadow-sm"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-8 pt-6">
                        <div className="flex items-center gap-8 bg-white/50 backdrop-blur-md p-3 rounded-[1.5rem] shadow-sm border border-accent/5 px-6">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-xl flex items-center justify-center text-accent/30 hover:text-primary transition-all">
                             <Minus size={20} />
                          </button>
                          <span className="text-2xl font-bold w-10 text-center text-accent">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-xl flex items-center justify-center text-accent/30 hover:text-primary transition-all">
                             <Plus size={20} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={handleAddToCart}
                          className="flex-1 min-w-[280px] h-20 flex items-center justify-center gap-5 bg-accent text-white rounded-[1.5rem] font-bold text-xl hover:bg-primary transition-all shadow-2xl shadow-accent/20 active:scale-[0.98] group"
                        >
                          <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          Reserve This Creation
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="rev" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10">
                    <div className="bg-white/50 backdrop-blur-xl p-10 rounded-[3rem] border border-accent/5 shadow-premium">
                      <h4 className="text-xl font-heading mb-6 text-accent">Gourmet Feedback</h4>
                      <form onSubmit={handleReviewSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <select name="rating" required className="bg-white p-5 rounded-2xl border-none text-[10px] font-bold uppercase tracking-widest shadow-sm appearance-none cursor-pointer">
                              <option value="5">Excellent Experience</option>
                              <option value="4">Great Product</option>
                              <option value="3">Satisfactory</option>
                              <option value="2">Fair</option>
                              <option value="1">Could Improve</option>
                           </select>
                        </div>
                        <textarea name="comment" required placeholder="Describe your artisanal experience..." className="w-full bg-white p-5 rounded-[2rem] border-none text-sm font-medium focus:ring-8 focus:ring-primary/5 shadow-sm resize-none" rows="3"></textarea>
                        <button type="submit" className="w-full bg-accent text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[.3em] shadow-xl hover:bg-primary transition-all">
                           Commit Evaluation
                        </button>
                      </form>
                    </div>

                    <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                      {reviews.length === 0 ? (
                        <div className="py-20 text-center">
                           <MessageSquare className="w-12 h-12 text-accent/10 mx-auto mb-4" />
                           <p className="text-accent/30 font-bold uppercase tracking-[.4em] text-[10px]">No intelligence gathered yet.</p>
                        </div>
                      ) : (
                        reviews.map(review => (
                          <div key={review.id} className="p-8 bg-white/80 rounded-[2.5rem] border border-accent/5 shadow-sm group">
                            <div className="flex justify-between items-start mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-[1rem] bg-secondary/50 flex items-center justify-center font-heading text-xl text-accent">
                                  {review.user?.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-accent text-sm">{review.user?.name}</p>
                                  <div className="flex text-primary">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                  </div>
                                </div>
                              </div>
                              <div className="px-3 py-1 bg-green-50 rounded-full border border-green-100 italic text-green-600 text-[8px] font-bold uppercase tracking-widest">Verified Taste</div>
                            </div>
                            <p className="text-sm font-medium italic text-accent/60 leading-relaxed">"{review.comment}"</p>
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

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-40 border-t border-accent/5 pt-32">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                   <span className="text-primary font-bold tracking-[.4em] uppercase text-[10px]">Curation</span>
                   <h2 className="text-5xl font-heading text-accent mt-4">Related <span className="text-primary italic">Creations</span></h2>
                </div>
                <Link to="/menu" className="text-[10px] font-bold text-accent/40 uppercase tracking-[.3em] hover:text-primary transition-colors mb-2">View Boutique Index</Link>
             </div>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group">
                    <div className="bg-white p-6 rounded-[3rem] shadow-premium hover:shadow-hover transition-all group-hover:-translate-y-2 border border-white">
                       <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
                          <img src={p.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       </div>
                       <h4 className="font-heading text-xl text-accent group-hover:text-primary transition-colors">{p.name}</h4>
                       <p className="text-primary font-bold mt-2">₹{p.price}</p>
                    </div>
                  </Link>
                ))}
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
