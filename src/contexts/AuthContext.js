import { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  setUser: () => {},
  loading: true
});

// Get API URL based on environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// For local development, point to Netlify Dev server
const NETLIFY_DEV_URL = 'http://localhost:8888/api';

// Use the correct development server URL
function getApiUrl() {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // In local development, use Netlify Dev server
    return NETLIFY_DEV_URL;
  }
  return API_URL;
}

// Auth Provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Verify token with API
  const verifyToken = async (tokenToVerify) => {
    try {
      console.log('Verifying token with API...');
      
      // Use the API URL based on environment
      let apiUrl = `${getApiUrl()}/auth/`;
      console.log('Using API URL for token verification:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'verify',
          token: tokenToVerify 
        }),
      });

      console.log('Token verification response status:', response.status);
      const data = await response.json();
      console.log('Token verification response data:', data);
      
      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem('authToken');
        setToken(null);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      localStorage.removeItem('authToken');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      console.log('Logging in user:', email);
      
      // Use the API URL based on environment
      let apiUrl = `${getApiUrl()}/auth/`;
      console.log('Using API URL:', apiUrl);
      
      // Call the login API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'login',
          email, 
          password 
        }),
      });

      console.log('Login response status:', response.status);
      if (response.redirected) {
        console.log('Login was redirected to:', response.url);
      }
      
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);
        
        // Set auth state
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  // Register new user
  const register = async (name, email, password, location) => {
    try {
      console.log('Registering user with data:', { name, email, location });
      
      // Use the direct Netlify function URL to avoid potential redirect issues
      let apiUrl;
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        // For local development with Netlify dev
        apiUrl = `${getApiUrl()}/auth/`;
        console.log('Using local API URL:', apiUrl);
      } else {
        // For production or preview deployments
        apiUrl = `${API_URL}/auth/`;
        console.log('Using production API URL:', apiUrl);
      }
      
      // Detailed logging of request
      const requestBody = { 
        action: 'register',
        name, 
        email, 
        password,
        location
      };
      console.log('Registration request body:', JSON.stringify(requestBody));
      
      // Call the register API with trailing slash to prevent redirect
      console.log('Making registration request to URL:', apiUrl);
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Registration response status:', response.status);
        console.log('Registration response status text:', response.statusText);
        if (response.redirected) {
          console.log('Registration was redirected to:', response.url);
        }
        
        // Check if we got a valid JSON response
        let data;
        const contentType = response.headers.get('content-type');
        console.log('Response content type:', contentType);
        console.log('Response headers:', 
          [...response.headers.entries()].reduce((obj, [key, val]) => {
            obj[key] = val;
            return obj;
          }, {})
        );
        
        try {
          if (contentType && contentType.includes('application/json')) {
            data = await response.json();
            console.log('Registration response data:', data);
          } else {
            const text = await response.text();
            console.error('Non-JSON response:', text);
            return { success: false, message: 'Server returned invalid response format' };
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          return { success: false, message: 'Could not parse server response' };
        }
        
        if (response.ok) {
          // Store token in localStorage
          localStorage.setItem('authToken', data.token);
          
          // Set auth state
          setToken(data.token);
          setUser(data.user);
          setIsAuthenticated(true);
          
          return { success: true, user: data.user };
        } else {
          return { success: false, message: data.error || 'Registration failed' };
        }
      } catch (fetchError) {
        console.error('Fetch error during registration:', fetchError);
        console.error('Fetch error name:', fetchError.name);
        console.error('Fetch error message:', fetchError.message);
        console.error('Fetch error stack:', fetchError.stack);
        return { success: false, message: `Network error during registration: ${fetchError.message}` };
      }
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      return { success: false, message: `An error occurred during registration: ${error.message}` };
    }
  };

  // Logout user
  const logout = () => {
    // Clear auth state
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    
    // Remove from localStorage
    localStorage.removeItem('authToken');
  };

  // Update user data
  const updateUser = async (userData) => {
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      // Use the API URL based on environment
      let apiUrl = `${getApiUrl()}/user/profile/`;
      console.log('Using API URL for profile update:', apiUrl);
      
      // Call the update profile API
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Update local state
        setUser(prev => ({ ...prev, ...data.user }));
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.error || 'Failed to update profile' };
      }
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, message: 'An error occurred during profile update' };
    }
  };

  // Context value
  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    setUser: updateUser,
    loading,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext; 