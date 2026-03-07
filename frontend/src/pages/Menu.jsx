import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.log('Using mock data, failed to fetch:', error.message);
        setProducts([
          { id: 1, name: 'Chocolate Truffle', price: 650, category: 'Cakes', imageUrl: '' },
          { id: 2, name: 'Vanilla Buttercream', price: 550, category: 'Cakes', imageUrl: '' },
          { id: 3, name: 'Red Velvet Cupcake', price: 80, category: 'Cupcakes', imageUrl: '' },
          { id: 4, name: 'Custom Anniversary Cake', price: 1200, category: 'Custom Cakes', imageUrl: '' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
    return <div className="py-24 text-center text-xl text-accent font-heading">Loading fresh treats...</div>;
  }

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-5xl font-heading text-center text-accent mb-12">Our Menu</h1>
      
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {['All', 'Cakes', 'Cupcakes', 'Custom Cakes'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border border-primary transition-colors ${
              activeCategory === cat 
                ? 'bg-primary text-white' 
                : 'text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all border border-secondary">
            <div className="h-56 bg-secondary flex items-center justify-center overflow-hidden">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.category === 'Cupcakes' ? '🧁' : '🎂'}</span>
              )}
            </div>
            <div className="p-5 flex flex-col items-center">
              <h3 className="font-heading text-xl mb-2 text-center text-accent">{product.name}</h3>
              <p className="text-primary font-semibold mb-4">₹{product.price}</p>
              <Link 
                to={`/product/${product.id}`}
                className="block text-center w-full py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
