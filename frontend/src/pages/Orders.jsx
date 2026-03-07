import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import api from '../services/api';

export default function Orders() {
  const { userId, isAuthenticated } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUserOrders();
    }
  }, [isAuthenticated, userId]);

  const fetchUserOrders = async () => {
    try {
      const { data } = await api.get(`/orders/user/${userId}`);
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch user orders', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-24 text-center px-4">
        <h2 className="text-3xl font-heading text-accent mb-4">Please login to view your orders</h2>
      </div>
    );
  }

  if (loading) {
    return <div className="py-24 text-center font-heading text-accent text-xl">Loading your orders...</div>;
  }

  return (
    <div className="py-16 px-4 max-w-5xl mx-auto">
      <h1 className="text-5xl font-heading text-accent mb-12">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-secondary">
          <ShoppingBag className="w-16 h-16 text-primary opacity-20 mx-auto mb-6" />
          <h2 className="text-2xl font-heading text-accent mb-4">No orders yet</h2>
          <p className="text-accent opacity-70 mb-8">Your sweet journey hasn't started yet! Head over to our menu.</p>
          <a href="/menu" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
            See Menu
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.sort((a,b) => b.id - a.id).map(order => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-secondary hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-secondary pb-4 mb-4">
                <div>
                  <p className="text-sm text-accent opacity-70 uppercase tracking-tighter">Order ID</p>
                  <p className="text-lg font-bold text-accent">#{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-accent opacity-70 uppercase tracking-tighter">Date</p>
                  <p className="text-lg font-medium text-accent">{order.deliveryDate || 'TBD'}</p>
                </div>
                <div>
                  <p className="text-sm text-accent opacity-70 uppercase tracking-tighter">Total</p>
                  <p className="text-lg font-bold text-primary">₹{order.totalAmount}</p>
                </div>
                <div>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold 
                    ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-accent"><span className="font-semibold">Delivery Address:</span> {order.deliveryAddress}</p>
                <p className="text-sm text-accent"><span className="font-semibold">Method:</span> {order.paymentMethod}</p>
                {order.specialInstructions && (
                  <p className="text-sm text-accent opacity-70 italic">"{order.specialInstructions}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
