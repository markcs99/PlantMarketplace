import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

// User-related operations
export const userOperations = {
  async getUser(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, location, created_at')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async getUserByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, location, created_at, password_hash, password_salt')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data;
  },
  
  async createUser(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  async updateUser(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Product-related operations
export const productOperations = {
  async getProducts(filters = {}, page = 1, limit = 10) {
    let query = supabase
      .from('products')
      .select('id, title, description, price, seller_id, category, image, status, created_at');
    
    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.seller_id) {
      query = query.eq('seller_id', filters.seller_id);
    }
    
    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);
    
    // Execute query
    const { data, error, count } = await query;
    
    if (error) throw error;
    return { data, count };
  },
  
  async getProduct(productId) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, title, description, price, seller_id, category, image, additional_images, 
        status, created_at, updated_at,
        users:seller_id (id, name, avatar)
      `)
      .eq('id', productId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async createProduct(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  async updateProduct(productId, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select();
    
    if (error) throw error;
    return data[0];
  },
  
  async deleteProduct(productId) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    
    if (error) throw error;
    return true;
  }
};

// Order-related operations
export const orderOperations = {
  async getOrders(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, total_amount, status, created_at, updated_at, 
        delivery_method, packeta_point_id, shipping_address,
        order_items (id, product_id, quantity, price_at_purchase)
      `)
      .eq('buyer_id', userId);
    
    if (error) throw error;
    return data;
  },
  
  async getOrder(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id, buyer_id, total_amount, status, created_at, updated_at, 
        delivery_method, packeta_point_id, shipping_address, billing_address,
        order_items (
          id, product_id, quantity, price_at_purchase,
          products:product_id (id, title, image, seller_id)
        )
      `)
      .eq('id', orderId)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async createOrder(orderData, orderItems) {
    // Start a transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (orderError) throw orderError;
    
    // Add order ID to each item
    const itemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }));
    
    // Insert order items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId);
    
    if (itemsError) throw itemsError;
    
    return order;
  },
  
  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', orderId)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Review-related operations
export const reviewOperations = {
  async getProductReviews(productId) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id, rating, content, created_at,
        users:reviewer_id (id, name, avatar)
      `)
      .eq('product_id', productId);
    
    if (error) throw error;
    return data;
  },
  
  async createReview(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select();
    
    if (error) throw error;
    return data[0];
  }
}; 