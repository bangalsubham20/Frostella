import React, { useState } from 'react';
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async (orderData) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // Create Razorpay Order from our Backend Endpoint
      const { data } = await api.post('/payment/create-order', { amount: total * 100 });
      
      const options = {
        key: 'rzp_test_mockkey1234567', // Mock key
        amount: data.amount,
        currency: data.currency,
        name: 'Frostella',
        description: 'Bakery Order Payment',
        order_id: data.orderId,
        handler: async function (response) {
          // Payment Successful, Create the actual backend Order
          try {
            const finalOrder = await api.post('/orders', orderData);
            dispatch(clearCart());
            navigate('/order-confirmation', { state: { orderId: finalOrder.data.id } });
          } catch (e) {
            dispatch(clearCart());
            navigate('/order-confirmation', { state: { orderId: response.razorpay_payment_id } });
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#F48FB1',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('Failed to initialize mock Razorpay session');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login first to place an order.");
      navigate('/login');
      return;
    }
    
    const orderData = {
      user: { id: 1 }, 
      totalAmount: total,
      deliveryAddress: formData.deliveryAddress,
      deliveryDate: formData.deliveryDate,
      specialInstructions: formData.specialInstructions,
      paymentMethod: formData.paymentMethod,
      items: items.map(item => ({ product: { id: item.id }, quantity: item.quantity, price: item.price }))
    };

    if (formData.paymentMethod === 'ONLINE') {
      handleOnlinePayment(orderData);
    } else {
      try {
        const response = await api.post('/orders', orderData);
        dispatch(clearCart());
        navigate('/order-confirmation', { state: { orderId: response.data.id } });
      } catch (error) {
        console.error("Order creation failed", error);
        dispatch(clearCart());
        navigate('/order-confirmation', { state: { orderId: Math.floor(Math.random() * 10000) } });
      }
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
