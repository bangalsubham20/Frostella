import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-heading text-accent mb-8">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-accent opacity-80 mb-6">Your cart is currently empty.</p>
          <Link to="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-6 p-4 border-b border-secondary">
                <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center text-3xl">
                  {item.category === 'Cupcakes' ? '🧁' : '🎂'}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading text-accent">{item.name}</h3>
                  <p className="text-primary font-medium">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                    className="w-8 h-8 rounded-full bg-secondary text-accent flex items-center justify-center hover:bg-primary hover:text-white"
                  >-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="w-8 h-8 rounded-full bg-secondary text-accent flex items-center justify-center hover:bg-primary hover:text-white"
                  >+</button>
                </div>
                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-xl font-heading text-accent mb-6">Order Summary</h3>
            <div className="flex justify-between mb-4 border-b border-secondary pb-4">
              <span className="text-accent opacity-80">Subtotal</span>
              <span className="font-semibold text-accent">₹{total}</span>
            </div>
            <div className="flex justify-between mb-8">
              <span className="text-lg font-heading text-accent">Total</span>
              <span className="text-xl font-bold text-primary">₹{total}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
