import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { isAuthenticated, role } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading text-3xl font-bold italic tracking-wider">
              Frostella
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-accent transition-colors font-medium">Home</Link>
            <Link to="/menu" className="hover:text-accent transition-colors font-medium">Menu</Link>
            {isAuthenticated && (
              <Link to="/orders" className="hover:text-accent transition-colors font-medium">My Orders</Link>
            )}
            {role === 'ADMIN' && (
              <Link to="/admin" className="hover:text-accent transition-colors font-medium">Dashboard</Link>
            )}
            
            <Link to="/cart" className="flex items-center hover:text-accent transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <button onClick={handleLogout} className="hover:text-accent font-medium">Logout</button>
            ) : (
              <Link to="/login" className="flex items-center hover:text-accent transition-colors">
                <User className="w-5 h-5 mr-1" />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white hover:text-accent">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
