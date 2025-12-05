import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getCart, updateCartItem, removeFromCart } from '../api/cartService';
import { getImageUrl } from '../utils/imageUtils';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-400">Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans">
      <Navbar />

      <section className="py-16 px-12">
        <h1 className="text-4xl font-bold mb-8 gold-text">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-4">Your cart is empty</p>
            <Link to="/">
              <button className="gold-btn px-6 py-3 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] flex flex-col md:flex-row gap-4"
                >
                  <img
                    src={getImageUrl(item.product?.images?.[0], '/Images/accessories.png')}
                    alt={item.product?.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{item.product?.name}</h3>
                    <p className="text-gray-400 mb-2">LKR {item.product?.price.toLocaleString()}</p>
                    {item.size && <p className="text-gray-400 text-sm">Size: {item.size}</p>}
                    {item.color && <p className="text-gray-400 text-sm">Color: {item.color}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 rounded bg-[#2a2a2a] hover:bg-[#d4af37] transition"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 rounded bg-[#2a2a2a] hover:bg-[#d4af37] transition"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[#d4af37] font-bold">
                      LKR {(item.product?.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-400 hover:text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#111111] p-6 rounded-2xl border border-[#2a2a2a] sticky top-4">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>LKR {cart.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-[#2a2a2a] pt-4 mb-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#d4af37]">LKR {cart.total.toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="gold-btn px-6 py-3 rounded-lg hover:from-[#d4af37] hover:to-[#ffd666] transition w-full"
                >
                  Proceed to Checkout
                </button>
                <Link to="/">
                  <button className="mt-4 px-6 py-3 rounded-lg border border-[#2a2a2a] hover:border-[#d4af37] transition w-full">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

