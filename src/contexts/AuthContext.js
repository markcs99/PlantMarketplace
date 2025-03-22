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
      const response = await fetch(`${API_URL}/auth/`, {
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
      // Call the login API
      const response = await fetch(`${API_URL}/auth/`, {
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
      // Call the register API with trailing slash to prevent redirect
      const response = await fetch(`${API_URL}/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'register',
          name, 
          email, 
          password,
          location
        }),
      });

      console.log('Registration response status:', response.status);
      if (response.redirected) {
        console.log('Registration was redirected to:', response.url);
      }
      
      // Check if we got a valid JSON response
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Registration response data:', data);
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        return { success: false, message: 'Server returned invalid response format' };
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
    } catch (error) {
      console.error('Registration error:', error);
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
      // Call the update profile API
      const response = await fetch(`${API_URL}/user/profile/`, {
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