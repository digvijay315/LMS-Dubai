// This can be part of your main config file or a separate email config file
// const mongoose = require('mongoose');
const config = {
    // Email configuration
    emailHost: process.env.EMAIL_HOST || 'gmail',
    emailPort: process.env.EMAIL_PORT || 587,
    emailSecure: process.env.EMAIL_SECURE === 'true',
    emailUser: process.env.EMAIL_USER || 'mrvivek258@gmail.com',
    emailPass: process.env.EMAIL_PASSWORD || 'bguk appp yrle wuzo',
    emailFrom: process.env.EMAIL_FROM || 'mrvivek258@gmail.com',
    
    // Other config settings...
  };
  
  module.exports = config;