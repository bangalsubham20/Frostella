import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { isAuthenticated, role } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg py-4 shadow-premium' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center gap-2">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white"
              >
                <span className="text-xl font-bold italic">F</span>
              </motion.div>
              <h1 className="font-heading text-3xl font-bold tracking-tight text-accent group-hover:text-primary transition-colors italic">
                Frostella
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            {['Home', 'Menu'].map(link => (
              <Link 
                key={link}
                to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} 
                className="text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link to="/orders" className="text-sm font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors relative group">
                My Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )}

            {role === 'ADMIN' && (
              <Link to="/admin" className="text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Dashboard</Link>
            )}
            
            <div className="flex items-center gap-6 ml-4 border-l border-accent/10 pl-10">
              <Link to="/cart" className="flex items-center text-accent hover:text-primary transition-all relative group">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-3 -right-3 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg border-2 border-white"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
              
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 text-accent hover:text-red-500 font-bold transition-all group"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link to="/login" className="flex items-center gap-2 text-accent hover:text-primary transition-all group">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold uppercase tracking-widest">Login</span>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-accent hover:text-primary">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
