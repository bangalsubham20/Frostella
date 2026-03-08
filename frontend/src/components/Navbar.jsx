import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User, LogOut, Heart, Sparkles, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const { isAuthenticated, role, email } = useSelector(state => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Menu', path: '/menu' },
    { title: 'Artisan Story', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl py-4 shadow-premium border-b border-primary/5' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Branding */}
            <div className="flex-shrink-0">
              <Link to="/" className="group flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl shadow-accent/20 group-hover:bg-primary group-hover:shadow-primary/20 transition-all duration-500 transform group-hover:rotate-[360deg]">
                   <Sparkles size={24} className="group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-3xl font-bold tracking-tight text-accent italic leading-none group-hover:text-primary transition-colors">
                    Frostella
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[.4em] text-accent/30 mt-1">Patisserie</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-12 items-center">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-[10px] font-bold uppercase tracking-[.3em] transition-all relative group ${
                    location.pathname === link.path ? 'text-primary' : 'text-accent/60 hover:text-accent'
                  }`}
                >
                  {link.title}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
              
              <div className="flex items-center gap-8 ml-6 border-l border-accent/5 pl-10">
                {/* Wishlist */}
                <Link to="/wishlist" className="relative group text-accent/60 hover:text-primary transition-colors">
                  <Heart size={20} className="group-hover:scale-110 transition-transform" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative group text-accent/60 hover:text-primary transition-colors">
                  <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="absolute -top-2 -right-3 bg-primary text-white text-[8px] font-bold rounded-full h-4 w-5 flex items-center justify-center shadow-lg border-2 border-white"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                
                {/* Profile/Auth */}
                {isAuthenticated ? (
                  <div className="flex items-center gap-6">
                    <Link to="/profile" className="flex items-center gap-3 bg-secondary/80 backdrop-blur-md px-6 py-3 rounded-2xl hover:bg-white transition-all group/user border border-accent/5">
                      <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-xs uppercase group-hover/user:scale-110 transition-transform">
                        {email?.charAt(0)}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent/60 hidden xl:block">
                        Atelier Member
                      </span>
                    </Link>
                    {role === 'ADMIN' ? (
                      <Link to="/admin" className="px-5 py-2 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all">Studio Dashboard</Link>
                    ) : (
                      <Link to="/orders" className="text-accent/60 hover:text-primary text-[10px] font-bold uppercase tracking-widest transition-all">My History</Link>
                    )}
                    <button onClick={handleLogout} className="text-accent/30 hover:text-red-500 transition-colors">
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-[10px] font-bold uppercase tracking-[.2em] rounded-full hover:bg-primary transition-all shadow-xl shadow-accent/10">
                    <User size={14} />
                    Identity
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-6">
               <Link to="/cart" className="relative text-accent">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartCount}</span>}
               </Link>
               <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-accent">
                 {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
               </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white pt-32 px-10"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.path}
                >
                  <Link to={link.path} className="text-5xl font-heading text-accent hover:text-primary transition-all inline-block italic">
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              
              <div className="mt-10 pt-10 border-t border-accent/5 flex flex-col gap-6">
                {isAuthenticated ? (
                  <>
                    <Link to="/orders" className="text-2xl font-bold text-accent uppercase tracking-widest">My Account</Link>
                    <button onClick={handleLogout} className="text-left text-2xl font-bold text-red-500 uppercase tracking-widest">Log Out</button>
                  </>
                ) : (
                  <Link to="/login" className="text-2xl font-bold text-primary uppercase tracking-widest">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
