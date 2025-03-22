import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Get API URL from environment or use default
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Custom hook for making authenticated API calls to our serverless functions
 * 
 * @returns {Object} An object containing the fetchData function, loading state, and error state
 */
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  /**
   * Function to make an API call with proper authentication headers
   * 
   * @param {string} endpoint - The API endpoint to call (e.g., '/products')
   * @param {Object} options - The fetch options (method, body, etc.)
   * @param {boolean} requireAuth - Whether the API call requires authentication
   * @returns {Promise<Object>} The response data from the API
   */
  const fetchData = useCallback(async (endpoint, options = {}, requireAuth = true) => {
    setLoading(true);
    setError(null);

    try {
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add authorization header if required and token is available
      if (requireAuth && token) {
        headers.Authorization = `Bearer ${token}`;
      } else if (requireAuth && !token) {
        throw new Error('Authentication required but no token available');
      }

      // Make the API request
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      // Parse the response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Check if response was successful
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred while fetching data');
      }

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  return { fetchData, loading, error };
}

/**
 * Hook for product-related API calls
 */
export function useProductApi() {
  const { fetchData, loading, error } = useApi();

  // Get all products with optional filtering
  const getProducts = useCallback(async (filters = {}, page = 1, limit = 10) => {
    const queryParams = new URLSearchParams();
    
    // Add filters to query params
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.seller_id) queryParams.append('seller_id', filters.seller_id);
    if (filters.status) queryParams.append('status', filters.status);
    
    // Add pagination
    queryParams.append('page', page);
    queryParams.append('limit', limit);
    
    return fetchData(`/products?${queryParams.toString()}`, { method: 'GET' }, false);
  }, [fetchData]);

  // Get a single product by ID
  const getProduct = useCallback(async (productId) => {
    return fetchData(`/products/${productId}`, { method: 'GET' }, false);
  }, [fetchData]);

  // Create a new product
  const createProduct = useCallback(async (productData) => {
    return fetchData('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }, [fetchData]);

  // Update a product
  const updateProduct = useCallback(async (productId, updates) => {
    return fetchData(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }, [fetchData]);

  // Delete a product
  const deleteProduct = useCallback(async (productId) => {
    return fetchData(`/products/${productId}`, { method: 'DELETE' });
  }, [fetchData]);

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
    error
  };
}

/**
 * Hook for order-related API calls
 */
export function useOrderApi() {
  const { fetchData, loading, error } = useApi();

  // Get all orders for the current user
  const getOrders = useCallback(async () => {
    return fetchData('/orders', { method: 'GET' });
  }, [fetchData]);

  // Get a single order by ID
  const getOrder = useCallback(async (orderId) => {
    return fetchData(`/orders/${orderId}`, { method: 'GET' });
  }, [fetchData]);

  // Create a new order
  const createOrder = useCallback(async (orderData) => {
    return fetchData('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }, [fetchData]);

  // Cancel an order
  const cancelOrder = useCallback(async (orderId) => {
    return fetchData(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'cancelled' }),
    });
  }, [fetchData]);

  return {
    getOrders,
    getOrder,
    createOrder,
    cancelOrder,
    loading,
    error
  };
}

/**
 * Hook for review-related API calls
 */
export function useReviewApi() {
  const { fetchData, loading, error } = useApi();

  // Get all reviews for a product
  const getProductReviews = useCallback(async (productId) => {
    return fetchData(`/reviews?product_id=${productId}`, { method: 'GET' }, false);
  }, [fetchData]);

  // Create a new review
  const createReview = useCallback(async (reviewData) => {
    return fetchData('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }, [fetchData]);

  // Delete a review
  const deleteReview = useCallback(async (reviewId) => {
    return fetchData(`/reviews/${reviewId}`, { method: 'DELETE' });
  }, [fetchData]);

  return {
    getProductReviews,
    createReview,
    deleteReview,
    loading,
    error
  };
} 