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

// Validate if a user has purchased a product before allowing a review
async function validatePurchase(userId, productId) {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      id,
      orders!inner (
        id, 
        buyer_id, 
        status
      )
    `)
    .eq('product_id', productId)
    .eq('orders.buyer_id', userId)
    .eq('orders.status', 'completed')
    .limit(1);
    
  if (error) {
    console.error('Error validating purchase:', error);
    return false;
  }
  
  return data && data.length > 0;
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
    // Get the path parameters
    const path = event.path.split('/').filter(Boolean);
    const resourcePath = path[path.length - 1];
    const reviewId = resourcePath !== 'reviews' ? resourcePath : null;
    const productId = event.queryStringParameters?.product_id;
    
    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET': {
        // Get reviews for a product (public, no auth required)
        if (!productId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Product ID is required' }),
          };
        }
        
        const { data: reviews, error } = await supabase
          .from('reviews')
          .select(`
            id, rating, content, created_at,
            users:reviewer_id (id, name, avatar)
          `)
          .eq('product_id', productId)
          .order('created_at', { ascending: false });
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch reviews' }),
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(reviews),
        };
      }
      
      case 'POST': {
        // Create a new review (authenticated)
        const auth = await authorize(event);
        
        if (!auth.authorized) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: auth.error }),
          };
        }
        
        const userId = auth.userId;
        const reviewData = JSON.parse(event.body);
        
        // Validate required fields
        if (!reviewData.product_id || !reviewData.rating) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Product ID and rating are required' }),
          };
        }
        
        // Check if rating is valid
        if (reviewData.rating < 1 || reviewData.rating > 5 || !Number.isInteger(reviewData.rating)) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Rating must be an integer between 1 and 5' }),
          };
        }
        
        // Check if product exists
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id')
          .eq('id', reviewData.product_id)
          .single();
          
        if (productError || !product) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Product not found' }),
          };
        }
        
        // Check if user has already reviewed this product
        const { data: existingReview, error: reviewError } = await supabase
          .from('reviews')
          .select('id')
          .eq('product_id', reviewData.product_id)
          .eq('reviewer_id', userId)
          .limit(1);
          
        if (existingReview && existingReview.length > 0) {
          return {
            statusCode: 409,
            headers,
            body: JSON.stringify({ error: 'You have already reviewed this product' }),
          };
        }
        
        // In production, verify that the user has purchased the product
        const hasPurchased = await validatePurchase(userId, reviewData.product_id);
        
        if (!hasPurchased) {
          return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ error: 'You must purchase this product before reviewing it' }),
          };
        }
        
        // Create review
        const newReview = {
          product_id: reviewData.product_id,
          reviewer_id: userId,
          rating: reviewData.rating,
          content: reviewData.content || '',
          created_at: new Date().toISOString()
        };
        
        const { data: review, error } = await supabase
          .from('reviews')
          .insert([newReview])
          .select(`
            id, rating, content, created_at,
            users:reviewer_id (id, name, avatar)
          `)
          .single();
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to create review' }),
          };
        }
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(review),
        };
      }
      
      case 'DELETE': {
        // Delete a review (authenticated, only own reviews)
        if (!reviewId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Review ID is required' }),
          };
        }
        
        const auth = await authorize(event);
        
        if (!auth.authorized) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: auth.error }),
          };
        }
        
        const userId = auth.userId;
        
        // Check if the review exists and belongs to the user
        const { data: review, error: fetchError } = await supabase
          .from('reviews')
          .select('reviewer_id')
          .eq('id', reviewId)
          .single();
          
        if (fetchError) {
          return {
            statusCode: fetchError.code === 'PGRST116' ? 404 : 500,
            headers,
            body: JSON.stringify({ error: fetchError.code === 'PGRST116' ? 'Review not found' : 'Server error' }),
          };
        }
        
        if (review.reviewer_id !== userId) {
          return {
            statusCode: 403,
            headers,
            body: JSON.stringify({ error: 'You are not authorized to delete this review' }),
          };
        }
        
        // Delete the review
        const { error } = await supabase
          .from('reviews')
          .delete()
          .eq('id', reviewId);
          
        if (error) {
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to delete review' }),
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