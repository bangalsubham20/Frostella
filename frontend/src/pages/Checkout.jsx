import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clearCart } from '../redux/cartSlice';
import api from '../services/api';
import { 
  CreditCard, 
  Truck, 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User as UserIcon,
  ArrowRight
} from 'lucide-react';

export default function Checkout() {
  const { items, total } = useSelector(state => state.cart);
  const { isAuthenticated, userId, email: userEmail, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your connection.');
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await api.post('/payment/create-order', { amount: total * 100 });
      
      const options = {
        key: 'rzp_test_mockkey1234567',
        amount: data.amount,
        currency: data.currency,
        name: 'Frostella',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const verifyRes = await api.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.data.status === 'success') {
              const finalOrder = await api.post('/orders', {
                ...orderData,
                paymentTransactionId: response.razorpay_payment_id,
                status: 'PROCESSING'
              });
              dispatch(clearCart());
              navigate('/order-confirmation', { state: { orderId: finalOrder.data.id } });
            } else {
              alert('Payment verification failed');
            }
          } catch (e) {
            alert('Critial error during payment finalization.');
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.name,
          email: userEmail,
          contact: formData.phone,
        },
        theme: { color: '#F48FB1' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on('payment.failed', function (response) {
        alert("Payment failed: " + response.error.description);
        setIsLoading(false);
      });
    } catch (error) {
      alert('Failed to initialize payment gateway.');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    
    setIsLoading(true);

    const orderData = {
      user: { id: parseInt(userId) }, 
      totalAmount: total,
      deliveryAddress: formData.deliveryAddress,
      deliveryDate: formData.deliveryDate,
      specialInstructions: formData.specialInstructions,
      paymentMethod: formData.paymentMethod,
      orderItems: items.map(item => ({ 
        product: { id: item.id }, 
        quantity: item.quantity, 
        price: item.price 
      }))
    };

    if (formData.paymentMethod === 'ONLINE') {
      handleOnlinePayment(orderData);
    } else {
      try {
        const response = await api.post('/orders', orderData);
        dispatch(clearCart());
        navigate('/order-confirmation', { state: { orderId: response.data.id } });
      } catch (error) {
        console.error("Order failed", error);
        alert('Could not place order. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (items.length === 0) return navigate('/cart');

  return (
    <div className="bg-mesh min-h-screen pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center lg:text-left">
          <span className="text-primary font-bold tracking-[.3em] uppercase text-[10px] mb-4 inline-block">Secure Checkout</span>
          <h1 className="text-5xl md:text-7xl font-heading text-accent leading-tight">Finalize <span className="text-primary italic">Order</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <motion.form 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
              onSubmit={handleSubmit}
            >
              {/* Personal Info */}
              <section className="bg-white p-10 rounded-[3rem] shadow-premium border border-white/50 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <UserIcon size={20} />
                  </div>
                  <h3 className="text-2xl font-heading">Recipient Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Full Name</label>
                    <input required className="w-full p-4 bg-secondary rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium" placeholder="Who's the cake for?" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Phone Number</label>
                    <input required className="w-full p-4 bg-secondary rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium" placeholder="+91 XXXX XXX XXX" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Delivery Address (Full details)</label>
                  <textarea required className="w-full p-4 bg-secondary rounded-3xl border-none focus:ring-4 focus:ring-primary/10 font-medium h-32 resize-none" placeholder="Ex: Flat 4B, Green Meadows, Rudrapur..." onChange={e => setFormData({...formData, deliveryAddress: e.target.value})}></textarea>
                </div>
              </section>

              {/* Delivery Logistics */}
              <section className="bg-white p-10 rounded-[3rem] shadow-premium border border-white/50 space-y-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-2xl font-heading">Scheduled Logistics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Preferred Date</label>
                    <input required type="date" className="w-full p-4 bg-secondary rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium uppercase text-sm" onChange={e => setFormData({...formData, deliveryDate: e.target.value})} />
                  </div>
                  <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <Truck className="text-primary mr-4 shrink-0" />
                    <p className="text-xs font-bold text-primary leading-tight">Hand-delivered with care to prevent any damage.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest ml-1">Special Instructions</label>
                  <textarea className="w-full p-4 bg-secondary rounded-3xl border-none focus:ring-4 focus:ring-primary/10 font-medium h-24 resize-none" placeholder="Allergies, door codes, or hidden notes..." onChange={e => setFormData({...formData, specialInstructions: e.target.value})}></textarea>
                </div>
              </section>

              {/* Payment Section */}
              <section className="bg-white p-10 rounded-[3rem] shadow-premium border border-white/50">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <CreditCard size={20} />
                    </div>
                    <h3 className="text-2xl font-heading">Settlement</h3>
                  </div>
                  <ShieldCheck size={20} className="text-green-500" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`relative flex items-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                    formData.paymentMethod === 'COD' ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-secondary hover:border-accent/10'
                  }`}>
                    <input type="radio" value="COD" checked={formData.paymentMethod === 'COD'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="hidden" />
                    <div className="flex-1">
                      <p className="font-bold text-accent text-lg">Pay on Arrival</p>
                      <p className="text-[10px] text-accent/40 font-bold uppercase mt-1">Cash or UPI at Doorstep</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'COD' ? 'border-primary bg-primary' : 'border-accent/10'}`}>
                      {formData.paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                  </label>

                  <label className={`relative flex items-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                    formData.paymentMethod === 'ONLINE' ? 'border-primary bg-primary/5 ring-4 ring-primary/5' : 'border-secondary hover:border-accent/10'
                  }`}>
                    <input type="radio" value="ONLINE" checked={formData.paymentMethod === 'ONLINE'} onChange={e => setFormData({...formData, paymentMethod: e.target.value})} className="hidden" />
                    <div className="flex-1">
                      <p className="font-bold text-accent text-lg">Razorpay</p>
                      <p className="text-[10px] text-accent/40 font-bold uppercase mt-1">Secure Online Transaction</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === 'ONLINE' ? 'border-primary bg-primary' : 'border-accent/10'}`}>
                      {formData.paymentMethod === 'ONLINE' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                  </label>
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-20 bg-accent text-white rounded-[2rem] font-bold text-xl shadow-2xl hover:bg-primary transition-all disabled:opacity-50 flex items-center justify-center gap-4 group"
              >
                {isLoading ? 'Processing Reservation...' : 'Complete Reservation'}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.form>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.aside 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-10 rounded-[3.5rem] shadow-premium border border-white/50 sticky top-28"
            >
              <h3 className="text-2xl font-heading mb-8">Summary</h3>
              <div className="space-y-6 mb-10 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-secondary">
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-accent line-clamp-1">{item.name}</p>
                      <p className="text-xs text-accent/40 font-bold uppercase tracking-tighter">Qty: {item.quantity} × {item.size || 'Standard'}</p>
                    </div>
                    <p className="font-bold text-accent text-sm">₹{item.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-accent/5">
                <div className="flex justify-between text-accent/50 font-bold text-xs uppercase tracking-widest">
                  <span>Order Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-accent/50 font-bold text-xs uppercase tracking-widest">
                  <span>Shipping Cost</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-accent text-2xl font-bold pt-4 border-t border-accent/5">
                  <span className="font-heading italic">Grand Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              <div className="mt-10 p-6 bg-secondary/30 rounded-[2rem] border border-accent/5">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck size={16} className="text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent/60">Consumer Protection</p>
                </div>
                <p className="text-xs text-accent/40 leading-relaxed font-medium">Your data is encrypted. Orders are processed via our secure backend with JWT authentication.</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
}
