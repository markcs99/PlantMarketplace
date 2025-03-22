import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;
  
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);
  
  // Handle quantity update
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return; // Optional: limit maximum quantity
    updateCartItemQuantity(itemId, newQuantity);
  };
  
  // Handle remove item
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };
  
  // Handle checkout button
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    router.push('/checkout');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any plants to your cart yet.</p>
            <Link href="/marketplace">
              <span className="btn-primary px-6">Browse Plants</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:flex p-4 bg-gray-50 border-b">
                  <div className="w-1/2">
                    <h3 className="font-medium">Product</h3>
                  </div>
                  <div className="w-1/4 text-center">
                    <h3 className="font-medium">Quantity</h3>
                  </div>
                  <div className="w-1/4 text-right">
                    <h3 className="font-medium">Price</h3>
                  </div>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center">
                        {/* Product Info - Mobile Layout is vertical, Desktop is horizontal */}
                        <div className="flex items-start md:w-1/2 mb-4 md:mb-0">
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100 mr-4">
                            <div 
                              className="w-full h-full bg-center bg-cover"
                              style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <Link href={`/plant/${item.id}`}>
                              <h4 className="font-medium cursor-pointer hover:text-green-600">{item.name}</h4>
                            </Link>
                            <p className="text-sm text-gray-500">Sold by {item.seller}</p>
                            
                            {/* Mobile Price (hidden on desktop) */}
                            <div className="md:hidden mt-2">
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                              <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                            </div>

                            {/* Remove Button */}
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-sm text-red-600 hover:text-red-800 mt-2 flex items-center"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center md:w-1/4 md:justify-center mb-4 md:mb-0">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800"
                              disabled={item.quantity <= 1}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800"
                              disabled={item.quantity >= 10}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {/* Desktop Price (hidden on mobile) */}
                        <div className="hidden md:block md:w-1/4 text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-gray-50 border-t flex justify-between">
                  <button 
                    onClick={() => clearCart()}
                    className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear Cart
                  </button>
                  <Link href="/marketplace">
                    <span className="text-sm text-green-600 hover:text-green-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      Continue Shopping
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full py-3 mb-4"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
                
                <div className="text-xs text-gray-500 text-center">
                  <p>Shipping calculated at checkout.</p>
                  <p className="mt-1">Taxes may apply based on your location.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 