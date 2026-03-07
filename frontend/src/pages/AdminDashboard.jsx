import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminDashboard() {
  const { role, isAuthenticated } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && role === 'ADMIN') {
      fetchOrders();
    }
  }, [isAuthenticated, role]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  if (!isAuthenticated || role !== 'ADMIN') {
    return <div className="py-24 text-center text-xl text-red-500 font-medium">Access Denied. Admin privileges required.</div>;
  }

  if (loading) {
    return <div className="py-24 text-center text-xl text-accent font-medium">Loading Dashboard...</div>;
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-heading text-accent mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-primary bg-opacity-10 p-6 rounded-2xl border border-primary border-opacity-20">
          <h3 className="text-lg font-medium text-accent mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary">₹{calculateTotalRevenue()}</p>
        </div>
        <div className="bg-secondary p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-accent mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-accent">{orders.length}</p>
        </div>
        <div className="bg-secondary p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-accent mb-2">DB Status</h3>
          <p className="text-3xl font-bold text-accent text-green-600">Secure ✅</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-12">
        <h2 className="text-2xl font-heading text-accent mb-6 border-b border-secondary pb-4">Add New Product</h2>
        <form 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            let imageUrl = '';
            const imageFile = formData.get('imageFile');
            if (imageFile && imageFile.size > 0) {
              try {
                const uploadData = new FormData();
                uploadData.append('image', imageFile);
                const uploadRes = await api.post('/images/upload', uploadData, {
                  headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadRes.data.url;
              } catch (err) {
                alert('Image upload failed');
                console.error(err);
                return;
              }
            }

            const newProduct = {
              name: formData.get('name'),
              price: parseFloat(formData.get('price')),
              category: formData.get('category'),
              description: formData.get('description'),
              imageUrl: imageUrl,
              isAvailable: true
            };
            try {
              await api.post('/products', newProduct);
              alert('Product added successfully!');
              e.target.reset();
            } catch (err) {
              alert('Failed to add product');
              console.error(err);
            }
          }}
        >
          <div>
            <label className="block text-sm font-medium text-accent mb-2">Cake Name</label>
            <input name="name" required type="text" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" placeholder="e.g. Pineapple Delight" />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent mb-2">Price (₹)</label>
            <input name="price" required type="number" step="0.01" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-accent mb-2">Category</label>
            <select name="category" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary">
              <option value="Cakes">Cakes</option>
              <option value="Cupcakes">Cupcakes</option>
              <option value="Custom Cakes">Custom Cakes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-accent mb-2">Product Image (Cloudinary)</label>
            <input name="imageFile" type="file" accept="image/*" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90 cursor-pointer" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-accent mb-2">Description</label>
            <textarea name="description" required rows="3" className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all">
              Add Cake to Menu
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-secondary pb-4">
          <h2 className="text-2xl font-heading text-accent">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-accent opacity-70 border-b border-secondary">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer (ID)</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {orders.sort((a,b) => b.id - a.id).map(order => (
                <tr key={order.id} className="border-b border-secondary border-opacity-50">
                  <td className="py-4 font-medium text-accent">#{order.id}</td>
                  <td className="py-4 text-accent">User #{order.user?.id}</td>
                  <td className="py-4 text-accent">{order.deliveryDate}</td>
                  <td className="py-4 font-medium text-primary">₹{order.totalAmount}</td>
                  <td className="py-4">
                    <select
                      value={order.status || 'PENDING'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border-none cursor-pointer outline-none focus:ring-2 focus:ring-primary
                        ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-accent font-medium">{order.paymentMethod || 'COD'}</span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-accent">No orders found in database</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
