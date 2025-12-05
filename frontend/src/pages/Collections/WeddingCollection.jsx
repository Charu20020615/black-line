import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getProducts } from '../../api/productService';
import { addToCart } from '../../api/cartService';
import { getImageUrl } from '../../utils/imageUtils';

export default function WeddingCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts('wedding');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans">
      <Navbar />

      <section className="py-16 px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gold-text">Wedding Collection</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our exquisite wedding collection, handcrafted for your special day.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No products available in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] hover:shadow-[0_0_15px_#d4af37] transition"
              >
                <img
                  src={getImageUrl(product.images?.[0], '/Images/wedding _collection.png')}
                  alt={product.name}
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                <p className="text-gray-400 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-[#d4af37] text-lg font-bold mb-4">LKR {product.price.toLocaleString()}</p>
                {product.stock > 0 ? (
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="gold-btn px-5 py-2 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition w-full"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-5 py-2 rounded-lg bg-gray-700 text-gray-500 cursor-not-allowed w-full"
                  >
                    Out of Stock
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

