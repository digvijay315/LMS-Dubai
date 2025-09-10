import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Card, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FooterLanding from './FooterLanding';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import NavbarLnading from './NavbarLnading';
// import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Clear messages when switching between login and register
  useEffect(() => {
    setError('');
    setSuccess('');
  }, [isLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    // Reset messages
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    
    // Additional validation for signup
    if (!isLogin) {
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Configure axios with proper headers but WITHOUT withCredentials
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 seconds timeout
      };
      
      let response;
      
      if (isLogin) {
        // Handle login
        response = await axios.post(`${base_url}/login`, {
          email: formData.email,
          password: formData.password
        }, axiosConfig);
      } else {
        // Handle registration - create a payload that exactly matches what your backend expects
        const registerPayload = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        
        console.log('Sending registration data:', registerPayload);
        
        // Make sure the URL is correct and matches your backend endpoint
        response = await axios.post(`${base_url}/register`, registerPayload, axiosConfig);
      }
      
      console.log('Response received:', response.data);
      
      if (response.data.success) {
        // Display success message
        setSuccess(isLogin 
          ? 'Login successful! Redirecting to dashboard...' 
          : 'Registration successful! A confirmation email has been sent to your email address.');
        
        // Store user data and token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        
        // Show success message
        console.log(isLogin ? 'Login successful!' : 'Registration successful!');
        
        // Delayed redirect to dashboard (gives user time to see the success message)
        // setTimeout(() => {
        //   navigate('/dashboard');
        // }, 2000);
      } else {
        // Handle case where success is false but no error was thrown
        setError(response.data.error || 'Operation failed. Please try again.');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      
      // More detailed error handling
      if (err.response) {
        // Server responded with an error status
        console.log('Error response data:', err.response.data);
        console.log('Error response status:', err.response.status);
        setError(err.response.data?.error || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received - likely CORS or network issue
        console.log('Error request:', err.request);
        setError('Network error: Could not connect to the server. Please check your connection and try again.');
        
        // Check if it might be a CORS issue
        console.log('Possible CORS issue. Make sure the backend has proper CORS headers.');
      } else {
        // Error in setting up the request
        console.log('Error message:', err.message);
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form data and messages when switching between login and signup
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setError('');
    setSuccess('');
  };

  // const navigateLoginSign = () => {
  //   navigate('/login/signin/');
  // }

  // Social Login Handlers (for future implementation)
  const handleGoogleLogin = () => {
    // You can implement Google OAuth login here
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    // You can implement Facebook OAuth login here
    console.log('Facebook login clicked');
  };

  return (
    <div>

      <style>
      {`
      /* AuthForm.css */
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

      :root {
      --primary-color: #164276;
      --primary-hover:rgb(17, 45, 80);
      --text-color: #344767;
      --text-light: #7b809a;
      --background: #f8f9fe;
      --card-bg: #ffffff;
      --border-color: #e9ecef;
      --error-color: #f5365c;
      --success-color: #2dce89;
      --border-radius: 12px;
      --box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
      --transition: all 0.3s ease;
      }

      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      }

      body {
      font-family: 'Poppins', sans-serif;
      background-color: var(--background);
      color: var(--text-color);
      line-height: 1.6;
      }

      .auth-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      margin: 3rem auto;
      //   background: linear-gradient(135deg, #c850c0, #4158d0);
      }

      .auth-card {
      width: 100%;
      max-width: 450px;
      background-color: var(--card-bg);
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      padding: 3rem;
      overflow: hidden;
      transition: var(--transition);
      animation: cardFadeIn 0.5s ease-out;
      }

      @keyframes cardFadeIn {
      from {
      opacity: 0;
      transform: translateY(20px);
      }
      to {
      opacity: 1;
      transform: translateY(0);
      }
      }

      .auth-header {
      text-align: center;
      margin-bottom: 2.5rem;
      }

      .auth-header h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 0.5rem;
      }

      .auth-header p {
      color: var(--text-light);
      font-size: 1rem;
      }

      .form-group {
      margin-bottom: 1.5rem;
      }

      label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      }

      input {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: #f9fafc;
      transition: var(--transition);
      font-family: inherit;
      }

      input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(94, 114, 228, 0.1);
      }

      input::placeholder {
      color: #adb5bd;
      }

      .password-group {
      position: relative;
      }

      .password-input-container {
      position: relative;
      }

      .toggle-password {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: var(--text-light);
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      transition: var(--transition);
      }

      .toggle-password:hover {
      color: var(--primary-color);
      }

      .forgot-password {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1.5rem;
      }

      .forgot-password a {
      color: var(--primary-color);
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: var(--transition);
      }

      .forgot-password a:hover {
      text-decoration: underline;
      }

      .submit-button {
      display: block;
      width: 100%;
      padding: 0.875rem;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
      color: white;
      background-color: var(--primary-color);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: var(--transition);
      margin-top: 1rem;
      }

      .submit-button:hover {
      background-color: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(94, 114, 228, 0.4);
      }

      .submit-button:active {
      transform: translateY(0);
      }

      .social-login {
      margin-top: 2rem;
      text-align: center;
      }

      .social-login p {
      font-size: 0.875rem;
      color: var(--text-light);
      margin-bottom: 1rem;
      position: relative;
      }

      .social-login p::before,
      .social-login p::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 35%;
      height: 1px;
      background-color: var(--border-color);
      }

      .social-login p::before {
      left: 0;
      }

      .social-login p::after {
      right: 0;
      }

      .social-buttons {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      }

      .social-button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background-color: white;
      cursor: pointer;
      transition: var(--transition);
      font-size: 0.875rem;
      color: var(--text-color);
      }

      .social-button:hover {
      background-color: #f8f9fa;
      transform: translateY(-2px);
      }

      .social-button .icon {
      font-size: 1rem;
      font-weight: 600;
      }

      .google .icon {
      color: #db4437;
      }

      .facebook .icon {
      color: #4267B2;
      }

      .toggle-form {
      text-align: center;
      margin-top: 2rem;
      }

      .toggle-form p {
      font-size: 0.875rem;
      color: var(--text-light);
      }

      .toggle-form a {
      color: var(--primary-color);
      font-weight: 600;
      text-decoration: none;
      transition: var(--transition);
      }

      .toggle-form a:hover {
      text-decoration: underline;
      }

      /* Responsive Design */
      @media (max-width: 576px) {
      .auth-card {
      padding: 2rem;
      }

      .auth-header h1 {
      font-size: 1.75rem;
      }

      .social-buttons {
      flex-direction: column;
      }
      }

      /* Animation for form switch */
      @keyframes fadeIn {
      from {
      opacity: 0;
      transform: translateY(10px);
      }
      to {
      opacity: 1;
      transform: translateY(0);
      }
      }

      /* Apply animation to form elements */
      .form-group {
      animation: fadeIn 0.3s forwards;
      }

      .form-group:nth-child(1) {
      animation-delay: 0.1s;
      }

      .form-group:nth-child(2) {
      animation-delay: 0.2s;
      }

      .form-group:nth-child(3) {
      animation-delay: 0.3s;
      }

      .form-group:nth-child(4) {
      animation-delay: 0.4s;
      }

      /* Error state styling */
      .error input {
      border-color: var(--error-color);
      }

      .error-message {
      color: var(--error-color);
      font-size: 0.75rem;
      margin-top: 0.25rem;
      }

      /* Add these new styles to your existing AuthForm.css file */

      /* Alert styles */
      .error-alert {
        background-color: rgba(245, 54, 92, 0.1);
        border-left: 4px solid var(--error-color);
        color: var(--error-color);
        padding: 12px 16px;
        margin-bottom: 20px;
        border-radius: 6px;
        font-size: 0.875rem;
        animation: fadeIn 0.3s forwards;
      }

      .success-alert {
        background-color: rgba(45, 206, 137, 0.1);
        border-left: 4px solid var(--success-color);
        color: var(--success-color);
        padding: 12px 16px;
        margin-bottom: 20px;
        border-radius: 6px;
        font-size: 0.875rem;
        animation: fadeIn 0.3s forwards;
      }

      /* Disabled button state */
      .submit-button:disabled {
        background-color: #a0aec0;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }

      /* Loading state animation */
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }

      .submit-button:disabled {
        animation: pulse 1.5s infinite ease-in-out;
      }
      `}
      </style>

      {/* <Box className='navbar-box'>
        <div className='logo-div'>
          <h4>Talents Builder</h4>
        </div>
        <div className='navbar-options'>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Courses</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
          <Button className='start-learning-btn' onClick={navigateLoginSign}>Login / Register</Button>
        </div>
      </Box> */}
      {/* <NavbarLnading/> */}

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p>{isLogin ? 'Login to access your account' : 'Sign up to get started'}</p>
          </div>
          
          {error && <div className="error-alert" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
          {success && <div className="success-alert" style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}
            
            {isLogin && (
              <div className="forgot-password">
                <a href="#reset">Forgot password?</a>
              </div>
            )}
            
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>
          
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button className="social-button google" onClick={handleGoogleLogin}>
                <span className="icon">G</span>
                <span>Google</span>
              </button>
              <button className="social-button facebook" onClick={handleFacebookLogin}>
                <span className="icon">f</span>
                <span>Facebook</span>
              </button>
            </div>
          </div>
          
          <div className="toggle-form">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a href="#" onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}>
                {isLogin ? 'Sign up' : 'Login'}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* <FooterLanding/> */}
    </div>
  );
};

export default AuthForm;

