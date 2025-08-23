import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in
  const [loading, setLoading] = useState(true); // loading state for initial auth check

  // Check for existing token on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = apiService.getToken();
        if (token) {
          // Try to get current user from backend
          const response = await apiService.getCurrentUser();
          if (response.success) {
            setUser({
              id: response.data.id || response.data._id,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              userType: response.data.userType,
              joinedDate: response.data.createdAt ? new Date(response.data.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid token
        apiService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => setUser(userData);

  const logout = () => {
    setUser(null);
    apiService.logout();
  };

  const updateUser = (updatedData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedData
    }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);