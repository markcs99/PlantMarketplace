const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

// Initialize Supabase client with admin privileges
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Secret for JWT - must match the one used in auth.js
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Authorize the request based on JWT token
async function authorize(event) {
  const token = event.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return { authorized: false, error: 'No token provided' };
  }
  
  const decodedToken = verifyToken(token);
  
  if (!decodedToken) {
    return { authorized: false, error: 'Invalid token' };
  }
  
  // Get user data to ensure user exists
  const { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', decodedToken.sub)
    .single();
    
  if (error || !user) {
    return { authorized: false, error: 'User not found' };
  }
  
  return { authorized: true, userId: decodedToken.sub };
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' }),
    };
  }

  try {
    // Verify the user is authenticated for all methods
    const auth = await authorize(event);
    
    if (!auth.authorized) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: auth.error }),
      };
    }
    
    const userId = auth.userId;
    
    // Get the path parameters
    const path = event.path.split('/').filter(Boolean);
    const resourcePath = path[path.length - 1];
    const orderId = resourcePath !== 'orders' ? resourcePath : null;
    
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET': {
        // Get a single order by ID
        if (orderId && orderId !== 'orders') {
          const { data: order, error } = await supabase
            .from('orders')
            .select(`
              id, buyer_id, total_amount, status, created_at, updated_at, 
              delivery_method, packeta_point_id, shipping_address, billing_address,
              order_items (
                id, product_id, quantity, price_at_purchase,
                products:product_id (id, title, image, seller_id, 
                  users:seller_id (id, name, avatar))
              )
            `)
            .eq('id', orderId)
            .single();
            
          if (error) {
            return {
              statusCode: error.code === 'PGRST116' ? 404 : 500,
              headers,
              body: JSON.stringify({ error: error.code === 'PGRST116' ? 'Order not found' : 'Server error' }),
            };
          }
          
          // Check if the order belongs to the authenticated user
          if (order.buyer_id !== userId) {
            return {
              statusCode: 403,
              headers,
              body: JSON.stringify({ error: 'You are not authorized to view this order' }),
            };
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(order),
          };
        }
        
        // List orders for the authenticated user
        const { data: orders, error } = await supabase
          .from('orders')
          .select(`
            id, total_amount, status, created_at, updated_at, 
            delivery_method, packeta_point_id, shipping_address,
            order_items (
              id, product_id, quantity, price_at_purchase,
              products:product_id (id, title, image)
            )
          `)
          .eq('buyer_id', userId)
          .order('created_at', { ascending: false });
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch orders' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(orders),
        };
      }
      
      case 'POST': {
        // Create a new order
        const orderData = JSON.parse(event.body);
        
        // Validate required fields
        if (!orderData.items || !orderData.items.length) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Order items are required' }),
          };
        }
        
        if (!orderData.shipping_address) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Shipping address is required' }),
          };
        }
        
        if (!orderData.delivery_method) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Delivery method is required' }),
          };
        }
        
        // Calculate total amount and prepare order items
        let totalAmount = 0;
        const orderItems = [];
        
        // Get product details for each item
        for (const item of orderData.items) {
          if (!item.product_id || !item.quantity) {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Each item must have a product_id and quantity' }),
            };
          }
          
          // Get product to verify it exists and get the current price
          const { data: product, error } = await supabase
            .from('products')
            .select('id, price, status')
            .eq('id', item.product_id)
            .single();
            
          if (error || !product) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: `Product with ID ${item.product_id} not found` }),
            };
          }
          
          if (product.status !== 'active') {
            return {
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: `Product with ID ${item.product_id} is not available` }),
            };
          }
          
          // Add to total amount
          const itemTotal = product.price * item.quantity;
          totalAmount += itemTotal;
          
          // Add to order items
          orderItems.push({
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_purchase: product.price
          });
        }
        
        // Create order record
        const newOrder = {
          buyer_id: userId,
          total_amount: totalAmount,
          status: 'pending',
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address || orderData.shipping_address,
          delivery_method: orderData.delivery_method,
          packeta_point_id: orderData.packeta_point_id || null,
          payment_info: orderData.payment_info || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Insert order using transaction
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert([newOrder])
          .select()
          .single();
          
        if (orderError) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create order' }),
          };
        }
        
        // Insert order items
        const itemsWithOrderId = orderItems.map(item => ({
          ...item,
          order_id: order.id
        }));
        
        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(itemsWithOrderId);
          
        if (itemsError) {
          // Roll back by deleting the order
          await supabase.from('orders').delete().eq('id', order.id);
          
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create order items' }),
          };
        }
        
        // Return the created order with items
        const { data: completedOrder, error: fetchError } = await supabase
          .from('orders')
          .select(`
            id, buyer_id, total_amount, status, created_at, updated_at,
            delivery_method, packeta_point_id, shipping_address, billing_address,
            order_items (
              id, product_id, quantity, price_at_purchase,
              products:product_id (id, title, image)
            )
          `)
          .eq('id', order.id)
          .single();
          
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(completedOrder),
        };
      }
      
      case 'PUT': {
        // Update an order (e.g., cancel)
        if (!orderId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Order ID is required' }),
          };
        }
        
        // Check if the order belongs to the user
        const { data: existingOrder, error: fetchError } = await supabase
          .from('orders')
          .select('buyer_id, status')
          .eq('id', orderId)
          .single();
          
        if (fetchError) {
          return {
            statusCode: fetchError.code === 'PGRST116' ? 404 : 500,
            headers,
            body: JSON.stringify({ error: fetchError.code === 'PGRST116' ? 'Order not found' : 'Server error' }),
          };
        }
        
        if (existingOrder.buyer_id !== userId) {
          return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ error: 'You are not authorized to update this order' }),
          };
        }
        
        // Only allow cancellation if the order is still pending
        if (existingOrder.status !== 'pending') {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Only pending orders can be updated' }),
          };
        }
        
        const updates = JSON.parse(event.body);
        
        // Only allow status update for now
        if (!updates.status) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Status is required' }),
          };
        }
        
        // Only allow cancellation by the user
        if (updates.status !== 'cancelled') {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'You can only cancel your order' }),
          };
        }
        
        // Update order
        const { data: updatedOrder, error } = await supabase
          .from('orders')
          .update({ 
            status: updates.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId)
          .select();
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to update order' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedOrder[0]),
        };
      }
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }
  } catch (error) {
    console.error('Server error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
}; 