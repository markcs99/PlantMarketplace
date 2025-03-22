import { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  setUser: () => {}
});

// Mock database of users (in a real app this would be in a database)
const MOCK_USERS_KEY = 'plant_marketplace_users';

// Auth Provider component
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem('user');
    const authToken = localStorage.getItem('authToken');

    if (userData && authToken) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Invalid stored data
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    
    setLoading(false);
  }, []);

  // Helper function to get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem(MOCK_USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  // Helper function to save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  };

  // Login user
  const login = async (email, password) => {
    // Get users from localStorage
    const users = getUsers();
    
    // Find user with matching email
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Check if user exists and password matches
    if (!user) {
      return { success: false, message: "No account found with this email" };
    }
    
    if (user.password !== password) {
      return { success: false, message: "Incorrect password" };
    }
    
    // Create user object without password for client
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    // Set auth state
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
    
    return { success: true, user: userWithoutPassword };
  };

  // Register new user
  const register = async (name, email, password) => {
    // Get users from localStorage
    const users = getUsers();
    
    // Check if email is already in use
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Email is already in use" };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    saveUsers(users);
    
    // Create user object without password for client
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    // Set auth state
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
    
    return { success: true, user: userWithoutPassword };
  };

  // Logout user
  const logout = () => {
    // Clear auth state
    setUser(null);
    setIsAuthenticated(false);
    
    // Remove from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  // Update user data
  const updateUser = (userData) => {
    // Update localStorage and state
    if (userData) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update the user in the users array
      const users = getUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      
      if (userIndex >= 0) {
        // Keep the password from the existing record
        const existingPassword = users[userIndex].password;
        users[userIndex] = { ...updatedUser, password: existingPassword };
        saveUsers(users);
      }
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
    loading
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