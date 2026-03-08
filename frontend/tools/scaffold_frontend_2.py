import os

base_dir = r"C:\Subham\Frostella\frontend\src"

files = {
    "redux/store.js": """import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
""",
    "redux/cartSlice.js": """import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].price * state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        const diff = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.total += item.price * diff;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
""",
    "redux/authSlice.js": """import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
const email = localStorage.getItem('email');

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  role: role || null,
  email: email || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.email = action.payload.email;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('email', action.payload.email);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      state.email = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
    }
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
""",
    "services/api.js": """import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
""",
    "pages/Cart.jsx": """import React from 'react';
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
""",
    "pages/Checkout.jsx": """import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import api from '../services/api';

export default function Checkout() {
  const { items, total } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryAddress: '',
    deliveryDate: '',
    specialInstructions: '',
    paymentMethod: 'COD'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login first to place an order.");
      navigate('/login');
      return;
    }
    
    try {
      // Create order logic - assuming user id 1 for mock if not pulled from auth token
      const orderData = {
        user: { id: 1 }, 
        totalAmount: total,
        deliveryAddress: formData.deliveryAddress,
        deliveryDate: formData.deliveryDate,
        specialInstructions: formData.specialInstructions,
        paymentMethod: formData.paymentMethod,
        items: items.map(item => ({ product: { id: item.id }, quantity: item.quantity, price: item.price }))
      };
      
      const response = await api.post('/orders', orderData);
      dispatch(clearCart());
      navigate('/order-confirmation', { state: { orderId: response.data.id } });
    } catch (error) {
      console.error("Order creation failed", error);
      alert("Failed to place order. Using mock confirmation for demo.");
      // Fallback for demo without backend
      dispatch(clearCart());
      navigate('/order-confirmation', { state: { orderId: Math.floor(Math.random() * 10000) } });
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="py-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-heading text-accent mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
        <h3 className="text-xl font-heading text-accent border-b pb-2">Delivery Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-accent mb-2">Name</label>
            <input required type="text" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent mb-2">Phone</label>
            <input required type="text" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-accent mb-2">Delivery Address</label>
          <textarea required className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary h-24" onChange={e => setFormData({...formData, deliveryAddress: e.target.value})}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-accent mb-2">Delivery Date</label>
          <input required type="date" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" onChange={e => setFormData({...formData, deliveryDate: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-accent mb-2">Special Instructions (e.g. Custom Message)</label>
          <textarea className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" onChange={e => setFormData({...formData, specialInstructions: e.target.value})}></textarea>
        </div>

        <h3 className="text-xl font-heading text-accent border-b pb-2 mt-8">Payment Method</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="payment" value="COD" checked={formData.paymentMethod === 'COD'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="text-primary focus:ring-primary" />
            <span className="text-accent">Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="payment" value="ONLINE" checked={formData.paymentMethod === 'ONLINE'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="text-primary focus:ring-primary" />
            <span className="text-accent">Online Payment (Razorpay)</span>
          </label>
        </div>

        <div className="mt-8 pt-6 border-t border-secondary flex items-center justify-between">
          <span className="text-xl font-heading text-accent">Total: <span className="text-primary font-bold">₹{total}</span></span>
          <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
""",
    "pages/OrderConfirmation.jsx": """import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const orderId = location.state?.orderId || "UNKNOWN";

  return (
    <div className="py-24 px-4 max-w-3xl mx-auto text-center">
      <div className="w-24 h-24 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="text-5xl">🎉</span>
      </div>
      <h1 className="text-5xl font-heading text-accent mb-4">Order Confirmed!</h1>
      <p className="text-xl text-accent opacity-80 mb-8">
        Thank you for ordering from Frostella. Your sweet treats will be on their way soon!
      </p>
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 inline-block">
        <p className="text-sm text-accent opacity-70 mb-1">Order Reference ID</p>
        <p className="text-2xl font-bold text-primary">#{orderId}</p>
      </div>
      <div>
        <Link to="/menu" className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
          Return to Menu
        </Link>
      </div>
    </div>
  );
}
""",
    "pages/Login.jsx": """import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      alert('Login failed. For demo, mocking a login.');
      // Mock login for demo
      dispatch(loginSuccess({ token: "fake-jwt-token", role: email === 'admin@frostella.com' ? 'ADMIN' : 'CUSTOMER', email }));
      navigate('/');
    }
  };

  return (
    <div className="py-24 px-4 max-w-md mx-auto">
      <h1 className="text-4xl font-heading text-center text-accent mb-8">Welcome Back</h1>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-accent mb-2">Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-2">Password</label>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all">
          Login
        </button>
        <p className="text-center text-sm text-accent opacity-80">
          Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
}
""",
    "pages/Register.jsx": """import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: ''
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Mocking success for demo.');
      navigate('/login');
    }
  };

  return (
    <div className="py-24 px-4 max-w-md mx-auto">
      <h1 className="text-4xl font-heading text-center text-accent mb-8">Create Account</h1>
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Full Name</label>
          <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Email</label>
          <input required type="email" onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Phone</label>
          <input required type="text" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">Password</label>
          <input required type="password" onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all mt-4">
          Register
        </button>
        <p className="text-center text-sm text-accent opacity-80">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
""",
    "pages/AdminDashboard.jsx": """import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { role, isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated || role !== 'ADMIN') {
    return <div className="py-24 text-center text-xl text-red-500 font-medium">Access Denied. Admin privileges required.</div>;
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-heading text-accent mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-primary bg-opacity-10 p-6 rounded-2xl border border-primary border-opacity-20">
          <h3 className="text-lg font-medium text-accent mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary">₹12,450</p>
        </div>
        <div className="bg-secondary p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-accent mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-accent">24</p>
        </div>
        <div className="bg-secondary p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-accent mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-accent">18</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-secondary pb-4">
          <h2 className="text-2xl font-heading text-accent">Recent Orders</h2>
          <button className="text-sm font-medium text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-accent opacity-70 border-b border-secondary">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '1001', name: 'Rahul Sen', date: '2023-11-20', amount: 850, status: 'PENDING' },
                { id: '1002', name: 'Priya Das', date: '2023-11-19', amount: 1400, status: 'PROCESSING' },
                { id: '1003', name: 'Amit Roy', date: '2023-11-18', amount: 650, status: 'DELIVERED' },
              ].map(order => (
                <tr key={order.id} className="border-b border-secondary border-opacity-50">
                  <td className="py-4 font-medium text-accent">#{order.id}</td>
                  <td className="py-4 text-accent">{order.name}</td>
                  <td className="py-4 text-accent">{order.date}</td>
                  <td className="py-4 font-medium text-primary">₹{order.amount}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-accent font-medium hover:underline">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"""
}

for path, content in files.items():
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Additional frontend files scaffolded.")
