import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Heart, 
  Clock, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Quote
} from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await api.get('/products');
      // Just pick first 3 as featured for a clean look
      setFeaturedProducts(data.slice(0, 3));
    } catch (err) {
      console.error(err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-mesh min-h-screen overflow-x-hidden">
      {/* Hero: The Boutique Opening */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('/images/hero_bg.png')", y: y1 }}
        >
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex justify-center items-center gap-3 mb-6 sm:mb-10">
               <div className="w-8 sm:w-12 h-px bg-primary/30"></div>
               <span className="text-primary font-bold tracking-[.3em] sm:tracking-[.4em] uppercase text-[8px] sm:text-[10px]">Established in Rudrapur</span>
               <div className="w-8 sm:w-12 h-px bg-primary/30"></div>
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading text-accent mb-8 sm:mb-12 leading-[0.9] sm:leading-[0.85] tracking-tighter">
              Artisanal <br/> <span className="text-primary italic">Precision.</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-accent/60 mb-10 sm:mb-16 font-medium italic max-w-2xl mx-auto leading-relaxed px-4">
              "Every creation is a dialogue between the finest ingredients and the artistic soul."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center">
              <Link to="/menu" className="w-full sm:w-auto group relative bg-accent text-white px-10 sm:px-14 py-4 sm:py-6 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-2xl overflow-hidden">
                <span className="relative z-10">Explore the Collections</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </Link>
              <Link to="/about" className="text-accent font-bold text-xs sm:text-sm uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3 group">
                The Founder's Story
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-accent/20"
        >
           <div className="w-[1px] h-12 sm:h-20 bg-gradient-to-b from-accent/20 to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* Philosophy: The Core Pillars */}
      <section className="py-20 sm:py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 sm:gap-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-premium flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:-rotate-12">
               <ShieldCheck size={28} sm:size={32} strokeWidth={1} />
            </div>
            <h3 className="text-xl sm:text-2xl font-heading mb-4 sm:mb-6 text-accent">Purity First</h3>
            <p className="text-accent/40 font-medium leading-relaxed italic text-sm sm:text-base">"We exclusively use 100% eggless formulations, ensuring that every masterpiece is as inclusive as it is exquisite."</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-premium flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
               <Sparkles size={28} sm:size={32} strokeWidth={1} />
            </div>
            <h3 className="text-xl sm:text-2xl font-heading mb-4 sm:mb-6 text-accent">Artisanal Craft</h3>
            <p className="text-accent/40 font-medium leading-relaxed italic text-sm sm:text-base">"Our boutique kitchen focuses on small batches, where human touch precedes automated precision in every bake."</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-premium flex items-center justify-center mx-auto mb-8 sm:mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-12">
               <Zap size={28} sm:size={32} strokeWidth={1} />
            </div>
            <h3 className="text-xl sm:text-2xl font-heading mb-4 sm:mb-6 text-accent">Fresh Rhythm</h3>
            <p className="text-accent/40 font-medium leading-relaxed italic text-sm sm:text-base">"Our ovens synchronize with your schedule. Every delivery is a result of a sunrise-start in our Domjur atelier."</p>
          </motion.div>
        </div>
      </section>

      {/* Signature: The Gallery */}
      <section className="py-20 sm:py-40 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full scale-150"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
               <span className="text-primary font-bold tracking-[.3em] sm:tracking-[.4em] uppercase text-[8px] sm:text-[10px]">The Showcase</span>
               <h2 className="text-5xl sm:text-6xl md:text-8xl font-heading text-white leading-none">Signature <br/> <span className="text-primary italic">Curations.</span></h2>
            </div>
            <Link to="/menu" className="text-white/40 font-bold text-[8px] sm:text-[10px] uppercase tracking-[.2em] sm:tracking-[.3em] hover:text-primary transition-colors mb-2 flex items-center gap-2">
               View All Masterpieces <ArrowRight size={14} />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16"
          >
            {(featuredProducts.length > 0 ? featuredProducts : [
              { id: 1, name: 'Chocolate Truffle', price: '650', imageUrl: '/images/chocolate_truffle.png', category: 'Cakes' },
              { id: 4, name: 'Red Velvet Lux', price: '1200', imageUrl: '/images/red_velvet.png', category: 'Luxury' },
              { id: 2, name: 'Pineapple Fine', price: '550', imageUrl: '/images/pineapple_cake.png', category: 'Seasonal' }
            ]).map((cake, idx) => (
              <motion.div key={cake.id} variants={itemVariants} className="group">
                <Link to={`/product/${cake.id}`} className="block">
                  <div className="relative aspect-[4/5] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-white mb-6 sm:mb-10">
                     <img src={cake.imageUrl} alt={cake.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                     <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 font-bold p-6 sm:p-10 flex flex-col justify-end">
                        <p className="text-white/40 text-[8px] sm:text-[10px] uppercase tracking-[.3em] mb-2">{cake.category}</p>
                        <p className="text-white text-2xl sm:text-3xl font-heading">Explore Creation</p>
                     </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2 text-center">
                     <h3 className="text-2xl sm:text-3xl font-heading text-white group-hover:text-primary transition-colors">{cake.name}</h3>
                     <p className="text-primary font-bold text-lg sm:text-xl tracking-tighter">₹{cake.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Highlight: The Visionary */}
      <section className="py-20 sm:py-40 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-32 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
               <div className="aspect-[3/4] rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden shadow-premium relative z-10">
                  <img src="https://images.unsplash.com/photo-1556214061-689379684f88?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Founder" />
               </div>
               <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-24 h-24 sm:w-40 sm:h-40 bg-primary/20 rounded-full blur-2xl sm:blur-3xl"></div>
               <div className="absolute top-1/2 right-0 translate-x-1/2 bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] shadow-premium border border-accent/5 z-20 hidden md:block">
                  <p className="text-primary font-bold text-2xl sm:text-4xl font-heading italic">"Baked with <br/> Intuition."</p>
                  <p className="text-[8px] sm:text-[10px] font-bold text-accent/30 uppercase tracking-widest mt-2 sm:mt-4">Roshni Patra, Sculptress of Cakes</p>
               </div>
            </motion.div>
            <div className="space-y-8 sm:space-y-12">
               <span className="text-primary font-bold tracking-[.3em] sm:tracking-[.4em] uppercase text-[8px] sm:text-[10px]">The Atelier's Soul</span>
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-accent leading-none">Where Art <br/> Meets <span className="text-primary italic">Flavour.</span></h2>
               <p className="text-lg sm:text-xl text-accent/60 font-medium italic leading-relaxed">
                  "Frostella began as a quiet meditation in my home kitchen. Today, it stands as a testament to the belief that gourmet desserts should be accessible, eggless, and unapologetically artistic."
               </p>
               <div className="grid grid-cols-2 gap-6 sm:gap-10 border-t border-accent/5 pt-8 sm:pt-12">
                  <div>
                    <p className="text-3xl sm:text-4xl font-heading text-accent italic">100%</p>
                    <p className="text-[8px] sm:text-[10px] font-bold text-accent/30 uppercase tracking-widest mt-1">Eggless Commitment</p>
                  </div>
                  <div>
                    <p className="text-3xl sm:text-4xl font-heading text-accent italic">1K+</p>
                    <p className="text-[8px] sm:text-[10px] font-bold text-accent/30 uppercase tracking-widest mt-1">Satisfied Palates</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Intelligence: Testimonials */}
      <section className="py-20 sm:py-40 bg-white/30 backdrop-blur-xl">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 sm:mb-24 space-y-3 sm:space-y-4">
               <span className="text-primary font-bold tracking-[.3em] sm:tracking-[.4em] uppercase text-[8px] sm:text-[10px]">The Ledger</span>
               <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-accent">Customer <br/><span className="text-primary italic">Intelligence.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
               {[
                 { name: "Ananya Sharma", text: "The Chocolate Truffle was a revelation. I've never had an eggless cake with such depth of texture.", rating: 5 },
                 { name: "Vikram Chatterjee", text: "Ordered a custom cake for our 10th anniversary. It was less of a cake and more of a sculpture.", rating: 5 },
                 { name: "Sayan Mandal", text: "Finally, a premium bakery in Domjur that understands artisanal quality. Simply unmatched.", rating: 5 }
               ].map((review, i) => (
                 <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-premium border border-white flex flex-col justify-between group">
                    <div>
                       <Quote className="text-primary/20 mb-6 sm:mb-8 group-hover:text-primary transition-colors" size={32} sm:size={40} />
                       <p className="text-base sm:text-lg text-accent/70 font-medium italic leading-relaxed mb-8 sm:mb-10">"{review.text}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/50 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-accent italic">{review.name.charAt(0)}</div>
                       <div>
                          <p className="font-heading text-lg sm:text-xl text-accent">{review.name}</p>
                          <div className="flex text-primary gap-0.5 mt-1">
                             {[...Array(review.rating)].map((_, i) => <Star key={i} size={8} sm:size={10} fill="currentColor" />)}
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Reservation: CTA */}
      <section className="py-20 sm:py-40 px-6">
         <div className="max-w-7xl mx-auto rounded-[3rem] sm:rounded-[5rem] bg-accent p-12 sm:p-20 md:p-32 text-center relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] group-hover:bg-primary/20 transition-all duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]"></div>
            
            <div className="relative z-10 space-y-8 sm:space-y-12">
               <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-heading text-white leading-none tracking-tighter">Your Custom <br/> <span className="text-primary italic">Reservation.</span></h2>
               <p className="text-white/40 text-lg sm:text-2xl max-w-2xl mx-auto font-medium italic leading-relaxed">
                  "Let us conceptualize your next celebration with a customized artisanal masterpiece."
               </p>
               <div className="pt-4 sm:pt-8">
                  <Link to="/contact" className="bg-primary text-white px-10 sm:px-16 py-4 sm:py-6 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest inline-block hover:bg-white hover:text-accent transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1">
                    Initialize Consultation
                  </Link>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
