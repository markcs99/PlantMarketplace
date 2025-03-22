const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Verify token helper function
const verifyToken = (token) => {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false, message: 'Token expired' };
    }
    
    return { valid: true, userId: decoded.userId };
  } catch (error) {
    return { valid: false, message: 'Invalid token format' };
  }
};

exports.handler = async (event, context) => {
  try {
    // Set CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: '',
      };
    }

    // Get authorization token
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'Authorization required' }),
      };
    }

    const token = authHeader.split(' ')[1];
    const tokenVerification = verifyToken(token);

    if (!tokenVerification.valid) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: tokenVerification.message }),
      };
    }

    const userId = tokenVerification.userId;
    const { path } = event;

    // GET profile
    if (event.httpMethod === 'GET' && path.endsWith('/profile')) {
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, avatar, location, created_at')
        .eq('id', userId)
        .single();

      if (error || !user) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ success: false, message: 'User not found' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, user }),
      };
    }

    // UPDATE profile
    if (event.httpMethod === 'PUT' && path.endsWith('/profile')) {
      const updates = JSON.parse(event.body);
      
      // Validate updates - never allow password or sensitive field updates through this endpoint
      const allowedFields = ['name', 'avatar', 'location'];
      const sanitizedUpdates = {};
      
      for (const field of allowedFields) {
        if (updates[field] !== undefined) {
          sanitizedUpdates[field] = updates[field];
        }
      }

      // Add updated_at timestamp
      sanitizedUpdates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('users')
        .update(sanitizedUpdates)
        .eq('id', userId)
        .select('id, name, email, avatar, location, created_at, updated_at');

      if (error) {
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ success: false, message: 'Failed to update profile', error: error.message }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, user: data[0] }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, message: 'Endpoint not found' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
}; 