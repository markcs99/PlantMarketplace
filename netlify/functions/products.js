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
    // For all methods other than GET, verify the user is authenticated
    if (event.httpMethod !== 'GET') {
      const auth = await authorize(event);
      
      if (!auth.authorized) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: auth.error }),
        };
      }
    }
    
    // Get the path parameters
    const path = event.path.split('/').filter(Boolean);
    const resourcePath = path[path.length - 1];
    const id = resourcePath !== 'products' ? resourcePath : null;
    
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET': {
        // Get a single product by ID
        if (id && id !== 'products') {
          const { data: product, error } = await supabase
            .from('products')
            .select(`
              id, title, description, price, seller_id, category, image, additional_images, 
              status, created_at, updated_at,
              users:seller_id (id, name, avatar)
            `)
            .eq('id', id)
            .single();
            
          if (error) {
            return {
              statusCode: error.code === 'PGRST116' ? 404 : 500,
              headers,
              body: JSON.stringify({ error: error.code === 'PGRST116' ? 'Product not found' : 'Server error' }),
            };
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(product),
          };
        }
        
        // List products with optional filtering
        const params = event.queryStringParameters || {};
        
        // Extract filter parameters
        const { category, seller_id, status, page = '1', limit = '10' } = params;
        
        // Build query
        let query = supabase
          .from('products')
          .select('id, title, description, price, seller_id, category, image, status, created_at');
        
        // Apply filters
        if (category) {
          query = query.eq('category', category);
        }
        
        if (seller_id) {
          query = query.eq('seller_id', seller_id);
        }
        
        if (status) {
          query = query.eq('status', status);
        } else {
          // By default, only show active products
          query = query.eq('status', 'active');
        }
        
        // Apply pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const from = (pageNum - 1) * limitNum;
        const to = from + limitNum - 1;
        
        query = query.range(from, to);
        
        // Execute query
        const { data: products, error, count } = await query;
        
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch products' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            products,
            pagination: {
              page: pageNum,
              limit: limitNum,
              total: count,
              pages: Math.ceil(count / limitNum),
            },
          }),
        };
      }
      
      case 'POST': {
        const auth = await authorize(event);
        const userId = auth.userId;
        
        // Parse request body
        const productData = JSON.parse(event.body);
        
        // Validate required fields
        if (!productData.title || !productData.price || !productData.category) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Title, price, and category are required' }),
          };
        }
        
        // Add seller_id and dates
        const newProduct = {
          ...productData,
          seller_id: userId,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Insert product
        const { data: product, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create product' }),
          };
        }
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(product),
        };
      }
      
      case 'PUT': {
        if (!id) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Product ID is required' }),
          };
        }
        
        const auth = await authorize(event);
        const userId = auth.userId;
        
        // Check if the product belongs to the user
        const { data: existingProduct, error: fetchError } = await supabase
          .from('products')
          .select('seller_id')
          .eq('id', id)
          .single();
          
        if (fetchError) {
          return {
            statusCode: fetchError.code === 'PGRST116' ? 404 : 500,
            headers,
            body: JSON.stringify({ error: fetchError.code === 'PGRST116' ? 'Product not found' : 'Server error' }),
          };
        }
        
        if (existingProduct.seller_id !== userId) {
          return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ error: 'You are not authorized to update this product' }),
          };
        }
        
        // Parse request body
        const updates = JSON.parse(event.body);
        
        // Add updated_at timestamp
        updates.updated_at = new Date().toISOString();
        
        // Update product
        const { data: updatedProduct, error } = await supabase
          .from('products')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to update product' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedProduct),
        };
      }
      
      case 'DELETE': {
        if (!id) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Product ID is required' }),
          };
        }
        
        const auth = await authorize(event);
        const userId = auth.userId;
        
        // Check if the product belongs to the user
        const { data: existingProduct, error: fetchError } = await supabase
          .from('products')
          .select('seller_id')
          .eq('id', id)
          .single();
          
        if (fetchError) {
          return {
            statusCode: fetchError.code === 'PGRST116' ? 404 : 500,
            headers,
            body: JSON.stringify({ error: fetchError.code === 'PGRST116' ? 'Product not found' : 'Server error' }),
          };
        }
        
        if (existingProduct.seller_id !== userId) {
          return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ error: 'You are not authorized to delete this product' }),
          };
        }
        
        // Delete product
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to delete product' }),
          };
        }
        
        return {
          statusCode: 204,
          headers,
          body: '',
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