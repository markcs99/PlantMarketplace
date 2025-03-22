/**
 * Stripe utility functions for handling payments in the Plant Marketplace
 * In a real app, most of these functions would have corresponding backend API calls
 */

// Calculate the platform commission (15%)
export const calculateCommission = (amount) => {
  if (!amount || isNaN(parseFloat(amount))) {
    return 0;
  }
  
  const price = parseFloat(amount);
  return price * 0.15;
};

// Format price to EUR currency
export const formatPrice = (amount) => {
  if (!amount || isNaN(parseFloat(amount))) {
    return '€0.00';
  }
  
  return `€${parseFloat(amount).toFixed(2)}`;
};

// Process payment (this would call a backend API in a real app)
export const processPayment = async (paymentMethod, orderDetails) => {
  // In a real app, this would call your backend which would use Stripe's API
  // For the demo, we're simulating a successful payment
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        paymentId: `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        timestamp: new Date().toISOString()
      });
    }, 1500);
  });
};

// Split payment between seller and platform (simulated)
export const splitPayment = async (orderId, amount, sellerId) => {
  const commission = calculateCommission(amount);
  const sellerAmount = amount - commission;
  
  // This would be a backend process in a real app
  console.log(`Order ${orderId}: Seller ${sellerId} receives €${sellerAmount.toFixed(2)}, platform takes €${commission.toFixed(2)} commission`);
  
  return {
    success: true,
    total: amount,
    commission: commission,
    sellerAmount: sellerAmount
  };
};

// Generate payment receipt (simulated)
export const generateReceipt = (order) => {
  // This would generate a proper receipt in a real app
  return {
    receiptId: `RCT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    orderId: order.orderId,
    items: order.items,
    total: order.total,
    customerEmail: order.customerEmail,
    paymentMethod: order.paymentMethod,
    date: new Date().toISOString()
  };
};

// Validate payment input data
export const validatePaymentData = (data) => {
  const errors = {};
  
  if (!data.name) errors.name = 'Name is required';
  if (!data.email) errors.email = 'Email is required';
  if (!data.address?.line1) errors.address = 'Address is required';
  if (!data.address?.city) errors.city = 'City is required';
  if (!data.address?.postal_code) errors.postalCode = 'Postal code is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Slovak city options for shipping
export const slovakCities = [
  'Bratislava', 'Košice', 'Prešov', 'Žilina', 'Banská Bystrica', 
  'Nitra', 'Trnava', 'Trenčín', 'Martin', 'Poprad', 
  'Prievidza', 'Zvolen', 'Považská Bystrica', 'Michalovce', 'Nové Zámky'
];

// Calculate shipping cost based on city (example logic)
export const calculateShipping = (city) => {
  // Different pricing tiers based on location
  const tier1 = ['Bratislava', 'Trnava', 'Nitra']; // Near capital
  const tier2 = ['Trenčín', 'Žilina', 'Banská Bystrica', 'Zvolen']; // Central
  
  if (tier1.includes(city)) {
    return 3.99;
  } else if (tier2.includes(city)) {
    return 4.99;
  } else {
    return 5.99; // Remote areas
  }
}; 