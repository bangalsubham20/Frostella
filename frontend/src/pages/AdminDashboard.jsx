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
  DollarSign,
  MessageSquare,
  Star,
  Eye,
  ChevronRight,
  Filter
} from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const { role, isAuthenticated } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  // Filter & Search State
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (isAuthenticated && role === 'ADMIN') {
      fetchData();
    }
  }, [isAuthenticated, role]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [{ data: ordersData }, { data: productsData }, { data: usersData }, { data: reviewsData }] = await Promise.all([
        api.get('/orders'),
        api.get('/products'),
        api.get('/users'),
        api.get('/reviews')
      ]);
      setOrders(ordersData);
      setProducts(productsData);
      setUsers(usersData);
      setReviews(reviewsData);
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

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this user review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      alert('Failed to delete review');
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
      <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
        <div className="text-center p-12 bg-white rounded-[3rem] shadow-premium">
          <h2 className="text-3xl text-red-500 font-heading mb-4">RESTRICTED ACCESS</h2>
          <p className="text-accent/60 font-medium">Administrator credentials required to view the Studio Dashboard.</p>
        </div>
      </div>
    );
  }

  const revenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));
  const filteredOrders = orderFilter === 'All' ? orders : orders.filter(o => o.status === orderFilter);

  return (
    <div className="min-h-screen bg-mesh pb-20 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation Header */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <Sparkles size={16} className="text-primary" />
               <span className="text-primary font-bold tracking-[.3em] uppercase text-[10px]">Administrative Studio</span>
            </div>
            <h1 className="text-6xl font-heading text-accent">Frostella <span className="text-primary italic">Control</span></h1>
          </div>
          <div className="flex bg-white/80 backdrop-blur-md p-2 rounded-[2.5rem] shadow-premium border border-white flex-wrap justify-center sm:justify-start">
            {[
              { id: 'overview', icon: BarChart3, label: 'Overview' },
              { id: 'products', icon: Package, label: 'Bakery Items' },
              { id: 'orders', icon: ShoppingBag, label: 'Orders' },
              { id: 'reviews', icon: MessageSquare, label: 'Reviews' },
              { id: 'users', icon: UsersIcon, label: 'Community' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-accent text-white shadow-xl shadow-accent/20 translate-y-[-2px]' 
                    : 'text-accent/40 hover:text-accent hover:translate-y-[-1px]'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-accent p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden text-white group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-all"></div>
                   <DollarSign className="w-12 h-12 mb-6 text-primary" />
                   <p className="text-[10px] font-bold uppercase tracking-[.3em] opacity-40">Revenue Flow</p>
                   <p className="text-4xl font-bold mt-2 tracking-tighter">₹{revenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-10 rounded-[3.5rem] shadow-premium border border-white relative overflow-hidden group">
                   <ShoppingBag className="w-12 h-12 mb-6 text-primary opacity-20" />
                   <p className="text-[10px] font-bold uppercase tracking-[.3em] text-accent/30">Active Orders</p>
                   <p className="text-4xl font-bold mt-2 text-accent tracking-tighter">{orders.filter(o => o.status === 'PENDING' || o.status === 'PROCESSING').length}</p>
                </div>
                <div className="bg-white p-10 rounded-[3.5rem] shadow-premium border border-white">
                   <Package className="w-12 h-12 mb-6 text-primary opacity-20" />
                   <p className="text-[10px] font-bold uppercase tracking-[.3em] text-accent/30">Menu Items</p>
                   <p className="text-4xl font-bold mt-2 text-accent tracking-tighter">{products.length}</p>
                </div>
                <div className="bg-white p-10 rounded-[3.5rem] shadow-premium border border-white">
                   <UsersIcon className="w-12 h-12 mb-6 text-primary opacity-20" />
                   <p className="text-[10px] font-bold uppercase tracking-[.3em] text-accent/30">Total Members</p>
                   <p className="text-4xl font-bold mt-2 text-accent tracking-tighter">{users.length}</p>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white/50 backdrop-blur-xl rounded-[4rem] p-12 shadow-premium border border-white">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-heading text-accent">Real-time Stream</h2>
                  <Link to="/orders" className="text-[10px] font-bold text-primary uppercase tracking-[.2em] hover:underline">Full Analytics</Link>
                </div>
                <div className="space-y-6">
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-6 bg-white rounded-[2.5rem] hover:ring-2 hover:ring-primary/10 transition-all shadow-sm group">
                      <div className="flex items-center gap-8">
                        <div className="h-16 w-16 bg-secondary/50 rounded-2xl flex items-center justify-center font-bold text-accent italic">#{order.id}</div>
                        <div>
                          <p className="font-bold text-accent text-lg">Customer ID #{order.user?.id}</p>
                          <p className="text-[10px] font-bold text-accent/30 uppercase tracking-widest mt-1">{new Date(order.orderDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-12">
                        <div className="hidden md:block">
                           <p className="text-[10px] font-bold text-accent/30 uppercase text-right mb-1">Method</p>
                           <p className="font-bold text-accent text-sm">{order.paymentMethod}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-xl">₹{order.totalAmount}</p>
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                            order.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' : 
                            order.status === 'DELIVERED' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <div className="bg-white p-10 rounded-[3.5rem] shadow-premium border border-white sticky top-32">
                  <h2 className="text-3xl font-heading mb-10 text-accent">{editingProduct ? 'Update Selection' : 'New Creation'}</h2>
                  <form onSubmit={handleSaveProduct} className="space-y-8">
                    <div>
                      <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest mb-3 ml-1 block">Item Title</label>
                      <input name="name" defaultValue={editingProduct?.name} required placeholder="Chocolate Ganache..." className="w-full p-4 bg-secondary/30 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest mb-3 ml-1 block">Base Price</label>
                        <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full p-4 bg-secondary/30 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest mb-3 ml-1 block">Class</label>
                        <select name="category" defaultValue={editingProduct?.category} className="w-full p-4 bg-secondary/30 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-bold uppercase text-[10px] appearance-none cursor-pointer">
                          <option value="Cakes">Cakes</option>
                          <option value="Cupcakes">Cupcakes</option>
                          <option value="Custom Cakes">Custom Cakes</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest mb-3 ml-1 block">Ingredient Narrative</label>
                      <textarea name="description" rows="3" defaultValue={editingProduct?.description} required placeholder="Describe the flavor profile..." className="w-full p-4 bg-secondary/30 rounded-3xl border-none focus:ring-4 focus:ring-primary/10 font-medium resize-none"></textarea>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-accent/40 uppercase tracking-widest mb-3 ml-1 block">Media Identity</label>
                      <div className="relative group overflow-hidden rounded-[2rem]">
                        <input name="imageFile" type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full p-12 border-2 border-dashed border-primary/20 rounded-[2rem] bg-primary/5 flex flex-col items-center justify-center text-primary/40 group-hover:bg-primary/10 transition-all">
                          <ImageIcon size={32} className="mb-2" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Select Image</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" disabled={isUploading} className="flex-1 bg-accent text-white py-5 rounded-3xl font-bold shadow-xl hover:bg-primary transition-all disabled:opacity-50">
                        {isUploading ? 'Syncing...' : (editingProduct ? 'Commit Changes' : 'Publish to Menu')}
                      </button>
                      {editingProduct && (
                        <button type="button" onClick={() => setEditingProduct(null)} className="px-8 bg-secondary/50 text-accent py-5 rounded-3xl font-bold">Cancel</button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-8">
                 <div className="bg-white rounded-[4rem] p-12 shadow-premium border border-white">
                   <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                      <h2 className="text-3xl font-heading text-accent">Active Inventory</h2>
                      <div className="relative w-full md:w-80">
                         <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={18} />
                         <input value={productSearch} onChange={e => setProductSearch(e.target.value)} className="w-full pl-14 pr-6 py-4 bg-secondary/30 rounded-2xl border-none focus:ring-4 focus:ring-primary/10 font-medium italic" placeholder="Search by name..." />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      {filteredProducts.map(p => (
                        <div key={p.id} className="p-6 bg-secondary/10 rounded-[2.5rem] border border-accent/5 flex gap-6 items-center hover:bg-white hover:shadow-hover transition-all group">
                           <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-premium shrink-0 scale-95 group-hover:scale-100 transition-transform">
                             <img src={p.imageUrl || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div className="flex-grow">
                             <h4 className="font-heading text-xl text-accent group-hover:text-primary transition-colors">{p.name}</h4>
                             <p className="text-primary font-bold">₹{p.price}</p>
                             <span className="text-[8px] font-bold uppercase tracking-widest opacity-30">{p.category}</span>
                           </div>
                           <div className="flex flex-col gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => setEditingProduct(p)} className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                           </div>
                        </div>
                      ))}
                   </div>
                 </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[4rem] p-12 shadow-premium border border-white overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-heading text-accent">Order Repository</h2>
                  <div className="flex items-center gap-4">
                     <Filter size={18} className="text-primary/40" />
                     <select value={orderFilter} onChange={e => setOrderFilter(e.target.value)} className="bg-secondary/30 px-6 py-3 rounded-xl border-none text-[10px] font-bold uppercase tracking-widest appearance-none outline-none cursor-pointer">
                        <option value="All">All Logistics</option>
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                     </select>
                  </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                      <tr className="text-left text-[10px] uppercase tracking-[.3em] text-accent/30">
                        <th className="px-8 pb-6">Reservation</th>
                        <th className="px-8 pb-6">Scheduled</th>
                        <th className="px-8 pb-6">Asset Value</th>
                        <th className="px-8 pb-6">Method</th>
                        <th className="px-8 pb-6 text-right">Lifecycle</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-4">
                      {filteredOrders.sort((a,b) => b.id - a.id).map(o => (
                        <tr key={o.id} className="bg-secondary/10 hover:bg-white hover:shadow-hover transition-all group rounded-[2rem]">
                          <td className="px-8 py-6 rounded-l-[2rem]">
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-accent italic">#{o.id}</div>
                               <div>
                                 <p className="font-bold text-accent">User #{o.user?.id}</p>
                                 <p className="text-[10px] font-medium text-accent/30 italic">{o.deliveryAddress?.substring(0, 25)}...</p>
                               </div>
                             </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-accent text-sm">{o.deliveryDate}</td>
                          <td className="px-8 py-6 font-bold text-primary text-lg">₹{o.totalAmount}</td>
                          <td className="px-8 py-6">
                             <span className="text-[10px] font-bold text-accent/40 uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">{o.paymentMethod}</span>
                          </td>
                          <td className="px-8 py-6 text-right rounded-r-[2rem]">
                             <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)} className="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[10px] font-bold border-none focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer uppercase tracking-widest">
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

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
               <div className="bg-white rounded-[4rem] p-12 shadow-premium border border-white">
                  <h2 className="text-3xl font-heading text-accent mb-12">Public Feedback Intelligence</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {reviews.length === 0 ? (
                       <p className="col-span-full text-center py-20 text-accent/30 font-bold uppercase tracking-widest italic">No intelligence gathered yet.</p>
                     ) : (
                       reviews.sort((a,b) => b.id - a.id).map(r => (
                        <div key={r.id} className="p-8 bg-secondary/10 rounded-[3rem] border border-accent/5 flex flex-col justify-between group hover:bg-white hover:shadow-hover transition-all">
                           <div>
                             <div className="flex justify-between items-start mb-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center font-bold text-primary italic">{r.user?.name.charAt(0)}</div>
                                  <div>
                                    <p className="font-bold text-accent">{r.user?.name}</p>
                                    <div className="flex text-gold gap-0.5 mt-1">
                                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                                    </div>
                                  </div>
                               </div>
                               <button onClick={() => handleDeleteReview(r.id)} className="p-3 text-red-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                             </div>
                             <p className="text-lg text-accent/60 font-medium italic leading-relaxed">"{r.comment}"</p>
                           </div>
                           <div className="mt-8 pt-6 border-t border-accent/5 flex justify-between items-center">
                              <span className="text-[10px] font-bold text-accent/30 uppercase tracking-widest">Regarding Item #{r.product?.id}</span>
                              <Link to={`/product/${r.product?.id}`} className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Inspect Asset</Link>
                           </div>
                        </div>
                       ))
                     )}
                  </div>
               </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
               {users.map(u => (
                <div key={u.id} className="bg-white p-10 rounded-[3.5rem] shadow-premium border border-white flex flex-col items-center text-center group hover:translate-y-[-8px] transition-all">
                   <div className="w-20 h-20 bg-secondary/50 rounded-[2rem] flex items-center justify-center text-accent text-3xl font-heading mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-xl shadow-accent/5">
                      {u.name.charAt(0)}
                   </div>
                   <h4 className="font-heading text-xl text-accent mb-1">{u.name}</h4>
                   <p className="text-[10px] font-bold text-accent/30 uppercase tracking-widest mb-6">{u.role}</p>
                   <div className="w-full pt-6 border-t border-accent/5 flex flex-col gap-2">
                      <p className="text-xs font-bold text-accent/60 truncate">{u.email}</p>
                      <p className="text-[10px] text-accent/30 font-medium">Memebership ID: #{u.id}</p>
                   </div>
                </div>
               ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
