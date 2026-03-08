import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users as UsersIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Image as ImageIcon,
  DollarSign
} from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const { role, isAuthenticated } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Form State for Products
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (isAuthenticated && role === 'ADMIN') {
      fetchData();
    }
  }, [isAuthenticated, role]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: ordersData }, { data: productsData }, { data: usersData }] = await Promise.all([
        api.get('/orders'),
        api.get('/products'),
        api.get('/users')
      ]);
      setOrders(ordersData);
      setProducts(productsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const imageFile = formData.get('imageFile');
    
    let imageUrl = editingProduct?.imageUrl || '';

    if (imageFile && imageFile.size > 0) {
      setIsUploading(true);
      try {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await api.post('/images/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.data.url;
      } catch (err) {
        alert('Image upload failed');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const productPayload = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      description: formData.get('description'),
      imageUrl: imageUrl,
      isAvailable: true
    };

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productPayload);
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productPayload } : p));
        alert('Product updated!');
      } else {
        const { data } = await api.post('/products', productPayload);
        setProducts([...products, data]);
        alert('Product added!');
      }
      setEditingProduct(null);
      e.target.reset();
    } catch (err) {
      alert('Save failed');
    }
  };

  if (!isAuthenticated || role !== 'ADMIN') {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h2 className="text-2xl text-red-500 font-bold mb-4">RESTRICTED ACCESS</h2>
        <p className="text-accent/60">Professional credentials required.</p>
      </div>
    );
  }

  const revenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);

  return (
    <div className="min-h-screen bg-secondary/30 pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Frostella Management</span>
            <h1 className="text-5xl font-heading text-accent mt-2">Executive Dashboard</h1>
          </div>
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-accent/5">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview' },
              { id: 'products', icon: Package, label: 'Bakery Items' },
              { id: 'orders', icon: ShoppingBag, label: 'Orders' },
              { id: 'users', icon: UsersIcon, label: 'Customers' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-accent/60 hover:text-accent hover:bg-secondary/50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white text-center">
  <div className="bg-primary p-8 rounded-[2rem] shadow-xl">
    <DollarSign className="w-10 h-10 mb-4 opacity-50" />
    <h3 className="text-white/80 font-medium mb-1 uppercase tracking-wider text-xs">Total Revenue</h3>
    <p className="text-4xl font-bold">₹{revenue.toLocaleString()}</p>
  </div>
  <div className="bg-accent p-8 rounded-[2rem] shadow-xl">
    <ShoppingBag className="w-10 h-10 mb-4 opacity-50" />
    <h3 className="text-white/80 font-medium mb-1 uppercase tracking-wider text-xs">Active Orders</h3>
    <p className="text-4xl font-bold">{orders.filter(o => o.status === 'PENDING' || o.status === 'PROCESSING').length}</p>
  </div>
  <div className="bg-white text-accent p-8 rounded-[2rem] shadow-xl border border-accent/5">
    <Package className="w-10 h-10 mb-4 text-primary opacity-50" />
    <h3 className="text-accent/40 font-medium mb-1 uppercase tracking-wider text-xs">Menu Size</h3>
    <p className="text-4xl font-bold">{products.length} Items</p>
  </div>
  <div className="bg-white text-accent p-8 rounded-[2rem] shadow-xl border border-accent/5">
    <UsersIcon className="w-10 h-10 mb-4 text-primary opacity-50" />
    <h3 className="text-accent/40 font-medium mb-1 uppercase tracking-wider text-xs">Customers</h3>
    <p className="text-4xl font-bold">{users.length}</p>
  </div>
</div>

              <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-accent/5">
                <h2 className="text-2xl font-heading mb-8">Recent Activity</h2>
                <div className="space-y-6">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-secondary/20 rounded-2xl hover:bg-secondary/40 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary font-bold">
                          #{order.id}
                        </div>
                        <div>
                          <p className="font-bold text-accent">Order by User #{order.user?.id}</p>
                          <p className="text-sm text-accent/50">{order.orderDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{order.totalAmount}</p>
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' : 
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              {/* Product Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm sticky top-28 border border-accent/5">
                  <h2 className="text-2xl font-heading mb-8">{editingProduct ? 'Update Item' : 'Create New Item'}</h2>
                  <form onSubmit={handleSaveProduct} className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-accent/40 uppercase mb-2 block">Item Name</label>
                      <input 
                        name="name" 
                        defaultValue={editingProduct?.name} 
                        required 
                        className="w-full p-4 bg-secondary/50 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-accent/40 uppercase mb-2 block">Price (₹)</label>
                        <input name="price" type="number" step="0.01" defaultValue={editingProduct?.price} required className="w-full p-4 bg-secondary/50 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-accent/40 uppercase mb-2 block">Category</label>
                        <select name="category" defaultValue={editingProduct?.category} className="w-full p-4 bg-secondary/50 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium appearance-none">
                          <option value="Cakes">Cakes</option>
                          <option value="Cupcakes">Cupcakes</option>
                          <option value="Custom Cakes">Custom Cakes</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-accent/40 uppercase mb-2 block">Description</label>
                      <textarea name="description" rows="3" defaultValue={editingProduct?.description} required className="w-full p-4 bg-secondary/50 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium"></textarea>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-accent/40 uppercase mb-2 block">Visuals (Cloudinary)</label>
                      <div className="relative group">
                        <input name="imageFile" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full p-10 border-2 border-dashed border-accent/10 rounded-2xl bg-secondary/30 flex flex-col items-center justify-center text-accent/40 group-hover:bg-primary/5 transition-colors">
                          <ImageIcon size={32} className="mb-2" />
                          <span className="text-sm">Click to Select Media</span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 flex gap-4">
                      <button 
                        type="submit" 
                        disabled={isUploading}
                        className="flex-grow bg-primary text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all disabled:opacity-50"
                      >
                        {isUploading ? 'Uploading...' : (editingProduct ? 'Save Changes' : 'Publish Item')}
                      </button>
                      {editingProduct && (
                        <button 
                          type="button" 
                          onClick={() => setEditingProduct(null)}
                          className="px-6 bg-accent text-white py-4 rounded-2xl font-bold"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Product List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-accent/5">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-heading">Menu Inventory</h2>
                    <div className="relative w-64">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/30" size={18} />
                      <input className="w-full pl-12 pr-4 py-3 bg-secondary/50 rounded-xl border-none text-sm font-medium" placeholder="Search items..." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map(product => (
                      <div key={product.id} className="flex gap-4 p-4 bg-secondary/10 rounded-3xl border border-accent/5 group transition-all hover:bg-white hover:shadow-premium">
                        <div className="h-24 w-24 rounded-2xl overflow-hidden bg-white shrink-0 shadow-sm">
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-accent">{product.name}</h4>
                          <p className="text-primary font-bold">₹{product.price}</p>
                          <p className="text-xs text-accent/40 mt-1 uppercase tracking-tight">{product.category}</p>
                        </div>
                        <div className="flex flex-col gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setEditingProduct(product)} className="p-2 bg-white rounded-lg text-blue-500 shadow-sm hover:scale-110 transition-transform">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-white rounded-lg text-red-500 shadow-sm hover:scale-110 transition-transform">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-accent/5">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left py-6 border-b border-accent/5">
                      <th className="pb-6 text-xs font-bold text-accent/30 uppercase tracking-widest">Order Details</th>
                      <th className="pb-6 text-xs font-bold text-accent/30 uppercase tracking-widest text-center">Date</th>
                      <th className="pb-6 text-xs font-bold text-accent/30 uppercase tracking-widest text-center">Value</th>
                      <th className="pb-6 text-xs font-bold text-accent/30 uppercase tracking-widest text-center">Payment</th>
                      <th className="pb-6 text-xs font-bold text-accent/30 uppercase tracking-widest text-right">Status Control</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.sort((a,b) => b.id - a.id).map(order => (
                      <tr key={order.id} className="border-b border-accent/5 last:border-0 hover:bg-secondary/10 transition-colors">
                        <td className="py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-accent/5 flex items-center justify-center font-bold text-accent">#{order.id}</div>
                            <div>
                              <p className="font-bold text-accent">Customer #{order.user?.id}</p>
                              <p className="text-xs text-accent/40">{order.deliveryAddress?.substring(0, 30)}...</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 text-center text-sm font-medium">{order.deliveryDate}</td>
                        <td className="py-6 text-center text-primary font-bold">₹{order.totalAmount}</td>
                        <td className="py-6 text-center">
                          <span className="text-[10px] font-bold px-3 py-1 bg-accent bg-opacity-5 rounded-full text-accent uppercase">{order.paymentMethod}</span>
                        </td>
                        <td className="py-6 text-right">
                          <select 
                            value={order.status} 
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="bg-secondary/50 p-2 rounded-xl text-xs font-bold border-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-accent/5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                  <div key={user.id} className="p-6 bg-secondary/20 rounded-3xl border border-accent/5 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-primary to-pink-300 flex items-center justify-center text-white font-bold text-xl">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-accent">{user.name}</h4>
                      <p className="text-sm text-accent/50">{user.email}</p>
                      <p className="text-xs text-primary font-bold mt-1 uppercase tracking-tighter">{user.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
