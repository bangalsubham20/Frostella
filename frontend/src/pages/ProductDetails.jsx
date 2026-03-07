import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import api from '../services/api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedSize, setSelectedSize] = useState('1 kg');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching logic
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        // Fallback mock if backend is down
        setProduct({
          id: parseInt(id),
          name: id == '3' ? 'Red Velvet Cupcake' : 'Signature Cake',
          price: id == '3' ? 80 : 650,
          category: id == '3' ? 'Cupcakes' : 'Cakes',
          description: 'A deeply rich and moist 100% eggless treat crafted to make your moments perfect. Baked with premium quality ingredients and no preservatives.',
          imageUrl: ''
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ 
      ...product, 
      quantity, 
      customMessage, 
      size: product.category === 'Cakes' ? selectedSize : null,
      price: product.price * (selectedSize === '1.5 kg' ? 1.5 : selectedSize === '2 kg' ? 2 : 1) // basic scale mock
    }));
    navigate('/cart');
  };

  if (loading) return <div className="py-24 text-center">Loading...</div>;
  if (!product) return <div className="py-24 text-center">Product not found</div>;

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <Link to="/menu" className="text-primary hover:underline font-medium mb-8 inline-block">← Back to Menu</Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm">
        <div className="h-96 bg-secondary rounded-2xl flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-9xl">{product.category === 'Cupcakes' ? '🧁' : '🎂'}</span>
          )}
        </div>
        
        <div className="space-y-6">
          <span className="bg-primary bg-opacity-10 text-primary px-4 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
          <h1 className="text-4xl font-heading text-accent">{product.name}</h1>
          <p className="text-3xl font-bold text-primary">₹{product.price}</p>
          <p className="text-accent opacity-80 leading-relaxed">{product.description}</p>
          
          <div className="pt-6 border-t border-secondary space-y-6">
            
            {product.category !== 'Cupcakes' && (
              <div>
                <label className="block text-sm font-medium text-accent mb-2">Select Size</label>
                <div className="flex gap-4">
                  {['0.5 kg', '1 kg', '1.5 kg', '2 kg'].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-accent text-accent hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-accent mb-2">Custom Message on Cake (Optional)</label>
              <input 
                type="text" 
                maxLength="30"
                placeholder="Happy Birthday!"
                value={customMessage}
                onChange={e => setCustomMessage(e.target.value)}
                className="w-full p-3 bg-secondary rounded-lg border-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div>
                <label className="block text-sm font-medium text-accent mb-2">Quantity</label>
                <div className="flex items-center gap-4 bg-secondary p-2 rounded-lg inline-flex">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center font-bold hover:bg-primary hover:text-white">-</button>
                  <span className="w-6 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center font-bold hover:bg-primary hover:text-white">+</button>
                </div>
              </div>
              
              <div className="flex-1 mt-7">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-accent text-white py-4 rounded-xl font-medium text-lg hover:bg-opacity-90 transition-all shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
