import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('portfolioUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('portfolioUser');
      }
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = async (name, email, password) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('portfolioUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === email);
      
      if (userExists) {
        toast.error('Email already registered. Please login instead.');
        return false;
      }

      // Validate inputs
      if (!name || name.length < 2) {
        toast.error('Please enter a valid name');
        return false;
      }

      if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        toast.error('Please enter a valid email');
        return false;
      }

      if (!password || password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: btoa(password), // Simple encoding (use bcrypt in production)
        createdAt: new Date().toISOString(),
      };

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('portfolioUsers', JSON.stringify(existingUsers));

      // Save current user
      const userToStore = { id: newUser.id, name: newUser.name, email: newUser.email };
      localStorage.setItem('portfolioUser', JSON.stringify(userToStore));
      setUser(userToStore);

      toast.success(`Welcome, ${name}! 🎉`);
      return true;
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      return false;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      // Validate inputs
      if (!email || !password) {
        toast.error('Please enter email and password');
        return false;
      }

      // Get users list
      const existingUsers = JSON.parse(localStorage.getItem('portfolioUsers') || '[]');
      const user = existingUsers.find(u => u.email === email);

      if (!user) {
        toast.error('User not found. Please sign up first.');
        return false;
      }

      // Verify password
      if (atob(user.password) !== password) {
        toast.error('Invalid password');
        return false;
      }

      // Save current user
      const userToStore = { id: user.id, name: user.name, email: user.email };
      localStorage.setItem('portfolioUser', JSON.stringify(userToStore));
      setUser(userToStore);

      toast.success(`Welcome back, ${user.name}! 👋`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('portfolioUser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
