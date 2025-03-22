import { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  cartItemCount: 0,
  cartTotal: 0,
  selectedDeliveryMethod: 'home',
  selectedPacketaPoint: null,
  setDeliveryMethod: () => {},
  setPacketaPoint: () => {}
});

// Cart Provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('home');
  const [selectedPacketaPoint, setSelectedPacketaPoint] = useState(null);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedDeliveryMethod = localStorage.getItem('deliveryMethod');
      const savedPacketaPoint = localStorage.getItem('packetaPoint');
      
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      
      if (savedDeliveryMethod) {
        setSelectedDeliveryMethod(savedDeliveryMethod);
      }
      
      if (savedPacketaPoint) {
        setSelectedPacketaPoint(JSON.parse(savedPacketaPoint));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);
  
  // Save delivery method to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('deliveryMethod', selectedDeliveryMethod);
    } catch (error) {
      console.error('Error saving delivery method to localStorage:', error);
    }
  }, [selectedDeliveryMethod]);
  
  // Save Packeta point to localStorage whenever it changes
  useEffect(() => {
    try {
      if (selectedPacketaPoint) {
        localStorage.setItem('packetaPoint', JSON.stringify(selectedPacketaPoint));
      }
    } catch (error) {
      console.error('Error saving Packeta point to localStorage:', error);
    }
  }, [selectedPacketaPoint]);
  
  // Calculate cart totals
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + (item.quantity || 1)
        };
        return updatedCart;
      } else {
        // If item doesn't exist, add it with quantity
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };
  
  // Update item quantity
  const updateCartItemQuantity = (itemId, quantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
    setSelectedPacketaPoint(null);
  };
  
  // Set delivery method
  const setDeliveryMethod = (method) => {
    setSelectedDeliveryMethod(method);
    // If switching away from packeta, clear selected point
    if (method !== 'packeta') {
      setSelectedPacketaPoint(null);
    }
  };
  
  // Set Packeta pickup point
  const setPacketaPoint = (point) => {
    setSelectedPacketaPoint(point);
  };
  
  // Context value
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
    selectedDeliveryMethod,
    selectedPacketaPoint,
    setDeliveryMethod,
    setPacketaPoint
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for using the cart context
export function useCart() {
  return useContext(CartContext);
}

export default CartContext; 