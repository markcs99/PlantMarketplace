const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Initialize Supabase client with admin privileges
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Debug logging for environment variables
console.log('Auth function loaded');
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);
console.log('JWT Secret length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);

// Initialize Supabase client
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

// Secret for JWT - in production should be a strong, environment-specific secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to generate password hash with salt
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

// Helper function to verify password
function verifyPassword(password, salt, storedHash) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === storedHash;
}

// Generate JWT token
function generateToken(user) {
  // Remove sensitive data
  const { password_hash, password_salt, ...userWithoutPassword } = user;
  
  return jwt.sign(
    { 
      sub: user.id, 
      email: user.email,
      user: userWithoutPassword
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Debug request information
  console.log('Auth function called with:');
  console.log('  Method:', event.httpMethod);
  console.log('  Path:', event.path);
  console.log('  Headers:', JSON.stringify(event.headers));

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' }),
    };
  }

  try {
    console.log('Request body:', event.body);
    
    if (!event.body) {
      console.log('No request body provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(event.body);
      console.log('Parsed body:', JSON.stringify(parsedBody));
    } catch (error) {
      console.error('Error parsing JSON body:', error);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }
    
    const { action, ...data } = parsedBody;
    console.log('Action:', action, 'Data:', JSON.stringify(data));

    if (!action) {
      console.log('No action specified in request');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Action is required' }),
      };
    }

    // Check if Supabase client is initialized
    if (!supabase) {
      console.error('Supabase client not initialized');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database connection not available' }),
      };
    }

    // Test Supabase connection
    try {
      const { data: connectionTest, error: connectionError } = await supabase.from('users').select('count', { count: 'exact', head: true });
      if (connectionError) {
        console.error('Supabase connection test failed:', connectionError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ error: 'Database connection failed', details: connectionError.message }),
        };
      }
      console.log('Supabase connection test successful');
    } catch (error) {
      console.error('Error testing Supabase connection:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Database connection error', details: error.message }),
      };
    }

    switch (action) {
      case 'register': {
        const { email, password, name, location } = data;
        console.log('Registration attempt for:', email);
        
        // Validate input
        if (!email || !password || !name) {
          console.log('Registration validation failed. Missing:', !email ? 'email' : !password ? 'password' : 'name');
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Email, password, and name are required' }),
          };
        }
        
        try {
          // Check if user already exists
          console.log('Checking if user already exists:', email);
          const { data: existingUser, error: existingUserError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();
          
          if (existingUserError) {
            if (existingUserError.code !== 'PGRST116') {
              console.log('Error checking existing user:', existingUserError);
              return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                  error: 'Error checking user existence', 
                  details: existingUserError.message || existingUserError.toString() 
                }),
              };
            }
          }
            
          if (existingUser) {
            console.log('User already exists:', email);
            return {
              statusCode: 409,
              headers,
              body: JSON.stringify({ error: 'User already exists' }),
            };
          }
          
          // Hash password
          console.log('Hashing password');
          const { hash, salt } = hashPassword(password);
          
          // Generate avatar placeholder
          const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4`;
          console.log('Generated avatar URL:', avatarUrl);
          
          // Create user
          console.log('Creating new user in Supabase');
          console.log('User data being inserted:', { email, name, location });
          
          // Check if the users table exists
          const { data: tableExists, error: tableCheckError } = await supabase
            .from('users')
            .select('id', { count: 'exact', head: true });
            
          if (tableCheckError) {
            console.error('Error verifying users table:', tableCheckError);
            return {
              statusCode: 500,
              headers,
              body: JSON.stringify({ 
                error: 'Database error - users table might not exist', 
                details: tableCheckError.message || tableCheckError.toString() 
              }),
            };
          }
          
          console.log('Users table verification successful');
          
          // Insert the user
          const { data: newUser, error } = await supabase
            .from('users')
            .insert([
              {
                email,
                name,
                password_hash: hash,
                password_salt: salt,
                avatar: avatarUrl,
                location: location || null,
              },
            ])
            .select()
            .single();
            
          if (error) {
            console.error('Error creating user in Supabase:', error);
            return {
              statusCode: 500,
              headers,
              body: JSON.stringify({ 
                error: 'Failed to create user', 
                details: error.message || error.toString() 
              }),
            };
          }
          
          if (!newUser) {
            console.error('User creation returned no data');
            return {
              statusCode: 500,
              headers,
              body: JSON.stringify({ error: 'User creation returned no data' }),
            };
          }
          
          console.log('User created successfully:', newUser.id);
          
          // Generate token
          console.log('Generating JWT token');
          const token = generateToken(newUser);
          
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify({ 
              message: 'User registered successfully',
              token, 
              user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar,
              }
            }),
          };
        } catch (registerError) {
          console.error('Unexpected error during registration:', registerError);
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
              error: 'Registration process failed', 
              details: registerError.message || registerError.toString() 
            }),
          };
        }
      }
      
      case 'login': {
        const { email, password } = data;
        
        // Validate input
        if (!email || !password) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Email and password are required' }),
          };
        }
        
        // Get user
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();
          
        if (error || !user) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid credentials' }),
          };
        }
        
        // Verify password
        const isValid = verifyPassword(password, user.password_salt, user.password_hash);
        
        if (!isValid) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid credentials' }),
          };
        }
        
        // Generate token
        const token = generateToken(user);
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Login successful',
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
            }
          }),
        };
      }
      
      case 'verify': {
        const { token } = data;
        
        if (!token) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Token is required' }),
          };
        }
        
        try {
          // Verify token
          const decoded = jwt.verify(token, JWT_SECRET);
          
          // Get fresh user data
          const { data: user, error } = await supabase
            .from('users')
            .select('id, name, email, avatar, location, created_at')
            .eq('id', decoded.sub)
            .single();
            
          if (error || !user) {
            return {
              statusCode: 401,
              headers,
              body: JSON.stringify({ error: 'Invalid token' }),
            };
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
              message: 'Token verified',
              user
            }),
          };
        } catch (err) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid token' }),
          };
        }
      }
      
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' }),
        };
    }
  } catch (error) {
    console.error('Server error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Server error occurred', 
        details: error.message
      }),
    };
  }
}; 