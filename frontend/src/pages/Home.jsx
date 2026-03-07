import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Clock } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-mesh min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero_bg.png')" }}
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-primary/20 text-primary rounded-full backdrop-blur-md">
              Handcrafted in Domjur
            </span>
            <h1 className="text-6xl md:text-9xl font-heading text-accent mb-8 leading-tight drop-shadow-sm">
              Heavenly <span className="text-primary italic">Eggless</span> <br/> Masterpieces
            </h1>
            <p className="text-xl md:text-2xl text-accent mb-12 font-medium max-w-2xl mx-auto opacity-80">
              Gourmet boutique bakery specializing in artisanal custom cakes and daily sweet escapes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/menu" className="flex items-center justify-center gap-2 bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-dark transition-all transform hover:-translate-y-1 shadow-2xl group">
                Shop the Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/menu" className="bg-white/80 backdrop-blur-md border-2 border-accent/20 text-accent px-10 py-5 rounded-full font-bold text-lg hover:bg-accent hover:text-white transition-all shadow-xl">
                The Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Info Section */}
      <section className="py-20 border-y border-primary/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <Star className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-2xl font-heading mb-2">Premium Quality</h3>
            <p className="text-accent opacity-60">Finest ingredients for the finest moments.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="text-2xl font-heading mb-2">100% Eggless</h3>
            <p className="text-accent opacity-60">Baked with love and inclusivity in mind.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-heading mb-2">Fresh Daily</h3>
            <p className="text-accent opacity-60">Always fresh, right out of the oven.</p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm">A Taste of Perfection</span>
            <h2 className="text-5xl md:text-7xl font-heading text-accent mt-4">Signature Creations</h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { id: 1, name: 'Chocolate Truffle', price: '650', img: '/images/chocolate_truffle.png', tag: 'Bestseller' },
              { id: 4, name: 'Custom Anniversary', price: '1200', img: '/images/red_velvet.png', tag: 'Luxury' },
              { id: 2, name: 'Pineapple Delight', price: '550', img: '/images/pineapple_cake.png', tag: 'Seasonal' }
            ].map(cake => (
              <motion.div key={cake.id} variants={itemVariants}>
                <Link to={`/product/${cake.id}`} className="group block h-full">
                  <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-premium hover:shadow-hover transition-all duration-500 flex flex-col h-full">
                    <div className="h-96 relative overflow-hidden">
                      <img src={cake.img} alt={cake.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-accent uppercase tracking-wider">
                          {cake.tag}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-10 text-center flex-grow flex flex-col justify-center">
                      <h3 className="text-3xl font-heading mb-4 text-accent group-hover:text-primary transition-colors">{cake.name}</h3>
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-8 bg-primary/20"></div>
                        <p className="text-primary font-bold text-2xl tracking-tight">₹{cake.price}</p>
                        <div className="h-px w-8 bg-primary/20"></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-20"
          >
            <Link to="/menu" className="text-accent font-bold text-lg hover:text-primary transition-colors inline-flex items-center gap-2 group">
              Explore Full Collection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-accent p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-heading text-white mb-8">Planning a special event?</h2>
            <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12 font-light">
              We create custom cakes for weddings, anniversaries, and birthdays that taste even better than they look.
            </p>
            <Link to="/contact" className="bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-full font-bold text-xl inline-block transition-all transform hover:scale-105 shadow-xl">
              Get an Instant Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
