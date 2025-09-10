// src/services/authService.js
import axios from 'axios';
import { base_url } from '../Utils/base_url';

// Create axios instance with base URL
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: base_url,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});
  
  // Register user
  export const register = async (userData) => {
    try {
      const response = await api.post('/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error.response?.data?.error || 'Something went wrong';
    }
  };
  
  // Login user
  export const login = async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error.response?.data?.error || 'Invalid credentials';
    }
  };
  
  // Logout user
  export const logout = async () => {
    try {
      await api.get('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  };
  
  // Get current user
  export const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error) {
      console.error('Get user error:', error);
      // Don't remove token on every error as it might be a temporary server issue
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      return null;
    }
  };
  
  // Get current user from local storage
  export const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // Add auth header for all requests
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Handle token expiration
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Only clear storage on auth errors, not all errors
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export default api;