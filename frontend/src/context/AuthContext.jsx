import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Here you could add a call to a '/auth/me' endpoint to verify the token
      // and get fresh user data. For now, we'll assume the token is valid.
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ token: response.data.token });
    return response.data;
  };

  const register = async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ token: response.data.token });
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, login, register, logout, loading, isAuthenticated: !!user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};